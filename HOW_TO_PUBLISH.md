## How to publish updates to NPM

Make sure that all stages are commited and the repository is clean.

### Determine level of update

[Here is a good explanation](https://semver.org/#summary)

Then run one of the following:

```
npm version patch
  or
npm version minor
  or
npm version major
```

### Publish new package

```
npm publish
```
