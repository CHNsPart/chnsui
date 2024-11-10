# .eslintrc.js

```js
module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier'
  ],
  plugins: ['@typescript-eslint', 'react', 'react-hooks'],
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn'
  }
}
```

# .github\workflows\ci.yml

```yml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'npm'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run linter
        run: npm run lint
        
      - name: Run tests
        run: npm run test
        
      - name: Build project
        run: npm run build

  release:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'npm'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Semantic Release
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
        run: npx semantic-release
```

# .github\workflows\npm-publish.yml

```yml
# This workflow will run tests using node and then publish a package to GitHub Packages when a release is created
# For more information see: https://docs.github.com/en/actions/publishing-packages/publishing-nodejs-packages

name: Node.js Package

on:
  release:
    types: [created]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 16
      - run: npm ci
      - run: npm test

  publish-npm:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 16
          registry-url: https://registry.npmjs.org/
      - run: npm ci
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{secrets.CHNSUI_TOKEN}}

```

# .github\workflows\release.yml

```yml
name: Release
on:
  push:
    tags:
      - 'v*'
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '14'
          registry-url: 'https://registry.npmjs.org'
      - run: npm ci
      - run: npm run rollup
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.CHNSUI_TOKEN }}

  release:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/create-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: ${{ github.ref }}
          release_name: Release ${{ github.ref }}
          draft: false
          prerelease: false

```

# .gitignore

```
dist
src
node_modules
.vscode
```

# .husky\_\.gitignore

```
*
```

# .husky\_\husky.sh

```sh
#!/usr/bin/env sh
if [ -z "$husky_skip_init" ]; then
  debug () {
    if [ "$HUSKY_DEBUG" = "1" ]; then
      echo "husky (debug) - $1"
    fi
  }

  readonly hook_name="$(basename -- "$0")"
  debug "starting $hook_name..."

  if [ "$HUSKY" = "0" ]; then
    debug "HUSKY env variable is set to 0, skipping hook"
    exit 0
  fi

  if [ -f ~/.huskyrc ]; then
    debug "sourcing ~/.huskyrc"
    . ~/.huskyrc
  fi

  readonly husky_skip_init=1
  export husky_skip_init
  sh -e "$0" "$@"
  exitCode="$?"

  if [ $exitCode != 0 ]; then
    echo "husky - $hook_name hook exited with code $exitCode (error)"
  fi

  if [ $exitCode = 127 ]; then
    echo "husky - command not found in PATH=$PATH"
  fi

  exit $exitCode
fi

```

# .husky\pre-commit

```
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm run pre-commit
```

# .idea\.gitignore

```
# Default ignored files
/shelf/
/workspace.xml
# Editor-based HTTP Client requests
/httpRequests/

```

# .idea\chnsui.iml

```iml
<?xml version="1.0" encoding="UTF-8"?>
<module type="WEB_MODULE" version="4">
  <component name="NewModuleRootManager">
    <content url="file://$MODULE_DIR$">
      <excludeFolder url="file://$MODULE_DIR$/.tmp" />
      <excludeFolder url="file://$MODULE_DIR$/temp" />
      <excludeFolder url="file://$MODULE_DIR$/tmp" />
    </content>
    <orderEntry type="inheritedJdk" />
    <orderEntry type="sourceFolder" forTests="false" />
  </component>
</module>
```

# .idea\modules.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project version="4">
  <component name="ProjectModuleManager">
    <modules>
      <module fileurl="file://$PROJECT_DIR$/.idea/chnsui.iml" filepath="$PROJECT_DIR$/.idea/chnsui.iml" />
    </modules>
  </component>
</project>
```

# .idea\vcs.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project version="4">
  <component name="VcsDirectoryMappings">
    <mapping directory="" vcs="Git" />
  </component>
</project>
```

# .prettierrc.js

```js
module.exports = {
  semi: true,
  trailingComma: 'es5',
  singleQuote: true,
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'always'
}
```

# .releaserc.js

```js
module.exports = {
  branches: ['main'],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    '@semantic-release/npm',
    '@semantic-release/github',
    [
      '@semantic-release/git',
      {
        assets: ['package.json', 'CHANGELOG.md'],
        message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}'
      }
    ]
  ]
}
```

# .storybook\main.ts

```ts
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
```

# .storybook\postcss.config.js

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

# .storybook\preview.ts

```ts
import type { Preview } from "@storybook/react";
import '../src/tailwind.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    layout: 'centered',
  },
};

export default preview;
```

# .storybook\tailwind.config.js

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    '../src/**/*.{js,ts,jsx,tsx}',
    './.storybook/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3b82f6",
        secondary: "#9ca3af",
        tertiary: "#dbeafe",
        danger: "#ef4444",
        warning: "#eab308",
        success: "#22c55e",
        info: "#06b6d4",
        dark: "#e5e7eb",
        bg: "#172554"
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        wave: {
          '0%': { transform: 'rotate(0.0deg)' },
          '10%': { transform: 'rotate(14deg)' },
          '20%': { transform: 'rotate(-8deg)' },
          '30%': { transform: 'rotate(14deg)' },
          '40%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(10.0deg)' },
          '60%': { transform: 'rotate(0.0deg)' },
          '100%': { transform: 'rotate(0.0deg)' },
        },
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
        wave: 'wave 2s linear infinite',
      },
    },
  },
  plugins: [],
};
```

# .storybook\tailwind.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --foreground-rgb: 0, 0, 0;
  --background-start-rgb: 214, 219, 220;
  --background-end-rgb: 255, 255, 255;
}

@media (prefers-color-scheme: dark) {
  :root {
    --foreground-rgb: 255, 255, 255;
    --background-start-rgb: 0, 0, 0;
    --background-end-rgb: 0, 0, 0;
  }
}
```

# babel.config.js

```js
module.exports = {
  presets: [
    "@babel/preset-env",
    "@babel/preset-react",
    "@babel/preset-typescript",
  ],
};

```

# jest.config.js

```js
module.exports = {
  testEnvironment: "jsdom",
  moduleNameMapper: {
    ".(css|less|scss)$": "identity-obj-proxy",
  },
};

```

# LICENSE

```
MIT License

Copyright (c) 2023 Touhidul Islam Chayan

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```

# package.json

