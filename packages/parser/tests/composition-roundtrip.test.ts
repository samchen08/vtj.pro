import { describe, expect, test } from 'vitest';
import type { BlockSchema, MaterialDescription } from '@vtj/core';
import { generator } from '@vtj/coder';
import { parseVue } from '../src';
import { parseSFC, parseScript } from '../src/shared';
import { parseScriptSetup } from '../src/vue/scriptSetup';

const project = { name: 'Roundtrip', dependencies: [] };

async function roundtrip(
  dsl: BlockSchema,
  componentMap?: Map<string, MaterialDescription>
) {
  const source = await generator({ dsl, componentMap });
  const restored = await parseVue({
    id: 'roundtrip',
    name: dsl.name,
    project,
    source
  });
  const regenerated = await generator({ dsl: restored, componentMap });
  const reparsed = await parseVue({
    id: 'roundtrip',
    name: dsl.name,
    project,
    source: regenerated
  });
  return { source, restored, regenerated, reparsed };
}

function runGenerated(source: string, proxy: Record<string, unknown>) {
  let script = parseSFC(source).script;
  const imports = parseScript(script).program.body.filter(
    (node) => node.type === 'ImportDeclaration'
  );
  for (const node of imports.reverse()) {
    script = script.slice(0, node.start!) + script.slice(node.end!);
  }
  new Function('useProvider', 'getCurrentInstance', 'ref', script)(
    () => ({}),
    () => ({ proxy }),
    (value: unknown) => ({ value })
  );
}

