import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import viteConfig from '../vite.config';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
    '@storybook/experimental-addon-test'
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  viteFinal: (config) => {
    return mergeConfig(config, viteConfig);
  },
};

export default config;