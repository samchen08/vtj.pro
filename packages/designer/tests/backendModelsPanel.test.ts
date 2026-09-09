import { afterEach, describe, expect, it, vi } from 'vitest';
import { createApp, defineComponent, h, nextTick, provide } from 'vue';
import type { BackendDraftView, Service } from '@vtj/core';
import {
  backendModelsKey,
  useBackendModels
} from '../src/components/hooks/useBackendModels';
import BackendPanel from '../src/components/widgets/backend-models/index.vue';

vi.mock('../src/components/shared', () => ({
  Panel: defineComponent({
    setup(_, { slots }) {
      return () => h('section', slots.default?.());
    }
  })
}));
const cleanups: (() => void)[] = [];
afterEach(() => cleanups.splice(0).forEach((cleanup) => cleanup()));
const flush = async () => {
  await nextTick();
  await Promise.resolve();
  await nextTick();
};
function mount(read: NonNullable<Service['getBackendDraft']>) {
  const root = document.createElement('div');
  document.body.appendChild(root);
  const service = {
    getBackendCapabilities: async () => ({
      protocolVersions: ['1.0'],
      operations: ['read']
    }),
    getBackendDraft: read
  } as Service;
  const app = createApp(
    defineComponent({
      setup() {
        const state = useBackendModels(
          () => service,
          () => 'project'
        );
        provide(backendModelsKey, state);
        return () => h(BackendPanel);
      }
    })
  );
  app.mount(root);
  cleanups.push(() => {
    app.unmount();
    root.remove();
  });
  return root;
}
const draft: BackendDraftView = {
  revision: 2,
  appliedRevision: 1,
  appliedReleaseId: 'release-1',
  schema: {
    dslVersion: '1.0',
    models: [
      {
        id: 'customer',
        name: 'customer',
        label: '客户',
        fields: [
          { id: 'enabled', name: 'enabled', type: 'boolean', default: false }
        ],
        operations: ['list'],
        indexes: [{ id: 'enabled_index', fields: ['enabled'] }],
        policies: [
          {
            role: 'member',
            actions: ['list'],
            scope: 'owner',
            readFields: ['enabled'],
            writeFields: []
          }
        ]
      }
    ]
  }
};
describe('backend models panel', () => {
  it('renders loading without exposing write actions', () => {
    const root = mount(() => new Promise(() => {}));
    expect(root.textContent).toContain('正在读取');
    expect(root.textContent).not.toMatch(/保存|发布按钮|应用到/);
  });
  it('renders models, defaults, indexes, policies and version information', async () => {
    const source = JSON.parse(JSON.stringify(draft));
    const root = mount(async () => source);
    await flush();
    expect(root.textContent).toContain('客户');
    expect(root.textContent).toContain('false');
    expect(root.textContent).toContain('enabled_index');
    expect(root.textContent).toContain('本人数据');
    expect(root.textContent).toContain('草稿版本 2');
    expect(root.textContent).toContain('release-1');
    expect(source).toEqual(draft);
  });
  it('renders an empty draft', async () => {
    const root = mount(async () => ({
      ...draft,
      schema: { dslVersion: '1.0', models: [] }
    }));
    await flush();
    expect(root.textContent).toContain('暂无后端模型');
  });
  it('retries failed reads from the panel', async () => {
    const read = vi
      .fn()
      .mockRejectedValueOnce(new Error('读取失败'))
      .mockResolvedValue(draft);
    const root = mount(read);
    await flush();
    expect(root.textContent).toContain('读取失败');
    root.querySelector('button')!.click();
    await flush();
    expect(root.textContent).toContain('客户');
    expect(read).toHaveBeenCalledTimes(2);
  });
});