```json
{
  "name": "chnsui",
  "version": "0.2.3",
  "keywords": [
    "react",
    "tailwindcss",
    "ui",
    "components",
    "chnsui"
  ],
  "description": "A reusable ui component library with react and tailwindcss",
  "scripts": {
    "dev": "npm run storybook",
    "build": "npm run build-tailwind && npm run build-ts",
    "build-ts": "tsc && rollup -c",
    "build-tailwind": "npx tailwindcss -o ./dist/styles.css --minify",
    "test": "jest --coverage",
    "test:watch": "jest --watch",
    "lint": "eslint 'src/**/*.{ts,tsx}'",
    "lint:fix": "eslint 'src/**/*.{ts,tsx}' --fix",
    "format": "prettier --write 'src/**/*.{ts,tsx,css}'",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build",
    "clean:storybook": "rimraf node_modules/.cache/storybook",
    "storybook:clean": "npm run clean:storybook && npm run storybook",
    "prepare": "husky install",
    "pre-commit": "lint-staged",
    "typecheck": "tsc --noEmit",
    "ci": "npm run lint && npm run typecheck && npm run test && npm run build"
  },
  "lint-staged": {
    "src/**/*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ]
  },
  "husky": {
    "hooks": {
      "pre-commit": "npm run lint"
    }
  },
  "bugs": {
    "url": "https://github.com/chnspart/chnsui/issues"
  },
  "homepage": "https://github.com/CHNsPart/chnsui#readme",
  "author": "Touhidul Islam Chayan",
  "license": "ISC",
  "devDependencies": {
    "@babel/core": "^7.23.3",
    "@babel/preset-env": "^7.23.3",
    "@babel/preset-react": "^7.23.3",
    "@babel/preset-typescript": "^7.23.3",
    "@mdx-js/react": "^2.1.2",
    "@rollup/plugin-babel": "^6.0.4",
    "@rollup/plugin-commonjs": "^25.0.7",
    "@rollup/plugin-node-resolve": "^15.2.3",
    "@rollup/plugin-typescript": "^11.1.5",
    "@semantic-release/changelog": "^6.0.3",
    "@semantic-release/git": "^10.0.1",
    "@storybook/addon-a11y": "^7.6.0",
    "@storybook/addon-actions": "^7.6.0",
    "@storybook/addon-essentials": "^7.6.0",
    "@storybook/addon-interactions": "^7.6.0",
    "@storybook/addon-links": "^7.6.0",
    "@storybook/addon-styling": "^2.0.0",
    "@storybook/addon-themes": "^7.6.0",
    "@storybook/blocks": "^7.6.0",
    "@storybook/preset-scss": "^1.0.3",
    "@storybook/react": "^7.6.0",
    "@storybook/react-webpack5": "^7.6.0",
    "@storybook/testing-library": "^0.2.2",
    "@testing-library/react": "^13.3.0",
    "@types/jest": "^28.1.6",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@types/storybook__react": "^4.0.2",
    "@types/webpack": "^5.28.5",
    "@typescript-eslint/eslint-plugin": "^6.21.0",
    "@typescript-eslint/parser": "^6.21.0",
    "autoprefixer": "^10.4.16",
    "babel-jest": "^27.3.1",
    "babel-loader": "^8.2.3",
    "class-variance-authority": "^0.6.0",
    "clsx": "^1.2.1",
    "css-loader": "^6.8.1",
    "eslint": "^8.57.1",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-react": "^7.37.2",
    "eslint-plugin-react-hooks": "^4.6.2",
    "html-webpack-plugin": "^5.5.0",
    "husky": "^8.0.3",
    "identity-obj-proxy": "^3.0.0",
    "jest": "^28.1.3",
    "lint-staged": "^15.2.10",
    "next-transpile-modules": "^10.0.0",
    "postcss": "^8.4.31",
    "postcss-import": "^15.1.0",
    "postcss-loader": "^7.3.3",
    "postcss-nested": "^6.0.1",
    "prettier": "^3.3.3",
    "prop-types": "^15.8.1",
    "rimraf": "^6.0.1",
    "rollup": "^4.6.0",
    "rollup-plugin-dts": "^6.1.0",
    "rollup-plugin-peer-deps-external": "^2.2.4",
    "rollup-plugin-postcss": "^4.0.2",
    "sass": "^1.43.5",
    "sass-loader": "^12.3.0",
    "semantic-release": "^22.0.12",
    "storybook": "^7.0.11",
    "style-loader": "^3.3.3",
    "tailwind-merge": "^1.12.0",
    "tailwindcss": "^3.3.5",
    "typescript": "^4.9.5"
  },
  "main": "dist/cjs/index.js",
  "module": "dist/esm/index.js",
  "files": [
    "dist"
  ],
  "types": "dist/index.d.ts",
  "dependencies": {
    "@rollup/plugin-babel": "^6.0.3",
    "react": "^17.0.0 || ^18.0.0",
    "react-dom": "^17.0.0 || ^18.0.0",
    "rollup-plugin-peer-deps-external": "^2.2.4"
  },
  "peerDependencies": {
    "react": "^17.0.0 || ^18.0.0",
    "react-dom": "^17.0.0 || ^18.0.0"
  }
}

```

# postcss.config.js

```js
/* module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
 */

const tailwindcss = require("tailwindcss");

module.exports = {
  plugins: [tailwindcss("./tailwind.config.js"), require("autoprefixer")],
};

```

# README.md

