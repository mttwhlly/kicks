// import { defineConfig } from 'vite';
// import { reactRouter } from '@react-router/dev/vite';
// import tailwindcss from '@tailwindcss/vite';
// import tsconfigPaths from 'vite-tsconfig-paths';
// import svgr from 'vite-plugin-svgr';

// export default defineConfig({
//   plugins: [reactRouter(), tailwindcss(), tsconfigPaths(), svgr()],
//   ssr: {
//     noExternal: ['@mui/icons-material'],
//   },
//   optimizeDeps: {
//     include: ['@mui/icons-material'],
//   },
// });

import { defineConfig } from 'vite';
import { reactRouter } from '@react-router/dev/vite';

export default defineConfig({
  plugins: [reactRouter()],
});
