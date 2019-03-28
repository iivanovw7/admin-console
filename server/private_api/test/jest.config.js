// jest.config.js
const { defaults } = require ('jest-config');

module.exports = {
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  setupFilesAfterEnv: ['./setup.js'],
  verbose: true,
  globalSetup: './setup.js',
  globalTeardown: './teardown.js',
  testEnvironment: './mongo-environment.js',
};

