import { expect, test, describe } from 'vitest';
import { checkAndFixStatePrefix } from '../src/tools/state';

describe('checkAndFixStatePrefix', () => {
  test('should add state. prefix to interpolation expressions', () => {
    const source = `
<template>
  <div>
    <p>{{ count }}</p>
    <p>{{ name }}</p>
  </div>
</template>

<script>
export default {
  setup() {
    const state = reactive({
      count: 0,
      name: ''
    });
    return { count, name };
  }
};
</script>

<style scoped>
</style>
`;
    const result = checkAndFixStatePrefix(source);
    expect(result.fixed).toBe(true);
    expect(result.fixedCode).toContain('state.count');
    expect(result.fixedCode).toContain('state.name');
  });

  test('should add state. prefix to binding attributes', () => {
    const source = `
<template>
  <div>
    <span :title="count">{{ name }}</span>
    <my-component :prop="count"></my-component>
  </div>
</template>

<script>
export default {
  setup() {
    const state = reactive({
      count: 0,
      name: ''
    });
    return { count, name };
  }
};
</script>

<style scoped>
</style>
`;
    const result = checkAndFixStatePrefix(source);
    expect(result.fixed).toBe(true);
    expect(result.fixedCode).toContain('state.count');
  });

  test('should add state. prefix to v-if and v-show', () => {
    const source = `
<template>
  <div>
    <p v-if="visible">Visible</p>
    <p v-show="visible">Shown</p>
  </div>
</template>

<script>
export default {
  setup() {
    const state = reactive({
      visible: true
    });
    return { visible };
  }
};
</script>

<style scoped>
</style>
`;
    const result = checkAndFixStatePrefix(source);
    expect(result.fixed).toBe(true);
    expect(result.fixedCode).toContain('state.visible');
  });

  test('should add state. prefix to v-model', () => {
    const source = `
<template>
  <div>
    <input v-model="name" />
    <input v-model="email" />
  </div>
</template>

<script>
export default {
  setup() {
    const state = reactive({
      name: '',
      email: ''
    });
    return { name, email };
  }
};
</script>

<style scoped>
</style>
`;
    const result = checkAndFixStatePrefix(source);
    expect(result.fixed).toBe(true);
    expect(result.fixedCode).toContain('state.name');
    expect(result.fixedCode).toContain('state.email');
  });

  test('should add state. prefix to v-for', () => {
    const source = `
<template>
  <div>
    <div v-for="item in list" :key="item.id">{{ item }}</div>
  </div>
</template>

<script>
export default {
  setup() {
    const state = reactive({
      list: []
    });
    return { list };
  }
};
</script>

<style scoped>
</style>
`;
    const result = checkAndFixStatePrefix(source);
    expect(result.fixed).toBe(true);
    expect(result.fixedCode).toContain('state.list');
  });

  test('should not modify template if no state property references', () => {
    const source = `
<template>
  <div>Hello World</div>
</template>

<script>
export default {
  setup() {
    const state = reactive({
      count: 0
    });
    return { count };
  }
};
</script>

<style scoped>
</style>
`;
    const result = checkAndFixStatePrefix(source);
    expect(result.fixed).toBe(false);
    expect(result.fixedCode).toBe(source);
  });

  test('should return no fix for missing template or script', () => {
    const result = checkAndFixStatePrefix('<div>No SFC</div>');
    expect(result.fixed).toBe(false);
    expect(result.changes.length).toBe(0);
  });
});
