import type { Config } from 'jest'

const config: Config = {
  preset:             'ts-jest',
  testEnvironment:    'jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  moduleNameMapper: {
    '\\.(css|less|scss)$': 'identity-obj-proxy',
    '^../../api/client$': '<rootDir>/src/__mocks__/client.ts',
    '^../api/client$':    '<rootDir>/src/__mocks__/client.ts',
  },
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: './tsconfig.test.json',
    }],
  },
}

export default config