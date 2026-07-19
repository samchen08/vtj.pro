import { afterEach, describe, expect, test, vi } from 'vitest';
import {
  createApp,
  defineComponent,
  h,
  isRef,
  nextTick,
  ref,
  Suspense,
  type App,
  type VNode
} from 'vue';
import type { BlockSchema } from '@vtj/core';
import { clearLoaderCache, ContextMode, createRenderer } from '../src';

const mounted: Array<{ app: App; host: HTMLElement }> = [];

async function settle() {
  for (let i = 0; i < 2; i++) {
    await Promise.resolve();
    await nextTick();
    await new Promise((resolve) => setTimeout(resolve, 0));
  }
  await nextTick();
}

async function mount(render: () => VNode) {
  const host = document.createElement('div');
  document.body.appendChild(host);
  const Root = defineComponent({
    render() {
      return h(Suspense, null, { default: render });
    }
  });
  const app = createApp(Root);
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
