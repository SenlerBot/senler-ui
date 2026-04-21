import path from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const externalPackages = [
  'react',
  'react-dom',
  'react/jsx-runtime',
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
    id.startsWith('react-dom/')
  );
}

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(dirname, './src'),
    },
  },
  build: {
    copyPublicDir: false,
    cssCodeSplit: true,
    lib: {
      entry: path.resolve(dirname, 'src/index.ts'),
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
    sourcemap: true,
  },
});
