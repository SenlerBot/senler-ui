import assert from 'node:assert/strict'
import { applyCssCompatibilityToBundle } from '../dist/vite-css-compat.js'

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

console.log('css-compat: ok')
