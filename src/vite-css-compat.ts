import browserslist from 'browserslist'
import { browserslistToTargets, Features, transform as transformCss } from 'lightningcss'
import type { Plugin } from 'vite'
import { SENLER_BROWSER_COMPATIBILITY_BROWSERS } from './browser-support.js'

export const DEFAULT_CSS_COMPATIBILITY_BROWSERS = [...SENLER_BROWSER_COMPATIBILITY_BROWSERS]

export interface CssCompatibilityPluginOptions {
  browsers?: string[]
}

const CSS_COMPATIBILITY_FEATURES = Features.Colors | Features.LogicalProperties | Features.Selectors | Features.VendorPrefixes
const CSS_HASH_PATTERN = /-[A-Za-z0-9_-]{8}(?=\.css$)/
const COLOR_MIX_FALLBACK_SUPPORTS = '@supports not (color: color-mix(in lab, red, red))'
const COLOR_MIX_FALLBACK_SUPPORTS_PATTERN = /^@supports\s+not\s*\(\s*color\s*:\s*color-mix\(in\s+lab\s*,\s*red\s*,\s*red\s*\)\s*\)$/
const COLOR_MIX_GENERATED_SENTINEL = '--senler-ui-color-mix-fallback-generated'

interface RgbColor {
  red: number
  green: number
  blue: number
}

interface ColorMixFallback {
  atRules: string[]
  selector: string
  property: string
  variableName: string
  alpha: string
}

interface CssBlock {
  prelude: string
  preludeStart: number
  openingBraceIndex: number
  closingBraceIndex: number
  body: string
}

type CssCompatibilityAsset = {
  type: 'asset'
  name?: string
  fileName: string
  source: string | Uint8Array
}

type CssCompatibilityChunk = {
  type: 'chunk'
  fileName: string
  code: string
}

export type CssCompatibilityBundle = Record<string, CssCompatibilityAsset | CssCompatibilityChunk>

const staticColorCache = new Map<string, RgbColor | null>()

const isEscapedCssCharacter = (source: string, index: number) => {
  let slashCount = 0

  for (let currentIndex = index - 1; currentIndex >= 0 && source[currentIndex] === '\\'; currentIndex -= 1) {
    slashCount += 1
  }

  return slashCount % 2 === 1
}

const findMatchingBrace = (source: string, openingBraceIndex: number) => {
  let depth = 0
  let quote = ''
  let inComment = false

  for (let index = openingBraceIndex; index < source.length; index += 1) {
    const char = source[index]
    const nextChar = source[index + 1]

    if (inComment) {
      if (char === '*' && nextChar === '/') {
        inComment = false
        index += 1
      }

      continue
    }

    if (quote) {
      if (char === '\\') {
        index += 1
        continue
      }

      if (char === quote) {
        quote = ''
      }

      continue
    }

    if (char === '/' && nextChar === '*') {
      inComment = true
      index += 1
      continue
    }

    if ((char === '"' || char === "'") && !isEscapedCssCharacter(source, index)) {
      quote = char
      continue
    }

    if (char === '{') {
      depth += 1
      continue
    }

    if (char === '}') {
      depth -= 1

      if (depth === 0) {
        return index
      }
    }
  }

  return -1
}

const normalizeCssPrelude = (prelude: string) => prelude
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .trim()

