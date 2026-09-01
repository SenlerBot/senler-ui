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
const appShell = await import('../dist/app-shell.js')
const bridge = await import('../dist/bridge.js')
assert.ok(ui.Button, 'Button must be exported from the package root')
assert.ok(ui.Input, 'Input must be exported from the package root')
assert.equal(typeof appShell.AppShell, 'function')
assert.equal(typeof appShell.AppSidebar, 'function')
assert.equal(typeof appShell.SidebarProvider, 'function')
assert.equal(typeof appShell.Sidebar, 'function')
assert.equal(typeof bridge.createSenlerBridgeClient, 'function')
assert.equal(typeof bridge.createSenlerBridgeHost, 'function')
assert.deepEqual(
  bridge.resolveSenlerBridgeBootstrapUi('?senler_theme=dark&senler_language=en', 'ru', false),
  { language: 'en', theme: 'dark' },
)
assert.deepEqual(
  bridge.resolveSenlerBridgeBootstrapContext(
    '?senler_context_version=2&senler_mode=tool_configurator&senler_theme=dark&senler_language=en',
    'ru',
    false,
  ),
  {
    context_version: '2',
    mode: 'tool_configurator',
    ui: { language: 'en', theme: 'dark' },
  },
)

const buttonHtml = renderToStaticMarkup(createElement(ui.Button, null, 'Save'))
assert.match(buttonHtml, /^<button/u)
assert.match(buttonHtml, />Save<\/button>$/u)

const appShellTypes = readFileSync(new URL('../dist/layout/app-shell.d.ts', import.meta.url), 'utf8')
assert.match(appShellTypes, /density\?: AppSidebarDensity/u)
assert.match(appShellTypes, /mobileSidebarOpen\?: boolean/u)
assert.match(appShellTypes, /onExpandedChange\?: \(expanded: boolean\) => void/u)
assert.match(appShellTypes, /groupTriggerBehavior\?: AppSidebarGroupTriggerBehavior/u)
assert.doesNotMatch(appShellTypes, /AppSidebarDisclosureBehavior/u)

for (const entry of ['../dist/app-shell.js', '../dist/layout/app-shell.js', '../dist/layout/sidebar.js']) {
  const source = readFileSync(new URL(entry, import.meta.url), 'utf8')
  assert.match(source, /^['"]use client['"];?/u, `${entry} must preserve its React Server Components boundary`)
}

const sidebarTypes = readFileSync(new URL('../dist/layout/sidebar.d.ts', import.meta.url), 'utf8')
assert.match(sidebarTypes, /declare function SidebarProvider/u)
assert.match(sidebarTypes, /collapsible\?: 'offcanvas' \| 'icon' \| 'none'/u)
assert.match(sidebarTypes, /desktopPosition\?: 'viewport' \| 'container'/u)
assert.match(sidebarTypes, /labels\?: SidebarLabels/u)
assert.doesNotMatch(sidebarTypes, /mobileForceMount/u)

const sheetTypes = readFileSync(new URL('../dist/atoms/sheet.d.ts', import.meta.url), 'utf8')
assert.match(
  sheetTypes,
  /Omit<React\.ComponentProps<typeof SheetPrimitive\.Content>, 'forceMount'>/u,
)
assert.doesNotMatch(sheetTypes, /forceMount\?:/u)

const selectionActionBarTypes = readFileSync(
  new URL('../dist/compound/selection-action-bar.d.ts', import.meta.url),
  'utf8',
)
assert.match(selectionActionBarTypes, /placement\?: 'anchor' \| 'viewport-bottom'/u)

console.log('package exports and component smoke: ok')
