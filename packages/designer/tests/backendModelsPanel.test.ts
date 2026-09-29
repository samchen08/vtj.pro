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
function mount(
  read: NonNullable<Service['getBackendDraft']>,
  operations: Array<'read' | 'write'> = ['read']
) {
  const root = document.createElement('div');
  document.body.appendChild(root);
  const service = {
    getBackendCapabilities: async () => ({
      protocolVersions: ['1.0'],
      operations
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
  it('renders searchable model summaries and version information', async () => {
    const source = JSON.parse(JSON.stringify(draft));
    const root = mount(async () => source);
    await flush();
    expect(root.textContent).toContain('客户');
    expect(root.textContent).toContain('customer · 1 个字段');
    expect(root.textContent).toContain('草稿 v2');
    expect(root.textContent).toContain('开发已应用 v1');
    expect(root.textContent).toContain('当前服务仅开放只读能力');
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
  it('opens model and field editors when write capability is available', async () => {
    const root = mount(async () => draft, ['read', 'write']);
    await flush();
    root.querySelector<HTMLButtonElement>('.v-backend-models__item')!.click();
    await flush();
    expect(document.body.textContent).toContain('后端模型 · 开发环境');
    document.querySelector<HTMLElement>('#tab-fields')!.click();
    await flush();
    const addField = [...document.querySelectorAll('button')].find(
      (item) => item.textContent?.includes('添加字段')
    )!;
    addField.click();
    await flush();
    expect(document.body.textContent).toContain('字段类型');
    expect(document.body.textContent).toContain('最大长度');
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
