import assert from 'node:assert/strict'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { createServer } from 'vite'

const rootDirectory = resolve(dirname(fileURLToPath(import.meta.url)), '..')

async function loadAppShell(mode) {
  if (mode === 'dist') {
    return {
      appShell: await import('../dist/app-shell.js'),
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
      appShell: await vite.ssrLoadModule('/src/app-shell.ts'),
      close: () => vite.close(),
    }
  } catch (error) {
    await vite.close()
    throw error
  }
}

function renderLink({ item: _item, breadcrumb: _breadcrumb, children, ...props }) {
  return React.createElement('a', props, children)
}

const navigation = [
  {
    id: 'main',
    label: 'Project',
    className: 'project-group',
    labelClassName: 'project-group-label',
    itemsClassName: 'project-group-items',
    attributes: { 'data-navigation-group': 'project' },
    items: [
      {
        id: 'agents',
        label: 'Agents',
        items: [
          {
            id: 'active-agents',
            label: 'Active agents',
            href: '/agents/active',
            attributes: { 'data-ai-context-id': 'cabinet.agents.active' },
          },
        ],
      },
      {
        id: 'dialogs',
        label: 'Dialogs',
        href: '/dialogs',
        badge: 12,
        badgeAppearance: 'plain',
        trailing: React.createElement('span', { 'data-testid': 'status' }, 'online'),
      },
    ],
  },
]

function renderSidebar(appShell, props = {}) {
  return renderToStaticMarkup(
    React.createElement(appShell.AppSidebar, {
      navigation,
      currentPath: '/agents/active',
      renderLink,
      brand: 'Senler',
      ...props,
    }),
  )
}

const selectedModes = [
  process.argv.includes('--source') ? 'source' : null,
  process.argv.includes('--dist') ? 'dist' : null,
].filter(Boolean)

if (selectedModes.length !== 1) {
  throw new Error('Pass exactly one mode: --source or --dist')
}

const mode = selectedModes[0]
const loaded = await loadAppShell(mode)

try {
  const standardMarkup = renderSidebar(loaded.appShell)
  assert.match(standardMarkup, /data-density="standard"/u)
  assert.match(standardMarkup, /\bw-64\b/u)
  assert.match(standardMarkup, /\bh-8\b/u)
  assert.doesNotMatch(standardMarkup, /rounded-\[10px\]/u)
  assert.match(standardMarkup, /Active agents/u)
  assert.match(standardMarkup, /data-ai-context-id="cabinet\.agents\.active"/u)

  const comfortableMarkup = renderSidebar(loaded.appShell, {
    density: 'comfortable',
    disclosureBehavior: 'interactive',
    width: '16.25rem',
    itemClassName: (_item, state) => `depth-${state.depth}`,
    headerClassName: 'cabinet-header',
    navigationClassName: 'cabinet-navigation',
    footerClassName: 'cabinet-footer',
    footer: React.createElement('span', null, 'Limits'),
  })
  assert.match(comfortableMarkup, /data-density="comfortable"/u)
  assert.match(comfortableMarkup, /--app-sidebar-width:16\.25rem/u)
  assert.match(comfortableMarkup, /rounded-\[10px\]/u)
  assert.match(comfortableMarkup, /\bh-9\b/u)
  assert.match(comfortableMarkup, /\bdepth-0\b/u)
  assert.match(comfortableMarkup, /\bdepth-1\b/u)
  assert.match(comfortableMarkup, /cabinet-header/u)
  assert.match(comfortableMarkup, /cabinet-navigation/u)
  assert.match(comfortableMarkup, /cabinet-footer/u)
  assert.match(comfortableMarkup, /project-group/u)
  assert.match(comfortableMarkup, /project-group-label/u)
  assert.match(comfortableMarkup, /project-group-items/u)
  assert.match(comfortableMarkup, /data-navigation-group="project"/u)
  assert.match(comfortableMarkup, /aria-expanded="true"/u)
  assert.match(comfortableMarkup, />12</u)
  assert.match(comfortableMarkup, /data-testid="status"/u)

  const shellMarkup = renderToStaticMarkup(
    React.createElement(
      loaded.appShell.AppShell,
      {
        navigation,
        currentPath: '/agents/active',
        renderLink,
        brand: 'Senler',
        mobileSidebarOpen: true,
        sidebarDensity: 'comfortable',
        sidebarMobileWidth: '16.25rem',
        renderHeader: ({ mobileSidebarOpen }) => React.createElement(
          'header',
          { 'data-mobile-sidebar-open': mobileSidebarOpen },
          'Custom header',
        ),
      },
      React.createElement('div', null, 'Content'),
    ),
  )
  assert.match(shellMarkup, /data-mobile-sidebar-open="true"/u)
  assert.match(shellMarkup, /Custom header/u)
  assert.match(shellMarkup, /Content/u)

  const primitiveMarkup = renderToStaticMarkup(
    React.createElement(
      loaded.appShell.SidebarProvider,
      {
        defaultOpen: false,
        isMobile: false,
        width: '16.25rem',
        mobileWidth: '16.25rem',
        iconWidth: '3rem',
      },
      React.createElement(
        loaded.appShell.Sidebar,
        { collapsible: 'icon' },
        React.createElement(loaded.appShell.SidebarHeader, null, 'Header'),
        React.createElement(
          loaded.appShell.SidebarContent,
          null,
          React.createElement(
            loaded.appShell.SidebarMenu,
            null,
            React.createElement(
              loaded.appShell.SidebarMenuItem,
              null,
              React.createElement(
                loaded.appShell.SidebarMenuButton,
                { isActive: true },
                'Agents',
              ),
            ),
          ),
        ),
      ),
      React.createElement(loaded.appShell.SidebarInset, null, 'Main'),
    ),
  )
  assert.match(primitiveMarkup, /--sidebar-width:16\.25rem/u)
  assert.match(primitiveMarkup, /--sidebar-width-mobile:16\.25rem/u)
  assert.match(primitiveMarkup, /data-state="collapsed"/u)
  assert.match(primitiveMarkup, /data-collapsible="icon"/u)
  assert.match(primitiveMarkup, /data-slot="sidebar-menu-button"/u)
  assert.match(primitiveMarkup, /data-active="true"/u)
  assert.match(primitiveMarkup, /data-slot="sidebar-inset"/u)

  console.log(`app shell (${mode}): ok`)
} finally {
  await loaded.close()
}
