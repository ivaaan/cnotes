module.exports = {
    testEnvironment: 'jsdom',
    roots: ['<rootDir>/src'],
    testMatch: ['**/__tests__/*.(js|ts)?(x)'],
    // testMatch: ['**/__tests__/**/*.+(js|jsx|ts|tsx)', '**/?(*.)+(spec|test).+(js|jsx|ts|tsx)'],
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/src/__mocks__/fileMock.js',
        '\\.(css|scss)$': 'identity-obj-proxy',
      },
  };
  
