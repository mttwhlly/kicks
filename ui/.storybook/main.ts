// .storybook/main.ts
import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../app/**/*.mdx', '../app/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    // Add your other addons here
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {
      builder: {
        viteConfigPath: '.storybook/vite-sb.config.ts' // Point to our Storybook-specific Vite config
      }
    }
  },
  viteFinal: async (config) => {
    // Make sure React Router plugin is not included
    if (config.plugins) {
    //   config.plugins = config.plugins.filter(plugin => {
    //     const pluginName = plugin && typeof plugin === 'object' ? plugin.name : '';
    //     return !pluginName.includes('react-router');
    //   });
    console.log(config.plugins);
    }
    return config;
  }
};

export default config;