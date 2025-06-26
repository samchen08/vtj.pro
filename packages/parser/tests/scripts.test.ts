import { expect, test, describe } from 'vitest';
import { parseScripts } from '../src/vue/scripts';
import type { ProjectSchema, ApiSchema, ApiMethod } from '@vtj/core';

describe('Script Parser', () => {
  const mockProject: ProjectSchema = {
    name: 'test-project',
    platform: 'web',
    dependencies: [],
    apis: [
      {
        id: 'test-api',
        name: 'TestAPI',
        label: 'Test API',
        url: '/api/test',
        method: 'GET' as ApiMethod,
        mockTemplate: {
          type: 'JSFunction',
          value: '() => ({ data: "test" })'
        }
      }
    ]
  };

  test('parseScripts should handle imports', () => {
    const content = `
      import { ref, reactive, defineComponent } from 'vue';
      import ElementPlus from 'element-plus';
      import { User } from '@/types';
      import defaultExport from './other';

      export default defineComponent({
        name: 'TestComponent'
      })
    `;

    const result = parseScripts(content, mockProject);

    expect(result.imports).toBeDefined();
    expect(result.imports?.length).toBe(4);
    expect(result.imports?.find((i) => i.from === 'vue')).toBeDefined();
    expect(
      result.imports?.find((i) => i.from === 'element-plus')
    ).toBeDefined();
  });

  test('parseScripts should parse component options', () => {
    const content = `
      export default defineComponent({
        name: 'TestComponent',
        props: {
          message: {
            type: String,
            required: true,
            default: 'Hello'
          }
        },
        emits: ['update', 'delete'],
        inject: {
          theme: {
            from: 'theme',
            default: 'light'
          }
        },
        setup() {
          const state = reactive({
            count: 0,
            text: 'Hello'
          });
          return { state };
        }
      })
    `;

    const result = parseScripts(content, mockProject);

    expect(result.name).toBe('TestComponent');
    expect(result.props).toBeDefined();
    expect(result.inject).toBeDefined();
    expect(result.state).toBeDefined();
  });

  test('parseScripts should handle methods and computed', () => {
    const content = `
      export default defineComponent({
        computed: {
          doubleCount() {
            return this.count * 2;
          },
          watcher_count() {
            return this.count;
          }
        },
        methods: {
          increment() {
            this.count++;
          },
          async fetchData() {
            const data = await fetch('/api');
            return data;
          }
        }
      })
    `;

    const result = parseScripts(content, mockProject);

    expect(result.computed).toBeDefined();
    expect(result.methods).toBeDefined();
    if (result.methods) {
      expect(result.methods['increment']).toBeDefined();
      expect(result.methods['fetchData']).toBeDefined();
    }
  });

  test('parseScripts should handle watch options', () => {
    const content = `
      export default defineComponent({
        watch: {
          count: {
            handler(newVal, oldVal) {
              console.log('count changed', newVal, oldVal);
            },
            deep: true,
            immediate: true
          },
          'some.nested.key'(val) {
            console.log('nested key changed', val);
          }
        }
      })
    `;

    const result = parseScripts(content, mockProject);

    expect(result.watch).toBeDefined();
    if (result.watch) {
      expect(result.watch.length).toBeGreaterThan(0);
      const countWatch = result.watch[0];
      expect(countWatch.deep).toBe(true);
      expect(countWatch.immediate).toBe(true);
    }
  });

  test('parseScripts should handle lifecycle hooks', () => {
    const content = `
      export default defineComponent({
        mounted() {
          console.log('component mounted');
        },
        beforeUnmount() {
          console.log('component will be destroyed');
        },
        setup() {
          const state = reactive({});
          return { state };
        }
      })
    `;

    const result = parseScripts(content, mockProject);

    expect(result.lifeCycles).toBeDefined();
    if (result.lifeCycles) {
      expect(result.lifeCycles['mounted']).toBeDefined();
      expect(result.lifeCycles['beforeUnmount']).toBeDefined();
    }
  });

  // test('parseScripts should handle data sources', () => {
  //   const content = `
  //     export default defineComponent({
  //       methods: {
  //         async fetchUsers() {
  //           return provider.apis['test-api']().then(res => {
  //             return res.data;
  //           });
  //         }
  //       }
  //     })
  //   `;

  //   const result = parseScripts(content, mockProject);

  //   expect(result.dataSources).toBeDefined();
  //   if (result.dataSources) {
  //     const source = result.dataSources['fetchUsers'];
  //     expect(source).toBeDefined();
  //     expect(source.ref).toBe('test-api');
  //     expect(source.transform).toBeDefined();
  //   }
  // });

  test('parseScripts should handle event handlers', () => {
    const content = `
      export default defineComponent({
        methods: {
          click_abc123() {
            this.handleClick();
          },
          input_xyz789(e) {
            this.handleInput(e.target.value);
          }
        }
      })
    `;

    const result = parseScripts(content, mockProject);

    expect(result.handlers).toBeDefined();
    if (result.handlers) {
      expect(result.handlers['click_abc123']).toBeDefined();
      expect(result.handlers['input_xyz789']).toBeDefined();
    }
  });

  test('parseScripts should handle props with array type', () => {
    const content = `
      export default defineComponent({
        props: {
          status: {
            type: [String, Number],
            required: true
          }
        }
      })
    `;

    const result = parseScripts(content, mockProject);

    expect(result.props).toBeDefined();
    if (result.props && typeof result.props[0] === 'object') {
      const statusProp = result.props[0];
      expect(Array.isArray(statusProp.type)).toBe(true);
      expect(statusProp.type).toContain('String');
      expect(statusProp.type).toContain('Number');
    }
  });

  test('parseScripts should handle array-style props', () => {
    const content = `
      export default defineComponent({
        props: ['name', 'age', 'title']
      })
    `;

    const result = parseScripts(content, mockProject);

    expect(result.props).toBeDefined();
    expect(result.props).toContain('name');
    expect(result.props).toContain('age');
    expect(result.props).toContain('title');
  });
});
