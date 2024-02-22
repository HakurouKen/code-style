import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  dts: true,
  format: ['cjs', 'esm'],
  esbuildOptions(esbuildOptions) {
    esbuildOptions.logOverride = {
      ...esbuildOptions.logOverride,
      'empty-import-meta': 'silent'
    };
  },
  clean: true
});
