import path from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const packageEntry = path.resolve(dirname, 'src/index.ts');
const appShellEntry = path.resolve(dirname, 'src/app-shell.ts');
const codeEntry = path.resolve(dirname, 'src/code.ts');
const stylesEntry = path.resolve(dirname, 'src/styles.css');

const externalPackages = [
  'react',
  'react-dom',
  'class-variance-authority',
  'clsx',
  'lucide-react',
  'prism-react-renderer',
  'tailwind-merge',
];

function isExternal(id: string) {
  return (
    externalPackages.includes(id) ||
    id.startsWith('@radix-ui/') ||
    id.startsWith('react/') ||
    id.startsWith('react-dom/')
  );
}

export default defineConfig({
  plugins: [react()],
  oxc: {
    jsx: {
      development: false,
    },
  },
  build: {
    copyPublicDir: false,
    cssCodeSplit: true,
    lib: {
      entry: {
        index: packageEntry,
        'app-shell': appShellEntry,
        code: codeEntry,
        styles: stylesEntry,
      },
      formats: ['es'],
      cssFileName: 'styles',
    },
    rollupOptions: {
      external: isExternal,
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].js',
        chunkFileNames: 'chunks/[name]-[hash].js',
        assetFileNames: '[name][extname]',
      },
    },
    sourcemap: false,
  },
});
