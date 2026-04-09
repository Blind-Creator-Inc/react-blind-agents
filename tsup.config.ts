import { defineConfig } from 'tsup';

export default defineConfig([
  // Plain React entry
  {
    entry: { index: 'src/index.ts' },
    format: ['esm', 'cjs'],
    dts: true,
    sourcemap: true,
    clean: true,
    external: ['react', 'react-dom'],
    esbuildOptions(opts) {
      opts.jsx = 'automatic';
    },
  },
  // Next.js subpath entry
  {
    entry: { next: 'src/next.ts' },
    format: ['esm', 'cjs'],
    dts: true,
    sourcemap: true,
    external: ['react', 'react-dom', 'next', 'next/script'],
    esbuildOptions(opts) {
      opts.jsx = 'automatic';
    },
  },
]);