```md
<div style="display: flex; justify-content: center; align-items: center;">
  <img src="https://github.com/CHNsPart/chnsui/assets/58574102/62a0fef5-a070-4f9b-b9d3-c9fc7567e912" height="200px" width="auto" alt="CHNsUI Logo">
</div>


# CHNsUI - React Reusable Component Library with TailwindCSS

CHNsUI is a collection of reusable React components built with TailwindCSS, providing a quick and easy way to create beautiful UIs for your web projects.


## Getting Started

To use CHNsUI in your React project, you can install it via npm:

\`\`\`bash
npm install chnsui
\`\`\`

Once installed, you can import and use any component from CHNsUI in your project.  _(Don't forget to import css file)_

\`\`\`jsx
import { Button } from 'chnsui';
import 'chnsui/dist/styles.css'

function MyComponent() {
  return <Button>Click me!</Button>;
}
\`\`\`

## Available Components

CHNsUI provides a variety of components that you can use in your projects:
\`\`\`jsx
<Button
<Heading/>
<Paragraph/>
\`\`\`

## Button

A customizable button component with various color and size options.

\`\`\`jsx
import { Button } from 'chnsui';
import 'chnsui/dist/styles.css'

function MyComponent() {
  return (
    <div>
      <Button>Click me!</Button>
      <Button color="red" size="sm">Click me!</Button>
      <Button color="blue" size="lg">Click me!</Button>
    </div>
  );
}
\`\`\`

### Props

The `Button` component supports several props that can be used to customize its appearance and behavior:

| Prop Name   | Type    | Default     | Description                                                                                                                                  |
| ----------- | ------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `variant`   | string  | `'default'` | The variant of the button. Possible values are `'default'`, `'destructive'`, `'outline'`, `'subtle'`, `'ghost'`, `'link'`, and `'withRing'`. |
| `size`      | string  | `'default'` | The size of the button. Possible values are `'default'`, `'sm'`, and `'lg'`.                                                                 |
| `href`      | string  | `undefined` | The URL that the button should link to. If this prop is provided, the button will render as an anchor tag instead of a button.               |
| `target`    | string  | `undefined` | The target attribute for the link.                                                                                                           |
| `className` | string  | `undefined` | Additional classes to be added to the button.                                                                                                |
| `disabled`  | boolean | `false`     | Whether the button is disabled or not.                                                                                                       |

### Examples

Here are some examples of how to use the `Button` component with different props:

\`\`\`jsx
import React from 'react';
import { Button } from 'chnsui';
import 'chnsui/dist/styles.css'

function App() {
  return (
    <div>
      <Button variant="default">Default Button</Button>
      <Button variant="destructive">Destructive Button</Button>
      <Button variant="outline">Outline Button</Button>
      <Button variant="subtle">Subtle Button</Button>
      <Button variant="ghost">Ghost Button</Button>
      <Button variant="link" href="https://google.com" target="_blank">
        Link Button
      </Button>
      <Button variant="withRing">Button with Ring</Button>
      <Button size="sm">Small Button</Button>
      <Button size="lg">Large Button</Button>
      <Button className="bg-yellow-500">Custom Class Button</Button>
      <Button disabled>Disabled Button</Button>
    </div>
  );
}
\`\`\`

## Heading

The `Heading` component is a reusable React component that renders a heading element with configurable styles. It provides a range of props that enable the customization of the element's text size, color, font weight, alignment, text transformation, decoration, width, animation, and more. 

Here's a table documentation of the component's props:

| Prop Name      | Type        | Default     | Description                                                                                                                                                                                                                                                                                                                                                            |
| -------------- | ----------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `variant`      | `string`    | `h1`        | Specifies the size and style of the heading. Accepted values are `h1`, `h2`, `h3`, `h4`, `h5`, and `h6`.                                                                                                                                                                                                                                                               |
| `colors`       | `string`    | `primary`   | Specifies the color scheme of the heading. Accepted values are `primary`, `secondary`, `tertiary`, `danger`, `warning`, `success`, `info`, `dark`, and `light`.                                                                                                                                                                                                        |
| `weight`       | `string`    | `null`      | Specifies the font weight of the heading. Accepted values are `thin`, `light`, `normal`, `medium`, `semibold`, `bold`, `extrabold`, and `black`.                                                                                                                                                                                                                       |
| `align`        | `string`    | `null`      | Specifies the alignment of the heading text. Accepted values are `left`, `center`, `right`, and `justify`.                                                                                                                                                                                                                                                             |
| `transform`    | `string`    | `null`      | Specifies the text transformation of the heading. Accepted values are `uppercase`, `lowercase`, `capitalize`, and `normalcase`.                                                                                                                                                                                                                                        |
| `decoration`   | `string`    | `null`      | Specifies the decoration of the heading text. Accepted values are `underline`, `lineThrough`, and `noUnderline`.                                                                                                                                                                                                                                                       |
| `quickie`      | `string`    | `null`      | Applies predefined styles to the heading text. Accepted values are `q_grad_watermelone`, `q_grad_aqua`, `q_grad_rasta`, `q_grad_lemon`, `q_grad_rose`, `q_line`, `q_line_sync`, `qc_leanFull`, `qc_leanLeft`, `qc_leanRight`, `qc_leanHalf`, `qc_leanLeftHalf`, `qc_leanRightHalf`, `qc_short`, `qc_shortLeft`, `qc_shortRight`, `shortCenter`, and `qc_shortJustify`. |
| `animations`   | `string`    | `null`      | Applies predefined CSS animations to the heading. Accepted values are `x_wave`, `x_jello`, `x_rubberBand`, `x_flash`, `x_wiggle`, `x_bounce`, `x_spin`, `x_pulse`, and `x_ping`.                                                                                                                                                                                       |
| `sectionWidth` | `string`    | `null`      | Specifies the width of the heading. Accepted values are `full`, `half`, `third`, and `fourth`.                                                                                                                                                                                                                                                                         |
| `className`    | `string`    | `undefined` | A string of CSS classes to apply to the heading element.                                                                                                                                                                                                                                                                                                               |
| `children`     | `ReactNode` | `undefined` | The content of the heading element.                                                                                                                                                                                                                                                                                                                                    |

And here's an example of how to use the `Heading` component:

\`\`\`jsx
import React from 'react';
import { Heading } from 'chnsui';
import 'chnsui/dist/styles.css'

const App = () => {
  return (
    <div>
      <Heading 
        variant="h1" 
        colors="primary" 
        weight="bold" 
        align="center" 
        transform="uppercase" 
        decoration="noUnderline" 
        quickie="q_grad_watermelone x_bounce" 
        animations="x_wave" 
        sectionWidth="full"
      >
        Hello, world!
      </Heading>
  )
}
\`\`\`

In this example, we import the `Heading` component from the Chakra UI library and use it to render a heading on our website. We pass two props to the `Heading` component: `as` and `size`. 

The `as` prop specifies what HTML tag the heading should be rendered as. In this case, we want the heading to be an `<h1>` tag, so we set `as="h1"`. 

The `size` prop specifies the size of the heading. In this case, we want the heading to be extra large, so we set `size="xl"`. 

Inside the `Heading` component, we provide the text we want to display as the heading. In this example, we're displaying the text "Welcome to my website!".


## Paragraph

The `Paragraph` component is a versatile text component that can display text in various styles and colors. It is built using `class-variance-authority` for easy class management and comes with a variety of default and custom variants to choose from.

Props:


| Prop name  | Type      | Description                                                                                                                                                                                                              | Default value       |
| ---------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------- |
| className  | string    | Additional class name(s) to be added to the component's root element.                                                                                                                                                    | `""` (empty string) |
| children   | ReactNode | The content to be rendered inside the paragraph element.                                                                                                                                                                 | `undefined`         |
| variant    | string    | The visual style of the paragraph. Valid values: `"default"`, `"darkGlass"`, `"glass"`, `"bg"`, `"bgGlass"`, `"transparent"`.                                                                                            | `"default"`         |
| colors     | string    | The color scheme of the paragraph. Valid values: `"primary"`, `"secondary"`, `"tertiary"`, `"danger"`, `"warning"`, `"success"`, `"info"`, `"dark"`, `"light"`.                                                          | `"primary"`         |
| badge      | string    | The background color scheme of a badge to be displayed on the paragraph. Valid values: `"default"`, `"secondary"`, `"tertiary"`, `"danger"`, `"warning"`, `"success"`, `"info"`, `"dark"`, `"light"`, `null` (no badge). | `null`              |
| sizes      | string    | The size of the text. Valid values: `"sm"`, `"md"`, `"lg"`, `"xl"`, `null` (default size).                                                                                                                               | `null`              |
| weight     | string    | The font weight. Valid values: `"thin"`, `"light"`, `"normal"`, `"medium"`, `"semibold"`, `"bold"`, `"extrabold"`, `"black"`, `null` (default font weight).                                                              | `null`              |
| align      | string    | The text alignment. Valid values: `"left"`, `"center"`, `"right"`, `"justify"`, `null` (default text alignment).                                                                                                         | `null`              |
| transform  | string    | The text transform. Valid values: `"uppercase"`, `"lowercase"`, `"capitalize"`, `"normalcase"`, `null` (no text transform).                                                                                              | `null`              |
| decoration | string    | The text decoration. Valid values: `"underline"`, `"lineThrough"`, `"noUnderline"`, `null` (no text decoration).                                                                                                         | `null`              |
| bg         | boolean   | Whether to apply a background color to the paragraph or not. Valid values: `true`, `false`.                                                                                                                              | `null`              |


And here's an example of how to use the `Paragraph` component with some of its props:

\`\`\`jsx
import { Paragraph } from 'chnsui'
import 'chnsui/dist/styles.css'

function MyComponent() {
  return (
    <>
      <Paragraph variant={"transparent"} colors="warning" badge={"warning"}>
        This is a warning message.
      </Paragraph>
      <Paragraph sizes="lg" align="center" decoration="lineThrough">
        This paragraph has large font size, centered text, and a line-through decoration.
      </Paragraph>
    </>
  )
}
\`\`\`

Example:

\`\`\`jsx
import { Paragraph } from 'chnsui'
import 'chnsui/dist/styles.css'

const App = () => {
  return (
    <>
      <Paragraph bg colors="secondary">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit voluptatem 
          incidunt deleniti modi voluptate, hic cumque adipisci eveniet error exercitationem,
          vitae voluptatum ducimus. Maiores enim totam aperiam explicabo a quae. Lorem ipsum
          dolor sit amet consectetur, adipisicing elit. Sit voluptatem incidunt deleniti modi 
          voluptate, hic cumque adipisci eveniet error exercitationem, vitae voluptatum ducimus.
          Maiores enim totam aperiam explicabo a quae.
      </Paragraph>
      
      <div className="w-full flex flex-row gap-5">
        <Paragraph colors="dark" variant={"transparent"} badge={"dark"}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum at consectetur. 
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum at consectetur.
        </Paragraph>
        <Paragraph colors="warning" badge={"warning"} variant={"transparent"}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum at consectetur.
        </Paragraph>
      </div>
    </>
  )
}
\`\`\` 

## Table

The Table component is a customizable `Table` wrapper that provides styling and variant options for creating tables in React applications.

Props:

| Prop Name | Type                            | Default Value | Description                                              |
| --------- | ------------------------------- | ------------- | -------------------------------------------------------- |
| variant   | `'default' \| 'bg' \| 'border'` | `null`        | The variant applied to the table head.                   |
| className | `string`                        | `undefined`   | Additional CSS class to apply to the table head element. |
| alignment | `'left' \| 'center' \| 'right'` | `'left'`      | The horizontal alignment of the table head content.      |
| children  | `React.ReactNode \| null`       | `null`        | The content to display within the table head.            |

Note: The `...rest` prop in the `Table` component is used to pass any additional HTML attributes to the underlying `<table>` element.

Example:
\`\`\`jsx
import { Paragraph } from "chnsui";
import { Table, TableHead, TableBody, Td, Th, Tr } from "chnsui";
import 'chnsui/dist/styles.css'

export const TableRaw: React.FC = () => {
  return (
    <div className='flex flex-col gap-5'>
      <Paragraph>Default Table</Paragraph>
      <Table>
        <Tr>
            <Th>Kings Treasury</Th>
            <Th>Peoples happiness</Th>
        </Tr>
        <Tr>
            <Td>Empty</Td>
            <Td>Overflowing</Td>
        </Tr>
      </Table>
    </div>
  );
};
export const TableRawSecondary: React.FC = () => {
  return (
    <div className='flex flex-col gap-5'>
      <Paragraph>Default Table</Paragraph>
      <Table variant={"bg"}>
        <TableHead alignment="center">
            <Tr variant={"default"}>
                <Th>Kings Treasury</Th>
                <Th>Kings Treasury</Th>
                <Th>Peoples happiness</Th>
                <Th>Peoples happiness</Th>
            </Tr>
         </TableHead>
         <TableBody alignment="center">
            <Tr variant={"bg"}>
                <Td>Empty</Td>
                <Td>Overflowing</Td>
                <Td variant={"bg"}>.</Td>
                <Td>Overflowing</Td>
            </Tr>
            <Tr variant={"bg"}>
                <Td>Empty</Td>
                <Td>Overflowing</Td>
                <Td>Overflowing</Td>
            </Tr>
            <Tr variant={"bg"}>
                <Td variant={"bg"}>.</Td>
                <Td>Overflowing</Td>
                <Td>Overflowing</Td>
                <Td>Overflowing</Td>
            </Tr>
        </TableBody>
      </Table>
    </div>
  );
};

export const TableSimple = () => {
  return (
    <Table padding="all" alignmentment="center" variant="bg" className="custom-table">
      <TableHead variant="bg" alignment="center">
        <Tr>
          <Th>Header 1</Th>
          <Th>Header 2</Th>
        </Tr>
      </TableHead>
      <TableBody>
        <Tr>
          <Td>Cell 1</Td>
          <Td>Cell 2</Td>
        </Tr>
        <Tr>
          <Td>Cell 3</Td>
          <Td>Cell 4</Td>
        </Tr>
      </TableBody>
    </Table>
  );
};


\`\`\`

And here's an example of how to use the `Table` component with some of its props:

## Author

This React component library with TailwindCSS is created and maintained by Touhidul Islam Chayan.
<!-- ![fav](https://github.com/CHNsPart/chnsui/assets/58574102/e892a3ee-220c-46da-87d8-cf16ef4934cd) -->


## License

CHNsUI is licensed under the MIT License. See the [LICENSE](https://github.com/chnspart/chnsui/blob/main/LICENSE) file for more

```

