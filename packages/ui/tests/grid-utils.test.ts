import { describe, expect, test } from 'vitest';
import {
  createSortMap,
  getName,
  mergeCustomInfo
} from '../src/components/grid/utils';
import {
  BUTTONS_SLOT_NAME,
  PAGER_LEFT_SLOT_NAME,
  SLOTS
} from '../src/components/grid/constants';

describe('createSortMap', () => {
  test('字符串数组转为序号映射', () => {
    const map = createSortMap(['a', 'b', 'c']);
    expect(map).toEqual({ a: 0, b: 1, c: 2 });
  });

  test('空数组返回空对象', () => {
    expect(createSortMap([])).toEqual({});
  });
});

describe('getName', () => {
  test('优先返回 field', () => {
    expect(getName({ field: 'name', type: 'text' as any })).toBe('name');
  });

  test('无 field 时返回 type', () => {
    expect(getName({ type: 'seq' } as any)).toBe('seq');
  });

  test('无 field 和 type 返回空字符串', () => {
    expect(getName({} as any)).toBe('');
  });
});

describe('mergeCustomInfo', () => {
  test('按 sort 顺序重排 columns', () => {
    const columns = [
      { field: 'c', visible: true },
      { field: 'a', visible: true },
      { field: 'b', visible: true }
    ] as any[];
    const info: any = {
      id: 'test',
      sort: ['a', 'b', 'c'],
      resize: {},
      visible: {},
      fixed: {}
    };
    const result = mergeCustomInfo(columns, info);
    expect(result[0].field).toBe('a');
    expect(result[1].field).toBe('b');
    expect(result[2].field).toBe('c');
  });

  test('应用 resize 宽度', () => {
    const columns = [{ field: 'name', visible: true }] as any[];
    const info: any = {
      id: 'test',
      resize: { name: 200 },
      sort: [],
      visible: {},
      fixed: {}
    };
    const result = mergeCustomInfo(columns, info);
    expect(result[0].width).toBe(200);
  });

  test('应用 visible 可见性', () => {
    const columns = [{ field: 'name', visible: true }] as any[];
    const info: any = {
      id: 'test',
      resize: {},
      sort: [],
      visible: { name: false },
      fixed: {}
    };
    const result = mergeCustomInfo(columns, info);
    expect(result[0].visible).toBe(false);
  });

  test('应用 fixed 固定列', () => {
    const columns = [{ field: 'name', visible: true }] as any[];
    const info: any = {
      id: 'test',
      resize: {},
      sort: [],
      visible: {},
      fixed: { name: 'left' }
    };
    const result = mergeCustomInfo(columns, info);
    expect(result[0].fixed).toBe('left');
  });

  test('递归处理 children', () => {
    const columns = [
      {
        field: 'group',
        visible: true,
        children: [
          { field: 'sub1', visible: true },
          { field: 'sub2', visible: true }
        ]
      }
    ] as any[];
    const info: any = {
      id: 'test',
      resize: { sub1: 150 },
      sort: [],
      visible: {},
      fixed: {}
    };
    const result = mergeCustomInfo(columns, info);
    expect(result[0].children![0].width).toBe(150);
  });
});

describe('Grid 常量', () => {
  test('BUTTONS_SLOT_NAME 值为 toolbar__buttons', () => {
    expect(BUTTONS_SLOT_NAME).toBe('toolbar__buttons');
  });

  test('PAGER_LEFT_SLOT_NAME 值为 pager__left', () => {
    expect(PAGER_LEFT_SLOT_NAME).toBe('pager__left');
  });

  test('SLOTS 包含所有内置插槽名称', () => {
    const expectedSlots = [
      'empty',
      'loading',
      'form',
      'toolbar',
      'top',
      'bottom',
      'pager',
      'toolbar__buttons',
      'pager__left'
    ];
    expect(SLOTS).toEqual(expectedSlots);
    expect(SLOTS.length).toBe(9);
  });
});
