import { defineConfig } from 'vite';
import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import fs from 'fs';

export default defineConfig({
  plugins: [reactRouter(), tailwindcss(), tsconfigPaths()],
});
