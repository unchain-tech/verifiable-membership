import { readFileSync } from 'fs';

import { parse } from 'jsonc-parser';
import nextJest from 'next/jest';
import { pathsToModuleNameMapper } from 'ts-jest';

import type { Config } from '@jest/types';

// tsconfig.jsonがjsoncファイルなので、jsonc-parserを使ってパースする
const { compilerOptions } = parse(readFileSync('./tsconfig.json').toString());

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig: Config.InitialOptions = {
  testEnvironment: 'jest-environment-jsdom',
  // moduleDirectories: ["node_modules", "<rootDir>/"],
  // moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
  // 	prefix: "<rootDir>/",
  // }),
  // modulePaths: [compilerOptions.baseUrl],
  roots: ['<rootDir>/tests'],
  testMatch: ['**/*.test.{ts,tsx}'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};

module.exports = createJestConfig(customJestConfig);
