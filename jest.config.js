const { createConfig } = require('@openedx/frontend-base/tools');

const config = createConfig('test', {
  setupFilesAfterEnv: [
    'jest-expect-message',
    '<rootDir>/src/setupTest.jsx',
  ],
  coveragePathIgnorePatterns: [
    'src/segment.js',
    'testUtils', // don't unit test jest mocking tools
    'src/__mocks__',
  ],
  moduleNameMapper: {
    '\\.svg$': '<rootDir>/src/__mocks__/svg.js',
    '\\.png$': '<rootDir>/src/__mocks__/file.js',
    '^@src/(.*)$': '<rootDir>/src/$1',
  },
  testTimeout: 120000,
});

module.exports = config;