const forEachCssBlock = (source: string, visitor: (block: CssBlock) => void) => {
  let statementStart = 0
  let index = 0
  let quote = ''
  let inComment = false
  let parenthesisDepth = 0

  while (index < source.length) {
    const char = source[index]
    const nextChar = source[index + 1]

    if (inComment) {
      if (char === '*' && nextChar === '/') {
        inComment = false
        index += 2
      } else {
        index += 1
      }
      continue
    }

    if (quote) {
      if (char === '\\') {
        index += 2
      } else {
        if (char === quote) {
          quote = ''
        }
        index += 1
      }
      continue
    }

    if (char === '/' && nextChar === '*') {
      inComment = true
      index += 2
      continue
    }

    if (char === '"' || char === "'") {
      quote = char
      index += 1
      continue
    }

    if (char === '(') {
      parenthesisDepth += 1
      index += 1
      continue
    }

    if (char === ')') {
      parenthesisDepth = Math.max(0, parenthesisDepth - 1)
      index += 1
      continue
    }

    if (char === ';' && parenthesisDepth === 0) {
      statementStart = index + 1
      index += 1
      continue
    }

    if (char !== '{' || parenthesisDepth !== 0) {
      index += 1
      continue
    }

    const closingBraceIndex = findMatchingBrace(source, index)
    if (closingBraceIndex === -1) {
      return
    }

    visitor({
      prelude: normalizeCssPrelude(source.slice(statementStart, index)),
      preludeStart: statementStart,
      openingBraceIndex: index,
      closingBraceIndex,
      body: source.slice(index + 1, closingBraceIndex),
    })
    index = closingBraceIndex + 1
    statementStart = index
  }
}

const isColorMixFallbackGuard = (prelude: string) => (
  COLOR_MIX_FALLBACK_SUPPORTS_PATTERN.test(prelude.replace(/\s+/g, ' '))
)

const visitCssStyleRules = (
  css: string,
  atRules: string[],
  visitor: (selector: string, body: string, ruleAtRules: string[]) => void,
) => {
  forEachCssBlock(css, (block) => {
    if (!block.prelude) {
      return
    }

    if (block.prelude.startsWith('@')) {
      visitCssStyleRules(block.body, [...atRules, block.prelude], visitor)
      return
    }

    visitor(block.prelude, block.body, atRules)
  })
}

const findLayerDelimiter = (source: string, startIndex: number) => {
  for (let index = startIndex; index < source.length; index += 1) {
    const char = source[index]

    if (char === '{') {
      return { type: 'block', index }
    }

    if (char === ';') {
      return { type: 'statement', index }
    }
  }

  return null
}

const unwrapCascadeLayers = (css: string) => {
  let result = ''
  let index = 0

  while (index < css.length) {
    const layerIndex = css.indexOf('@layer', index)

    if (layerIndex === -1) {
      result += css.slice(index)
      break
    }

    result += css.slice(index, layerIndex)

    const delimiter = findLayerDelimiter(css, layerIndex + '@layer'.length)

    if (!delimiter) {
      result += css.slice(layerIndex)
      break
    }

    if (delimiter.type === 'statement') {
      index = delimiter.index + 1
      continue
    }

    const closingBraceIndex = findMatchingBrace(css, delimiter.index)

    if (closingBraceIndex === -1) {
      result += css.slice(layerIndex)
      break
    }

    result += css.slice(delimiter.index + 1, closingBraceIndex)
    index = closingBraceIndex + 1
  }

  return result
}

const clampColorChannel = (value: number) => Math.max(0, Math.min(255, Math.round(value)))

const formatAlpha = (percent: string) => {
  const value = Number(percent)

  if (!Number.isFinite(value)) {
    return '1'
  }

  return String(Math.max(0, Math.min(100, value)) / 100)
}

const parseHexColor = (value: string): RgbColor | null => {
  const normalizedValue = value.trim()

  if (!normalizedValue.startsWith('#')) {
    return null
  }

  const hex = normalizedValue.slice(1)

  if (hex.length === 3 || hex.length === 4) {
    const [red, green, blue] = hex
      .slice(0, 3)
      .split('')
      .map((channel) => Number.parseInt(`${channel}${channel}`, 16))

    return { red, green, blue }
  }

  if (hex.length === 6 || hex.length === 8) {
    return {
      red: Number.parseInt(hex.slice(0, 2), 16),
      green: Number.parseInt(hex.slice(2, 4), 16),
      blue: Number.parseInt(hex.slice(4, 6), 16),
    }
  }

  return null
}

