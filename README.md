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
- [`BaseContentWrapper`](#basecontentwrapper)
- [`IconWrapper`](#iconwrapper)
- [`Metadata`](#metadata)
- [`BaseAccordion`](#baseaccordion)
- [`BaseInputField`](#baseinputfield)
- [`BaseRadioButton`](#baseradiobutton)
- [`Drawer`](#drawer)
- [`DynamicZone`](#dynamiczone)
- [`Form`](#form)
- [`ReactPortal`](#reactportal)

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

### `BaseContentWrapper`

### `IconWrapper`

### `Metadata`

### `BaseAccordion`

### `BaseInputField`

### `BaseRadioButton`

### `Drawer`

### `DynamicZone`

### `Form`

### `ReactPortal`

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
