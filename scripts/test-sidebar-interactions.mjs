import assert from 'node:assert/strict'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import React, { act } from 'react'
import { createRoot } from 'react-dom/client'
import { JSDOM } from 'jsdom'
import { createServer } from 'vite'

const rootDirectory = resolve(dirname(fileURLToPath(import.meta.url)), '..')

async function loadUi(mode) {
  if (mode === 'dist') {
    const [root, appShell] = await Promise.all([
      import('../dist/index.js'),
      import('../dist/app-shell.js'),
    ])
    return {
      ui: { ...root, ...appShell },
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
    const [root, appShell] = await Promise.all([
      vite.ssrLoadModule('/src/index.ts'),
      vite.ssrLoadModule('/src/app-shell.ts'),
    ])
    return {
      ui: { ...root, ...appShell },
      close: () => vite.close(),
    }
  } catch (error) {
    await vite.close()
    throw error
  }
}

function installDom() {
  const dom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>', {
    url: 'https://ui.senler.io/',
  })
  const previousGlobals = new Map()
  const globals = {
    window: dom.window,
    document: dom.window.document,
    navigator: dom.window.navigator,
    Node: dom.window.Node,
    Element: dom.window.Element,
    HTMLElement: dom.window.HTMLElement,
    Event: dom.window.Event,
    MouseEvent: dom.window.MouseEvent,
    CustomEvent: dom.window.CustomEvent,
    MutationObserver: dom.window.MutationObserver,
    getComputedStyle: dom.window.getComputedStyle.bind(dom.window),
    requestAnimationFrame: (callback) => setTimeout(callback, 0),
    cancelAnimationFrame: (timer) => clearTimeout(timer),
    ResizeObserver: class ResizeObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    },
  }

  for (const [name, value] of Object.entries(globals)) {
    previousGlobals.set(name, Object.getOwnPropertyDescriptor(globalThis, name))
    Object.defineProperty(globalThis, name, {
      configurable: true,
      writable: true,
      value,
    })
  }
  previousGlobals.set('IS_REACT_ACT_ENVIRONMENT', Object.getOwnPropertyDescriptor(globalThis, 'IS_REACT_ACT_ENVIRONMENT'))
  globalThis.IS_REACT_ACT_ENVIRONMENT = true
  dom.window.matchMedia = () => ({
    matches: false,
    media: '(max-width: 767.98px)',
    onchange: null,
    addEventListener() {},
    removeEventListener() {},
    addListener() {},
    removeListener() {},
    dispatchEvent: () => false,
  })

  return () => {
    dom.window.close()
    for (const [name, descriptor] of previousGlobals.entries()) {
      if (descriptor) {
        Object.defineProperty(globalThis, name, descriptor)
      } else {
        delete globalThis[name]
      }
    }
  }
}

function renderLink({ item: _item, breadcrumb: _breadcrumb, children, ...props }) {
  return React.createElement('a', props, children)
}

function click(element) {
  element.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }))
}

function createNavigation(onExpandedChange) {
  return [{
    id: 'main',
    items: [{
      id: 'tools',
      label: 'Tools',
      onExpandedChange,
      items: [{ id: 'storage', label: 'Storage', href: '/storage' }],
    }],
  }]
}

const selectedModes = [
  process.argv.includes('--source') ? 'source' : null,
  process.argv.includes('--dist') ? 'dist' : null,
].filter(Boolean)

if (selectedModes.length !== 1) {
  throw new Error('Pass exactly one mode: --source or --dist')
}

const mode = selectedModes[0]
const restoreDom = installDom()
const loaded = await loadUi(mode)
const container = document.querySelector('#root')
const root = createRoot(container)

