// .storybook/vite-sb.config.ts
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
// Intentionally NOT including the React Router plugin

export default defineConfig({
  plugins: [
    // No reactRouter() plugin here
    tsconfigPaths(),
    svgr(),
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