# rollup.config.js

```js
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import dts from "rollup-plugin-dts";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

const packageJson = require("./package.json");

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      postcss({
        plugins: [
          tailwindcss("./tailwind.config.js"),
          autoprefixer(),
        ],
        extract: true,
      }),
    ],
  },
  {
    input: "dist/esm/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
    external: [/\.(css|less|scss)$/],
  },
];

```

# src\components\Button\Button.stories.tsx

```tsx
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Button, { ButtonProps } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'subtle', 'ghost', 'link', 'withRing'],
      description: 'The visual style of the button',
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg'],
      description: 'The size of the button',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    children: {
      control: 'text',
      description: 'The content of the button',
    },
    onClick: { action: 'clicked' },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

// Single button stories
export const Default: Story = {
  args: {
    children: 'Default Button',
    variant: 'default',
  },
};

export const Destructive: Story = {
  args: {
    children: 'Destructive Button',
    variant: 'destructive',
  },
};

export const Small: Story = {
  args: {
    children: 'Small Button',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    children: 'Large Button',
    size: 'lg',
  },
};

// Group showing all variants
export const AllVariants: Story = {
  render: function Render() {
    return (
      <div className="flex flex-wrap gap-4">
        <Button variant="default">Default</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="subtle">Subtle</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
        <Button variant="withRing">With Ring</Button>
      </div>
    );
  },
};

// Group showing all sizes
export const AllSizes: Story = {
  render: function Render() {
    return (
      <div className="flex flex-wrap items-center gap-4">
        <Button size="sm">Small</Button>
        <Button size="default">Default</Button>
        <Button size="lg">Large</Button>
      </div>
    );
  },
};

// Interactive example
export const Interactive: Story = {
  render: function Render() {
    return (
      <Button
        variant="default"
        onClick={() => alert('Button clicked!')}
      >
        Click me!
      </Button>
    );
  },
};
```

# src\components\Button\Button.tsx

```tsx
import * as React from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-md font-medium transition-colors dark:hover:bg-blue-800 dark:hover:text-blue-100 disabled:opacity-50 disabled:pointer-events-none data-[state=open]:bg-blue-100 dark:data-[state=open]:bg-blue-800 select-none",
  {
    variants: {
      variant: {
        default: "bg-blue-500 text-white hover:bg-blue-700 dark:bg-blue-50 dark:text-blue-900",
        destructive: "bg-red-500 text-white hover:bg-red-600 dark:hover:bg-red-600",
        outline: "bg-transparent border border-blue-500 text-blue-500 hover:bg-blue-950/50 dark:border-blue-700 dark:text-blue-100",
        subtle: "bg-blue-100 text-blue-900 hover:bg-blue-200 dark:bg-blue-700 dark:text-blue-100",
        ghost: "bg-transparent dark:bg-transparent text-blue-500 hover:bg-blue-100 hover:bg-blue-950/50 dark:text-blue-100 dark:hover:text-blue-100 data-[state=open]:bg-transparent dark:data-[state=open]:bg-transparent",
        link: "bg-transparent dark:bg-transparent underline-offset-4 hover:underline text-blue-500 dark:text-blue-300 hover:bg-transparent dark:hover:bg-transparent",
        withRing: "focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-blue-400 dark:focus:ring-offset-blue-900",
      },
      size: {
        default: 'h-10 py-2 px-4 text-md',
        sm: 'h-9 px-2 rounded-md text-sm',
        lg: 'h-11 px-8 rounded-md text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string;
  target?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, href, target, variant, size, ...props }, ref) => {
    if (href) {
      return (
        <a
          href={href}
          target={target}
          className={cn(buttonVariants({ variant, size, className }))}
        >
          {children}
        </a>
      );
    }
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
```

# src\components\Button\index.ts

```ts
export { default } from "./Button";

```

# src\components\index.ts

```ts
export { default as Button } from "./Button";
export { default as Heading } from "./Typography";
export { default as Paragraph } from "./Paragraph";
export *  from "./Table";
```

# src\components\Paragraph\index.tsx

```tsx
export { default } from "./Paragraph";
```

# src\components\Paragraph\Paragraph.stories.tsx

```tsx
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Paragraph from './Paragraph';

const meta = {
  title: 'Components/Paragraph',
  component: Paragraph,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'darkGlass', 'glass', 'bg', 'bgGlass', 'transparent'],
      description: 'The visual style variant of the paragraph'
    },
    colors: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'danger', 'warning', 'success', 'info', 'dark', 'light'],
      description: 'The color scheme of the paragraph'
    },
    size: {
      control: 'select',
      options: ['sm', 'base', 'lg', 'xl'],
      description: 'The size of the text'
    },
    weight: {
      control: 'select',
      options: ['thin', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black'],
      description: 'The font weight of the text'
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right', 'justify'],
      description: 'Text alignment'
    },
    transform: {
      control: 'select',
      options: ['uppercase', 'lowercase', 'capitalize', 'normal'],
      description: 'Text transformation'
    },
    decoration: {
      control: 'select',
      options: ['underline', 'lineThrough', 'noUnderline'],
      description: 'Text decoration'
    },
    withBadge: {
      control: 'boolean',
      description: 'Show a colored badge on the left'
    },
    children: {
      control: 'text',
      description: 'The content of the paragraph'
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Paragraph>;

export default meta;
type Story = StoryObj<typeof Paragraph>;

const sampleText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.`;

export const Default: Story = {
  args: {
    children: sampleText,
    variant: 'default',
    colors: 'primary',
    size: 'base',
  },
};

export const WithBadge: Story = {
  args: {
    children: sampleText,
    variant: 'bg',
    colors: 'primary',
    withBadge: true,
  },
};

export const GlassEffect: Story = {
  args: {
    children: sampleText,
    variant: 'glass',
    colors: 'secondary',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4 w-[600px]">
      <Paragraph variant="default">{sampleText}</Paragraph>
      <Paragraph variant="darkGlass">{sampleText}</Paragraph>
      <Paragraph variant="glass">{sampleText}</Paragraph>
      <Paragraph variant="bg">{sampleText}</Paragraph>
      <Paragraph variant="bgGlass">{sampleText}</Paragraph>
      <Paragraph variant="transparent">{sampleText}</Paragraph>
    </div>
  ),
};

