import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    include: [
      'tests/**/*.test.ts'
    ],
    exclude: [
      '**/vue-parser.test.ts',
      '**/node_modules/**'
    ],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.ts'],
      exclude: ['src/**/index.ts', 'src/version.ts'],
      reporter: ['text', 'text-summary', 'json-summary'],
      thresholds: {
        lines: 85,
        functions: 85,
        branches: 78,
        statements: 85
      }
    }
  }
});
