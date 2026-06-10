import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    include: [
      '**/vue.test.ts',
      '**/composition.test.ts',
      '**/shared.test.ts',
      '**/validator.test.ts',
      '**/fixer.test.ts',
      '**/state.test.ts',
      '**/style.test.ts',
      '**/html.test.ts',
      '**/utils.test.ts',
      '**/template.test.ts',
      '**/scripts.test.ts',
      '**/scriptSetup.test.ts',
      '**/compositionPatch.test.ts',
      '**/icons.test.ts'
    ]
  }
});
