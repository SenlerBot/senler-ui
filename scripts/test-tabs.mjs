import assert from 'node:assert/strict'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { createServer } from 'vite'

const rootDirectory = resolve(dirname(fileURLToPath(import.meta.url)), '..')

async function loadTabs(mode) {
  if (mode === 'dist') {
    return {
      tabs: await import('../dist/atoms/tabs.js'),
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
      tabs: await vite.ssrLoadModule('/src/atoms/tabs.tsx'),
      close: () => vite.close(),
    }
  } catch (error) {
    await vite.close()
    throw error
  }
}

function renderTabs(tabs, variant, size) {
  return renderToStaticMarkup(
    React.createElement(
      tabs.TabsRoot,
      { defaultValue: 'embedded' },
      React.createElement(
        tabs.TabsList,
        { className: 'grid', size, variant },
        React.createElement(tabs.TabsTrigger, { value: 'popup' }, 'Popup'),
        React.createElement(tabs.TabsTrigger, { value: 'embedded' }, 'Embedded'),
      ),
    ),
  )
}

function getTriggerClassNames(markup) {
  const triggerTags = markup.match(/<button\b[^>]*data-slot="tabs-trigger"[^>]*>/g) ?? []

  return triggerTags.map((tag) => {
    const classAttribute = tag.match(/\sclass="([^"]*)"/)
    assert.ok(classAttribute, 'Every tabs trigger must render a class attribute')
    return classAttribute[1].split(' ')
  })
}

const selectedModes = [
  process.argv.includes('--source') ? 'source' : null,
  process.argv.includes('--dist') ? 'dist' : null,
].filter(Boolean)

if (selectedModes.length !== 1) {
  throw new Error('Pass exactly one mode: --source or --dist')
}

const mode = selectedModes[0]
const loaded = await loadTabs(mode)

try {
  const defaultTriggerHeights = {
    small: 'h-5',
    medium: 'h-6',
    large: 'h-8',
  }

  for (const [size, expectedHeightClass] of Object.entries(defaultTriggerHeights)) {
    const triggerClassNames = getTriggerClassNames(
      renderTabs(loaded.tabs, 'default', size),
    )

    assert.equal(triggerClassNames.length, 2, `Default ${size} tabs must render two triggers`)
    for (const classNames of triggerClassNames) {
      assert.equal(
        classNames.includes(expectedHeightClass),
        true,
        `Default ${size} triggers must fit inside the padded list`,
      )
      assert.equal(
        classNames.includes('h-full'),
        false,
        `Default ${size} triggers must not use percentage height in grid lists`,
      )
    }
  }

  const underlineTriggerClassNames = getTriggerClassNames(
    renderTabs(loaded.tabs, 'underline', 'medium'),
  )

  for (const classNames of underlineTriggerClassNames) {
    assert.equal(
      classNames.includes('h-full'),
      true,
      'Underline triggers must continue filling the list height',
    )
  }

  console.log(`tabs (${mode}): ok`)
} finally {
  await loaded.close()
}
