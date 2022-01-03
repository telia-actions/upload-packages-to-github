module.exports = {
  clearMocks: true,
  restoreMocks: true,
  preset: 'jest-preset-typescript',
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.{ts,js}', '!<rootDir>/src/utils/files/**/*'],
  coverageReporters: ['text-summary', 'text'],
};
