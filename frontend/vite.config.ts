import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import devtools from 'solid-devtools/vite';

export default defineConfig({
  plugins: [
    solidPlugin(),
    devtools({
      autoname: true,
    }),
  ],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8040',
        changeOrigin: true,
        ws: true,
        secure: false,
        cookieDomainRewrite: '127.0.0.1',
      },
    },
  },
  build: {
    target: 'esnext',
  },
});