const parseRgbChannel = (value: string) => {
  const trimmedValue = value.trim()

  if (trimmedValue.endsWith('%')) {
    return clampColorChannel((Number(trimmedValue.slice(0, -1)) / 100) * 255)
  }

  return clampColorChannel(Number(trimmedValue))
}

const parseRgbColor = (value: string): RgbColor | null => {
  const match = value
    .trim()
    .match(/^rgba?\(\s*([^)]+)\)$/i)

  if (!match) {
    return null
  }

  const channels = match[1]
    .replace(/\s*\/\s*[^, ]+$/, '')
    .split(/(?:\s*,\s*)|\s+/)
    .filter(Boolean)

  if (channels.length < 3) {
    return null
  }

  return {
    red: parseRgbChannel(channels[0]),
    green: parseRgbChannel(channels[1]),
    blue: parseRgbChannel(channels[2]),
  }
}

const hslToRgb = (hue: number, saturation: number, lightness: number): RgbColor => {
  const normalizedHue = ((hue % 360) + 360) % 360
  const normalizedSaturation = Math.max(0, Math.min(100, saturation)) / 100
  const normalizedLightness = Math.max(0, Math.min(100, lightness)) / 100
  const chroma = (1 - Math.abs(2 * normalizedLightness - 1)) * normalizedSaturation
  const secondary = chroma * (1 - Math.abs(((normalizedHue / 60) % 2) - 1))
  const match = normalizedLightness - chroma / 2
  let red = 0
  let green = 0
  let blue = 0

  if (normalizedHue < 60) {
    red = chroma
    green = secondary
  } else if (normalizedHue < 120) {
    red = secondary
    green = chroma
  } else if (normalizedHue < 180) {
    green = chroma
    blue = secondary
  } else if (normalizedHue < 240) {
    green = secondary
    blue = chroma
  } else if (normalizedHue < 300) {
    red = secondary
    blue = chroma
  } else {
    red = chroma
    blue = secondary
  }

  return {
    red: clampColorChannel((red + match) * 255),
    green: clampColorChannel((green + match) * 255),
    blue: clampColorChannel((blue + match) * 255),
  }
}

const parseHslColor = (value: string): RgbColor | null => {
  const match = value
    .trim()
    .match(/^hsla?\(\s*([^)]+)\)$/i)

  if (!match) {
    return null
  }

  const channels = match[1]
    .replace(/\s*\/\s*[^, ]+$/, '')
    .split(/(?:\s*,\s*)|\s+/)
    .filter(Boolean)

  if (channels.length < 3) {
    return null
  }

  return hslToRgb(
    Number(channels[0].replace(/deg$/i, '')),
    Number(channels[1].replace('%', '')),
    Number(channels[2].replace('%', '')),
  )
}

