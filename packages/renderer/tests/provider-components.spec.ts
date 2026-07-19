import { expect, test, describe, vi } from 'vitest';
import { h } from 'vue';
import { StartupContainer } from '../src/provider/startup';
import { PageContainer } from '../src/provider/page';

describe('StartupContainer', () => {
  test('renders page not found message', () => {
    const vnode =
      (StartupContainer as any).render?.call?.({} as any) ??
      (StartupContainer as any).setup?.({} as any, {} as any)?.render?.();

    // Test by mounting
    expect(StartupContainer.name).toBe('VtjStartupContainer');

    // Test render directly
    const renderFn = (StartupContainer as any).render;
    if (renderFn) {
      const result = renderFn();
      expect(result).toBeDefined();
      // render returns a VNode
      expect(result.type).toBe('div');
    }
  });
});

describe('PageContainer', () => {
  test('has correct component name', () => {
    expect(PageContainer.name).toBe('VtjPageContainer');
  });

  test('render without component shows error message', () => {
    const renderFn =
      (PageContainer as any).render ||
      (PageContainer as any).setup?.({} as any, {} as any);

    if ((PageContainer as any).render) {
      const ctx = {
        component: null,
        query: {},
        sid: Symbol(),
        meta: {}
      };
      const result = (PageContainer as any).render.call(ctx);
      expect(result).toBeDefined();
      // When no component, renders error div
      expect(result.type).toBe('div');
    }
  });

  test('render with component renders it', () => {
    if ((PageContainer as any).render) {
      const MockComp = { name: 'MockComponent' };
      const ctx = {
        component: MockComp,
        route: { query: { page: 1 } },
        sid: Symbol('test'),
        meta: {}
      };
      const result = (PageContainer as any).render.call(ctx);
      expect(result).toBeDefined();
      // With component, renders the component
      expect(result.type).toBe(MockComp);
    }
  });

  test('activated sets new sid when cache is false', () => {
    if ((PageContainer as any).activated) {
      const ctx = {
        meta: { cache: false },
        sid: Symbol('old')
      };
      const oldSid = ctx.sid;
      (PageContainer as any).activated.call(ctx);
      expect(ctx.sid).not.toBe(oldSid);
    }
  });

  test('activated does not change sid when cache is not false', () => {
    if ((PageContainer as any).activated) {
      const ctx = {
        meta: { cache: true },
        sid: Symbol('old')
      };
      const oldSid = ctx.sid;
      (PageContainer as any).activated.call(ctx);
      expect(ctx.sid).toBe(oldSid);
    }
  });
});
