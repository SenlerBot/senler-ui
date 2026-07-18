import { createHash } from 'node:crypto'
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDirectory = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const stateFile = join(rootDirectory, 'dist', '.source-hash')
const sourceEntries = [
  'package.json',
  'postcss.config.js',
  'scripts/copy-css.mjs',
  'src',
  'tsconfig.json',
  'tsconfig.build.json',
  'vite.config.ts',
]

function findPackageLock() {
  let currentDirectory = rootDirectory

  while (true) {
    const candidate = join(currentDirectory, 'package-lock.json')
    if (existsSync(candidate)) {
      return candidate
    }

    const parentDirectory = dirname(currentDirectory)
    if (parentDirectory === currentDirectory) {
      throw new Error('Cannot find package-lock.json for the package artifact')
    }
    currentDirectory = parentDirectory
  }
}

function collectFiles(entryPath) {
  const absolutePath = join(rootDirectory, entryPath)

  if (!existsSync(absolutePath)) {
    throw new Error(`Package source entry is missing: ${entryPath}`)
  }

  if (!statSync(absolutePath).isDirectory()) {
    return [absolutePath]
  }

  return readdirSync(absolutePath, { withFileTypes: true })
    .sort((left, right) => left.name.localeCompare(right.name))
    .flatMap((entry) => collectFiles(join(entryPath, entry.name)))
}

function calculateSourceHash() {
  const hash = createHash('sha256')

  for (const filePath of [...sourceEntries.flatMap(collectFiles), findPackageLock()]) {
    hash.update(relative(rootDirectory, filePath))
    hash.update('\0')
    hash.update(readFileSync(filePath))
    hash.update('\0')
  }

  return hash.digest('hex')
}

const writeState = process.argv.includes('--write')
const checkState = process.argv.includes('--check')

if (writeState === checkState) {
  throw new Error('Pass exactly one mode: --write or --check')
}

const sourceHash = calculateSourceHash()

if (writeState) {
  writeFileSync(stateFile, `${sourceHash}\n`, 'utf8')
  console.log(`Package source state written: ${sourceHash}`)
} else {
  if (!existsSync(stateFile)) {
    throw new Error('Package artifact is missing dist/.source-hash; run npm run build:artifact')
  }

  const artifactHash = readFileSync(stateFile, 'utf8').trim()
  if (artifactHash !== sourceHash) {
    throw new Error('Package artifact is stale; run npm run build:artifact before packing')
  }

  console.log(`Package source state verified: ${sourceHash}`)
}