export const AllColors: Story = {
  render: () => (
    <div className="space-y-4 w-[600px]">
      <Paragraph colors="primary" withBadge>{sampleText}</Paragraph>
      <Paragraph colors="secondary" withBadge>{sampleText}</Paragraph>
      <Paragraph colors="tertiary" withBadge>{sampleText}</Paragraph>
      <Paragraph colors="danger" withBadge>{sampleText}</Paragraph>
      <Paragraph colors="warning" withBadge>{sampleText}</Paragraph>
      <Paragraph colors="success" withBadge>{sampleText}</Paragraph>
      <Paragraph colors="info" withBadge>{sampleText}</Paragraph>
      <Paragraph colors="dark" withBadge>{sampleText}</Paragraph>
      <Paragraph colors="light" variant="bg" withBadge>{sampleText}</Paragraph>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4 w-[600px]">
      <Paragraph size="sm">{sampleText}</Paragraph>
      <Paragraph size="base">{sampleText}</Paragraph>
      <Paragraph size="lg">{sampleText}</Paragraph>
      <Paragraph size="xl">{sampleText}</Paragraph>
    </div>
  ),
};

export const TextStyles: Story = {
  render: () => (
    <div className="space-y-4 w-[600px]">
      <Paragraph weight="bold" transform="uppercase">Bold Uppercase Text</Paragraph>
      <Paragraph weight="light" decoration="underline">Light Underlined Text</Paragraph>
      <Paragraph align="center" decoration="lineThrough">Centered Strike-through Text</Paragraph>
      <Paragraph align="justify" transform="capitalize">Justified and Capitalized Text</Paragraph>
    </div>
  ),
};
```

# src\components\Paragraph\Paragraph.tsx

```tsx
import * as React from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const paragraphVariants = cva(
  "text-md leading-7 h-fit min-h-10",
  {
    variants: {
      variant: {
        default: "py-5",
        darkGlass: "backdrop-blur-xl bg-black/5 p-5 rounded-lg",
        glass: "backdrop-blur-xl bg-white/5 p-5 rounded-lg",
        bg: "bg-slate-100 dark:bg-slate-800 p-5 rounded-lg",
        bgGlass: "backdrop-blur-xl bg-white/10 dark:bg-black/10 p-5 rounded-lg",
        transparent: "bg-transparent p-5 rounded-lg"
      },
      colors: {
        primary: "text-blue-600 dark:text-blue-400",
        secondary: "text-gray-600 dark:text-gray-300",
        tertiary: "text-blue-800 dark:text-blue-100",
        danger: "text-red-600 dark:text-red-400",
        warning: "text-yellow-600 dark:text-yellow-400",
        success: "text-green-600 dark:text-green-400",
        info: "text-cyan-600 dark:text-cyan-400",
        dark: "text-gray-900 dark:text-gray-400",
        light: "text-gray-100 dark:text-white",
      },
      size: {
        sm: "text-sm leading-5",
        base: "text-base leading-7",
        lg: "text-lg leading-8",
        xl: "text-xl leading-9"
      },
      weight: {
        thin: "font-thin",
        light: "font-light",
        normal: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold",
        extrabold: "font-extrabold",
        black: "font-black",
      },
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
        justify: "text-justify",
      },
      transform: {
        uppercase: "uppercase",
        lowercase: "lowercase",
        capitalize: "capitalize",
        normal: "normal-case",
      },
      decoration: {
        underline: "underline",
        lineThrough: "line-through",
        noUnderline: "no-underline",
      },
      withBadge: {
        true: "relative before:content-[''] before:absolute before:-left-2 before:top-0 before:w-1 before:h-full rounded-l-none",
      }
    },
    compoundVariants: [
      {
        withBadge: true,
        colors: "primary",
        className: "before:bg-blue-500"
      },
      {
        withBadge: true,
        colors: "secondary",
        className: "before:bg-gray-500"
      },
      {
        withBadge: true,
        colors: "danger",
        className: "before:bg-red-500"
      },
      {
        withBadge: true,
        colors: "warning",
        className: "before:bg-yellow-500"
      },
      {
        withBadge: true,
        colors: "success",
        className: "before:bg-green-500"
      },
      {
        withBadge: true,
        colors: "info",
        className: "before:bg-cyan-500"
      }
    ],
    defaultVariants: {
      variant: "default",
      colors: "primary",
      size: "base",
      align: "left",
      weight: "normal",
      withBadge: false
    },
  }
);

export interface ParagraphProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof paragraphVariants> {}

const Paragraph = React.forwardRef<HTMLParagraphElement, ParagraphProps>(
  ({ 
    className, 
    children, 
    variant, 
    colors, 
    size,
    weight,
    align,
    transform,
    decoration,
    withBadge,
    ...props 
  }, ref) => {
    return (
      <p
        className={cn(paragraphVariants({ 
          variant, 
          colors, 
          size,
          weight,
          align,
          transform,
          decoration,
          withBadge,
          className 
        }))}
        ref={ref}
        {...props}
      >
        {children}
      </p>
    );
  }
);

Paragraph.displayName = 'Paragraph';

export default Paragraph;
```

# src\components\Table\index.ts

```ts
export * from "./Table";
```

# src\components\Table\Table.stories.tsx

```tsx
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHeaderCell,
} from './Table';

const meta = {
  title: 'Components/Table',
  component: Table,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'striped', 'bordered', 'minimal'],
      description: 'The visual style variant of the table',
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg'],
      description: 'The size of the table text',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof Table>;

// Sample data
const headers = ['Name', 'Role', 'Status', 'Action'];
const data = [
  { name: 'John Doe', role: 'Developer', status: 'Active', action: 'Edit' },
  { name: 'Jane Smith', role: 'Designer', status: 'Away', action: 'Edit' },
  { name: 'Bob Johnson', role: 'Manager', status: 'Busy', action: 'Edit' },
];

