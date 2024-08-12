import { defineConfig } from 'cypress';
import { configureVisualRegression } from 'cypress-visual-regression/dist/plugin';

import coverage from '@cypress/code-coverage/task';

export default defineConfig({
  env: {
    CY_APP_EXAMPLE_API: 'https://example.dummy-api.com',
  },
  e2e: {
    baseUrl: 'http://localhost:9090',
    specPattern: 'cypress/e2e/**/*.cy.spec.ts',
    supportFile: 'cypress/support/e2e.ts',
    env: {
      visualRegressionType: 'regression',
      visualRegressionBaseDirectory: 'cypress/snapshots/base',
      visualRegressionDiffDirectory: 'cypress/snapshots/diff',
      visualRegressionGenerateDiff: 'always',
      visualRegressionFailSilently: true,
    },
    screenshotsFolder: 'cypress/snapshot/actual',
    setupNodeEvents(on, config) {
      coverage(on, config);
      configureVisualRegression(on);

      return config;
    },
  },
  component: {
    specPattern: 'src/**/*.cy.spec.ts',
    setupNodeEvents(on, config) {
      configureVisualRegression(on);
      coverage(on, config);

      return config;
    },
    devServer: {
      framework: 'vue',
      bundler: 'vite',
    },
  },
});
