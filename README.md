# @grace-studio/graceful-next

<div align="center">

[![Sonarcloud Status](https://sonarcloud.io/api/project_badges/measure?project=grace-studio_graceful-next&metric=alert_status)](https://sonarcloud.io/dashboard?id=grace-studio_graceful-next)
[![SonarCloud Coverage](https://sonarcloud.io/api/project_badges/measure?project=grace-studio_graceful-next&metric=coverage)](https://sonarcloud.io/component_measures/metric/coverage/list?id=grace-studio_graceful-next)

</div>

Uses Tailwind etc.

## Utils

- [`generateUUID`](#generateuuid)

### `generateUUID()`

Generates a random string of 32 characters matching regex pattern `^[a-z0-9]{32}$`.

```ts
import { generateUUID } from '@grace-studio/graceful-next/utils';

const randomString = generateUUID();
// eg. 201c5ec765e54290a66a7495f70f0dea
```

## Components

- [`BaseButton`](#basebutton)
- [`BaseContentWrapper`](#basecontentwrapper)
- [`IconWrapper`](#iconwrapper)
- [`Metadata`](#metadata)

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

## Strapi

- [`getBlockName`](#getblockname)

### `getBlockName`

## Types
