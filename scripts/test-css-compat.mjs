import assert from 'node:assert/strict'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createServer } from 'vite'

const rootDirectory = resolve(dirname(fileURLToPath(import.meta.url)), '..')

async function loadCompatibilityModules(mode) {
  if (mode === 'dist') {
    return {
      cssCompatibility: await import('../dist/vite-css-compat.js'),
      browserCompatibility: await import('../dist/vite-browser-compat.js'),
      close: async () => {},
    }
  }

  const vite = await createServer({
    root: rootDirectory,
    configFile: false,
    appType: 'custom',
    logLevel: 'silent',
    server: { middlewareMode: true },
  })

  try {
    return {
      cssCompatibility: await vite.ssrLoadModule('/src/vite-css-compat.ts'),
      browserCompatibility: await vite.ssrLoadModule('/src/vite-browser-compat.ts'),
      close: () => vite.close(),
    }
  } catch (error) {
    await vite.close()
    throw error
  }
}

const selectedModes = [
  process.argv.includes('--source') ? 'source' : null,
  process.argv.includes('--dist') ? 'dist' : null,
].filter(Boolean)

if (selectedModes.length !== 1) {
  throw new Error('Pass exactly one mode: --source or --dist')
}

const mode = selectedModes[0]
const loadedModules = await loadCompatibilityModules(mode)
const {
  applyCssCompatibilityToBundle,
  normalizeBrowserCompatibleCss,
  resolveCssCompatibilityBrowsers,
  transformCssForBrowserCompatibility,
} = loadedModules.cssCompatibility
const { createDependencySyntaxCompatibilityPlugin } = loadedModules.browserCompatibility

assert.deepEqual(
  resolveCssCompatibilityBrowsers({ browsers: ['Chrome 100', 'Safari 15.4'] }),
  ['chrome 100', 'safari 15.4'],
  'CSS compatibility queries must be resolved before conversion to Lightning CSS targets',
)

const initiallyNormalizedCss = normalizeBrowserCompatibleCss(`
  :root { --first: #ef4444; }
  .first { color: color-mix(in oklab, var(--first) 10%, transparent); }
`)
const incrementallyNormalizedCss = normalizeBrowserCompatibleCss(`
  ${initiallyNormalizedCss}
  :root { --second: #3b82f6; }
  .second { color: color-mix(in oklab, var(--second) 20%, transparent); }
`)

assert.equal(
  /\.second\s*\{\s*color\s*:\s*rgba\(var\(--second-rgb\),\s*0?\.2\)\s*\}/.test(incrementallyNormalizedCss),
  true,
  'A newly appended color-mix rule must receive a fallback after prior normalization',
)
assert.equal(
  incrementallyNormalizedCss.match(/\.first\s*\{\s*color\s*:\s*rgba\(var\(--first-rgb\),\s*0?\.1\)\s*\}/g)?.length,
  1,
  'An existing generated fallback must not be duplicated',
)
assert.equal(
  normalizeBrowserCompatibleCss(initiallyNormalizedCss),
  initiallyNormalizedCss,
  'Generated color-mix fallbacks must be idempotent',
)

const responsiveFallbackCss = normalizeBrowserCompatibleCss(`
  :root { --responsive: #ef4444; }
  @media (min-width: 1000px) {
    .responsive { color: color-mix(in oklab, var(--responsive) 50%, transparent); }
  }
`).replace(/\s+/g, '')

assert.equal(
  responsiveFallbackCss.includes('@media(min-width:1000px){.responsive{color:rgba(var(--responsive-rgb),0.5)}}'),
  true,
  'A color-mix fallback must retain its media ancestry',
)
assert.equal(
  responsiveFallbackCss.match(/\.responsive\{color:rgba\(var\(--responsive-rgb\),0\.5\)\}/g)?.length,
  1,
  'A media-scoped fallback must not leak into the global scope',
)

const interleavedFallbackCss = normalizeBrowserCompatibleCss(`
  :root { --first-order: #ff0000; --media-order: #0000ff; --last-order: #00ff00; }
  .ordered { color: color-mix(in oklab, var(--first-order) 50%, transparent); }
  @media (min-width: 1000px) {
    .ordered { color: color-mix(in oklab, var(--media-order) 50%, transparent); }
  }
  .ordered { color: color-mix(in oklab, var(--last-order) 50%, transparent); }
`).replace(/\s+/g, '')
const firstFallbackIndex = interleavedFallbackCss.indexOf('rgba(var(--first-order-rgb),0.5)')
const mediaFallbackIndex = interleavedFallbackCss.indexOf('rgba(var(--media-order-rgb),0.5)')
const lastFallbackIndex = interleavedFallbackCss.indexOf('rgba(var(--last-order-rgb),0.5)')

