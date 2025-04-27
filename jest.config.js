const { createConfig } = require('@openedx/frontend-base/config');

module.exports = createConfig('test', {
  setupFilesAfterEnv: [
    'jest-expect-message',
    '<rootDir>/src/setupTest.jsx',
  ],
  coveragePathIgnorePatterns: [
    'src/segment.js',
    'src/postcss.config.js',
    'testUtils', // don't unit test jest mocking tools
    'src/data/services/lms/fakeData', // don't unit test mock data
    'src/test', // don't unit test integration test utils
    'src/__mocks__',
  ],
  moduleNameMapper: {
    '\\.svg$': '<rootDir>/src/__mocks__/svg.js',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/src/__mocks__/file.js',
  },
  testTimeout: 120000,
});
