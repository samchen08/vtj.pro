import { describe, expect, test } from 'vitest';
import type { BlockSchema } from '@vtj/core';
import { generator } from '@vtj/coder';
import { parseVue } from '../src';
import { parseSFC, parseScript } from '../src/shared';

const dependencies = [
  { package: '@vueuse/core', library: 'VueUse', version: '1' }
];
const project = { name: 'Roundtrip', dependencies };
const exp = (value: string) => ({ type: 'JSExpression' as const, value });

function execute(
  source: string,
  proxy: Record<string, unknown>,
  expression: string
) {
  let script = parseSFC(source).script;
  for (const node of parseScript(script)
    .program.body.filter((item) => item.type === 'ImportDeclaration')
    .reverse()) {
    script = script.slice(0, node.start!) + script.slice(node.end!);
  }
  const globals = {
    useProvider: () => ({}),
    getCurrentInstance: () => ({ proxy }),
    defineProps: () => proxy.$props || {},
    ref: (value: unknown) => ({ value }),
    reactive: (value: unknown) => value,
    computed: (get: (() => unknown) | { get: () => unknown }) => ({
      get value() {
        return typeof get === 'function' ? get() : get.get();
      }
    }),
    inject: (_key: unknown, fallback: unknown) => fallback,
    useStore: () => proxy.$store,
    useCustom: (...args: unknown[]) => (proxy.useCustom as Function)(...args)
  };
  return new Function(
    ...Object.keys(globals),
    `${script}\nreturn (${expression});`
  )(...Object.values(globals));
}

async function cycles(source: string) {
  const restored = await parseVue({
    id: 'roundtrip',
    name: 'Roundtrip',
    project,
    source
  });
  const generated = await generator({ dsl: restored, dependencies });
  const reparsed = await parseVue({
    id: 'roundtrip',
    name: 'Roundtrip',
    project,
    source: generated
  });
  const regenerated = await generator({ dsl: reparsed, dependencies });
  return { restored, reparsed, sources: [source, generated, regenerated] };
}

function sfc(script: string) {
  return `<script setup>${script}</script><template><div/></template>`;
}

