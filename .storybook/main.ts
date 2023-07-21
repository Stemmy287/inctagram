import type { StorybookConfig } from '@storybook/nextjs';
const config: StorybookConfig = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions', '@storybook/addon-actions', '@storybook/addon-backgrounds', '@storybook/addon-mdx-gfm'],
  framework: {
    name: '@storybook/nextjs',
    options: {}
  },
  features: {
    storyStoreV7: true
  },
  docs: {
    autodocs: true
  }
};
export default config;