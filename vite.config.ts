import { defineConfig } from 'vite';
import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
import { resolve } from 'path';

export default defineConfig({
  plugins: [reactRouter(), tailwindcss(), tsconfigPaths(), svgr()],
  resolve: {
    alias: {
      '~': resolve(__dirname, './src')
    }
  },
  ssr: {
    noExternal: ['@mui/icons-material'],
  },
  optimizeDeps: {
    include: ['@mui/icons-material'],
  },
});