describe('composition dependency and scope roundtrips', () => {
  test('keeps composable → ref → reactive → inject → composable initialization valid', async () => {
    const source = sfc(`
      import { ref, reactive, inject, getCurrentInstance } from 'vue';
      const __instance = getCurrentInstance();
      const service = __instance.proxy.useService();
      const count = ref(service.value);
      const state = reactive({ count: count.value });
      const value = inject('value', state.count);
      const result = __instance.proxy.finish(value);
    `);
    const { sources } = await cycles(source);
    for (const item of sources) {
      const calls: string[] = [];
      expect(
        execute(
          item,
          {
            useService: () => {
              calls.push('service');
              return { value: 3 };
            },
            finish: (n: number) => {
              calls.push(`finish:${n}`);
              return n + 1;
            }
          },
          'result'
        )
      ).toBe(4);
      expect(calls).toEqual(['service', 'finish:3']);
    }
  });

  test('keeps ref → composable → ref initialization valid from DSL', async () => {
    const dsl: BlockSchema = {
      name: 'Roundtrip',
      apiMode: 'composition',
      refs: { result: exp('this.service.value'), seed: 2 },
      composables: [
        {
          name: 'service',
          composable: exp('this.useService'),
          args: [exp('this.seed.value')]
        }
      ]
    };
    const source = await generator({ dsl });
    const { sources } = await cycles(source);
    for (const item of sources) {
      expect(
        execute(
          item,
          { useService: (n: number) => ({ value: n + 1 }) },
          'result.value'
        )
      ).toBe(3);
    }
  });

  test('initializes method and computed dependencies before eager reads', async () => {
    const source = sfc(`
      import { ref, computed, getCurrentInstance } from 'vue';
      const __instance = getCurrentInstance();
      const service = __instance.proxy.useService();
      const count = ref(service.value);
      const read = () => count.value;
      const getTotal = () => read() * 2;
      const total = computed(getTotal);
      const result = ref(total.value);
    `);
    for (const item of (await cycles(source)).sources) {
      expect(
        execute(item, { useService: () => ({ value: 3 }) }, 'result.value')
      ).toBe(6);
    }
  });

  test.each([
    'function inner() { return __instance.proxy.custom + this.custom; } return inner.call({custom: 42});',
    'const context = __instance.proxy; function inner() { return context.custom + this.custom; } return inner.call({custom: 42});',
    'function inner(__self) { return __instance.proxy.custom + __self.custom; } return inner({custom: 42});',
    'function inner(__self, $scope) { return __instance.proxy.custom + this.custom; } return inner.call({custom: 42});',
    'const inner = function(__self, $scope) { return __instance.proxy.custom + this.custom; }; return inner.call({custom: 42});',
    'const obj = { custom: 42, read() { return __instance.proxy.custom + this.custom; } }; return obj.read();',
    'class Helper { custom = 42; read() { return __instance.proxy.custom + this.custom; } } return new Helper().read();',
    'class Helper { custom = __instance.proxy.custom; read() { return this.custom; } } return new Helper().read() + 42;'
  ])('preserves captured component and receiver this: %s', async (body) => {
    const source = sfc(
      `import {getCurrentInstance} from 'vue'; const __instance = getCurrentInstance(); const read = () => { ${body} };`
    );
    const { restored, reparsed, sources } = await cycles(source);
    for (const item of sources)
      expect(execute(item, { custom: 7 }, 'read()')).toBe(49);
    expect(reparsed.methods).toEqual(restored.methods);
    const method = restored.methods!.read.value;
    const context = { custom: 7 };
    expect(
      new Function('$scope', `var __self = $scope; return (${method})();`).call(
        context,
        context
      )
    ).toBe(49);
  });

  test('captures local refs and methods without changing parameter bindings', async () => {
    const source = sfc(`
      import {ref} from 'vue';
      const count = ref(7);
      const load = () => count.value;
      const read = () => {
        function inner(count) { return count + load(); }
        return inner(42);
      };
    `);
    const { sources } = await cycles(source);
    for (const item of sources) expect(execute(item, {}, 'read()')).toBe(49);
  });

  test('captures refs, props and built-in APIs in nested receivers', async () => {
    const source = sfc(`
      import {ref, getCurrentInstance} from 'vue';
      import {useStore} from '@vtj/renderer';
      const __instance = getCurrentInstance();
      const __props = defineProps({factor: Number});
      const __store = useStore();
      const count = ref(1);
      const read = () => {
        const helper = {custom: 42, read() {
          return count.value + __props.factor + __store.value + __instance.proxy.custom + this.custom;
        }};
        return helper.read();
      };
    `);
    const { restored, reparsed, sources } = await cycles(source);
    for (const item of sources) {
      expect(
        execute(
          item,
          { custom: 7, $props: { factor: 2 }, $store: { value: 3 } },
          'read()'
        )
      ).toBe(55);
    }
    expect(reparsed.methods).toEqual(restored.methods);
  });

  test.each([
    ['service.useTask', 'const result = service.useTask(2);'],
    ['service["useTask"]', 'const result = service["useTask"](2);'],
    ['factory call', 'const result = service.factory()(2);'],
    ['destructure', 'const { result } = service.useObject(2);'],
    ['optional member', 'const result = service?.useTask(2);'],
    ['optional call', 'const result = service.useTask?.(2);'],
    ['spread args', 'const result = service.useTask(...[2]);']
  ])('restores %s composable calls', async (_name, declaration) => {
    const source = sfc(`
      import {getCurrentInstance} from 'vue';
      const __instance = getCurrentInstance();
      const service = __instance.proxy.useService();
      ${declaration}
    `);
    const { restored, reparsed, sources } = await cycles(source);
    for (const item of sources) {
      expect(
        execute(
          item,
          {
            useService: () => ({
              useTask(n: number) {
                return n + 1;
              },
              factory: () => (n: number) => n + 1,
              useObject: (n: number) => ({ result: n + 1 })
            })
          },
          'result'
        )
      ).toBe(3);
    }
    expect(reparsed.composables).toEqual(restored.composables);
  });

  test('keeps optional invocation arguments lazy', async () => {
    const source = sfc(`
      import {getCurrentInstance} from 'vue';
      const __instance = getCurrentInstance();
      const result = __instance.proxy.missing?.(__instance.proxy.fail());
    `);
    for (const item of (await cycles(source)).sources) {
      expect(
        execute(
          item,
          {
            fail: () => {
              throw new Error('must stay lazy');
            }
          },
          'result'
        )
      ).toBeUndefined();
    }
  });

  test.each([
    'this.factory.value',
    'this.factory',
    'this.$store.useTask',
    'this.$libs.VueUse.useCustom'
  ])(
    'roundtrips ref, prop, built-in and imported callees: %s',
    async (callee) => {
      const dsl: BlockSchema = {
        name: 'Roundtrip',
        apiMode: 'composition',
        ...(callee === 'this.factory.value'
          ? { refs: { factory: exp('(n) => n + 1') } }
          : {}),
        ...(callee === 'this.factory' ? { props: ['factory'] } : {}),
        composables: [{ name: 'result', composable: exp(callee), args: [2] }]
      };
      const source = await generator({ dsl, dependencies });
      for (const item of (await cycles(source)).sources) {
        expect(
          execute(
            item,
            {
              $props: { factory: (n: number) => n + 1 },
              $store: { useTask: (n: number) => n + 1 },
              useCustom: (n: number) => n + 1
            },
            'result'
          )
        ).toBe(3);
      }
    }
  );

  test('restores imported and local side effects without moving setup into composables', async () => {
    const dsl: BlockSchema = {
      name: 'Roundtrip',
      apiMode: 'composition',
      methods: {
        start: { type: 'JSFunction', value: '() => this.record("local")' }
      },
      composables: [
        {
          name: '',
          composable: exp('this.$libs.VueUse.useCustom'),
          args: ['imported']
        },
        { name: '', composable: exp('this.start') },
        { name: '', composable: exp('this.start') }
      ],
      setup: { type: 'JSFunction', value: '() => this.record("setup")' }
    };
    const source = await generator({ dsl, dependencies });
    const { restored, reparsed, sources } = await cycles(source);
    for (const item of sources) {
      const calls: string[] = [];
      execute(
        item,
        {
          useCustom: (value: string) => calls.push(value),
          record: (value: string) => calls.push(value)
        },
        'undefined'
      );
      expect(calls).toEqual(['imported', 'local', 'local', 'setup']);
    }
    expect(restored.composables).toHaveLength(3);
    expect(reparsed.composables).toEqual(restored.composables);
    expect(restored.setup?.value).toContain('this.record');
  });
});
