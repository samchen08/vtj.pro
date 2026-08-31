import { expect, test, describe, vi } from 'vitest';
import { createStaticRoutes } from '../src/provider/routes';
import type { PageFile } from '@vtj/core';

function createPage(id: string, overrides: Partial<PageFile> = {}): PageFile {
  return {
    id,
    title: `Page ${id}`,
    type: 'page',
    dir: false,
    layout: false,
    hidden: false,
    children: [],
    ...overrides
  } as PageFile;
}

describe('createStaticRoutes', () => {
  const mockComponent = { name: 'MockComponent' };

  test('creates routes for flat pages', () => {
    const pages = [createPage('page1'), createPage('page2')];
    const routes = createStaticRoutes({
      name: 'page',
      prefix: '/',
      pages,
      component: mockComponent,
      loader: vi.fn()
    });

    expect(routes).toHaveLength(2);
    expect(routes[0].name).toBe('page1');
    expect(routes[0].path).toBe('/page/page1');
    expect(routes[0].component).toBe(mockComponent);
    expect(routes[0].meta).toMatchObject({
      __vtj__: 'page1',
      title: 'Page page1'
    });
  });

  test('creates home route when homepage matches page id', () => {
    const pages = [createPage('page1')];
    const routes = createStaticRoutes({
      name: 'page',
      prefix: '/',
      pages,
      component: mockComponent,
      loader: vi.fn(),
      homepage: 'page1'
    });

    expect(routes).toHaveLength(2);
    const homeRoute = routes.find((r) => r.name === 'home_page1');
    expect(homeRoute).toBeDefined();
    expect(homeRoute!.path).toBe('');
  });

  test('creates layout routes with children', () => {
    const childPage = createPage('child1');
    const layoutPage = createPage('layout1', {
      layout: true,
      children: [childPage]
    });
    const routes = createStaticRoutes({
      name: 'page',
      prefix: '/',
      pages: [layoutPage],
      component: mockComponent,
      loader: vi.fn()
    });

    // layout route + child route
    const layoutRoute = routes.find((r) => r.name === 'layout_layout1');
    expect(layoutRoute).toBeDefined();
    expect(layoutRoute!.children).toBeDefined();
    expect(layoutRoute!.children!.length).toBeGreaterThan(0);
  });

  test('creates nested routes for dir pages', () => {
    const childPage = createPage('child1');
    const dirPage = createPage('dir1', {
      dir: true,
      children: [childPage]
    });
    const routes = createStaticRoutes({
      name: 'page',
      prefix: '/',
      pages: [dirPage],
      component: mockComponent,
      loader: vi.fn()
    });

    // dir page flattens children
    expect(routes).toHaveLength(1);
    expect(routes[0].name).toBe('child1');
  });

  test('uses custom name and prefix', () => {
    const pages = [createPage('page1')];
    const routes = createStaticRoutes({
      name: 'custom',
      prefix: '/app',
      pages,
      component: mockComponent,
      loader: vi.fn()
    });

    expect(routes[0].path).toBe('/appcustom/page1');
  });

  test('uses custom page paths with legacy aliases', () => {
    const pages = [createPage('page1', { routePath: '/users/:id' })];
    const routes = createStaticRoutes({
      name: 'page',
      prefix: '/',
      pages,
      component: mockComponent,
      loader: vi.fn()
    });

    expect(routes[0].path).toBe('/users/:id');
    expect(routes[0].alias).toBe('/page/page1');
    expect(routes[0].name).toBe('page1');
  });

  test('uses file-derived paths with legacy aliases', () => {
    const pages = [
      createPage('page1', { filePath: 'system/UserDetail' })
    ];
    const routes = createStaticRoutes({
      name: 'page',
      prefix: '/',
      pages,
      component: mockComponent,
      loader: vi.fn()
    });

    expect(routes[0].path).toBe('/page/system/user-detail');
    expect(routes[0].alias).toBe('/page/page1');
  });

  test('merges routeMeta with page meta', () => {
    const pages = [createPage('page1', { meta: { cache: false } })];
    const routes = createStaticRoutes({
      name: 'page',
      prefix: '/',
      pages,
      component: mockComponent,
      loader: vi.fn(),
      routeMeta: { requiresAuth: true }
    });

    expect(routes[0].meta).toMatchObject({
      cache: false,
      requiresAuth: true,
      __vtj__: 'page1'
    });
  });

  test('handles empty pages', () => {
    const routes = createStaticRoutes({
      name: 'page',
      prefix: '/',
      pages: [],
      component: mockComponent,
      loader: vi.fn()
    });

    expect(routes).toHaveLength(0);
  });

  test('handles dir page without children', () => {
    const dirPage = createPage('dir1', { dir: true, children: undefined });
    const routes = createStaticRoutes({
      name: 'page',
      prefix: '/',
      pages: [dirPage],
      component: mockComponent,
      loader: vi.fn()
    });
    expect(routes).toHaveLength(0);
  });

  test('handles layout page without children', () => {
    const layoutPage = createPage('layout1', {
      layout: true,
      children: undefined
    });
    const routes = createStaticRoutes({
      name: 'page',
      prefix: '/',
      pages: [layoutPage],
      component: mockComponent,
      loader: vi.fn()
    });
    expect(routes).toHaveLength(2); // layout route + page route
    expect(routes[0].name).toBe('layout_layout1');
    expect(routes[0].children).toEqual([]);
  });

  test('creates layout home route when homepage matches child id', () => {
    const childPage = createPage('child1');
    const layoutPage = createPage('layout1', {
      layout: true,
      children: [childPage]
    });
    const routes = createStaticRoutes({
      name: 'page',
      prefix: '/',
      pages: [layoutPage],
      component: mockComponent,
      loader: vi.fn(),
      homepage: 'child1'
    });
    // The layout has children which include child1 + its home route
    const layoutRoute = routes.find((r) => r.name === 'layout_layout1');
    expect(layoutRoute).toBeDefined();
    const childRoutes = (layoutRoute!.children || []).filter(
      (r: any) => r.name === 'child1' || r.name === 'home_child1'
    );
    expect(childRoutes.length).toBe(2);
  });
});
