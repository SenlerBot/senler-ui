import { browserslistToTargets, Features, transform as transformCss } from 'lightningcss'
import type { Plugin, ResolvedConfig } from 'vite'
import { SENLER_BROWSER_COMPATIBILITY_BROWSERS } from './browser-support'

export const DEFAULT_CSS_COMPATIBILITY_BROWSERS = [...SENLER_BROWSER_COMPATIBILITY_BROWSERS]

export interface CssCompatibilityPluginOptions {
  browsers?: string[]
}

const CSS_COMPATIBILITY_FEATURES = Features.Colors | Features.LogicalProperties | Features.Selectors | Features.VendorPrefixes
const CSS_HASH_PATTERN = /-[A-Za-z0-9_-]{8}(?=\.css$)/
const COLOR_MIX_FALLBACK_SUPPORTS = '@supports not (color: color-mix(in lab, red, red))'
const COLOR_MIX_FALLBACK_SUPPORTS_PATTERN = /@supports\s+not\s*\(\s*color\s*:\s*color-mix\(in\s+lab\s*,\s*red\s*,\s*red\s*\)\s*\)/
const CSS_REQUEST_PATTERN = /\.css(?:$|\?)/

interface RgbColor {
  red: number
  green: number
  blue: number
}

interface ColorMixFallback {
  selector: string
  property: string
  variableName: string
  alpha: string
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

  return parseHexColor(trimmedValue) ?? parseRgbColor(trimmedValue) ?? parseHslColor(trimmedValue)
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
  let index = 0

  while (index < css.length) {
    const openingBraceIndex = css.indexOf('{', index)

    if (openingBraceIndex === -1) {
      break
    }

    const selector = css.slice(index, openingBraceIndex).trim()
    const closingBraceIndex = findMatchingBrace(css, openingBraceIndex)

    if (closingBraceIndex === -1) {
      break
    }

    const body = css.slice(openingBraceIndex + 1, closingBraceIndex)

    if (!selector.startsWith('@')) {
      const selectors = selector.split(',').map((item) => item.trim())

      if (selectors.includes(':root') || selectors.includes(':host')) {
        collectCustomProperties(body, rootVariables)
      }

      if (selectors.includes('.dark')) {
        collectCustomProperties(body, darkVariables)
      }
    }

    index = closingBraceIndex + 1
  }

  return { rootVariables, darkVariables }
}

const collectColorMixFallbacks = (css: string): ColorMixFallback[] => {
  const fallbacks: ColorMixFallback[] = []
  const rulePattern = /([^{}@][^{}]*)\{([^{}]*color-mix\(in oklab,\s*var\(--[A-Za-z0-9_-]+\)\s+[0-9.]+%,\s*transparent\)[^{}]*)\}/g
  let ruleMatch = rulePattern.exec(css)

  while (ruleMatch) {
    const selector = ruleMatch[1].trim()
    const body = ruleMatch[2]
    const declarationPattern = /([A-Za-z-]+|--[A-Za-z0-9_-]+)\s*:\s*color-mix\(in oklab,\s*var\((--[A-Za-z0-9_-]+)\)\s+([0-9.]+)%,\s*transparent\)/g
    let declarationMatch = declarationPattern.exec(body)

    while (declarationMatch) {
      fallbacks.push({
        selector,
        property: declarationMatch[1],
        variableName: declarationMatch[2],
        alpha: formatAlpha(declarationMatch[3]),
      })

      declarationMatch = declarationPattern.exec(body)
    }

    ruleMatch = rulePattern.exec(css)
  }

  return fallbacks
}

const formatRgbVariableValue = (color: RgbColor) => `${color.red}, ${color.green}, ${color.blue}`

const buildRgbVariableBlock = (
  selector: string,
  variables: Map<string, string>,
  variableNames: string[],
) => {
  const declarations = variableNames
    .map((variableName) => {
      const color = parseColor(variables.get(variableName), variables)

      return color ? `${variableName}-rgb:${formatRgbVariableValue(color)}` : ''
    })
    .filter(Boolean)

  return declarations.length > 0 ? `${selector}{${declarations.join(';')}}` : ''
}

const addColorMixFallbacks = (css: string) => {
  if (COLOR_MIX_FALLBACK_SUPPORTS_PATTERN.test(css)) {
    return css
  }

  const fallbacks = collectColorMixFallbacks(css)

  if (fallbacks.length === 0) {
    return css
  }

  const { rootVariables, darkVariables } = collectTopLevelColorVariables(css)
  const resolvedDarkVariables = new Map([...rootVariables, ...darkVariables])
  const variableNames = [...new Set(fallbacks.map((fallback) => fallback.variableName))]
    .filter((variableName) => parseColor(rootVariables.get(variableName), rootVariables))
  const rootRgbBlock = buildRgbVariableBlock(':root,:host', rootVariables, variableNames)
  const darkRgbBlock = buildRgbVariableBlock('.dark', resolvedDarkVariables, variableNames)

  if (!rootRgbBlock) {
    return css
  }

  const fallbackRules = new Map<string, ColorMixFallback>()

  for (const fallback of fallbacks) {
    fallbackRules.set(
      `${fallback.selector}|${fallback.property}|${fallback.variableName}|${fallback.alpha}`,
      fallback,
    )
  }

  const compatibilityRules = [...fallbackRules.values()]
    .map((fallback) => (
      `${fallback.selector}{${fallback.property}:rgba(var(${fallback.variableName}-rgb), ${fallback.alpha})}`
    ))
    .join('')

  return `${rootRgbBlock}${darkRgbBlock}${COLOR_MIX_FALLBACK_SUPPORTS}{${compatibilityRules}}${css}`
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

const createCssCompatibilityTargets = (options: CssCompatibilityPluginOptions) => (
  browserslistToTargets(options.browsers ?? DEFAULT_CSS_COMPATIBILITY_BROWSERS)
)

const normalizeCssRequestFileName = (id: string) => id.split('?')[0] ?? id

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
  let resolvedConfig: ResolvedConfig | null = null

  return {
    name: 'css-compatibility',
    enforce: 'post',
    configResolved(config) {
      resolvedConfig = config
    },
    transform(code, id) {
      if (resolvedConfig?.command !== 'serve' || !CSS_REQUEST_PATTERN.test(id)) {
        return null
      }

      const transformedCss = transformCssForBrowserCompatibility(
        code,
        normalizeCssRequestFileName(id),
        options,
        false,
      )

      if (transformedCss === code) {
        return null
      }

      return {
        code: transformedCss,
        map: null,
      }
    },
    generateBundle(_, bundle) {
      applyCssCompatibilityToBundle(bundle, options)
    },
  }
}