try {
  let navigateCount = 0
  await act(async () => {
    root.render(React.createElement(loaded.ui.AppSidebar, {
      navigation: createNavigation(),
      currentPath: '/unrelated',
      renderLink,
      brand: 'Senler',
      onNavigate: () => { navigateCount += 1 },
    }))
  })

  const legacyTrigger = [...container.querySelectorAll('button')]
    .find((button) => button.textContent.includes('Tools'))
  assert.ok(legacyTrigger, 'Legacy disclosure trigger must render')
  assert.equal(container.textContent.includes('Storage'), false)
  await act(async () => click(legacyTrigger))
  assert.equal(navigateCount, 1, 'Legacy parent click must preserve onNavigate')
  assert.equal(container.textContent.includes('Storage'), false, 'Legacy parent click must not add local disclosure state')

  let expandedValue = null
  navigateCount = 0
  await act(async () => {
    root.render(React.createElement(loaded.ui.AppSidebar, {
      navigation: createNavigation((expanded) => { expandedValue = expanded }),
      currentPath: '/unrelated',
      renderLink,
      brand: 'Senler',
      disclosureBehavior: 'interactive',
      showDisclosureIcons: true,
      onNavigate: () => { navigateCount += 1 },
    }))
  })
  const interactiveTrigger = [...container.querySelectorAll('button')]
    .find((button) => button.textContent.includes('Tools'))
  await act(async () => click(interactiveTrigger))
  assert.equal(expandedValue, true)
  assert.equal(navigateCount, 0, 'Interactive disclosure must not report navigation')
  assert.equal(container.textContent.includes('Storage'), true)
  assert.equal(interactiveTrigger.getAttribute('aria-expanded'), 'true')

  let mobileStateChange = null
  const renderShell = (currentPath) => React.createElement(
    loaded.ui.AppShell,
    {
      navigation: [],
      currentPath,
      renderLink,
      brand: 'Senler',
      mobileSidebarOpen: false,
      onMobileSidebarOpenChange: (open) => { mobileStateChange = open },
      renderHeader: ({ openMobileSidebar }) => React.createElement(
        'button',
        { type: 'button', onClick: openMobileSidebar },
        'Open navigation',
      ),
    },
    React.createElement('div', null, 'Content'),
  )
  await act(async () => root.render(renderShell('/first')))
  assert.equal(mobileStateChange, null, 'Initial render must not emit a close event')
  await act(async () => click(container.querySelector('button')))
  assert.equal(mobileStateChange, true, 'Custom header control must request mobile open')
  mobileStateChange = null
  await act(async () => root.render(renderShell('/second')))
  assert.equal(mobileStateChange, false, 'Route change must request mobile close')

  await act(async () => {
    root.render(React.createElement(
      loaded.ui.SidebarProvider,
      { defaultOpen: false, isMobile: false, persistenceCookie: false },
      React.createElement(
        loaded.ui.Sidebar,
        { collapsible: 'icon' },
        React.createElement(loaded.ui.SidebarTrigger, null),
      ),
    ))
  })
  assert.equal(container.querySelector('[data-slot="sidebar"]').getAttribute('data-state'), 'collapsed')
  await act(async () => click(container.querySelector('[data-slot="sidebar-trigger"]')))
  assert.equal(container.querySelector('[data-slot="sidebar"]').getAttribute('data-state'), 'expanded')

  await act(async () => {
    root.render(React.createElement(
      loaded.ui.SelectionActionBar,
      {
        selectedCount: 2,
        selectedCountLabel: '2 selected',
        selectAllChecked: true,
        selectAllLabel: 'Select all',
        clearLabel: 'Clear',
        onSelectAllChange() {},
        onClear() {},
        placement: 'viewport-bottom',
      },
      React.createElement('div', { 'data-testid': 'rows' }, 'Rows remain visible'),
    ))
  })
  assert.ok(container.querySelector('[data-testid="rows"]'), 'Viewport placement must keep children mounted')
  const fixedToolbar = container.querySelector('.fixed')
  assert.ok(fixedToolbar, 'Selection toolbar must render after measurement')
  assert.equal(fixedToolbar.style.bottom, 'calc(1rem + var(--app-safe-area-bottom, 0px))')

  console.log(`sidebar interactions (${mode}): ok`)
} finally {
  await act(async () => root.unmount())
  await loaded.close()
  restoreDom()
}
