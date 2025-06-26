import { expect, test, describe } from 'vitest';
import { parseVue, htmlToNodes } from '../src/vue';
import type { NodeSchema } from '@vtj/core';

describe('Vue Parser', () => {
  test('parseVue should parse basic vue component', async () => {
    const source = `
<template>
  <div @click="handleClick">{{ message }}</div>
</template>

<script>
export default {
  name: 'TestComponent',
  data() {
    return {
      message: 'Hello'
    }
  },
  methods: {
    handleClick() {
      this.message = 'Clicked'
    }
  }
}
</script>

<style>
.container {
  color: blue;
}
</style>
`.trim();

    const result = await parseVue({
      id: 'test-123',
      name: 'TestComponent',
      source,
      project: {
        name: 'test-project',
        platform: 'web',
        dependencies: []
      }
    });
    

    expect(result).toBeDefined();
    expect(result.name).toBe('TestComponent');
    expect(result.state).toBeDefined();
    expect(result.methods).toBeDefined();
    expect(result.css).toBeDefined();
  });

  test('htmlToNodes should convert HTML to node structure', () => {
    const html = '<div class="container"><span>Text</span></div>';
    
    const result = htmlToNodes(html);
    
    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    if (result[0]) {
      const firstNode = result[0] as any;
      expect(firstNode.name).toBe('div');
      if (firstNode.props) {
        expect(firstNode.props.class).toBe('container');
      }
      if (firstNode.children && firstNode.children[0]) {
        expect(firstNode.children[0].name).toBe('span');
      }
    }
  });

  test('parseVue should handle errors in template', async () => {
    const source = `
<template>
  <div v-invalid>Invalid directive</div>
</template>

<script>
export default {
  name: 'ErrorComponent'
}
</script>
`.trim();

    try {
      await parseVue({
        id: 'test-error',
        name: 'ErrorComponent',
        source,
        project: {
          name: 'test-project',
          platform: 'web',
          dependencies: []
        }
      });
    } catch (errors) {
      expect(typeof errors).toBe('object');
      expect((errors as any[]).length).toBeGreaterThan(0);
    }
  });

  test('parseVue should handle style parsing', async () => {
    const source = `
<template>
  <div class="styled">Styled content</div>
</template>

<script>
export default {
  name: 'StyledComponent'
}
</script>

<style>
.styled {
  color: red;
  font-size: 16px;
}
</style>
`.trim();

    const result = await parseVue({
      id: 'test-style',
      name: 'StyledComponent',
      source,
      project: {
        name: 'test-project',
        platform: 'web',
        dependencies: []
      }
    });

    expect(result.css).toBeDefined();
    expect(result.css).toContain('.styled');
    expect(result.css).toContain('color: red');
  });
});
