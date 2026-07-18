import assert from 'node:assert/strict'
import { existsSync, readFileSync, statSync } from 'node:fs'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

const packageJson = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'))

function assertExportTarget(target, exportName) {
  if (target.includes('*')) {
    const directory = new URL(target.slice(0, target.indexOf('*')), new URL('../', import.meta.url))
    assert.equal(existsSync(directory), true, `${exportName} export directory is missing`)
    return
  }

  const targetUrl = new URL(target, new URL('../', import.meta.url))
  assert.equal(existsSync(targetUrl), true, `${exportName} target is missing: ${target}`)
  assert.equal(statSync(targetUrl).size > 0, true, `${exportName} target is empty: ${target}`)
}

for (const [exportName, exportValue] of Object.entries(packageJson.exports)) {
  if (typeof exportValue === 'string') {
    assertExportTarget(exportValue, exportName)
    continue
  }

  for (const target of Object.values(exportValue)) {
    assertExportTarget(target, exportName)
  }
}

const ui = await import('../dist/index.js')
assert.ok(ui.Button, 'Button must be exported from the package root')
assert.ok(ui.Input, 'Input must be exported from the package root')

const buttonHtml = renderToStaticMarkup(createElement(ui.Button, null, 'Save'))
assert.match(buttonHtml, /^<button/u)
assert.match(buttonHtml, />Save<\/button>$/u)

console.log('package exports and component smoke: ok')
