// .storybook/vite-sb.config.ts
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
// Import the official Tailwind CSS Vite plugin
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    // No reactRouter() plugin here
    tsconfigPaths(),
    svgr(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '~': '/app',
    },
  },
  ssr: {
    noExternal: ['@mui/icons-material'],
  },
  optimizeDeps: {
    include: ['@mui/icons-material', 'react-leaflet'],
  },
});