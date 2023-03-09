# @grace-studio/graceful-next

[![Sonarcloud Status](https://sonarcloud.io/api/project_badges/measure?project=grace-studio_graceful-next&metric=alert_status)](https://sonarcloud.io/dashboard?id=grace-studio_graceful-next)
[![SonarCloud Coverage](https://sonarcloud.io/api/project_badges/measure?project=grace-studio_graceful-next&metric=coverage)](https://sonarcloud.io/component_measures/metric/coverage/list?id=grace-studio_graceful-next)

# Utils

- [`generateUUID`](#generateuuid)

## `generateUUID()`

Generates a random string of 32 characters matching regex pattern `^[a-z0-9]{32}$`.

```js
const randomString = generateUUID();
// eg. 201c5ec765e54290a66a7495f70f0dea
```
