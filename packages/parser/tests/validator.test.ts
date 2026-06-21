import { expect, test, describe } from 'vitest';
import { ComponentValidator } from '../src';

const validValidatorSFC = `
<template>
  <div>Hello</div>
  <VanIcon name="user" />
</template>

<script>
export default {
  setup() {
    const state = reactive({
      count: 1,
      name: ''
    });
    const msg = ref('hello');
    return { count, name, msg };
  }
};
</script>

<style scoped>
.test { color: red; }
</style>
`;

const missingScriptSFC = `
<template>
  <div>Hello</div>
</template>

<style scoped>
.test { }
</style>
`;

const tooFewSetupLines = `
<template>
  <div>Hello</div>
</template>

<script>
export default {
  setup() {
    const msg = ref('hello');
    return { msg };
  }
};
</script>

<style scoped>
</style>
`;

const tooManySetupLines = `
<template>
  <div>Hello</div>
</template>

<script>
export default {
  setup() {
    const state = reactive({
      count: 1
    });
    const msg = ref('hello');
    const title = ref('world');
    return { count, msg, title };
  }
};
</script>

<style scoped>
</style>
`;

const incompleteCodeSFC = `
<template>
  <div>Hello</div>
</template>

<script>
export default {
  setup() {
    const state = reactive({
      count: 1
    });
    // 其他逻辑保持不变
    return { count };
  }
};
</script>

<style scoped>
</style>
`;

const illegalVantIconSFC = `
<template>
  <div>Hello</div>
  <VanIcon name="non-existent-icon-name" />
</template>

<script>
export default {
  setup() {
    const state = reactive({
      count: 1
    });
    return { count };
  }
};
</script>

<style scoped>
</style>
`;

const illegalVtjIconSFC = `
<template>
  <div>Hello</div>
</template>

<script>
import { NonExistentIcon } from '@vtj/icons';
export default {
  data() {
    return {};
  },
  setup() {
    const state = reactive({
      count: 1
    });
    return { NonExistentIcon, count };
  }
};
</script>

<style scoped>
</style>
`;

describe('ComponentValidator', () => {
  const validator = new ComponentValidator();

  test('should validate a proper SFC', () => {
    const result = validator.validate(validValidatorSFC);
    expect(result.valid).toBe(true);
    expect(result.errors.length).toBe(0);
  });

  test('should reject SFC missing script', () => {
    const result = validator.validate(missingScriptSFC);
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });

  test('should reject setup with too few lines', () => {
    const result = validator.validate(tooFewSetupLines);
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.includes('setup'))).toBe(true);
  });

  test('should reject setup with too many lines', () => {
    const result = validator.validate(tooManySetupLines);
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.includes('setup'))).toBe(true);
  });

  test('should detect unchanged comment', () => {
    const result = validator.validate(incompleteCodeSFC);
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.includes('不能有任何省略'))).toBe(true);
  });

  test('should detect illegal Vant icons', () => {
    const result = validator.validate(illegalVantIconSFC);
    expect(result.illegalVantIcons.length).toBeGreaterThan(0);
    expect(result.illegalVantIcons).toContain('non-existent-icon-name');
  });

  test('should detect illegal Vtj icons', () => {
    const result = validator.validate(illegalVtjIconSFC);
    expect(result.illegalVtjIcons.length).toBeGreaterThan(0);
    expect(result.illegalVtjIcons).toContain('NonExistentIcon');
  });

  test('should handle syntax error gracefully', () => {
    const result = validator.validate(`
<template><div/></template>
<script>export default { bad syntax ! }</script>
<style></style>
`);
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });
});