export const Default: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          {headers.map((header) => (
            <TableHeaderCell key={header}>{header}</TableHeaderCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, i) => (
          <TableRow key={i}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.role}</TableCell>
            <TableCell>{row.status}</TableCell>
            <TableCell>{row.action}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const Striped: Story = {
  render: () => (
    <Table variant="striped">
      <TableHeader>
        <TableRow>
          {headers.map((header) => (
            <TableHeaderCell key={header}>{header}</TableHeaderCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, i) => (
          <TableRow key={i}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.role}</TableCell>
            <TableCell>{row.status}</TableCell>
            <TableCell>{row.action}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const Bordered: Story = {
  render: () => (
    <Table variant="bordered">
      <TableHeader variant="bordered">
        <TableRow>
          {headers.map((header) => (
            <TableHeaderCell key={header} variant="bordered">{header}</TableHeaderCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, i) => (
          <TableRow key={i}>
            {Object.values(row).map((cell, j) => (
              <TableCell key={j} variant="bordered">{cell}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const Minimal: Story = {
  render: () => (
    <Table variant="minimal">
      <TableHeader variant="minimal">
        <TableRow>
          {headers.map((header) => (
            <TableHeaderCell key={header}>{header}</TableHeaderCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, i) => (
          <TableRow key={i} hover>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.role}</TableCell>
            <TableCell>{row.status}</TableCell>
            <TableCell>{row.action}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const WithAlignment: Story = {
  render: () => (
    <Table variant="bordered">
      <TableHeader variant="bordered">
        <TableRow>
          <TableHeaderCell textAlign="left" variant="bordered">Left</TableHeaderCell>
          <TableHeaderCell textAlign="center" variant="bordered">Center</TableHeaderCell>
          <TableHeaderCell textAlign="right" variant="bordered">Right</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell textAlign="left" variant="bordered">Left aligned content</TableCell>
          <TableCell textAlign="center" variant="bordered">Centered content</TableCell>
          <TableCell textAlign="right" variant="bordered">Right aligned content</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const CompactSize: Story = {
  render: () => (
    <Table size="sm" variant="bordered">
      <TableHeader variant="bordered">
        <TableRow>
          {headers.map((header) => (
            <TableHeaderCell key={header} variant="bordered">{header}</TableHeaderCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, i) => (
          <TableRow key={i}>
            {Object.values(row).map((cell, j) => (
              <TableCell key={j} variant="bordered">{cell}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const LargeSize: Story = {
  render: () => (
    <Table size="lg" variant="bordered">
      <TableHeader variant="bordered">
        <TableRow>
          {headers.map((header) => (
            <TableHeaderCell key={header} variant="bordered">{header}</TableHeaderCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, i) => (
          <TableRow key={i}>
            {Object.values(row).map((cell, j) => (
              <TableCell key={j} variant="bordered">{cell}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};
```

# src\components\Table\Table.tsx

```tsx
import * as React from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';

// Base table styles
const tableVariants = cva(
  "w-full border-collapse text-sm",
  {
    variants: {
      variant: {
        default: "bg-white dark:bg-slate-800",
        striped: "bg-white dark:bg-slate-800 [&_tr:nth-child(even)]:bg-gray-50 dark:[&_tr:nth-child(even)]:bg-slate-700",
        bordered: "border border-gray-200 dark:border-slate-700",
        minimal: "bg-transparent",
      },
      size: {
        default: "text-sm",
        sm: "text-xs",
        lg: "text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// Table Head styles
const theadVariants = cva(
  "text-left",
  {
    variants: {
      variant: {
        default: "bg-gray-50 dark:bg-slate-700",
        bordered: "bg-gray-50 dark:bg-slate-700 border-b border-gray-200 dark:border-slate-600",
        minimal: "border-b-2 border-gray-200 dark:border-slate-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// Table Cell styles
const cellVariants = cva(
  "px-4 py-3",
  {
    variants: {
      textAlign: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
      },
      variant: {
        default: "",
        bordered: "border border-gray-200 dark:border-slate-700",
      },
    },
    defaultVariants: {
      textAlign: "left",
      variant: "default",
    },
  }
);

// Interfaces
export interface TableProps 
  extends React.TableHTMLAttributes<HTMLTableElement>,
    VariantProps<typeof tableVariants> {}

export interface TableHeadProps 
  extends React.HTMLAttributes<HTMLTableSectionElement>,
    VariantProps<typeof theadVariants> {}

export interface TableBodyProps 
  extends React.HTMLAttributes<HTMLTableSectionElement> {}

export interface TableRowProps 
  extends React.HTMLAttributes<HTMLTableRowElement> {
  hover?: boolean;
}

export interface TableCellBaseProps extends VariantProps<typeof cellVariants> {
  textAlign?: 'left' | 'center' | 'right';
}

export interface TableCellProps 
  extends Omit<React.TdHTMLAttributes<HTMLTableCellElement>, 'align'>,
    TableCellBaseProps {}

export interface TableHeaderCellProps 
  extends Omit<React.ThHTMLAttributes<HTMLTableCellElement>, 'align'>,
    TableCellBaseProps {}

// Components
export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, variant, size, ...props }, ref) => (
    <table
      ref={ref}
      className={cn(tableVariants({ variant, size, className }))}
      {...props}
    />
  )
);
Table.displayName = "Table";

export const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeadProps>(
  ({ className, variant, ...props }, ref) => (
    <thead
      ref={ref}
      className={cn(theadVariants({ variant, className }))}
      {...props}
    />
  )
);
TableHeader.displayName = "TableHeader";

export const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, ...props }, ref) => (
    <tbody
      ref={ref}
      className={cn("divide-y divide-gray-200 dark:divide-slate-700", className)}
      {...props}
    />
  )
);
TableBody.displayName = "TableBody";

export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, hover, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        hover && "hover:bg-gray-50 dark:hover:bg-slate-700",
        className
      )}
      {...props}
    />
  )
);
TableRow.displayName = "TableRow";

export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, textAlign, variant, ...props }, ref) => (
    <td
      ref={ref}
      className={cn(cellVariants({ textAlign, variant, className }))}
      {...props}
    />
  )
);
TableCell.displayName = "TableCell";

export const TableHeaderCell = React.forwardRef<HTMLTableCellElement, TableHeaderCellProps>(
  ({ className, textAlign, variant, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        cellVariants({ textAlign, variant, className }),
        "font-semibold text-gray-900 dark:text-white"
      )}
      {...props}
    />
  )
);
TableHeaderCell.displayName = "TableHeaderCell";
```

# src\components\Typography\Heading.tsx

```tsx
/**
 * @deprecated Use Typography component instead. This component will be removed in the next major version.
 */
import * as React from 'react'
import { VariantProps, cva } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const headerVariants = cva(
  "text-4xl font-extrabold tracking-tight lg:text-5xl text-blue-500 dark:text-blue-400",
  {
    variants: {
      variant: {
        h1: "text-4xl font-extrabold tracking-tight lg:text-5xl",
        h2: "text-2xl font-bold tracking-tight lg:text-3xl",
        h3: "text-xl tracking-tight lg:text-xl",
        h4: "text-lg tracking-tight lg:text-lg",
        h5: "text-md tracking-tight lg:text-md",
        h6: "text-sm tracking-tight lg:text-sm",
      },
      colors:{
        primary: "text-primary dark:text-blue-400",
        secondary: "text-secondary dark:text-gray-300",
        tertiary: "text-tertiary dark:text-blue-100",
        danger: "text-danger dark:text-red-400",
        warning: "text-warning dark:text-yellow-400",
        success: "text-success dark:text-green-400",
        info: "text-info dark:text-cyan-400",
        dark: "text-dark/20 dark:text-gray-400/20",
        light: "text-white dark:text-white",
      },
      weight: {
        thin: "font-thin",
        light: "font-light",
        normal: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold",
        extrabold: "font-extrabold",
        black: "font-black",
      },
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
        justify: "text-justify",
      },
      transform: {
        uppercase: "uppercase",
        lowercase: "lowercase",
        capitalize: "capitalize",
        normalcase: "normal-case",
      },
      decoration: {
        underline: "underline",
        lineThrough: "line-through",
        noUnderline: "no-underline",
      },
      quickie:{
        q_grad_watermelone: "bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-green-500 to-violet-500",
        q_grad_aqua: "bg-clip-text text-transparent bg-gradient-to-r from-sky-300 via-blue-600 to-blue-700",
        q_grad_rasta: "bg-clip-text text-transparent bg-gradient-to-r from-green-500 via-green-600 to-green-700",
        q_grad_lemon: "bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-teal-500 to-teal-500",
        q_grad_rose: "bg-clip-text text-transparent bg-gradient-to-l from-rose-500 via-rose-600 to-teal-200",
        
        q_line:"underline underline-offset-2 hover:underline-offset-0 decoration-primary",
        q_line_sync:"underline underline-offset-2 hover:underline-offset-0 decoration-current",
        
        qc_leanFull: "w-full text-center",
        qc_leanLeft: "w-full text-left",
        qc_leanRight: "w-full text-right",

        qc_leanHalf: "w-1/2 text-center",
        qc_leanLeftHalf: "w-1/2 text-left",
        qc_leanRightHalf: "w-1/2 text-right",
        
        qc_short:"w-1/2 text-left",
        qc_shortLeft:"w-1/2 text-left",
        qc_shortRight:"w-1/2 text-right",
        shortCenter:"w-1/2 text-center",
        qc_shortJustify:"w-1/2 text-justify",
      },
      sectionWidth: {
        full: "w-full",
        half: "w-1/2",
        third: "w-1/3",
        fourth: "w-1/4",
      },
      animations:{
        x_wave: "animate-wave",
        x_jello: "animate-jello",
        x_rubberBand: "animate-rubberBand",
        x_flash: "animate-flash",
        x_wiggle: "animate-wiggle",
        x_bounce: "animate-bounce",
        x_spin: "animate-spin",
        x_pulse: "animate-pulse",
        x_ping: "animate-ping",

      }
    },
    defaultVariants: {
      variant: "h1",
      colors: "primary",
      weight: null,
      align: null,
      transform: null,
      decoration: null,
      quickie: null,
      animations:null,
      sectionWidth:null
    },
  }
)

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headerVariants> {
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, children, colors, variant, weight, align, transform, decoration, quickie, animations, sectionWidth, ...props }, ref) => {
    if(variant==='h1'){
        return (
          <h1
            className={cn(headerVariants({ variant, colors, weight, align, transform, decoration, quickie, animations, sectionWidth, className }))}
            ref={ref}
            {...props}
          >
            {children}
          </h1>
        )
    }
    if(variant==='h2'){
        return (
          <h2
            className={cn(headerVariants({ variant, colors, weight, align, transform, decoration, quickie, animations, sectionWidth, className }))}
            ref={ref}
            {...props}
          >
            {children}
          </h2>
        )
    }
    if(variant==='h3'){
        return (
          <h3
            className={cn(headerVariants({ variant, colors, weight, align, transform, decoration, quickie, animations, sectionWidth, className }))}
            ref={ref}
            {...props}
          >
            {children}
          </h3>
        )
    }
    if(variant==='h4'){
        return (
          <h4
            className={cn(headerVariants({ variant, colors, weight, align, transform, decoration, quickie, animations, sectionWidth, className }))}
            ref={ref}
            {...props}
          >
            {children}
          </h4>
        )
    }
    if(variant==='h5'){
        return (
          <h5
            className={cn(headerVariants({ variant, colors, weight, align, transform, decoration, quickie, animations, sectionWidth, className }))}
            ref={ref}
            {...props}
          >
            {children}
          </h5>
        )
    }
    if(variant==='h6'){
        return (
          <h6
            className={cn(headerVariants({ variant, colors, weight, align, transform, decoration, quickie, animations, sectionWidth, className }))}
            ref={ref}
            {...props}
          >
            {children}
          </h6>
        )
    }
    return (
        <h1
          className={cn(headerVariants({ variant, colors, weight, align, transform, decoration, quickie, animations, sectionWidth, className }))}
          ref={ref}
          {...props}
          >
          {children}
        </h1>
    )
  }
)
Heading.displayName = 'Heading'

export default Heading
```

# src\components\Typography\index.tsx

```tsx
export { default } from "./Heading";
```

# src\components\Typography\Typography.stories.tsx

```tsx
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Typography from './Typography';

const meta = {
  title: 'Components/Typography',
  component: Typography,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'blockquote', 'code', 'lead', 'large', 'small', 'muted'],
      description: 'The style variant of the typography element'
    },
    textColor: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'danger', 'warning', 'success', 'info', 'dark', 'light'],
      description: 'Text color'
    },
    weight: {
      control: 'select',
      options: ['thin', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black'],
      description: 'Font weight'
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right', 'justify'],
      description: 'Text alignment'
    },
    transform: {
      control: 'select',
      options: ['uppercase', 'lowercase', 'capitalize', 'normalcase'],
      description: 'Text transformation'
    },
    decoration: {
      control: 'select',
      options: ['underline', 'underline-2', 'underline-4', 'lineThrough', 'noUnderline'],
      description: 'Text decoration'
    },
    gradient: {
      control: 'select',
      options: ['none', 'watermelon', 'aqua', 'rasta', 'lemon', 'rose'],
      description: 'Gradient effect'
    },
    animation: {
      control: 'select',
      options: ['none', 'wave', 'wiggle', 'bounce', 'spin', 'pulse', 'ping'],
      description: 'Animation effect'
    }
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof Typography>;

const sampleText = {
  short: 'The quick brown fox jumps over the lazy dog',
  medium: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  long: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
};

export const Default: Story = {
  args: {
    children: sampleText.medium,
    variant: 'p',
    textColor: 'primary',
  },
};

export const Headings: Story = {
  render: () => (
    <div className="space-y-4">
      <Typography variant="h1">Heading 1</Typography>
      <Typography variant="h2">Heading 2</Typography>
      <Typography variant="h3">Heading 3</Typography>
      <Typography variant="h4">Heading 4</Typography>
      <Typography variant="h5">Heading 5</Typography>
      <Typography variant="h6">Heading 6</Typography>
    </div>
  ),
};

export const TextVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Typography variant="lead">Lead text - {sampleText.medium}</Typography>
      <Typography variant="p">Paragraph - {sampleText.medium}</Typography>
      <Typography variant="large">Large text - {sampleText.medium}</Typography>
      <Typography variant="small">Small text - {sampleText.medium}</Typography>
      <Typography variant="muted">Muted text - {sampleText.medium}</Typography>
      <Typography variant="blockquote">{sampleText.short}</Typography>
      <Typography variant="code">console.log('Hello World');</Typography>
    </div>
  ),
};

export const ColorVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Typography textColor="primary">Primary Color</Typography>
      <Typography textColor="secondary">Secondary Color</Typography>
      <Typography textColor="tertiary">Tertiary Color</Typography>
      <Typography textColor="danger">Danger Color</Typography>
      <Typography textColor="warning">Warning Color</Typography>
      <Typography textColor="success">Success Color</Typography>
      <Typography textColor="info">Info Color</Typography>
      <Typography textColor="dark">Dark Color</Typography>
      <Typography textColor="light" className="bg-gray-800 p-2">Light Color</Typography>
    </div>
  ),
};

export const WeightVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Typography weight="thin">Thin weight text</Typography>
      <Typography weight="light">Light weight text</Typography>
      <Typography weight="normal">Normal weight text</Typography>
      <Typography weight="medium">Medium weight text</Typography>
      <Typography weight="semibold">Semibold weight text</Typography>
      <Typography weight="bold">Bold weight text</Typography>
      <Typography weight="extrabold">Extrabold weight text</Typography>
      <Typography weight="black">Black weight text</Typography>
    </div>
  ),
};

export const AlignmentVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Typography align="left">{sampleText.medium}</Typography>
      <Typography align="center">{sampleText.medium}</Typography>
      <Typography align="right">{sampleText.medium}</Typography>
      <Typography align="justify">{sampleText.medium}</Typography>
    </div>
  ),
};

export const TransformVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Typography transform="uppercase">Uppercase text</Typography>
      <Typography transform="lowercase">Lowercase Text</Typography>
      <Typography transform="capitalize">Capitalized text</Typography>
      <Typography transform="normalcase">Normal case text</Typography>
    </div>
  ),
};

export const DecorationVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Typography decoration="underline">Underline text</Typography>
      <Typography decoration="underline-2">Underline-2 text</Typography>
      <Typography decoration="underline-4">Underline-4 text</Typography>
      <Typography decoration="lineThrough">LineThrough text</Typography>
      <Typography decoration="noUnderline">No underline text</Typography>
    </div>
  ),
};

export const GradientVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Typography variant="h2" gradient="watermelon">Watermelon gradient</Typography>
      <Typography variant="h2" gradient="aqua">Aqua gradient</Typography>
      <Typography variant="h2" gradient="rasta">Rasta gradient</Typography>
      <Typography variant="h2" gradient="lemon">Lemon gradient</Typography>
      <Typography variant="h2" gradient="rose">Rose gradient</Typography>
    </div>
  ),
};

export const AnimationVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Typography animation="wave">Wave animation</Typography>
      <Typography animation="wiggle">Wiggle animation</Typography>
      <Typography animation="bounce">Bounce animation</Typography>
      <Typography animation="spin">Spin animation</Typography>
      <Typography animation="pulse">Pulse animation</Typography>
      <Typography animation="ping">Ping animation</Typography>
    </div>
  ),
};

export const CombinedExample: Story = {
  render: () => (
    <div className="space-y-8">
      <Typography 
        variant="h1"
        gradient="watermelon"
        animation="wave"
        align="center"
      >
        Welcome to Typography
      </Typography>
      
      <Typography 
        variant="lead"
        textColor="info"
        weight="semibold"
        align="center"
      >
        {sampleText.medium}
      </Typography>
      
      <Typography 
        variant="blockquote"
        gradient="aqua"
        align="center"
      >
        {sampleText.short}
      </Typography>
      
      <Typography 
        variant="code"
        textColor="success"
        align="center"
      >
        npm install your-awesome-package
      </Typography>
    </div>
  ),
};

export const Playground: Story = {
  args: {
    children: "Try different combinations in the controls!",
    variant: "h2",
    textColor: "primary",
    weight: "bold",
    align: "center",
    transform: "normalcase",
    decoration: "noUnderline",
    gradient: "none",
    animation: "none",
  },
};
```

# src\components\Typography\Typography.tsx

```tsx
import * as React from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const typographyVariants = cva(
  "text-base tracking-tight", 
  {
    variants: {
      variant: {
        h1: "text-4xl font-extrabold lg:text-5xl",
        h2: "text-3xl font-bold lg:text-4xl",
        h3: "text-2xl font-semibold lg:text-3xl",
        h4: "text-xl font-semibold lg:text-2xl",
        h5: "text-lg font-medium lg:text-xl",
        h6: "text-base font-medium lg:text-lg",
        p: "text-base leading-7",
        blockquote: "text-xl italic font-semibold",
        code: "font-mono text-sm",
        lead: "text-xl text-gray-600 dark:text-gray-400",
        large: "text-lg font-semibold",
        small: "text-sm font-medium leading-none",
        muted: "text-sm text-gray-600 dark:text-gray-400",
      },
      textColor: {
        primary: "text-primary dark:text-blue-400",
        secondary: "text-secondary dark:text-gray-300",
        tertiary: "text-tertiary dark:text-blue-100",
        danger: "text-danger dark:text-red-400",
        warning: "text-warning dark:text-yellow-400",
        success: "text-success dark:text-green-400",
        info: "text-info dark:text-cyan-400",
        dark: "text-dark dark:text-gray-400",
        light: "text-white dark:text-white",
      },
      weight: {
        thin: "font-thin",
        light: "font-light",
        normal: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold",
        extrabold: "font-extrabold",
        black: "font-black",
      },
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
        justify: "text-justify",
      },
      transform: {
        uppercase: "uppercase",
        lowercase: "lowercase",
        capitalize: "capitalize",
        normalcase: "normal-case",
      },
      decoration: {
        underline: "underline decoration-1",
        'underline-2': "underline decoration-2",
        'underline-4': "underline decoration-4",
        lineThrough: "line-through",
        noUnderline: "no-underline",
      },
      gradient: {
        none: "",
        watermelon: "bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-green-500 to-violet-500",
        aqua: "bg-clip-text text-transparent bg-gradient-to-r from-sky-300 via-blue-600 to-blue-700",
        rasta: "bg-clip-text text-transparent bg-gradient-to-r from-green-500 via-green-600 to-green-700",
        lemon: "bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-teal-500 to-teal-500",
        rose: "bg-clip-text text-transparent bg-gradient-to-l from-rose-500 via-rose-600 to-teal-200",
      },
      animation: {
        none: "",
        wave: "animate-wave",
        wiggle: "animate-wiggle",
        bounce: "animate-bounce",
        spin: "animate-spin",
        pulse: "animate-pulse",
        ping: "animate-ping",
      }
    },
    defaultVariants: {
      variant: "p",
      textColor: "primary",
      weight: "normal",
      align: "left",
      gradient: "none",
      animation: "none"
    }
  }
);

interface BaseTypographyProps extends Omit<React.HTMLAttributes<HTMLElement>, 'color'> {}

export interface TypographyProps extends BaseTypographyProps, VariantProps<typeof typographyVariants> {}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ 
    className, 
    children, 
    variant = "p", 
    textColor, 
    weight,
    align,
    transform,
    decoration,
    gradient,
    animation,
    ...props 
  }, ref) => {
    const Component = React.useMemo(() => {
      switch (variant) {
        case 'h1':
          return 'h1';
        case 'h2':
          return 'h2';
        case 'h3':
          return 'h3';
        case 'h4':
          return 'h4';
        case 'h5':
          return 'h5';
        case 'h6':
          return 'h6';
        case 'blockquote':
          return 'blockquote';
        case 'code':
          return 'code';
        case 'lead':
        case 'large':
        case 'small':
        case 'muted':
        default:
          return 'p';
      }
    }, [variant]) as keyof JSX.IntrinsicElements;

    return React.createElement(
      Component,
      {
        ref,
        className: cn(
          typographyVariants({ 
            variant, 
            textColor, 
            weight,
            align,
            transform,
            decoration,
            gradient,
            animation,
            className 
          })
        ),
        ...props
      },
      children
    );
  }
);

Typography.displayName = 'Typography';

export default Typography;
```

# src\index.ts

```ts
export * from './components';
import "../dist/styles.css";

```

# src\lib\utils.ts

```ts
import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

# src\tailwind.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --foreground-rgb: 0, 0, 0;
  --background-start-rgb: 214, 219, 220;
  --background-end-rgb: 255, 255, 255;
}

@media (prefers-color-scheme: dark) {
  :root {
    --foreground-rgb: 255, 255, 255;
    --background-start-rgb: 0, 0, 0;
    --background-end-rgb: 0, 0, 0;
  }
}

body {
  color: rgb(var(--foreground-rgb));
  background: linear-gradient(
      to bottom,
      transparent,
      rgb(var(--background-end-rgb))
    )
    rgb(var(--background-start-rgb));
}

```

# tailwind.config.js

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  darkMode: 'dark',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3b82f6",
        secondary: "#9ca3af",
        tertiary: "#dbeafe",
        danger: "#ef4444",
        warning: "#eab308",
        success: "#22c55e",
        info: "#06b6d4",
        dark: "#e5e7eb",
        bg: "#172554"
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        wave: {
          '0%': { transform: 'rotate(0.0deg)' },
          '10%': { transform: 'rotate(14deg)' },
          '20%': { transform: 'rotate(-8deg)' },
          '30%': { transform: 'rotate(14deg)' },
          '40%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(10.0deg)' },
          '60%': { transform: 'rotate(0.0deg)' },
          '100%': { transform: 'rotate(0.0deg)' },
        },
        rubberBand: {
            '0%': { 
              transform: 'scale3d(1, 1, 1)' 
              },
            '30%': { 
              transform: 'scale3d(1.25, 0.75, 1)' 
              },
            '40%': { 
              transform: 'scale3d(0.75, 1.25, 1)' 
              },
            '50%': { 
              transform: 'scale3d(1.15, 0.85, 1)' 
              },
            '65%': { 
              transform: 'scale3d(.95, 1.05, 1)' 
              },
            '75%': { 
              transform: 'scale3d(1.05, .95, 1)' 
              },
            '100%': { 
              transform: 'scale3d(1, 1, 1)' 
              },
          },
          flash: {
            '25%, 40%': { opacity: '0' },
            '50%': { opacity: '1' },
            '75%': { opacity: '0' },
          },
          jello: {
            '11.1%,': { transform: 'scale3d(0, 0, 0)' },
            '33.3%': { transform: 'skewX(-12.5deg) skewY(-12.5deg)' },
            '44.4%': { transform: 'skewX(6.25deg) skewY(6.25deg)' },
            '55.5%': { transform: 'skewX(-3.125deg) skewY(-3.125deg)' },
            '66.6%': { transform: 'skewX(1.5625) skewY(1.5625)' },
            '77.7%': { transform: 'skewX(-0.78125) skewY(-0.78125)' },
            '88.8%': { transform: 'skewX(-0.1953125deg) skewY(-0.1953125deg)'},
          }
      },
       animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
        wave: 'wave 2s linear infinite',
        rubberBand: 'rubberBand 1s infinite',
        flash: 'flash 3s ease-in-out infinite',
        jello: 'jello 2s infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}

```

# tsconfig.json

```json
{
  "compilerOptions": {
    "target": "es5",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true,
    "jsx": "react",
    "module": "ESNext",
    "declaration": true,
    "declarationDir": "types",
    "sourceMap": true,
    "outDir": "dist",
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "emitDeclarationOnly": true,
    "types": ["node", "@storybook/react"]
  },
  "include": ["src/**/*", ".storybook/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

