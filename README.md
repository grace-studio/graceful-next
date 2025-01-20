# @grace-studio/graceful-next

[![npm version](https://badge.fury.io/js/@grace-studio%2Fgraceful-next.svg)](https://badge.fury.io/js/@grace-studio%2Fgraceful-next)
[![Sonarcloud Status](https://sonarcloud.io/api/project_badges/measure?project=grace-studio_graceful-next&metric=alert_status)](https://sonarcloud.io/dashboard?id=grace-studio_graceful-next)
[![SonarCloud Coverage](https://sonarcloud.io/api/project_badges/measure?project=grace-studio_graceful-next&metric=coverage)](https://sonarcloud.io/component_measures/metric/coverage/list?id=grace-studio_graceful-next)

Uses Tailwind etc.

## Installation

```
yarn add @grace-studio/graceful-next
```

Add transpiling of packge to Next.js config file - `next.config.js`

```js
const nextConfig = {
  ...
  transpilePackages: ["@grace-studio/graceful-next"],
};
```

Add CSS scanning for Tailwind config file - `tailwind.config.js`

```js
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@grace-studio/graceful-next/lib/**/*.tsx',
  ],
  ...
};
```

<!-- ## COMPONENTS ## -->

## Components

- [`BaseButton`](#basebutton)
- [`StrapiDynamicZone`](#strapidynamiczone)

### `BaseButton`

Button made for styling with all major button functionality.

```tsx
import { BaseButton } from '@grace-studio/graceful-next/components';

const classes = 'all the classes needed for styling of the button';

return (
  <BaseButton
    className={classes}
    {/* will always be used if present */}
    onClick={() => {
      console.log('clicked');
    }}

    {/* will render link element if present */}
    href="/link"
    target="_blank"
  >
    Click me!
  </BaseButton>
)

```

### `StrapiDynamicZone`

The `StrapiDynamicZone` component is a dynamic rendering utility for Strapi CMS blocks in a Next.js application. It leverages a mapping of block types to React components and dynamically renders the appropriate component based on the block's `__typename`.

**Example Implementation**

```tsx
import {
  StrapiDynamicZone,
  StrapiDynamicZoneProps,
} from '@grace-studio/graceful-next/components';
import dynamic from 'next/dynamic';

// Define the block-to-component mapping
export const blockMapping = {
  'test-1': dynamic(() => import('@/components/blocks/Test1')),
  test2: dynamic(() => import('@/components/blocks/Test2')),
};

// Define the blocks to render
// This data will come from Strapi
const strapiBlocks: StrapiDynamicZoneProps['blocks'] = [
  { __typename: 'test-1', someProp: 'hej' },
  { __typename: 'this-will-not-match', someProp: 'hej' },
  { __typename: 'test2', someProp: 'hej', anotherProp: 'blaha' },
  { __typename: 'test-1', someProp: 'hej' },
];

const BlocksPage = () => (
  <div className="p-6 grid gap-4">
    <StrapiDynamicZone blockMapping={blockMapping} blocks={strapiBlocks} />
  </div>
);

export default BlocksPage;
```

**Props**
| Name | Type | Description |
|---------------|----------------------------------------------------|-----------------------------------------------------------------------------|
| `blockMapping`| `Record<string, ComponentType>` | A mapping of block types to dynamically imported React components. |
| `blocks` | `({__typename: string} & Record<string, any>)[]` | An array of blocks to render. Each block must include a `__typename`. |
| `elementType` | `HTMLElementType` _(optional)_ | Specifies the HTML element type to use as the wrapper. Defaults to `section`. |

---

**Notes**

- If a block's `__typename` does not exist in `blockMapping`, it will not render.
- `elementType` allows you to specify a custom wrapper element (e.g., `div`, `article`).

<!-- ## HOOKS ## -->

## Hooks

- [`createUseTranslation`](#createusetranslation)
- [`useMicroStore`](#usemicrostore)
- [`useMousePosition`](#usemouseposition)
- [`usePreventBodyScroll`](#usepreventbodyscroll)

### `createUseTranslation`

### `useMicroStore`

### `useMousePosition`

### `usePreventBodyScroll`

<!-- ## UTILS ## -->

## Utils

- [`clampValue`](#clampvalue)
- [`nanoid`](#nanoid)
- [`generateUUID`](#generateuuid)

### `clampValue`

### `nanoid`

### `generateUUID`

Generates a random string of 32 characters matching regex pattern `^[a-z0-9]{32}$`.

```ts
import { generateUUID } from '@grace-studio/graceful-next/utils';

const randomString = generateUUID();
// eg. 201c5ec765e54290a66a7495f70f0dea
```

<!-- STRAPI -->

## Strapi

- [`getBlockName`](#getblockname)

### `getBlockName`

## Misc

### Next Image Loader

Enable the use of a **imgproxy** server by setting the file loader for Next images.

In `next.config.js` add:

```js
images: {
  loader: 'custom',
  loaderFile: './src/image-loader.ts',
}
```

Add a file `src/image-loader.ts` with the following content:

```ts
'use client';
import { imageLoader } from '@grace-studio/graceful-next/misc';

export default imageLoader(IMAGE_PROXY_URL);
```
