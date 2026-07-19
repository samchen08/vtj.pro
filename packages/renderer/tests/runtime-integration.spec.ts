import { afterEach, describe, expect, test, vi } from 'vitest';
import {
  createApp,
  defineComponent,
  h,
  inject,
  isRef,
  nextTick,
  ref,
  Suspense,
  type App,
  type VNode
} from 'vue';
import type { BlockSchema } from '@vtj/core';
import {
  clearLoaderCache,
  ContextMode,
  createLoader,
  createRenderer
} from '../src';

const mounted: Array<{ app: App; host: HTMLElement }> = [];

async function settle() {
  for (let i = 0; i < 2; i++) {
    await Promise.resolve();
    await nextTick();
    await new Promise((resolve) => setTimeout(resolve, 0));
  }
  await nextTick();
}

async function mount(render: () => VNode, configure?: (app: App) => void) {
  const host = document.createElement('div');
  document.body.appendChild(host);
  const Root = defineComponent({
    render() {
      return h(Suspense, null, { default: render });
    }
  });
  const app = createApp(Root);
  configure?.(app);
  app.mount(host);
  const record = { app, host };
  mounted.push(record);
  await settle();
  return {
    app,
    host,
    unmount() {
      app.unmount();
      mounted.splice(mounted.indexOf(record), 1);
      host.remove();
    }
  };
}

afterEach(() => {
  for (const { app, host } of mounted.splice(0)) {
    app.unmount();
    host.remove();
  }
  clearLoaderCache();
});