const parseStaticCssColor = (value: string): RgbColor | null => {
  const normalizedValue = value.trim().toLowerCase()
  if (normalizedValue === 'transparent') {
    return { red: 0, green: 0, blue: 0 }
  }

  const cachedColor = staticColorCache.get(normalizedValue)
  if (cachedColor !== undefined) {
    return cachedColor
  }

  try {
    const result = transformCss({
      filename: 'senler-static-color.css',
      code: new TextEncoder().encode(`.color{color:color-mix(in srgb,${normalizedValue} 50%,transparent)}`),
      minify: true,
      targets: { chrome: 0 },
      include: Features.Colors,
    })
    const transformedCss = new TextDecoder().decode(result.code)
    const match = transformedCss.match(/rgba\(\s*([0-9.]+)\s*,\s*([0-9.]+)\s*,\s*([0-9.]+)\s*,/)
    const color = match
      ? {
          red: clampColorChannel(Number(match[1])),
          green: clampColorChannel(Number(match[2])),
          blue: clampColorChannel(Number(match[3])),
        }
      : null

    staticColorCache.set(normalizedValue, color)
    return color
  } catch {
    staticColorCache.set(normalizedValue, null)
    return null
  }
}

const parseColor = (
  value: string | undefined,
  variables: Map<string, string>,
  seenVariables = new Set<string>(),
): RgbColor | null => {
  if (!value) {
    return null
  }

  const trimmedValue = value.trim()
  const variableMatch = trimmedValue.match(/^var\((--[A-Za-z0-9_-]+)\)$/)

  if (variableMatch) {
    const variableName = variableMatch[1]

    if (seenVariables.has(variableName)) {
      return null
    }

    seenVariables.add(variableName)

    return parseColor(variables.get(variableName), variables, seenVariables)
  }

  return parseHexColor(trimmedValue)
    ?? parseRgbColor(trimmedValue)
    ?? parseHslColor(trimmedValue)
    ?? parseStaticCssColor(trimmedValue)
}

const collectCustomProperties = (body: string, target: Map<string, string>) => {
  const declarationPattern = /(--[A-Za-z0-9_-]+)\s*:\s*([^;{}]+)\s*;?/g
  let match = declarationPattern.exec(body)

  while (match) {
    target.set(match[1], match[2].trim())
    match = declarationPattern.exec(body)
  }
}

const collectTopLevelColorVariables = (css: string) => {
  const rootVariables = new Map<string, string>()
  const darkVariables = new Map<string, string>()

  forEachCssBlock(css, (block) => {
    if (!block.prelude.startsWith('@')) {
      const selectors = block.prelude.split(',').map((item) => item.trim())

      if (selectors.includes(':root') || selectors.includes(':host')) {
        collectCustomProperties(block.body, rootVariables)
      }

      if (selectors.includes('.dark')) {
        collectCustomProperties(block.body, darkVariables)
      }
    }
  })

  return { rootVariables, darkVariables }
}

const collectColorMixFallbacks = (css: string): ColorMixFallback[] => {
  const fallbacks: ColorMixFallback[] = []
  visitCssStyleRules(css, [], (selector, body, atRules) => {
    const declarationPattern = /([A-Za-z-]+|--[A-Za-z0-9_-]+)\s*:\s*color-mix\(in oklab,\s*var\((--[A-Za-z0-9_-]+)\)\s+([0-9.]+)%,\s*transparent\)/g
    let declarationMatch = declarationPattern.exec(body)

    while (declarationMatch) {
      fallbacks.push({
        atRules: atRules.filter((atRule) => !isColorMixFallbackGuard(atRule)),
        selector,
        property: declarationMatch[1],
        variableName: declarationMatch[2],
        alpha: formatAlpha(declarationMatch[3]),
      })

      declarationMatch = declarationPattern.exec(body)
    }
  })

  return fallbacks
}

const formatRgbVariableValue = (color: RgbColor) => `${color.red}, ${color.green}, ${color.blue}`
const areRgbColorsEqual = (left: RgbColor | null, right: RgbColor | null) => (
  left !== null
  && right !== null
  && left.red === right.red
  && left.green === right.green
  && left.blue === right.blue
)

const buildRgbVariableDeclarations = (
  resolvedVariables: Map<string, string>,
  declaredVariables: Map<string, string>,
  variableNames: string[],
) => {
  return variableNames
    .map((variableName) => {
      if (declaredVariables.has(`${variableName}-rgb`)) {
        return ''
      }

      const color = parseColor(resolvedVariables.get(variableName), resolvedVariables)

      return color ? `${variableName}-rgb:${formatRgbVariableValue(color)}` : ''
    })
    .filter(Boolean)
    .join(';')
}

const removeGeneratedColorMixFallback = (css: string) => {
  let generatedStart = -1
  let generatedEnd = -1

  forEachCssBlock(css, (block) => {
    if (
      generatedStart !== -1
      || !isColorMixFallbackGuard(block.prelude)
      || !new RegExp(`(?:^|[;{])\\s*${COLOR_MIX_GENERATED_SENTINEL}\\s*:`).test(block.body)
    ) {
      return
    }

    const rawPrelude = css.slice(block.preludeStart, block.openingBraceIndex)
    const atRuleOffset = rawPrelude.search(/@supports/i)
    if (atRuleOffset === -1) {
      return
    }

    generatedStart = block.preludeStart + atRuleOffset
    generatedEnd = block.closingBraceIndex + 1
  })

  if (generatedStart === -1) {
    return css
  }

  return removeGeneratedColorMixFallback(`${css.slice(0, generatedStart)}${css.slice(generatedEnd)}`)
}

const wrapInAtRules = (body: string, atRules: string[]) => (
  atRules.reduceRight((nestedBody, atRule) => `${atRule}{${nestedBody}}`, body)
)

const buildCompatibilityRules = (fallbacks: ColorMixFallback[]) => {
  return fallbacks
    .map((fallback) => wrapInAtRules(
      `${fallback.selector}{${fallback.property}:rgba(var(${fallback.variableName}-rgb), ${fallback.alpha})}`,
      fallback.atRules,
    ))
    .join('')
}

const insertAfterLeadingComments = (css: string, generatedCss: string) => {
  const leadingComments = css.match(/^(\s*(?:\/\*[\s\S]*?\*\/\s*)*)/)?.[0] ?? ''

  return `${leadingComments}${generatedCss}${css.slice(leadingComments.length)}`
}

const addColorMixFallbacks = (css: string) => {
  const sourceCss = removeGeneratedColorMixFallback(css)
  const fallbacks = collectColorMixFallbacks(sourceCss)

  if (fallbacks.length === 0) {
    return sourceCss
  }

  const { rootVariables, darkVariables } = collectTopLevelColorVariables(sourceCss)
  const resolvedDarkVariables = new Map([...rootVariables, ...darkVariables])
  const supportedVariableNames = [...new Set(fallbacks.map((fallback) => fallback.variableName))]
    .filter((variableName) => (
      parseColor(rootVariables.get(variableName), rootVariables)
      || parseColor(resolvedDarkVariables.get(variableName), resolvedDarkVariables)
    ))
  const supportedVariables = new Set(supportedVariableNames)
  const supportedFallbacks = fallbacks.filter((fallback) => supportedVariables.has(fallback.variableName))
  const rootRgbDeclarations = buildRgbVariableDeclarations(
    rootVariables,
    rootVariables,
    supportedVariableNames,
  )
  const darkVariableNames = supportedVariableNames.filter((variableName) => {
    const rootColor = parseColor(rootVariables.get(variableName), rootVariables)
    const darkColor = parseColor(resolvedDarkVariables.get(variableName), resolvedDarkVariables)

    return darkColor !== null && !areRgbColorsEqual(rootColor, darkColor)
  })
  const darkRgbDeclarations = buildRgbVariableDeclarations(
    resolvedDarkVariables,
    darkVariables,
    darkVariableNames,
  )
  const compatibilityRules = buildCompatibilityRules(supportedFallbacks)

  if (!rootRgbDeclarations && !darkRgbDeclarations && !compatibilityRules) {
    return sourceCss
  }

  const rootRgbBlock = `:root,:host{${COLOR_MIX_GENERATED_SENTINEL}:1${rootRgbDeclarations ? `;${rootRgbDeclarations}` : ''}}`
  const darkRgbBlock = darkRgbDeclarations ? `.dark{${darkRgbDeclarations}}` : ''

  return insertAfterLeadingComments(
    sourceCss,
    `${COLOR_MIX_FALLBACK_SUPPORTS}{${rootRgbBlock}${darkRgbBlock}${compatibilityRules}}`,
  )
}

const removeUnsupportedGradientInterpolation = (css: string) => (
  css.replace(/(--tw-gradient-position:[^;{}]*?)\s+in\s+oklab(?=[;{}])/g, '$1')
)

export const normalizeBrowserCompatibleCss = (css: string) => (
  addColorMixFallbacks(removeUnsupportedGradientInterpolation(unwrapCascadeLayers(css)))
)

const createCssFileName = (fileName: string, source: string) => {
  const hash = createCssHash(source)

  if (CSS_HASH_PATTERN.test(fileName)) {
    return fileName.replace(CSS_HASH_PATTERN, `-${hash}`)
  }

  return fileName.replace(/\.css$/, `-${hash}.css`)
}

const replaceBundleReferences = (source: string, renames: Map<string, string>) => {
  let result = source

  for (const [oldFileName, newFileName] of renames) {
    const oldBaseName = oldFileName.split('/').pop()
    const newBaseName = newFileName.split('/').pop()

    result = result.split(oldFileName).join(newFileName)

    if (oldBaseName && newBaseName && oldBaseName !== oldFileName) {
      result = result.split(oldBaseName).join(newBaseName)
    }
  }

  return result
}

const createCssHash = (source: string) => {
  let hash = 0x811c9dc5

  for (let index = 0; index < source.length; index += 1) {
    hash ^= source.charCodeAt(index)
    hash = Math.imul(hash, 0x01000193)
  }

  return (hash >>> 0).toString(16).padStart(8, '0')
}

export const resolveCssCompatibilityBrowsers = (
  options: CssCompatibilityPluginOptions = {},
) => browserslist(options.browsers ?? DEFAULT_CSS_COMPATIBILITY_BROWSERS)

const createCssCompatibilityTargets = (options: CssCompatibilityPluginOptions) => (
  browserslistToTargets(resolveCssCompatibilityBrowsers(options))
)

export const transformCssForBrowserCompatibility = (
  css: string,
  fileName: string,
  options: CssCompatibilityPluginOptions = {},
  minify = true,
) => {
  const result = transformCss({
    filename: fileName,
    code: new TextEncoder().encode(normalizeBrowserCompatibleCss(css)),
    minify,
    targets: createCssCompatibilityTargets(options),
    include: CSS_COMPATIBILITY_FEATURES,
    errorRecovery: true,
  })

  return normalizeBrowserCompatibleCss(new TextDecoder().decode(result.code))
}

export const applyCssCompatibilityToBundle = (
  bundle: CssCompatibilityBundle,
  options: CssCompatibilityPluginOptions = {},
) => {
  const cssRenames = new Map<string, string>()

  for (const asset of Object.values(bundle)) {
    if (asset.type !== 'asset' || !asset.fileName.endsWith('.css')) {
      continue
    }

    const source = typeof asset.source === 'string' ? asset.source : new TextDecoder().decode(asset.source)
    const normalizedCss = transformCssForBrowserCompatibility(source, asset.fileName, options)
    const nextFileName = createCssFileName(asset.fileName, normalizedCss)

    if (nextFileName !== asset.fileName) {
      cssRenames.set(asset.fileName, nextFileName)
      asset.fileName = nextFileName
    }

    asset.source = normalizedCss
  }

  if (cssRenames.size === 0) {
    return
  }

  for (const output of Object.values(bundle)) {
    if (output.type === 'asset') {
      if (typeof output.source === 'string') {
        output.source = replaceBundleReferences(output.source, cssRenames)
      }

      continue
    }

    output.code = replaceBundleReferences(output.code, cssRenames)
  }
}

export const createCssCompatibilityPlugin = (options: CssCompatibilityPluginOptions = {}): Plugin => {
  return {
    name: 'css-compatibility',
    enforce: 'post',
    generateBundle(_, bundle) {
      applyCssCompatibilityToBundle(bundle, options)
    },
  }
}
