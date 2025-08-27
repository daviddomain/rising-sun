// vite.config.js
import { defineConfig } from 'vite';
import terser from '@rollup/plugin-terser';

export default defineConfig(({ mode }) => ({
  publicDir: mode === 'lib' ? false : 'public',
  build: mode === 'lib'
    ? {
        outDir: 'dist',
        lib: { entry: 'src/RisingSun.js', name: 'RisingSun' },
        rollupOptions: {
          output: [
            { format: 'es', entryFileNames: 'rising-sun.js' },
            {
              format: 'es',
              entryFileNames: 'rising-sun.min.js',
              plugins: [terser({ module: true, compress: { passes: 2 }, mangle: true })],
            },
          ],
        },
      }
    : { outDir: 'docs', minify: 'esbuild' },
}));
