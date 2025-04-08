import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['some-unnecessary-package'],
  },
  assetsInclude: ['**/*.mp3', '**/*.MP3', '**/*.mp4'],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@config': path.resolve(__dirname, 'config'),
      '@types': path.resolve(__dirname, 'types'),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          'primary-color': '#1DA57A', // 修改主题颜色
        },
        javascriptEnabled: true,
      },
    },
  },
});
