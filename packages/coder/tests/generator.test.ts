import { expect, describe, test } from 'vitest';
import { generator, createEmptyPage } from '../src';
import { webMaterials } from './dsl/web.materials';

const map = new Map<string, any>();
Object.entries(webMaterials).forEach(([name, value]) => {
  map.set(name, value);
});

describe('generator', () => {
  test('should generate Options API code', async () => {
    const dsl = {
      id: 'test-1',
      name: 'TestComp',
      nodes: [
        {
          name: 'div',
          children: 'Hello World'
        }
      ]
    };
    const content = await generator(dsl as any, map, [], 'web', true);
    expect(content).toContain('<template>');
    expect(content).toContain('Hello World');
    expect(content).toContain('defineComponent');
    expect(content).toContain("name: 'TestComp'");
  });

  test('should generate Composition API code', async () => {
    const dsl = {
      id: 'comp-2',
      name: 'CompDemo',
      apiMode: 'composition',
      props: [{ name: 'title', type: 'String', default: 'Hi' }],
      emits: ['change'],
      state: { foo: 'bar' },
      refs: { count: 0 },
      reactives: { form: { name: '', age: 18 } },
      computed: {
        total: {
          type: 'JSFunction',
          value: '() => this.count * 2'
        }
      },
      methods: {
        handleClick: {
          type: 'JSFunction',
          value: 'function() { this.count++; }'
        }
      },
      watch: [
        {
          source: { type: 'JSExpression', value: 'count' },
          handler: {
            type: 'JSFunction',
            value: 'function(val) { console.log(val) }'
          },
          deep: false,
          immediate: true
        }
      ],
      nodes: [
        {
          id: 'n1',
          name: 'div',
          children: [
            {
              id: 'n2',
              name: 'span',
              children: {
                type: 'JSExpression',
                value: '`${this.title}: ${this.count}`'
              }
            }
          ]
        }
      ]
    };
    const content = await generator(dsl as any, map, [], 'web', true);
    expect(content).toContain('<script lang="ts" setup>');
    expect(content).toContain('defineProps');
    expect(content).toContain('defineEmits');
    expect(content).toContain('const count = ref(0)');
    expect(content).toContain('const form = reactive');
    expect(content).toContain('const total = computed');
    expect(content).toContain('const handleClick =');
    expect(content).toContain('watch(');
  });

  test('should accept GeneratorOptions as first argument', async () => {
    const dsl = {
      id: 'test-3',
      name: 'OptionsTest',
      nodes: [
        {
          name: 'div',
          children: 'Options Mode'
        }
      ]
    };
    const content = await generator({
      dsl: dsl as any,
      componentMap: map,
      dependencies: [],
      platform: 'web',
      formatterDisabled: true
    });
    expect(content).toContain('Options Mode');
    expect(content).toContain("name: 'OptionsTest'");
  });

  test('should handle empty nodes', async () => {
    const dsl = {
      id: 'empty-1',
      name: 'EmptyComp',
      nodes: []
    };
    const content = await generator(dsl as any, map, [], 'web', true);
    expect(content).toContain('defineComponent');
    expect(content).toContain("name: 'EmptyComp'");
  });

  test('should handle formatterEnabled option', async () => {
    const dsl = {
      id: 'fmt-1',
      name: 'FormatTest',
      nodes: [
        {
          name: 'div',
          children: 'Format Test'
        }
      ]
    };
    const contentDisabled = await generator(dsl as any, map, [], 'web', true);
    const contentEnabled = await generator(dsl as any, map, [], 'web', false);
    expect(contentDisabled).toBeTruthy();
    expect(contentEnabled).toBeTruthy();
  });

  test('should generate with js output when ts=false', async () => {
    const dsl = {
      id: 'js-1',
      name: 'JsTest',
      nodes: [
        {
          name: 'div',
          children: 'JS Mode'
        }
      ]
    };
    const content = await generator({
      dsl: dsl as any,
      componentMap: map,
      formatterDisabled: true,
      ts: false
    });
    expect(content).toContain('<script lang="js">');
  });

  test('should include scss lang when scss=true', async () => {
    const dsl = {
      id: 'scss-1',
      name: 'ScssTest',
      nodes: [
        {
          name: 'div',
          children: 'SCSS Mode'
        }
      ]
    };
    const content = await generator({
      dsl: dsl as any,
      componentMap: map,
      formatterDisabled: true,
      scss: true
    });
    expect(content).toContain('<style lang="scss" scoped>');
  });

  test('should handle JSExpression in nodes children', async () => {
    const dsl = {
      id: 'expr-1',
      name: 'ExprComp',
      nodes: [
        {
          name: 'div',
          children: {
            type: 'JSExpression',
            value: 'this.message'
          }
        }
      ],
      state: {
        message: {
          type: 'JSExpression',
          value: '"Hello"'
        }
      }
    };
    const content = await generator(dsl as any, map, [], 'web', true);
    expect(content).toContain('{{ message }}');
  });

  test('should handle vFor directive', async () => {
    const dsl = {
      id: 'for-1',
      name: 'ForComp',
      nodes: [
        {
          id: 'n1',
          name: 'div',
          children: [
            {
              id: 'n2',
              name: 'span',
              children: {
                type: 'JSExpression',
                value: 'this.context.item'
              },
              directives: [
                {
                  name: 'vFor',
                  value: { type: 'JSExpression', value: 'this.list' },
                  iterator: { item: 'item', index: 'index' }
                }
              ]
            }
          ]
        }
      ],
      state: {
        list: { type: 'JSExpression', value: '[]' }
      }
    };
    const content = await generator(dsl as any, map, [], 'web', true);
    expect(content).toContain('v-for');
    expect(content).toContain('item');
    expect(content).toContain('index');
  });

  test('should handle events', async () => {
    const dsl = {
      id: 'evt-1',
      name: 'EventComp',
      methods: {
        handleClick: {
          type: 'JSFunction',
          value: 'function() { console.log("clicked") }'
        }
      },
      nodes: [
        {
          id: 'n1',
          name: 'button',
          children: 'Click me',
          events: {
            click: {
              name: 'click',
              handler: {
                type: 'JSFunction',
                value: '() => this.handleClick($event)'
              }
            }
          }
        }
      ]
    };
    const content = await generator(dsl as any, map, [], 'web', true);
    expect(content).toContain('@click');
    expect(content).toContain('handleClick');
  });
});

describe('createEmptyPage', () => {
  test('should create empty page Vue file', async () => {
    const file = { id: 'page-1', name: 'EmptyPage' } as any;
    const content = await createEmptyPage(file);
    expect(content).toContain('<template>');
    expect(content).toContain('<div>');
    expect(content).toContain('源码模式页面');
    expect(content).toContain('文件路径：/.vtj/vue/page-1.vue');
    expect(content).toContain('</div>');
    expect(content).toContain('</template>');
    expect(content).toContain('<script lang="ts" setup>');
    expect(content).toContain('<style scoped lang="scss">');
  });
});
