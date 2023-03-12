/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

const tsconfig = require('./tsconfig.test.json');
const moduleNameMapper = require('tsconfig-paths-jest')(tsconfig);

module.exports = {
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.test.json',
      diagnostics: true,
    },
    NODE_ENV: 'test',
  },
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  moduleNameMapper,
};