assert.equal(
  firstFallbackIndex < mediaFallbackIndex && mediaFallbackIndex < lastFallbackIndex,
  true,
  'Fallback generation must preserve global/media/global cascade order',
)

const contextAwareDedupeCss = normalizeBrowserCompatibleCss(`
  :root { --contextual: #ef4444; }
  @supports not (color: color-mix(in lab, red, red)) {
    @media (min-width: 1000px) {
      .contextual { color: rgba(var(--contextual-rgb), 0.5); }
    }
  }
  .contextual { color: color-mix(in oklab, var(--contextual) 50%, transparent); }
`)

assert.equal(
  contextAwareDedupeCss.match(/\.contextual\s*\{\s*color\s*:\s*rgba\(var\(--contextual-rgb\),\s*0?\.5\)\s*;?\s*\}/g)?.length,
  2,
  'A media-scoped user fallback must not suppress a required global fallback',
)

const updatedThemeCss = normalizeBrowserCompatibleCss(`
  ${normalizeBrowserCompatibleCss(`
    :root { --theme: #ff0000; }
    .themed { color: color-mix(in oklab, var(--theme) 25%, transparent); }
  `)}
  .dark { --theme: #0000ff; }
`)

assert.equal(
  /\.dark\s*\{\s*--theme-rgb\s*:\s*0\s*,\s*0\s*,\s*255\s*;?\s*\}/.test(updatedThemeCss),
  true,
  'Regeneration must update RGB variables after a dark theme override is appended',
)

const aliasedDarkThemeCss = normalizeBrowserCompatibleCss(`
  :root { --alias-base: #ff0000; --alias-theme: var(--alias-base); }
  .dark { --alias-base: #0000ff; }
  .aliased { color: color-mix(in oklab, var(--alias-theme) 50%, transparent); }
`)

assert.equal(
  /\.dark\s*\{\s*--alias-theme-rgb\s*:\s*0\s*,\s*0\s*,\s*255\s*;?\s*\}/.test(aliasedDarkThemeCss),
  true,
  'A dark override of an alias dependency must update the resolved RGB variable',
)
assert.equal(
  updatedThemeCss.match(/--senler-ui-color-mix-fallback-generated\s*:/g)?.length,
  1,
  'Regeneration must replace the owned fallback block instead of appending another one',
)

const updatedRootThemeCss = normalizeBrowserCompatibleCss(`
  ${normalizeBrowserCompatibleCss(`
    :root { --root-theme: #ff0000; }
    .root-themed { color: color-mix(in oklab, var(--root-theme) 25%, transparent); }
  `)}
  :root { --root-theme: #00ff00; }
`)

assert.equal(
  /:root,:host\s*\{[^}]*--root-theme-rgb\s*:\s*0\s*,\s*255\s*,\s*0/.test(updatedRootThemeCss),
  true,
  'Regeneration must update RGB variables after a root theme override is appended',
)

const userRgbCss = normalizeBrowserCompatibleCss(`
  :root { --owned: #ef4444; --owned-rgb: 1, 2, 3; }
  .owned { color: color-mix(in oklab, var(--owned) 50%, transparent); }
`)

assert.equal(
  userRgbCss.match(/--owned-rgb\s*:/g)?.length,
  1,
  'A user-defined RGB variable must not be overwritten or duplicated',
)

const cssFileName = 'assets/app-aaaaaaaa.css'
const css = `
@layer theme {
  :root {
    --senler-accent: #ff6600;
  }

  .dark {
    --senler-accent: #00aaff;
  }
}

.button {
  margin-inline-start: 12px;
  color: color-mix(in oklab, var(--senler-accent) 40%, transparent);
  --tw-gradient-position: to right in oklab;
}
`

const bundle = {
  [cssFileName]: {
    type: 'asset',
    fileName: cssFileName,
    source: css,
  },
  'assets/app.js': {
    type: 'chunk',
    fileName: 'assets/app.js',
    code: `import "./${cssFileName}";`,
  },
}

try {
  applyCssCompatibilityToBundle(bundle)

const cssAsset = Object.values(bundle).find((asset) => (
  asset.type === 'asset' && asset.fileName.endsWith('.css')
))

assert.ok(cssAsset, 'CSS asset should still exist')
assert.notEqual(cssAsset.fileName, cssFileName, 'CSS hash should change after compatibility transform')
assert.equal(bundle['assets/app.js'].code.includes(cssFileName), false, 'Old CSS reference should be replaced')
assert.equal(
  bundle['assets/app.js'].code.includes(cssAsset.fileName),
  true,
  'Chunk should reference renamed CSS file',
)

const transformedCss = String(cssAsset.source)
const colorMixFallbackGuardPattern = /@supports\s+not\s*\(\s*color\s*:\s*color-mix\(in\s+lab\s*,\s*red\s*,\s*red\s*\)\s*\)/
const colorMixFallbackGuardMatches = transformedCss.match(new RegExp(colorMixFallbackGuardPattern, 'g')) ?? []

assert.equal(transformedCss.includes('@layer'), false, 'Cascade layers should be unwrapped')
assert.equal(
  transformedCss.includes('--tw-gradient-position:to right in oklab'),
  false,
  'Unsupported gradient interpolation should be removed',
)
assert.equal(
  colorMixFallbackGuardPattern.test(transformedCss),
  true,
  'color-mix fallback guard should be emitted',
)
assert.equal(
  colorMixFallbackGuardMatches.length,
  1,
  'color-mix fallback guard should be emitted once',
)
assert.equal(
  /rgba\(var\(--senler-accent-rgb\),\s*0?\.4\)/.test(transformedCss),
  true,
  'color-mix fallback should use RGB CSS variable',
)

const devTransformedCss = transformCssForBrowserCompatibility(css, 'src/styles.css', {}, false)
const responsiveTransformedCss = transformCssForBrowserCompatibility(`
  :root { --responsive-transform: #ff0000; }
  @media (min-width: 1000px) {
    .responsive-transform { color: color-mix(in oklab, var(--responsive-transform) 50%, transparent); }
  }
`, 'src/responsive.css').replace(/\s+/g, '')
const licensedTransformedCss = transformCssForBrowserCompatibility(`
  /*! Senler compatibility test license */
  :root { --licensed: #ff0000; }
  .licensed { color: color-mix(in oklab, var(--licensed) 50%, transparent); }
`, 'src/licensed.css', {}, false)

assert.equal(devTransformedCss.includes('@layer'), false, 'Dev CSS transform should unwrap cascade layers')
assert.equal(
  devTransformedCss.includes('--tw-gradient-position: to right in oklab'),
  false,
  'Dev CSS transform should remove unsupported gradient interpolation',
)
assert.equal(
  colorMixFallbackGuardPattern.test(devTransformedCss),
  true,
  'Dev CSS transform should emit color-mix fallback guard',
)
assert.equal(
  /@media\(min-width:1000px\)\{\.responsive-transform\{color:rgba\(var\(--responsive-transform-rgb\),0?\.5\)\}\}/.test(responsiveTransformedCss),
  true,
  'The complete Lightning CSS transform must retain media ancestry for generated fallbacks',
)
assert.equal(
  licensedTransformedCss.includes('Senler compatibility test license'),
  true,
  'Generated fallback ownership must not replace an existing license comment',
)
assert.equal(
  /--licensed-rgb\s*:\s*255\s*,\s*0\s*,\s*0/.test(licensedTransformedCss),
  true,
  'The second Lightning CSS pass must retain fallbacks when a hex color is serialized as a named color',
)

const dependencySyntaxPlugin = createDependencySyntaxCompatibilityPlugin()
const emailAutolinkPatch = dependencySyntaxPlugin.transform(
  'const email = /(?<=^|\\s|\\p{P}|\\p{S})([-.\\w]+)@([-\\w]+(?:\\.[-\\w]+)+)/gu;',
  '/node_modules/mdast-util-gfm-autolink-literal/index.js',
)
const lexicalPatch = dependencySyntaxPlugin.transform(
  'const markdown = /(?<!\\\\)\\*\\*/g;',
  '/node_modules/@lexical/markdown/index.js',
)

  assert.notEqual(emailAutolinkPatch, null, 'Dependency syntax plugin should patch email autolink lookbehind')
  assert.equal(
    emailAutolinkPatch.code.includes('?<='),
    false,
    'Dependency syntax plugin should remove unsupported positive lookbehind',
  )
  assert.notEqual(lexicalPatch, null, 'Dependency syntax plugin should patch Lexical lookbehind')
  assert.equal(
    lexicalPatch.code.includes('?<!'),
    false,
    'Dependency syntax plugin should remove unsupported negative lookbehind',
  )

  console.log(`css-compat (${mode}): ok`)
} finally {
  await loadedModules.close()
}
