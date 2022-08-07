export default {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  collectCoverage: false,
  testEnvironment: 'node',
  testMatch: ['**/*.e2e-spec.ts'],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  verbose: true,
};
