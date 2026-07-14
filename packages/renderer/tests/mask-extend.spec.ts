import { expect, test, describe, vi } from 'vitest';
import { createMenus, menusFilter } from '../src/hooks/mask';
import type { Access } from '../src/plugins';

describe('createMenus', () => {
  test('returns empty array for empty pages', () => {
    const result = createMenus('/app', 'page', []);
    expect(result).toEqual([]);
  });

  test('creates menu for a simple page', () => {
    const pages = [
      { id: 'p1', title: 'Page 1', icon: 'home', hidden: false, children: [] }
    ];
    const result = createMenus('/app', 'page', pages as any);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('p1');
    expect(result[0].title).toBe('Page 1');
    expect(result[0].url).toBe('/app/page/p1');
  });

  test('creates nested menus for children', () => {
    const pages = [
      {
        id: 'parent',
        title: 'Parent',
        children: [
          { id: 'child1', title: 'Child 1' },
          { id: 'child2', title: 'Child 2' }
        ]
      }
    ];
    const result = createMenus('/app', 'page', pages as any);
    expect(result).toHaveLength(1);
    expect(result[0].children).toHaveLength(2);
    expect(result[0].children![0].url).toBe('/app/page/child1');
  });

  test('flattens layout pages', () => {
    const pages = [
      {
        id: 'layout1',
        title: 'Layout',
        layout: true,
        children: [
          { id: 'sub1', title: 'Sub 1' },
          { id: 'sub2', title: 'Sub 2' }
        ]
      }
    ];
    const result = createMenus('/app', 'page', pages as any);
    // Layout pages are flattened, children become top-level
    expect(result).toHaveLength(2);
    expect(result[0].id).toBe('sub1');
    expect(result[1].id).toBe('sub2');
  });

  test('handles hidden page', () => {
    const pages = [{ id: 'p1', title: 'Hidden', hidden: true, children: [] }];
    const result = createMenus('/app', 'page', pages as any);
    expect(result).toHaveLength(1);
    expect(result[0].hidden).toBe(true);
  });

  test('handles undefined icon', () => {
    const pages = [{ id: 'p1', title: 'No Icon' }];
    const result = createMenus('/app', 'page', pages as any);
    expect(result).toHaveLength(1);
    expect(result[0].icon).toBeUndefined();
  });

  test('uses custom route name prefix', () => {
    const pages = [{ id: 'test', title: 'Test' }];
    const result = createMenus('/', 'custom', pages as any);
    expect(result[0].url).toBe('//custom/test');
  });

  test('handles inner pages with children correctly', () => {
    const pages = [
      {
        id: 'parent',
        title: 'Parent',
        children: [
          {
            id: 'sub',
            title: 'Sub',
            children: [{ id: 'inner', title: 'Inner' }]
          }
        ]
      }
    ];
    const result = createMenus('', 'p', pages as any);
    expect(result).toHaveLength(1);
    expect(result[0].children).toBeDefined();
    expect(result[0].children![0].children).toBeDefined();
  });
});

describe('menusFilter', () => {
  test('returns menus unchanged when no access', () => {
    const menus = [{ id: '1', title: 'Test', url: '/t' }];
    expect(menusFilter(menus as any)).toEqual(menus);
    expect(menusFilter(menus as any, null as any)).toEqual(menus);
  });

  test('filters menus based on access', () => {
    const access = {
      can: vi.fn().mockImplementation((id: string) => id === '1')
    } as any;
    const menus = [
      { id: '1', title: 'Allowed', url: '/a' },
      { id: '2', title: 'Denied', url: '/d' }
    ];
    const result = menusFilter(menus as any, access);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('1');
  });

  test('recursively filters children menus', () => {
    const allAllowed = {
      can: vi.fn().mockReturnValue(true)
    } as any;
    const menus = [
      {
        id: 'parent',
        title: 'Parent',
        children: [
          { id: 'child1', title: 'Child 1' },
          { id: 'child2', title: 'Child 2' }
        ]
      }
    ];
    const result = menusFilter(menus as any, allAllowed);
    expect(result).toHaveLength(1);
    expect(result[0].children).toHaveLength(2);
  });

  test('removes parent when all children filtered out', () => {
    const noneAllowed = {
      can: vi.fn().mockReturnValue(false)
    } as any;
    const menus = [
      {
        id: 'parent',
        title: 'Parent',
        children: [{ id: 'child1', title: 'Child 1' }]
      }
    ];
    const result = menusFilter(menus as any, noneAllowed);
    expect(result).toHaveLength(0);
  });

  test('keeps parent when at least one child allowed', () => {
    const access = {
      can: vi.fn().mockImplementation((id: string) => id === 'child2')
    } as any;
    const menus = [
      {
        id: 'parent',
        title: 'Parent',
        children: [
          { id: 'child1', title: 'Child 1' },
          { id: 'child2', title: 'Child 2' }
        ]
      }
    ];
    const result = menusFilter(menus as any, access);
    expect(result).toHaveLength(1);
    expect(result[0].children).toHaveLength(1);
    expect(result[0].children![0].id).toBe('child2');
  });

  test('handles empty menus array', () => {
    const access = { can: vi.fn().mockReturnValue(true) } as any;
    expect(menusFilter([], access)).toEqual([]);
  });
});
