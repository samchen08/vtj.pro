import { afterEach, describe, expect, test, vi } from 'vitest';
import {
  createApp,
  defineComponent,
  h,
  nextTick,
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

/** 只推进微任务，让首帧渲染完成，但不等宏任务里的异步数据 */
async function flushMicrotasks() {
  for (let i = 0; i < 3; i++) {
    await Promise.resolve();
    await nextTick();
  }
}

function createBlockSchema(id: string, text: string): BlockSchema {
  return {
    id,
    name: 'SlowBlock',
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
    nodes: [{ id: `${id}-text`, name: 'span', children: text }]
  } as BlockSchema;
}

function mountWithSuspense(render: () => VNode) {
  const host = document.createElement('div');
  document.body.appendChild(host);
  const Root = defineComponent({
    render() {
      return h(Suspense, null, { default: render });
    }
  });
  const app = createApp(Root);
  app.mount(host);
  mounted.push({ app, host });
  return host;
}

afterEach(() => {
  for (const { app, host } of mounted.splice(0)) {
    app.unmount();
    host.remove();
  }
  clearLoaderCache();
});

describe('block async loading', () => {
  test('区块异步加载不阻塞其余内容的首次渲染', async () => {
    let resolveBlock: ((dsl: BlockSchema | null) => void) | undefined;
    const getDsl = vi.fn(
      () =>
        new Promise<BlockSchema | null>((resolve) => {
          resolveBlock = resolve;
        })
    );
    const loader = createLoader({
      getDsl,
      getDslByUrl: vi.fn(),
      options: {}
    });
    const dsl = {
      id: 'suspense-page',
      name: 'SuspensePage',
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
        { id: 'page-text', name: 'span', children: 'page-content' },
        {
          id: 'slow-node',
          name: 'SlowBlock',
          from: { type: 'Schema', id: 'slow-block' }
        }
      ]
    } as BlockSchema;

    const { renderer } = createRenderer({
      dsl,
      loader,
      mode: ContextMode.Runtime
    });
    const host = mountWithSuspense(() => h(renderer));

    await flushMicrotasks();

    // 区块还挂在异步加载中，但页面其余内容必须已经渲染出来
    expect(host.textContent).toContain('page-content');
    expect(host.textContent).not.toContain('block-content');
    expect(getDsl).toHaveBeenCalledOnce();

    resolveBlock?.(createBlockSchema('slow-block', 'block-content'));
    await new Promise((resolve) => setTimeout(resolve, 0));
    await flushMicrotasks();

    expect(host.textContent).toContain('block-content');
  });
});
