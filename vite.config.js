import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        unitHub: path.resolve(__dirname, 'elements-and-compounds/index.html'),
        lesson1: path.resolve(__dirname, 'elements-and-compounds/lesson-1.html'),
        lesson2: path.resolve(__dirname, 'elements-and-compounds/lesson-2.html'),
        lesson3: path.resolve(__dirname, 'elements-and-compounds/lesson-3.html'),
        lesson4: path.resolve(__dirname, 'elements-and-compounds/lesson-4.html'),
        lesson5: path.resolve(__dirname, 'elements-and-compounds/lesson-5.html'),
        lesson6: path.resolve(__dirname, 'elements-and-compounds/lesson-6.html'),
        lesson7: path.resolve(__dirname, 'elements-and-compounds/lesson-7.html'),
      },
    },
  },
  server: {
    hmr: process.env.DISABLE_HMR !== 'true',
    watch: process.env.DISABLE_HMR === 'true' ? null : {},
  },
});
