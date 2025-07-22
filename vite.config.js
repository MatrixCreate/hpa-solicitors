import { defineConfig } from 'vite';
import path from 'path';
import tailwindcss from "@tailwindcss/vite";


export default defineConfig(({ command }) => ({
  base: command === 'serve' ? '' : '/dist/',
  build: {
    manifest: true,
    outDir: './web/dist/',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        app: './assets/js/app.js',
        // css: './assets/css/app.css',
      }
    }
  },
  server: {
    allowedHosts: true,
    cors: {
      origin: /https?:\/\/([A-Za-z0-9\-\.]+)?(localhost|\.local|\.test|\.site)(?::\d+)?$/
    },
    fs: {
      strict: false
    },
    headers: {
      "Access-Control-Allow-Private-Network": "true",
    },
    host: '0.0.0.0',
    origin: 'http://localhost:3001',
    port: 3001,
    strictPort: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './assets'),
    }
  },
  plugins: [tailwindcss()],

})); 