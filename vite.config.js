import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/RisingSun.js',
      name: 'RisingSun',
      fileName: 'rising-sun',
      formats: ['es'],
    },
    rollupOptions: {
      external: [],
    },
  },
});
