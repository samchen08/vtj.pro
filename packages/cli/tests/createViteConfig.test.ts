import { expect, test } from 'vitest';
import { createViteConfig } from '../src';

test('createViteConfig', () => {
  const envType = 'dev';
  const envConfig = {
    dev: {}
  };
  const config = createViteConfig({
    envConfig,
    envType,
    debug: false
  });

  expect(!!config).toBeTruthy();
});