describe('renderer runtime integration', () => {
  test('renders and updates composition refs/computed using the existing .value DSL contract', async () => {
    const dsl = {
      id: 'runtime-composition-value',
      name: 'RuntimeCompositionValue',
      apiMode: 'composition',
      state: {},
      refs: { count: 1 },
      reactives: {},
      computed: {
        double: {
          type: 'JSFunction',
          value: '() => this.count.value * 2'
        }
      },
      methods: {
        increment: {
          type: 'JSFunction',
          value: '() => this.count.value++'
        }
      },
      props: [],
      emits: [],
      watch: [],
      dataSources: {},
      composables: [],
      provide: {},
      lifeCycles: {},
      nodes: [
        {
          id: 'composition-button',
          name: 'button',
          props: {},
          directives: [],
          events: {
            click: {
              name: 'click',
              handler: {
                type: 'JSFunction',
                value: '() => this.increment()'
              }
            }
          },
          children: {
            type: 'JSExpression',
            value: 'this.double.value'
          }
        }
      ]
    } as BlockSchema;
    const { renderer, context } = createRenderer({
      dsl,
      mode: ContextMode.Runtime,
      window
    });
    const { host } = await mount(() => h(renderer));
    const button = host.querySelector('button') as HTMLButtonElement;

    expect(button.textContent).toBe('2');
    expect(isRef((context as any).count)).toBe(true);
    expect(isRef((context as any).double)).toBe(true);

    button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await settle();

    expect(button.textContent).toBe('4');
    expect((context as any).count.value).toBe(2);
    expect((context as any).double.value).toBe(4);
  });

  test('supports writable computed options using the existing .value DSL contract', async () => {
    const onChange = vi.fn();
    const dsl = {
      id: 'runtime-composition-writable-computed',
      name: 'RuntimeCompositionWritableComputed',
      apiMode: 'composition',
      state: {},
      refs: {
        val: { type: 'JSExpression', value: "''" }
      },
      reactives: {},
      computed: {
        computed1: {
          type: 'JSExpression',
          value: `({
            get() {
              return this.val.value
            },
            set(value) {
              this.val.value = value
              this.$emit('change', value)
            }
          })`
        }
      },
      methods: {},
      props: [],
      emits: [{ name: 'change', params: [] }],
      watch: [],
      dataSources: {},
      composables: [],
      provide: {},
      lifeCycles: {},
      nodes: [
        {
          id: 'writable-computed-input',
          name: 'input',
          props: {},
          directives: [
            {
              name: 'vModel',
              value: {
                type: 'JSExpression',
                value: 'this.computed1.value'
              }
            }
          ],
          events: {},
          children: []
        }
      ]
    } as BlockSchema;
    const { renderer, context } = createRenderer({
      dsl,
      mode: ContextMode.Runtime,
      window
    });
    const { host } = await mount(() => h(renderer, { onChange }));
    const input = host.querySelector('input') as HTMLInputElement;

    expect(input.value).toBe('');
    expect((context as any).val.value).toBe('');
    expect((context as any).computed1.value).toBe('');

    input.value = 'abc';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    await settle();

    expect((context as any).val.value).toBe('abc');
    expect((context as any).computed1.value).toBe('abc');
    expect(onChange).toHaveBeenCalledWith('abc');
  });

  test('keeps composition props, watches and lifecycle hooks connected', async () => {
    const onMounted = vi.fn();
    const onUnmounted = vi.fn();
    const current = ref(1);
    const dsl = {
      id: 'runtime-composition-props',
      name: 'RuntimeCompositionProps',
      apiMode: 'composition',
      state: {},
      refs: { watched: 0 },
      reactives: {},
      computed: {},
      methods: {},
      props: [{ name: 'value', type: 'Number' }],
      emits: [],
      watch: [
        {
          source: { type: 'JSFunction', value: '() => this.value' },
          handler: {
            type: 'JSFunction',
            value: '(value) => { this.watched.value = value }'
          },
          immediate: true
        }
      ],
      dataSources: {},
      composables: [],
      provide: {},
      lifeCycles: {
        mounted: {
          type: 'JSFunction',
          value: '() => this.$apis.onMounted()'
        },
        unmounted: {
          type: 'JSFunction',
          value: '() => this.$apis.onUnmounted()'
        }
      },
      nodes: [
        {
          id: 'props-output',
          name: 'span',
          props: {},
          directives: [],
          events: {},
          children: {
            type: 'JSExpression',
            value: '`${this.value}:${this.watched.value}`'
          }
        }
      ]
    } as BlockSchema;
    const { renderer } = createRenderer({
      dsl,
      mode: ContextMode.Runtime,
      apis: { onMounted, onUnmounted },
      window
    });
    const { host, unmount } = await mount(() =>
      h(renderer, { value: current.value })
    );

    expect(host.textContent).toBe('1:1');
    expect(onMounted).toHaveBeenCalledOnce();

    current.value = 3;
    await settle();

    expect(host.textContent).toBe('3:3');

    unmount();
    await settle();

    expect(onUnmounted).toHaveBeenCalledOnce();
  });

  test('isolates composition refs between instances of the same renderer', async () => {
    const dsl = {
      id: 'runtime-composition-isolation',
      name: 'RuntimeCompositionIsolation',
      apiMode: 'composition',
      state: {},
      refs: { count: 0 },
      reactives: {},
      computed: {},
      methods: {
        increment: {
          type: 'JSFunction',
          value: '() => this.count.value++'
        }
      },
      props: [{ name: 'label', type: 'String' }],
      emits: [],
      watch: [],
      dataSources: {},
      composables: [],
      provide: {},
      lifeCycles: {},
      nodes: [
        {
          id: 'isolation-button',
          name: 'button',
          props: {},
          directives: [],
          events: {
            click: {
              name: 'click',
              handler: {
                type: 'JSFunction',
                value: '() => this.increment()'
              }
            }
          },
          children: {
            type: 'JSExpression',
            value: '`${this.label}:${this.count.value}`'
          }
        }
      ]
    } as BlockSchema;
    const { renderer } = createRenderer({
      dsl,
      mode: ContextMode.Runtime,
      window
    });
    const { host } = await mount(() =>
      h('div', [h(renderer, { label: 'A' }), h(renderer, { label: 'B' })])
    );
    const buttons = Array.from(host.querySelectorAll('button'));

    expect(buttons.map((button) => button.textContent)).toEqual(['A:0', 'B:0']);

    buttons[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await settle();

    expect(buttons.map((button) => button.textContent)).toEqual(['A:1', 'B:0']);
  });

  test('provides values and registers hooks before the first setup await', async () => {
    const created = vi.fn();
    const mountedHook = vi.fn();
    const Child = defineComponent({
      setup() {
        const theme = inject('theme', 'missing');
        return () => h('span', theme);
      }
    });
    const dsl = {
      id: 'runtime-composition-provide',
      name: 'RuntimeCompositionProvide',
      apiMode: 'composition',
      state: {},
      refs: {},
      reactives: {},
      computed: {},
      methods: {},
      props: [],
      emits: [],
      watch: [],
      dataSources: {},
      composables: [],
      provide: { theme: 'light' },
      lifeCycles: {
        created: {
          type: 'JSFunction',
          value: 'async () => this.$apis.created()'
        },
        mounted: {
          type: 'JSFunction',
          value: '() => this.$apis.mounted()'
        }
      },
      nodes: [
        {
          id: 'provide-child',
          name: 'Child',
          props: {},
          directives: [],
          events: {},
          children: []
        }
      ]
    } as BlockSchema;
    const { renderer } = createRenderer({
      dsl,
      mode: ContextMode.Runtime,
      components: { Child },
      apis: { created, mounted: mountedHook },
      window
    });
    const { host } = await mount(() => h(renderer));

    expect(host.textContent).toBe('light');
    expect(created).toHaveBeenCalledOnce();
    expect(mountedHook).toHaveBeenCalledOnce();
  });

  test('keeps transform parsing available on the returned context after render', async () => {
    const dsl = {
      id: 'runtime-transform-context',
      name: 'RuntimeTransformContext',
      apiMode: 'composition',
      transform: { expression: '2' },
      state: {},
      refs: {},
      reactives: {},
      computed: {},
      methods: {},
      props: [],
      emits: [],
      watch: [],
      dataSources: {},
      composables: [],
      provide: {},
      lifeCycles: {},
      nodes: [{ id: 'transform-node', name: 'div', children: 'ok' }]
    } as BlockSchema;
    const { renderer, context } = createRenderer({
      dsl,
      mode: ContextMode.Runtime,
      window
    });
    await mount(() => h(renderer));

    expect(
      context.__parseExpression({
        id: 'expression',
        type: 'JSExpression',
        value: '1'
      })
    ).toBe(2);
  });

  test('resolves composable arguments from composition refs', async () => {
    const useEcho = vi.fn((value) => ({ value }));
    const dsl = {
      id: 'runtime-composable-context',
      name: 'RuntimeComposableContext',
      apiMode: 'composition',
      state: {},
      refs: { count: 3 },
      reactives: {},
      computed: {},
      methods: {},
      props: [],
      emits: [],
      watch: [],
      dataSources: {},
      composables: [
        {
          name: 'echo',
          composable: {
            type: 'JSExpression',
            value: 'this.$libs.useEcho'
          },
          args: [
            { type: 'JSExpression', value: 'this.count.value' }
          ]
        }
      ],
      provide: {},
      lifeCycles: {},
      nodes: [
        {
          id: 'composable-output',
          name: 'span',
          children: {
            type: 'JSExpression',
            value: 'this.echo.value'
          }
        }
      ]
    } as BlockSchema;
    const { renderer } = createRenderer({
      dsl,
      mode: ContextMode.Runtime,
      libs: { useEcho },
      window
    });
    const { host } = await mount(() => h(renderer));

    expect(useEcho).toHaveBeenCalledWith(3);
    expect(host.textContent).toBe('3');
  });

  test('supports checkbox and native v-model modifiers', async () => {
    const dsl = {
      id: 'runtime-native-model',
      name: 'RuntimeNativeModel',
      apiMode: 'composition',
      state: {},
      refs: { checked: false, text: '' },
      reactives: {},
      computed: {},
      methods: {},
      props: [],
      emits: [],
      watch: [],
      dataSources: {},
      composables: [],
      provide: {},
      lifeCycles: {},
      nodes: [
        {
          id: 'checkbox-model',
          name: 'input',
          props: { type: 'checkbox' },
          directives: [
            {
              name: 'vModel',
              value: { type: 'JSExpression', value: 'this.checked.value' }
            }
          ]
        },
        {
          id: 'text-model',
          name: 'input',
          props: {},
          directives: [
            {
              name: 'vModel',
              value: { type: 'JSExpression', value: 'this.text.value' },
              modifiers: { trim: true, number: true, lazy: true }
            }
          ]
        }
      ]
    } as BlockSchema;
    const { renderer, context } = createRenderer({
      dsl,
      mode: ContextMode.Runtime,
      window
    });
    const { host } = await mount(() => h(renderer));
    const [checkbox, input] = Array.from(host.querySelectorAll('input'));

    checkbox.checked = true;
    checkbox.dispatchEvent(new Event('change', { bubbles: true }));
    input.value = ' 42 ';
    input.dispatchEvent(new Event('change', { bubbles: true }));
    await settle();

    expect((context as any).checked.value).toBe(true);
    expect((context as any).text.value).toBe(42);
  });

  test('loads nested schema components once in a real Vue tree', async () => {
    const child = {
      id: 'nested-child',
      name: 'NestedChild',
      apiMode: 'composition',
      state: {},
      refs: {},
      reactives: {},
      computed: {},
      methods: {},
      props: [{ name: 'label', type: 'String' }],
      emits: [],
      watch: [],
      dataSources: {},
      composables: [],
      provide: {},
      lifeCycles: {},
      nodes: [
        {
          id: 'nested-label',
          name: 'span',
          children: { type: 'JSExpression', value: 'this.label' }
        }
      ]
    } as BlockSchema;
    const getDsl = vi.fn(async () => child);
    const loader = createLoader({
      getDsl,
      getDslByUrl: vi.fn(),
      options: { window }
    });
    const parent = {
      id: 'nested-parent',
      name: 'NestedParent',
      apiMode: 'composition',
      state: {},
      refs: {},
      reactives: {},
      computed: {},
      methods: {},
      props: [],
      emits: [],
      watch: [],
      dataSources: {},
      composables: [],
      provide: {},
      lifeCycles: {},
      nodes: ['A', 'B'].map((label, index) => ({
        id: `nested-child-${index}`,
        name: 'NestedChild',
        from: { type: 'Schema', id: 'nested-child' },
        props: { label }
      }))
    } as BlockSchema;
    const { renderer } = createRenderer({
      dsl: parent,
      loader,
      mode: ContextMode.Runtime,
      window
    });
    const { host } = await mount(() => h(renderer));

    expect(Array.from(host.querySelectorAll('span'), (el) => el.textContent)).toEqual([
      'A',
      'B'
    ]);
    expect(getDsl).toHaveBeenCalledOnce();
  });

  test('retries a failed schema load after clearing its loader cache', async () => {
    const child = {
      id: 'retry-child',
      name: 'RetryChild',
      apiMode: 'composition',
      state: {},
      refs: {},
      reactives: {},
      computed: {},
      methods: {},
      props: [],
      emits: [],
      watch: [],
      dataSources: {},
      composables: [],
      provide: {},
      lifeCycles: {},
      nodes: [{ id: 'retry-result', name: 'span', children: 'loaded' }]
    } as BlockSchema;
    const getDsl = vi
      .fn<() => Promise<BlockSchema | null>>()
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce(child);
    const loader = createLoader({
      getDsl,
      getDslByUrl: vi.fn(),
      options: { window }
    });
    const parent = {
      ...child,
      id: 'retry-parent',
      name: 'RetryParent',
      nodes: [
        {
          id: 'retry-child-node',
          name: 'RetryChild',
          from: { type: 'Schema', id: 'retry-child' }
        }
      ]
    } as BlockSchema;
    const { renderer } = createRenderer({
      dsl: parent,
      loader,
      mode: ContextMode.Runtime,
      window
    });
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const first = await mount(() => h(renderer));

    expect(first.host.querySelector('span')).toBeNull();
    first.unmount();
    loader.clear();
    const second = await mount(() => h(renderer));

    expect(second.host.querySelector('span')?.textContent).toBe('loaded');
    expect(getDsl).toHaveBeenCalledTimes(2);
    warn.mockRestore();
  });

  test('tracks nested composition state without subscribing to unused refs', async () => {
    const triggered = vi.fn();
    const dsl = {
      id: 'runtime-nested-reactivity',
      name: 'RuntimeNestedReactivity',
      apiMode: 'composition',
      state: { profile: { name: 'A' } },
      refs: { unused: 0 },
      reactives: { form: { user: { name: 'B' } } },
      computed: {},
      methods: {
        update: {
          type: 'JSFunction',
          value: `() => {
            this.state.profile.name = 'C'
            this.form.user.name = 'D'
          }`
        },
        updateUnused: {
          type: 'JSFunction',
          value: '() => this.unused.value++'
        }
      },
      props: [],
      emits: [],
      watch: [],
      dataSources: {},
      composables: [],
      provide: {},
      lifeCycles: {
        renderTriggered: {
          type: 'JSFunction',
          value: '() => this.$apis.triggered()'
        }
      },
      nodes: [
        {
          id: 'nested-reactivity-output',
          name: 'button',
          events: {
            click: {
              name: 'click',
              handler: { type: 'JSFunction', value: '() => this.update()' }
            }
          },
          children: {
            type: 'JSExpression',
            value: '`${this.state.profile.name}:${this.form.user.name}`'
          }
        }
      ]
    } as BlockSchema;
    const { renderer, context } = createRenderer({
      dsl,
      mode: ContextMode.Runtime,
      apis: { triggered },
      window
    });
    const { host } = await mount(() => h(renderer));
    const button = host.querySelector('button')!;

    expect(button.textContent).toBe('A:B');
    button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await settle();
    expect(button.textContent).toBe('C:D');

    triggered.mockClear();
    (context as any).updateUnused();
    await settle();
    expect(triggered).not.toHaveBeenCalled();
  });

  test('supports collection, radio, select and named component models', async () => {
    const NamedModel = defineComponent({
      props: ['title', 'titleModifiers'],
      emits: ['update:title'],
      setup(props, { emit }) {
        return () =>
          h(
            'button',
            {
              id: 'named-model',
              onClick: () => emit('update:title', 'next')
            },
            `${props.title}:${!!props.titleModifiers?.trim}`
          );
      }
    });
    const dsl = {
      id: 'runtime-model-matrix',
      name: 'RuntimeModelMatrix',
      apiMode: 'composition',
      state: {},
      refs: { selected: [], radio: 1, multiple: [], title: 'start' },
      reactives: {},
      computed: {},
      methods: {},
      props: [],
      emits: [],
      watch: [],
      dataSources: {},
      composables: [],
      provide: {},
      lifeCycles: {},
      nodes: [
        {
          id: 'array-checkbox',
          name: 'input',
          props: {
            type: 'checkbox',
            value: { type: 'JSExpression', value: '2' }
          },
          directives: [
            {
              name: 'vModel',
              value: { type: 'JSExpression', value: 'this.selected.value' },
              modifiers: { number: true }
            }
          ]
        },
        {
          id: 'radio-model',
          name: 'input',
          props: {
            type: 'radio',
            value: { type: 'JSExpression', value: '2' }
          },
          directives: [
            {
              name: 'vModel',
              value: { type: 'JSExpression', value: 'this.radio.value' },
              modifiers: { number: true }
            }
          ]
        },
        {
          id: 'select-model',
          name: 'select',
          props: { multiple: true },
          directives: [
            {
              name: 'vModel',
              value: { type: 'JSExpression', value: 'this.multiple.value' },
              modifiers: { number: true }
            }
          ],
          children: [1, 2].map((value) => ({
            id: `option-${value}`,
            name: 'option',
            props: { value: { type: 'JSExpression', value: String(value) } },
            children: String(value)
          }))
        },
        {
          id: 'named-component-model',
          name: 'NamedModel',
          directives: [
            {
              name: 'vModel',
              arg: 'title',
              value: { type: 'JSExpression', value: 'this.title.value' },
              modifiers: { trim: true }
            }
          ]
        }
      ]
    } as BlockSchema;
    const { renderer, context } = createRenderer({
      dsl,
      mode: ContextMode.Runtime,
      components: { NamedModel },
      window
    });
    const { host } = await mount(() => h(renderer));
    const inputs = host.querySelectorAll('input');
    const checkbox = inputs[0];
    const radio = inputs[1];
    const select = host.querySelector('select')!;

    checkbox.checked = true;
    checkbox.dispatchEvent(new Event('change', { bubbles: true }));
    radio.checked = true;
    radio.dispatchEvent(new Event('change', { bubbles: true }));
    Array.from(select.options).forEach((option) => (option.selected = true));
    select.dispatchEvent(new Event('change', { bubbles: true }));
    host
      .querySelector('#named-model')!
      .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await settle();

    expect((context as any).selected.value).toEqual([2]);
    expect((context as any).radio.value).toBe(2);
    expect((context as any).multiple.value).toEqual([1, 2]);
    expect((context as any).title.value).toBe('next');
  });

  test('stops a real nested schema cycle without recursive rendering', async () => {
    const blockA = {
      id: 'cycle-a',
      name: 'CycleA',
      apiMode: 'composition',
      state: {},
      refs: {},
      reactives: {},
      computed: {},
      methods: {},
      props: [],
      emits: [],
      watch: [],
      dataSources: {},
      composables: [],
      provide: {},
      lifeCycles: {},
      nodes: [
        {
          id: 'cycle-a-to-b',
          name: 'CycleB',
          from: { type: 'Schema', id: 'cycle-b' }
        }
      ]
    } as BlockSchema;
    const blockB = {
      ...blockA,
      id: 'cycle-b',
      name: 'CycleB',
      nodes: [
        {
          id: 'cycle-b-to-a',
          name: 'CycleA',
          from: { type: 'Schema', id: 'cycle-a' }
        }
      ]
    } as BlockSchema;
    const getDsl = vi.fn(async (id: string) =>
      id === 'cycle-a' ? blockA : blockB
    );
    const loader = createLoader({
      getDsl,
      getDslByUrl: vi.fn(),
      options: { window }
    });
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const { renderer } = createRenderer({
      dsl: blockA,
      loader,
      mode: ContextMode.Runtime,
      window
    });

    await mount(() => h(renderer));

    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining('检测到区块循环引用')
    );
    expect(getDsl).toHaveBeenCalledTimes(2);
    warn.mockRestore();
  });

  test('isolates options state between instances of the same renderer', async () => {
    const dsl = {
      id: 'runtime-options-isolation',
      name: 'RuntimeOptionsIsolation',
      apiMode: 'options',
      state: { count: 0 },
      computed: {},
      methods: {
        increment: {
          type: 'JSFunction',
          value: '() => this.state.count++'
        }
      },
      props: [{ name: 'label', type: 'String' }],
      emits: [],
      watch: [],
      dataSources: {},
      lifeCycles: {},
      nodes: [
        {
          id: 'options-isolation-button',
          name: 'button',
          events: {
            click: {
              name: 'click',
              handler: { type: 'JSFunction', value: '() => this.increment()' }
            }
          },
          children: {
            type: 'JSExpression',
            value: '`${this.label}:${this.state.count}`'
          }
        }
      ]
    } as BlockSchema;
    const { renderer } = createRenderer({
      dsl,
      mode: ContextMode.Runtime,
      window
    });
    const { host } = await mount(() =>
      h('div', [h(renderer, { label: 'A' }), h(renderer, { label: 'B' })])
    );
    const buttons = Array.from(host.querySelectorAll('button'));

    buttons[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await settle();

    expect(buttons.map((button) => button.textContent)).toEqual(['A:1', 'B:0']);
  });

  test('keeps the latest element ref during a rapid v-if remount', async () => {
    const dsl = {
      id: 'runtime-ref-race',
      name: 'RuntimeRefRace',
      apiMode: 'composition',
      state: {},
      refs: { show: true, target: null },
      reactives: {},
      computed: {},
      methods: {},
      props: [],
      emits: [],
      watch: [],
      dataSources: {},
      composables: [],
      provide: {},
      lifeCycles: {},
      nodes: [
        {
          id: 'ref-race-target',
          name: 'span',
          props: { ref: 'target' },
          directives: [
            {
              name: 'vIf',
              value: { type: 'JSExpression', value: 'this.show.value' }
            }
          ],
          children: 'target'
        }
      ]
    } as BlockSchema;
    const { renderer, context } = createRenderer({
      dsl,
      mode: ContextMode.Runtime,
      window
    });
    const { host } = await mount(() => h(renderer));

    (context as any).show.value = false;
    await nextTick();
    (context as any).show.value = true;
    await settle();

    expect(host.querySelector('span')?.textContent).toBe('target');
    expect((context as any).target.value).toBe(host.querySelector('span'));
    expect(context.$refs.target).toBe(host.querySelector('span'));
  });

  test('reports a runtime composable failure through Vue error handling', async () => {
    const error = new Error('composable failed');
    const onError = vi.fn();
    const dsl = {
      id: 'runtime-composable-error',
      name: 'RuntimeComposableError',
      apiMode: 'composition',
      state: {},
      refs: {},
      reactives: {},
      computed: {},
      methods: {},
      props: [],
      emits: [],
      watch: [],
      dataSources: {},
      composables: [
        {
          name: 'failed',
          composable: {
            type: 'JSExpression',
            value: 'this.$libs.useFail'
          }
        }
      ],
      provide: {},
      lifeCycles: {},
      nodes: [{ id: 'composable-error-node', name: 'div' }]
    } as BlockSchema;
    const { renderer } = createRenderer({
      dsl,
      mode: ContextMode.Runtime,
      libs: {
        useFail() {
          throw error;
        }
      },
      window
    });
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    await mount(
      () => h(renderer),
      (app) => {
        app.config.errorHandler = onError;
      }
    );

    expect(onError).toHaveBeenCalledWith(
      error,
      expect.anything(),
      'setup function'
    );
    warn.mockRestore();
  });

  test('preserves the options state/method runtime path', async () => {
    const dsl = {
      id: 'runtime-options',
      name: 'RuntimeOptions',
      apiMode: 'options',
      state: { count: 1 },
      computed: {},
      methods: {
        increment: {
          type: 'JSFunction',
          value: '() => this.state.count++'
        }
      },
      props: [],
      emits: [],
      watch: [],
      dataSources: {},
      lifeCycles: {},
      nodes: [
        {
          id: 'options-button',
          name: 'button',
          props: {},
          directives: [],
          events: {
            click: {
              name: 'click',
              handler: {
                type: 'JSFunction',
                value: '() => this.increment()'
              }
            }
          },
          children: {
            type: 'JSExpression',
            value: 'this.state.count'
          }
        }
      ]
    } as BlockSchema;
    const { renderer } = createRenderer({
      dsl,
      mode: ContextMode.Runtime,
      window
    });
    const { host } = await mount(() => h(renderer));
    const button = host.querySelector('button') as HTMLButtonElement;

    expect(button.textContent).toBe('1');

    button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await settle();

    expect(button.textContent).toBe('2');
  });
});
