# vite-join-media-queries

## About

This library is needed to optimize the css bundle in applications that use vite.

**input.css**

```css
div {
  width: 100px;
}
@media (max-width: 1200px) {
  div {
    width: 100px;
  }
}
p {
  color: red;
}
@media (max-width: 1200px) {
  p {
    color: blue;
  }
}
```

**output.css**

```css
div {
  width: 100px;
}
p {
  color: red;
}
@media (max-width: 1200px) {
  div {
    width: 100px;
  }
  p {
    color: blue;
  }
}
```

## Install

### npm

```bash
npm install vite-join-media-queries --save-dev
```

### yarn

```bash
yarn add vite-join-media-queries --dev
```

## Usage

**/vite.config.js**

```typescript
import viteJoinMediaQueries from 'vite-join-media-queries';

interface Config {
  paths2css?: string[];
  cssnanoConfig?: Object;
}

const config: Config = {};

export default defineConfig({
  plugins: [viteJoinMediaQueries(config)],
});
```

## Defaults:

- paths2css: `['./dist/assets']`
- cssnanoConfig: `{ preset: 'default' }`

## Side Effects

Rearranging css rules can (with a bad strategy for organizing CSS code in a project) lead to unexpected consequences. Therefore, it is recommended to enable this plugin during development, and not just when building before deploying. [See more here](https://www.npmjs.com/package/postcss-combine-media-query#side-effects).
