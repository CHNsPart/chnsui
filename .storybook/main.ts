import type { StorybookConfig } from "@storybook/react-webpack5";
import type { RuleSetRule, Configuration } from 'webpack';

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  docs: {
    autodocs: true,
  },
  webpackFinal: async (config: Configuration) => {
    // Initialize module.rules if it doesn't exist
    if (!config.module) {
      config.module = { rules: [] };
    }
    
    const rules = config.module.rules as RuleSetRule[];
    
    // Filter existing CSS rules
    config.module.rules = rules.filter((rule) => {
      if (rule && typeof rule === 'object' && 'test' in rule) {
        return rule.test?.toString() !== '/\\.css$/';
      }
      return true;
    });

    // Add our CSS rule
    config.module.rules.push({
      test: /\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [
                require('tailwindcss'),
                require('autoprefixer'),
              ],
            },
          },
        },
      ],
    });

    return config;
  },
};

export default config;