describe('composition instance proxy roundtrip', () => {
  test('restores globals in scripts, templates and reactive declarations', async () => {
    const { restored, regenerated, reparsed } = await roundtrip({
      name: 'Globals',
      apiMode: 'composition',
      refs: { seed: { type: 'JSExpression', value: 'this.custom.seed' } },
      computed: {
        total: { type: 'JSFunction', value: '() => this.custom.count' }
      },
      methods: {
        read: {
          type: 'JSFunction',
          value: '() => this.$custom.run() + this.custom.value'
        }
      },
      watch: [
        {
          source: { type: 'JSFunction', value: '() => this.custom.ready' },
          handler: { type: 'JSFunction', value: '() => this.$custom.run()' }
        }
      ],
      provide: { service: { type: 'JSExpression', value: 'this.custom' } },
      inject: [
        {
          name: 'service',
          from: 'service',
          default: { type: 'JSExpression', value: 'this.custom' }
        }
      ],
      lifeCycles: {
        onMounted: { type: 'JSFunction', value: '() => this.$custom.run()' }
      },
      nodes: [
        {
          name: 'button',
          props: {
            title: { type: 'JSExpression', value: 'this.custom.title' }
          },
          events: {
            click: {
              name: 'click',
              handler: { type: 'JSFunction', value: '() => this.$custom.run()' }
            }
          },
          children: { type: 'JSExpression', value: 'this.custom.text' }
        }
      ]
    });
    expect(JSON.stringify(restored)).not.toContain('__instance');
    expect(restored.methods?.read.value).toContain('this.$custom.run()');
    expect(restored.refs?.seed).toHaveProperty('value', 'this.custom.seed');
    expect(restored.nodes?.[0].children).toHaveProperty(
      'value',
      'this.custom.text'
    );
    expect(
      regenerated.match(/const __instance = getCurrentInstance\(\)/g)
    ).toHaveLength(1);
    expect(regenerated.match(/\bgetCurrentInstance\b/g)).toHaveLength(2);
    expect(reparsed.methods).toEqual(restored.methods);
    expect(reparsed.computed).toEqual(restored.computed);
    expect(reparsed.provide).toEqual(restored.provide);
  });

  test('keeps local shadowing and built-in API mappings', async () => {
    const { restored, regenerated, reparsed } = await roundtrip({
      name: 'Locals',
      apiMode: 'composition',
      refs: { $router: 42, custom: 5 },
      methods: {
        read: {
          type: 'JSFunction',
          value:
            '() => this.$router.value + this.custom.value + this.$route.path'
        }
      }
    });
    expect(restored.methods?.read.value).toContain('this.$router.value');
    expect(restored.methods?.read.value).toContain('this.custom.value');
    expect(restored.methods?.read.value).toContain('this.$route.path');
    expect(regenerated).toContain('useRoute');
    expect(regenerated).not.toContain('useRouter');
    expect(regenerated).not.toContain('getCurrentInstance');
    expect(reparsed.methods).toEqual(restored.methods);
  });

  test('restores named, destructured and side-effect composables and args', async () => {
    const { restored, regenerated, reparsed } = await roundtrip({
      name: 'Composables',
      apiMode: 'composition',
      composables: [
        {
          name: 'service',
          composable: { type: 'JSExpression', value: 'this.useCustom' },
          args: [
            { type: 'JSExpression', value: 'this.$attrs' },
            { type: 'JSExpression', value: 'this.custom' }
          ]
        },
        {
          name: 'ready',
          destructure: ['ready', 'run'],
          composable: { type: 'JSExpression', value: 'this.custom.useTask' },
          args: [{ type: 'JSExpression', value: 'this.$route.query' }]
        },
        { name: '', composable: { type: 'JSExpression', value: 'this.start' } }
      ],
      methods: {
        read: {
          type: 'JSFunction',
          value: '() => this.service.read() + this.ready'
        }
      },
      nodes: [
        {
          name: 'div',
          children: {
            type: 'JSExpression',
            value: 'this.ready'
          }
        }
      ]
    });
    expect(restored.composables).toHaveLength(3);
    expect(restored.composables?.[0].composable.value).toBe('this.useCustom');
    expect(restored.composables?.[0].args?.[0]).toHaveProperty(
      'value',
      'this.$attrs'
    );
    expect(restored.composables?.[0].args?.[1]).toHaveProperty(
      'value',
      'this.custom'
    );
    expect(restored.composables?.[1].destructure).toEqual(['ready', 'run']);
    expect(restored.composables?.[1].composable.value).toBe(
      'this.custom.useTask'
    );
    expect(restored.composables?.[1].args?.[0]).toHaveProperty(
      'value',
      'this.$route.query'
    );
    expect(restored.composables?.[2].composable.value).toBe('this.start');
    expect(restored.setup).toBeUndefined();
    expect(JSON.stringify(restored)).not.toContain('__instance');
    expect(regenerated).toContain(
      'const { ready, run } = __instance.proxy.custom.useTask'
    );
    expect(regenerated).toContain('void __instance.proxy.start()');
    expect(reparsed.composables).toEqual(restored.composables);
    expect(reparsed.methods).toEqual(restored.methods);
  });

  test('initializes local refs before composables and keeps setup calls last', async () => {
    const { source, restored, regenerated, reparsed } = await roundtrip({
      name: 'Initialization',
      apiMode: 'composition',
      refs: { count: 2 },
      composables: [
        {
          name: '',
          composable: { type: 'JSExpression', value: 'this.start' },
          args: [{ type: 'JSExpression', value: 'this.count.value' }]
        },
        {
          name: 'service',
          composable: { type: 'JSExpression', value: 'this.useCustom' },
          args: [{ type: 'JSExpression', value: 'this.count.value' }]
        },
        {
          name: '',
          composable: { type: 'JSExpression', value: 'this.finish' },
          args: [{ type: 'JSExpression', value: 'this.service.value' }]
        }
      ],
      setup: {
        type: 'JSFunction',
        value: '() => this.complete(this.count.value, this.service.value)'
      }
    });
    for (const content of [source, regenerated]) {
      const calls: string[] = [];
      runGenerated(content, {
        start: (value: number) => calls.push(`start:${value}`),
        useCustom: (value: number) => {
          calls.push(`use:${value}`);
          return { value: value + 1 };
        },
        finish: (value: number) => calls.push(`finish:${value}`),
        complete: (count: number, value: number) =>
          calls.push(`complete:${count}:${value}`)
      });
      expect(calls).toEqual(['start:2', 'use:2', 'finish:3', 'complete:2:3']);
    }
    expect(restored.composables).toHaveLength(3);
    expect(restored.setup?.value).toContain('this.complete');
    expect(reparsed.composables).toEqual(restored.composables);
    expect(reparsed.setup).toEqual(restored.setup);
  });

  test('preserves nested receivers and component arrows across two generations', async () => {
    const body = `function() {
      const helper = {custom: 42, [this.methodName]() { return this.custom; }};
      function local() { return (() => this.custom)(); }
      class Helper { custom = 40; read() { return this.custom; } }
      return helper.read() + local.call({custom: 1}) +
        new Helper().read() + (() => this.custom)();
    }`;
    const { source, restored, regenerated } = await roundtrip({
      name: 'Receivers',
      apiMode: 'composition',
      methods: { read: { type: 'JSFunction', value: body } }
    });
    for (const content of [source, regenerated]) {
      const parsed = parseScriptSetup(parseSFC(content).script, project);
      const read = new Function(
        '__instance',
        `return (${parsed.methods.read.value})();`
      );
      expect(read({ proxy: { custom: 7, methodName: 'read' } })).toBe(90);
    }
    expect(restored.methods?.read.value).toContain('this.custom');
  });

  test('preserves nested this in template expressions and handlers', async () => {
    const handler = `() => {
      const helper = {context: {custom: 42}, read() { return this.context.custom; }};
      return helper.read() + (() => this.custom)();
    }`;
    const { source, regenerated } = await roundtrip({
      name: 'TemplateReceivers',
      apiMode: 'composition',
      nodes: [
        {
          name: 'button',
          props: {
            title: {
              type: 'JSExpression',
              value: '({custom: 42, read() { return this.custom; } }).read()'
            }
          },
          events: {
            click: {
              name: 'click',
              handler: { type: 'JSFunction', value: handler }
            }
          },
          children: [
            {
              name: 'span',
              children: {
                type: 'JSExpression',
                value: '({custom: 42, read() { return this.custom; } }).read()'
              }
            }
          ]
        }
      ]
    });
    for (const content of [source, regenerated]) {
      const template = parseSFC(content).template;
      const match = template.match(/@click="([\s\S]*?)"/);
      expect(match).not.toBeNull();
      const read = new Function('__instance', `return (${match![1]})();`);
      expect(read({ proxy: { custom: 7 } })).toBe(49);
      expect(
        template.match(/return this.custom/g)?.length
      ).toBeGreaterThanOrEqual(2);
      expect(template).toContain('return this.context.custom');
    }
  });

  test('preserves writable computed getters and setters', async () => {
    const { source, regenerated, restored, reparsed } = await roundtrip({
      name: 'WritableComputed',
      apiMode: 'composition',
      refs: { count: 1 },
      computed: {
        total: {
          type: 'JSExpression',
          value: `({
          get() { return this.count.value + this.custom; },
          set: function(value) { this.count.value = value; }
        })`
        }
      }
    });
    for (const content of [source, regenerated]) {
      const parsed = parseScriptSetup(parseSFC(content).script, project);
      const count = { value: 1 };
      const options = new Function(
        'count',
        '__instance',
        `return (${parsed.computed.total.value});`
      )(count, { proxy: { custom: 7 } });
      expect(options.get()).toBe(8);
      options.set(2);
      expect(count.value).toBe(2);
    }
    expect(reparsed.computed).toEqual(restored.computed);
  });

  test.each(['element-plus', 'ant-design-vue'])(
    'keeps native, i18n and %s API mappings alongside globals',
    async (uiPackage) => {
      const { restored, regenerated, reparsed } = await roundtrip(
        {
          name: 'Builtins',
          apiMode: 'composition',
          methods: {
            read: {
              type: 'JSFunction',
              value: `() => [this.custom, this.$refs.panel, this.$el,
            this.$t('key'), this.$message.success('ok')]`
            }
          }
        },
        new Map([['Button', { name: 'Button', package: uiPackage }]])
      );
      expect(restored.methods?.read.value).toContain('this.custom');
      expect(restored.methods?.read.value).toContain('this.$refs.panel');
      expect(restored.methods?.read.value).toContain('this.$el');
      expect(restored.methods?.read.value).toContain("this.$t('key')");
      expect(restored.methods?.read.value).toContain(
        uiPackage === 'ant-design-vue'
          ? "this.$success('ok')"
          : "this.$message.success('ok')"
      );
      expect(JSON.stringify(restored)).not.toContain('__instance');
      expect(
        regenerated.match(/const __instance = getCurrentInstance\(\)/g)
      ).toHaveLength(1);
      expect(reparsed.methods).toEqual(restored.methods);
    }
  );
});
