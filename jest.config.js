module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  moduleFileExtensions: [
    'js',
    'json',
    'vue'
  ],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.vue$': '@vue/vue2-jest'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  testMatch: [
    '**/tests/unit/**/*.spec.js',
    '**/__tests__/*.js'
  ],
  setupFilesAfterEnv: ['<rootDir>/tests/unit/setup.js']
};
