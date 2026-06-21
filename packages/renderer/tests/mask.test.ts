import { expect, test, describe } from 'vitest';
import { createMenus, menusFilter } from '../src/hooks/mask';
import type { PageFile } from '@vtj/core';
import type { MenuDataItem } from '@vtj/ui';

function createMockPage(
  id: string,
  overrides: Partial<PageFile> = {}
): PageFile {
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

test('createMenus creates flat menu from pages', () => {
  const pages = [createMockPage('page1'), createMockPage('page2')];
  const menus = createMenus('', 'page', pages);
  expect(menus).toHaveLength(2);
  expect(menus[0].id).toBe('page1');
  expect(menus[0].url).toBe('/page/page1');
  expect(menus[1].id).toBe('page2');
  expect(menus[1].url).toBe('/page/page2');
});

test('createMenus with prefix', () => {
  const pages = [createMockPage('page1')];
  const menus = createMenus('/app', 'page', pages);
  expect(menus[0].url).toBe('/app/page/page1');
});

test('createMenus creates nested menus from layout pages', () => {
  const childPage = createMockPage('child1');
  const parentPage = createMockPage('parent1', {
    layout: true,
    children: [childPage]
  });
  const menus = createMenus('', 'page', [parentPage]);
  // Layout page should flatten its children
  expect(menus).toHaveLength(1);
  expect(menus[0].id).toBe('child1');
  expect(menus[0].url).toBe('/page/child1');
});

test('createMenus creates nested menu items from non-layout pages with children', () => {
  const childPage = createMockPage('child1');
  const parentPage = createMockPage('parent1', {
    layout: false,
    children: [childPage]
  });
  const menus = createMenus('', 'page', [parentPage]);
  expect(menus).toHaveLength(1);
  expect(menus[0].children).toHaveLength(1);
  expect(menus[0].children![0].id).toBe('child1');
});

test('createMenus respects hidden flag', () => {
  const pages = [
    createMockPage('visible'),
    createMockPage('hidden', { hidden: true })
  ];
  const menus = createMenus('', 'page', pages);
  expect(menus[0].hidden).toBeFalsy();
  expect(menus[1].hidden).toBe(true);
});

test('menusFilter returns all menus when no access control', () => {
  const menus: MenuDataItem[] = [
    { id: 'page1', title: 'Page 1', url: '/page1' }
  ];
  const result = menusFilter(menus, undefined);
  expect(result).toHaveLength(1);
});

test('menusFilter filters by access permissions', () => {
  const access = {
    can: (code: string) => code === 'page1'
  };
  const menus: MenuDataItem[] = [
    { id: 'page1', title: 'Page 1', url: '/page1' },
    { id: 'page2', title: 'Page 2', url: '/page2' }
  ];
  const result = menusFilter(menus, access as any);
  expect(result).toHaveLength(1);
  expect(result[0].id).toBe('page1');
});

test('menusFilter filters nested menus', () => {
  const access = {
    can: (code: string) => code === 'child1'
  };
  const menus: MenuDataItem[] = [
    {
      id: 'parent',
      title: 'Parent',
      url: '/parent',
      children: [
        { id: 'child1', title: 'Child 1', url: '/child1' },
        { id: 'child2', title: 'Child 2', url: '/child2' }
      ]
    }
  ];
  const result = menusFilter(menus, access as any);
  expect(result).toHaveLength(1);
  expect(result[0].children).toHaveLength(1);
  expect(result[0].children![0].id).toBe('child1');
});

test('menusFilter removes empty parent when all children filtered out', () => {
  const access = {
    can: () => false
  };
  const menus: MenuDataItem[] = [
    {
      id: 'parent',
      title: 'Parent',
      url: '/parent',
      children: [{ id: 'child1', title: 'Child 1', url: '/child1' }]
    }
  ];
  const result = menusFilter(menus, access as any);
  expect(result).toHaveLength(0);
});
