import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { cpSync, existsSync, mkdtempSync, readFileSync, readdirSync, realpathSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const fixture = fileURLToPath(new URL('./fixtures/consumer/', import.meta.url));
const consumer = mkdtempSync(join(tmpdir(), 'senler-ui-consumer-'));
const playwrightCli = join(dirname(createRequire(import.meta.url).resolve('@playwright/test/package.json')), 'cli.js');

function run(command, args, cwd = consumer, capture = false, env = process.env) {
  const result = spawnSync(command, args, {
    cwd,
    encoding: 'utf8',
    stdio: capture ? ['ignore', 'pipe', 'inherit'] : 'inherit',
    timeout: 300_000,
    env,
  });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`${command} ${args.join(' ')} failed (${result.status})`);
  return result.stdout;
}

function checkStyles(directory) {
  const assets = join(consumer, directory, 'assets');
  const files = readdirSync(assets);
  const css = files.filter((name) => name.endsWith('.css'))
    .map((name) => readFileSync(join(assets, name), 'utf8')).join('\n');
  assert.ok(/\.bg-background\b/.test(css), 'Semantic background utility must be included');
  assert.ok(/--destructive-text\s*:/.test(css), 'Semantic error colors must be included');
  assert.ok(/\.dark\b/.test(css), 'Dark theme must be included');
  assert.ok(files.some((name) => name.endsWith('.woff2')), 'Inter font files must be bundled');
}

try {
  run(process.execPath, ['scripts/package-state.mjs', '--check'], root);
  cpSync(fixture, consumer, { recursive: true });
  const [packed] = JSON.parse(run('npm', [
    'pack', '--ignore-scripts', '--json', '--pack-destination', consumer,
  ], root, true));
  const manifestPath = join(consumer, 'package.json');
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
  manifest.dependencies['@senlerio/ui'] = `file:./${packed.filename}`;
  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

  // Install only the packed library and this standalone fixture. No workspace
  // aliases, source checkout dependencies, or prepack rebuild are involved.
  run('npm', ['install', '--include=optional', '--no-audit', '--fund=false']);
  const installed = join(consumer, 'node_modules/@senlerio/ui');
  assert.equal(realpathSync(installed), installed, 'Consumer must use the installed tarball');
  assert.equal(existsSync(join(installed, 'src')), false, 'Packed library must not expose its source tree');
  run('npm', ['run', 'type-check']);
  run('npm', ['run', 'build', '--', '--outDir', 'dist-tailwind']);
  checkStyles('dist-tailwind');

  writeFileSync(join(consumer, 'src/styles.css'), [
    '@import "@senlerio/ui/styles.css";',
    '@import "@senlerio/ui/themes/senler.css";',
    '',
  ].join('\n'));
  run('npm', ['run', 'build', '--', '--outDir', 'dist-standalone']);
  checkStyles('dist-standalone');
  run(process.execPath, [
    playwrightCli,
    'test', '--config', join(root, 'playwright.consumer.config.ts'),
  ], root, false, { ...process.env, SENLER_UI_CONSUMER_DIR: consumer });
  console.log('Packed Senler UI consumer: types, both CSS entrypoints, fonts and browser scenarios passed');
} finally {
  rmSync(consumer, { recursive: true, force: true });
}
