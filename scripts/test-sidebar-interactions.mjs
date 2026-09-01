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
    KeyboardEvent: dom.window.KeyboardEvent,
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

function renderLink({ item: _item, breadcrumb: _breadcrumb, children, onClick, ...props }) {
  return React.createElement('a', {
    ...props,
    onClick(event) {
      event.preventDefault()
      onClick?.(event)
    },
  }, children)
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

  const selectTrigger = [...container.querySelectorAll('button')]
    .find((button) => button.textContent.includes('Tools'))
  assert.ok(selectTrigger, 'Select-mode parent control must render')
  assert.equal(selectTrigger.hasAttribute('aria-expanded'), false, 'A non-disclosure control must not expose aria-expanded')
  assert.equal(container.textContent.includes('Storage'), false)
  await act(async () => click(selectTrigger))
  assert.equal(navigateCount, 1, 'Select-mode parent click must report navigation')
  assert.equal(container.textContent.includes('Storage'), false, 'Select mode must not add local disclosure state')

  let expandedValue = null
  navigateCount = 0
  await act(async () => {
    root.render(React.createElement(loaded.ui.AppSidebar, {
      navigation: createNavigation((expanded) => { expandedValue = expanded }),
      currentPath: '/unrelated',
      renderLink,
      brand: 'Senler',
      groupTriggerBehavior: 'toggle',
      onNavigate: () => { navigateCount += 1 },
    }))
  })
  const toggleTrigger = [...container.querySelectorAll('button')]
    .find((button) => button.textContent.includes('Tools'))
  await act(async () => click(toggleTrigger))
  assert.equal(expandedValue, true)
  assert.equal(navigateCount, 0, 'A disclosure toggle must not report navigation')
  assert.equal(container.textContent.includes('Storage'), true)
  assert.equal(toggleTrigger.getAttribute('aria-expanded'), 'true')

  await act(async () => {
    root.render(React.createElement(loaded.ui.AppSidebar, {
      navigation: createNavigation((expanded) => { expandedValue = expanded }),
      currentPath: '/storage',
      renderLink,
      brand: 'Senler',
      groupTriggerBehavior: 'toggle',
    }))
  })
  const activeToggle = [...container.querySelectorAll('button')]
    .find((button) => button.textContent.includes('Tools'))
  await act(async () => click(activeToggle))
  assert.equal(expandedValue, false)
  assert.equal(activeToggle.getAttribute('aria-expanded'), 'false')
  assert.equal(container.textContent.includes('Storage'), false, 'An active group must remain collapsible')

  await act(async () => {
    root.render(React.createElement(loaded.ui.AppSidebar, {
      navigation: createNavigation(),
      currentPath: '/storage/details',
      renderLink,
      brand: 'Senler',
      groupTriggerBehavior: 'toggle',
    }))
  })
  assert.equal(
    container.textContent.includes('Storage'),
    true,
    'Navigation to another active child route must reveal the current item',
  )

  navigateCount = 0
  const linkedGroupNavigation = [{
    id: 'main',
    items: [{
      id: 'tools-link',
      label: 'Linked tools',
      href: '/tools',
      items: [{ id: 'linked-storage', label: 'Linked storage', href: '/tools/storage' }],
    }],
  }]
  await act(async () => {
    root.render(React.createElement(loaded.ui.AppSidebar, {
      navigation: linkedGroupNavigation,
      currentPath: '/unrelated',
      renderLink,
      brand: 'Senler',
      groupTriggerBehavior: 'toggle',
      onNavigate: () => { navigateCount += 1 },
      labels: {
        expandNavigationGroup: 'Развернуть раздел',
        collapseNavigationGroup: 'Свернуть раздел',
      },
    }))
  })
  const linkedControl = container.querySelector('a[href="/tools"]')
  const linkedDisclosure = container.querySelector('[data-slot="app-sidebar-disclosure"]')
  assert.ok(linkedControl)
  assert.ok(linkedDisclosure)
  assert.equal(linkedControl.hasAttribute('aria-expanded'), false, 'Navigation links must not masquerade as disclosure controls')
  assert.match(linkedDisclosure.getAttribute('aria-label'), /^Развернуть раздел:/u)
  await act(async () => click(linkedDisclosure))
  assert.equal(navigateCount, 0)
  assert.equal(container.textContent.includes('Linked storage'), true)
  await act(async () => click(linkedControl))
  assert.equal(navigateCount, 1, 'The link and disclosure controls must remain independent')

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
      {
        defaultOpen: false,
        isMobile: false,
        keyboardShortcut: 'b',
        labels: { toggle: 'Показать меню' },
      },
      React.createElement(
        loaded.ui.Sidebar,
        { collapsible: 'icon' },
        React.createElement(loaded.ui.SidebarTrigger, null),
        React.createElement(loaded.ui.SidebarGroupAction, null, 'Group action'),
        React.createElement(loaded.ui.SidebarMenuButton, null, 'Menu button'),
        React.createElement(loaded.ui.SidebarMenuAction, null, 'Menu action'),
        React.createElement(
          loaded.ui.SidebarMenuButton,
          { asChild: true },
          React.createElement('a', { href: '/child' }, 'Child link'),
        ),
      ),
    ))
  })
  assert.equal(container.querySelector('[data-slot="sidebar"]').getAttribute('data-state'), 'collapsed')
  const primitiveTrigger = container.querySelector('[data-slot="sidebar-trigger"]')
  assert.equal(primitiveTrigger.getAttribute('aria-label'), 'Показать меню')
  assert.equal(document.cookie.includes('sidebar_state='), false, 'Persistence must be opt-in')
  for (const selector of [
    '[data-slot="sidebar-trigger"]',
    '[data-slot="sidebar-group-action"]',
    '[data-slot="sidebar-menu-button"]:not(a)',
    '[data-slot="sidebar-menu-action"]',
  ]) {
    assert.equal(container.querySelector(selector).getAttribute('type'), 'button')
  }
  assert.equal(container.querySelector('a[data-slot="sidebar-menu-button"]').hasAttribute('type'), false)

  const shortcutInput = document.createElement('input')
  document.body.append(shortcutInput)
  await act(async () => {
    shortcutInput.dispatchEvent(new KeyboardEvent('keydown', {
      bubbles: true,
      cancelable: true,
      ctrlKey: true,
      key: 'b',
    }))
  })
  assert.equal(container.querySelector('[data-slot="sidebar"]').getAttribute('data-state'), 'collapsed', 'The shortcut must not hijack text input')
  await act(async () => {
    window.dispatchEvent(new KeyboardEvent('keydown', {
      cancelable: true,
      ctrlKey: true,
      key: 'b',
    }))
  })
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
