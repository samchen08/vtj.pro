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
  operations: Array<'read' | 'write'> = ['read'],
  overrides: Partial<Service> = {}
) {
  const root = document.createElement('div');
  document.body.appendChild(root);
  const service = {
    getBackendCapabilities: async () => ({
      protocolVersions: ['1.0'],
      operations
    }),
    getBackendDraft: read,
    ...overrides
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
    const addField = [...document.querySelectorAll('button')].find((item) =>
      item.textContent?.includes('添加字段')
    )!;
    addField.click();
    await flush();
    expect(document.body.textContent).toContain('字段类型');
    expect(document.body.textContent).toContain('最大长度');
  });
  it('creates valid snake_case model ids', async () => {
    const validateBackendDraft = vi.fn(async () => ({
      valid: false as const,
      diagnostics: [],
      truncated: false
    }));
    const root = mount(async () => draft, ['read', 'write'], {
      validateBackendDraft,
      saveBackendDraft: async () => draft
    });
    await flush();
    root.querySelector<HTMLButtonElement>('.v-backend-models__item')!.click();
    await flush();
    const editor = [
      ...document.querySelectorAll<HTMLElement>('.v-model-editor')
    ].at(-1)!;
    editor
      .querySelector<HTMLButtonElement>('.v-model-editor__rail > button')!
      .click();
    await flush();
    expect(
      editor.querySelectorAll('.v-model-editor__model-list button')
    ).toHaveLength(2);
    const save = [...document.querySelectorAll('button')]
      .filter((item) => item.textContent?.trim() === '保存全部修改')
      .at(-1)!;
    expect(save.disabled).toBe(false);
    save.click();
    await flush();
    const schema = validateBackendDraft.mock.calls[0][1];
    expect(schema.models.at(-1)?.id).toMatch(/^[a-z][a-z0-9_]{0,47}$/);
  });
  it('protects fields referenced by indexes from accidental removal', async () => {
    const root = mount(async () => draft, ['read', 'write']);
    await flush();
    root.querySelector<HTMLButtonElement>('.v-backend-models__item')!.click();
    await flush();
    document.querySelector<HTMLElement>('#tab-fields')!.click();
    await flush();
    const remove = [...document.querySelectorAll('button')].find(
      (item) => item.textContent?.trim() === '删除'
    )!;
    remove.click();
    await flush();
    expect(document.body.textContent).toContain('请先移除字段依赖');
    expect(document.body.textContent).toContain('enabled');
  });
  it('adds indexes and default sorts without losing the current model', async () => {
    const root = mount(async () => draft, ['read', 'write']);
    await flush();
    root.querySelector<HTMLButtonElement>('.v-backend-models__item')!.click();
    await flush();
    document.querySelector<HTMLElement>('#tab-indexes')!.click();
    await flush();
    [...document.querySelectorAll('button')]
      .find((item) => item.textContent?.trim() === '添加索引')!
      .click();
    await flush();
    expect(
      document.querySelectorAll('.v-model-editor__config-row')
    ).toHaveLength(2);
    document.querySelector<HTMLElement>('#tab-sort')!.click();
    await flush();
    [...document.querySelectorAll('button')]
      .find((item) => item.textContent?.trim() === '添加排序')!
      .click();
    await flush();
    expect(document.body.textContent).toContain('列表默认排序');
    expect(
      document.querySelectorAll('#pane-sort .v-model-editor__config-row')
    ).toHaveLength(1);
  });
  it('uses explicit read-only states for applied models and fields', async () => {
    const applied = JSON.parse(JSON.stringify(draft));
    applied.appliedSchema = JSON.parse(JSON.stringify(draft.schema));
    const root = mount(async () => applied, ['read', 'write']);
    await flush();
    root.querySelector<HTMLButtonElement>('.v-backend-models__item')!.click();
    await flush();
    expect(document.body.textContent).toContain('已应用');
    expect(
      [...document.querySelectorAll('button')].some(
        (item) => item.textContent?.trim() === '删除模型'
      )
    ).toBe(false);
    document.querySelector<HTMLElement>('#tab-fields')!.click();
    await flush();
    expect(
      [...document.querySelectorAll('button')].some(
        (item) => item.textContent?.trim() === '删除'
      )
    ).toBe(false);
  });
  it('syncs metadata-only revisions when the DDL plan is empty', async () => {
    const applied = {
      ...draft,
      appliedRevision: 2,
      appliedSchema: JSON.parse(JSON.stringify(draft.schema))
    };
    const read = vi
      .fn()
      .mockResolvedValueOnce(draft)
      .mockResolvedValue(applied);
    const syncBackendDraft = vi.fn(async () => ({
      id: 'task',
      status: 'succeeded',
      completedSteps: 0
    }));
    const root = mount(read, ['read', 'write'], {
      getBackendPlan: async () => ({
        revision: 2,
        environment: 'dev',
        changes: [],
        diagnostics: []
      }),
      syncBackendDraft
    });
    await flush();
    root.querySelector<HTMLButtonElement>('.v-backend-models__item')!.click();
    await flush();
    [...document.querySelectorAll('button')]
      .find((item) => item.textContent?.trim() === '同步开发环境')!
      .click();
    await flush();
    expect(syncBackendDraft).toHaveBeenCalledOnce();
    expect(read.mock.calls.length).toBeGreaterThan(1);
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
