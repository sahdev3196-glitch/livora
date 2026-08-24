import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { app } from './server/index.js';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'express-api-server',
      configureServer(server) {
        server.middlewares.use(app);
      }
    }
  ],
  base: '/',
  build: {
    target: 'esnext',
    minify: 'esbuild',
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('firebase')) {
              return 'vendor-firebase';
            }
            if (id.includes('lucide-react')) {
              return 'vendor-icons';
            }
            if (id.includes('react-router-dom') || id.includes('react-router') || id.includes('react-dom') || id.includes('react')) {
              return 'vendor-react';
            }
            return 'vendor-misc';
          }
          if (id.includes('data/wallpapers.js')) {
            return 'catalog-data';
          }
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
  server: {
    port: 5173
  }
});
