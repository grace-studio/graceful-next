/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  transformIgnorePatterns: ['/node_modules/nanoid/'],
  preset: 'ts-jest',
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.test.json',
      },
    ],
  },
  testEnvironment: 'node',
};
