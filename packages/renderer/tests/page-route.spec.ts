import { effectScope, nextTick, reactive } from 'vue';
import { afterEach, describe, expect, test, vi } from 'vitest';

const route = reactive({
  params: { id: 'page-a' } as Record<string, string>,
  query: {},
  meta: {} as Record<string, any>
});

const pages: Record<string, any> = {
  'page-a': { id: 'page-a', title: 'Page A', cache: true },
  'page-b': { id: 'page-b', title: 'Page B', cache: false }
};

const provider = {
  adapter: { useTitle: vi.fn() },
  getPage: vi.fn((id: string) => pages[id]),
  getHomepage: vi.fn(),
  getRenderComponent: vi.fn(async (id: string) => ({ name: id }))
};

vi.mock('vue-router', () => ({
  useRoute: () => route
}));

vi.mock('../src/provider/provider', () => ({
  useProvider: () => provider
}));

import { PageContainer } from '../src/provider/page';

afterEach(() => {
  route.params.id = 'page-a';
  route.meta = {};
  vi.clearAllMocks();
});

describe('PageContainer route updates', () => {
  test('reloads the component when the route page id changes', async () => {
    const scope = effectScope();
    const state = await scope.run(() => (PageContainer as any).setup())!;

    expect(state.file.value.id).toBe('page-a');
    expect(state.component.value.name).toBe('page-a');

    route.params.id = 'page-b';
    await nextTick();
    await Promise.resolve();

    expect(state.file.value.id).toBe('page-b');
    expect(state.component.value.name).toBe('page-b');
    expect(route.meta.cache).toBe(false);
    scope.stop();
  });

  test('activated reads the current route meta object', async () => {
    const scope = effectScope();
    const state = await scope.run(() => (PageContainer as any).setup())!;
    const context = {
      route,
      sid: state.sid.value
    };
    const previousSid = context.sid;
    route.meta = { cache: false };

    (PageContainer as any).activated.call(context);

    expect(context.sid).not.toBe(previousSid);
    scope.stop();
  });
});
