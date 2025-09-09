// vite.config.js
import { defineConfig } from 'vite';
import terser from '@rollup/plugin-terser';

export default defineConfig(({ mode }) => {
  const isLib = mode === 'lib';
  const isSite = mode === 'site'; // npm run build -m site

  return {
    // nur für die Docs-Seite: relative Pfade statt /assets/...
    base: isSite ? './' : undefined,

    publicDir: isLib ? false : 'public',

    build: isLib
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
      : {
          outDir: 'docs',
          minify: 'esbuild',
          // Falls du manuell Dateien in docs/ hast (Bilder etc.), nicht löschen:
          emptyOutDir: false,
        },
  };
});
