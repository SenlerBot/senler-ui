import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { compile } from '@tailwindcss/node'
import postcss from 'postcss'
import { createServer } from 'vite'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const mode = process.argv.includes('--dist') ? 'dist' : 'source'
const directory = mode === 'dist' ? 'dist' : 'src'
const vite = mode === 'source' ? await createServer({
  root, configFile: false, appType: 'custom', logLevel: 'silent',
  server: { middlewareMode: true },
}) : null

try {
  const { buttonVariantClasses } = vite
    ? await vite.ssrLoadModule('/src/atoms/button.tsx')
    : await import('../dist/atoms/button.js')
  const { badgeVariantClasses } = vite
    ? await vite.ssrLoadModule('/src/atoms/badge.tsx')
    : await import('../dist/atoms/badge.js')
  const classes = [
    ...buttonVariantClasses.destructive.split(' '),
    ...badgeVariantClasses.destructive.split(' '),
    'bg-destructive/10', 'text-destructive/90', 'border-destructive/30',
    'aria-invalid:border-destructive',
  ]

  for (const themed of [false, true]) {
    const compiler = await compile([
      '@import "tailwindcss";',
      `@import "./${directory}/tailwind.css";`,
      ...(themed ? [`@import "./${directory}/themes/senler.css";`] : []),
    ].join('\n'), { base: root, onDependency() {} })
    const css = postcss.parse(compiler.build(classes))
    const rules = []
    css.walkRules(rule => rules.push(rule))
    const backgrounds = rules.filter(rule => rule.selector === '.dark')
    const background = backgrounds.flatMap(rule => rule.nodes)
      .filter(node => node.type === 'decl' && node.prop === '--background').at(-1)
    assert.equal(background?.value, themed
      ? 'hsl(215 27.907% 16.863%)'
      : 'hsl(222.2 84% 4.9%)', 'The product palette must remain opt-in')

    for (const className of ['.bg-destructive', '.bg-destructive\\/10']) {
      const matching = rules.filter(rule => rule.selector.startsWith(className)
        && [undefined, ':'].includes(rule.selector[className.length]))
      assert.ok(matching.length > 0, `Missing ${className}`)
      for (const rule of matching) {
        assert.ok(!rule.selector.includes(':hover'), `${className} must not add hover behavior`)
      }
    }

    for (const [selector, property, variable] of [
      ['.text-destructive\\/90', 'color', '--destructive-text'],
      ['.border-destructive\\/30', 'border-color', '--destructive-border'],
      ['.aria-invalid\\:border-destructive', 'border-color', '--destructive-border'],
    ]) {
      const declarations = []
      for (const rule of rules.filter(rule => rule.selector.startsWith(selector))) {
        rule.walkDecls(property, declaration => declarations.push(declaration.value))
      }
      assert.ok(declarations.some(value => value.includes(`var(${variable})`)),
        `${selector} must use ${variable}, including state and opacity variants`)
    }

    for (const componentClasses of [buttonVariantClasses.destructive, badgeVariantClasses.destructive]) {
      assert.match(componentClasses, /(?:^|\s)hover:bg-destructive-hover\//)
    }
    assert.ok(rules.some(rule => rule.selector.includes('dark\\:hover\\:bg-destructive-hover')
      && rule.selector.includes(':hover')), 'The destructive button must retain its explicit dark hover')
  }

  if (mode === 'dist') {
    const standalone = readFileSync(resolve(root, 'dist/styles.css'), 'utf8')
    assert.match(standalone, /--destructive-text/)
    assert.match(standalone, /hover\\:bg-destructive-hover/)
    assert.doesNotMatch(standalone, /\.bg-destructive(?:\\\/10)?(?::[^{}]*)?:hover/)
  }
  console.log(`theme (${mode}): opt-in palette, static surfaces, explicit hover and semantic errors: ok`)
} finally {
  await vite?.close()
}
