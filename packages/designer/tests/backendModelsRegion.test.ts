import { afterEach, describe, expect, it, vi } from 'vitest';
import { createApp, defineComponent, h, inject, nextTick, ref } from 'vue';
import type { BackendDraftView, Service } from '@vtj/core';
import AppsRegion from '../src/components/regions/apps.vue';
import { backendModelsKey } from '../src/components/hooks/useBackendModels';

let refreshBackend: () => Promise<void>;

let service: Partial<Service>;
const project = ref({ id: 'a' });
const widgets = ref([
  { name: 'Pages', openType: 'panel', label: '页面管理' },
  { name: 'BackendModels', openType: 'panel', label: '后端模型' }
]);
vi.mock('../src/framework', () => ({
  useEngine: () => ({
    get service() {
      return service;
    },
    project,
    state: { streaming: false },
    skeleton: { toggleCollapse: vi.fn() }
  }),
  RegionType: { Apps: 'Apps' }
}));
vi.mock('../src/components/hooks', () => ({
  useRegion: () => ({ widgets, widgetsRef: ref() }),
  useOpenApi: () => ({}),
  useCheckVersion: () => ({ latest: ref('') })
}));
vi.mock('../src/utils', () => ({ message: vi.fn() }));
vi.mock('@vtj/ui', () => ({ createDialog: vi.fn() }));
vi.mock('../src/components/shared', () => ({
  Icon: defineComponent({
    props: ['label'],
    setup(props, { attrs }) {
      return () => h('button', attrs, props.label);
    }
  })
}));
vi.mock('../src/wrappers', () => ({
  WidgetWrapper: defineComponent({
    props: ['widget'],
    setup(props) {
      refreshBackend = inject(backendModelsKey)!.refresh;
      return () => h('div', { 'data-panel': props.widget.name });
    }
  })
}));
const cleanups: (() => void)[] = [];
afterEach(() => cleanups.splice(0).forEach((cleanup) => cleanup()));
async function flush() {
  await nextTick();
  await Promise.resolve();
  await nextTick();
}
function mount() {
  project.value = { id: 'a' };
  const root = document.createElement('div');
  document.body.appendChild(root);
  const app = createApp(AppsRegion, { region: 'Apps' });
  app.mount(root);
  cleanups.push(() => {
    app.unmount();
    root.remove();
  });
  return root;
}
const draft: BackendDraftView = {
  schema: { dslVersion: '1.0', models: [] },
  revision: 1,
  appliedRevision: null,
  appliedReleaseId: null
};
describe('backend model entry in the Apps region', () => {
  it('keeps legacy navigation unchanged', async () => {
    service = {};
    const root = mount();
    await flush();
    expect(root.textContent).toContain('页面管理');
    expect(root.textContent).not.toContain('后端模型');
    expect(root.querySelector('[data-panel="Pages"]')).not.toBeNull();
  });
  it('opens the built-in panel, keeps it during refresh and hides it on project change', async () => {
    service = {
      getBackendCapabilities: async (id) => ({
        protocolVersions: ['1.0'],
        operations: id === 'a' ? ['read'] : []
      }),
      getBackendDraft: vi.fn(async () => draft)
    };
    const root = mount();
    await flush();
    const button = [...root.querySelectorAll('button')].find(
      (item) => item.textContent === '后端模型'
    )!;
    expect(button).toBeDefined();
    button.click();
    await flush();
    expect(root.querySelector('[data-panel="BackendModels"]')).not.toBeNull();
    await refreshBackend();
    await flush();
    expect(root.querySelector('[data-panel="BackendModels"]')).not.toBeNull();
    project.value = { id: 'b' };
    await flush();
    expect(root.textContent).not.toContain('后端模型');
    expect(root.querySelector('[data-panel="BackendModels"]')).toBeNull();
    expect(root.querySelector('[data-panel="Pages"]')).not.toBeNull();
    expect(service.getBackendDraft).toHaveBeenCalledTimes(2);
  });
});
