import assert from 'node:assert/strict'
import {
  applyCssCompatibilityToBundle,
  transformCssForBrowserCompatibility,
} from '../dist/vite-css-compat.js'
import { createDependencySyntaxCompatibilityPlugin } from '../dist/vite-browser-compat.js'

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

console.log('css-compat: ok')
