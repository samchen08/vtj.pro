import { expect, test, describe } from 'vitest';
import { ComponentValidator, AutoFixer } from '../src';

const sfcWithIllegalVantIcon = `
<template>
  <div>Hello</div>
  <VanIcon name="non-existent-icon" />
  <van-icon name="another-bad-icon" />
</template>

<script>
export default {
  setup() {
    const state = reactive({
      count: 1
    });
    const msg = ref('hello');
    return { count, msg };
  }
};
</script>

<style scoped>
.test { color: red; }
</style>
`;

const sfcWithIllegalVtjIcon = `
<template>
  <div>
    <MyComponent :icon="NonExistentIcon" />
  </div>
</template>

<script>
import { User, NonExistentIcon } from '@vtj/icons';
export default {
  data() {
    return {};
  },
  setup() {
    const state = reactive({
      count: 1
    });
    const msg = ref('hello');
    return { User, NonExistentIcon, count, msg };
  }
};
</script>

<style scoped>
.test { }
</style>
`;

const sfcWithStatePrefixIssue = `
<template>
  <div>
    <p>{{ count }}</p>
    <span :title="count">{{ name }}</span>
    <button v-if="showFlag">Show</button>
    <input v-model="value" />
    <div v-for="item in list" :key="item.id">{{ item }}</div>
  </div>
</template>

<script>
export default {
  setup() {
    const state = reactive({
      count: 0,
      name: '',
      showFlag: true,
      value: '',
      list: []
    });
    const msg = ref('hello');
    return { count, name, showFlag, value, list, msg };
  }
};
</script>

<style scoped>
</style>
`;

const sfcClean = `
<template>
  <div>Hello</div>
  <VanIcon name="user" />
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
.test { color: red; }
</style>
`;

describe('AutoFixer', () => {
  const validator = new ComponentValidator();
  const fixer = new AutoFixer();

  test('should replace illegal Vant icons with default', () => {
    const validation = validator.validate(sfcWithIllegalVantIcon);
    expect(validation.illegalVantIcons.length).toBeGreaterThan(0);

    const fixed = fixer.fixBasedOnValidation(
      sfcWithIllegalVantIcon,
      validation
    );
    expect(fixed).toContain('name="user"');
    expect(fixed).not.toContain('non-existent-icon');
    expect(fixed).not.toContain('another-bad-icon');
  });

  test('should replace illegal Vtj icons with default', () => {
    const validation = validator.validate(sfcWithIllegalVtjIcon);
    expect(validation.illegalVtjIcons.length).toBeGreaterThan(0);

    const fixed = fixer.fixBasedOnValidation(sfcWithIllegalVtjIcon, validation);
    expect(fixed).toContain('User');
    expect(fixed).not.toContain('NonExistentIcon');
  });

  test('should handle clean code without errors', () => {
    const fixed = fixer.fixBasedOnValidation(sfcClean, {
      valid: false,
      errors: [],
      illegalVantIcons: [],
      illegalVtjIcons: []
    });
    expect(fixed).toContain('<template>');
    expect(fixed).toContain('VanIcon');
  });

  test('should fix state prefix issues', () => {
    const validation = validator.validate(sfcWithStatePrefixIssue);
    expect(validation.illegalVantIcons.length).toBe(0);
    expect(validation.illegalVtjIcons.length).toBe(0);

    const fixed = fixer.fixBasedOnValidation(
      sfcWithStatePrefixIssue,
      validation
    );
    expect(fixed).toContain('state.count');
    expect(fixed).toContain('state.name');
    expect(fixed).toContain('state.showFlag');
    expect(fixed).toContain('state.value');
    expect(fixed).toContain('state.list');
  });
});
