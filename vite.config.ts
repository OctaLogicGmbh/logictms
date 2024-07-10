import path from 'path';
import { defineConfig } from 'vite';

import devServer from '@hono/vite-dev-server';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    port: 8080,
  },
  build: {
    outDir: 'dist',
  },
  plugins: [
    react(),
    devServer({
      entry: 'src/server.ts',
      exclude: [
        /.*\.tsx?($|\?)/,
        /.*\.(s?css|pcss)($|\?)/,
        /.*\.(svg|png|jpe?g)($|\?)/,
        /^\/@.+$/,
        /^\/favicon\.ico$/,
        /^\/(public|assets|static)\/.+/,
        /^\/node_modules\/.*/,
      ],
      injectClientScript: false,
    }),
  ],
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
});
