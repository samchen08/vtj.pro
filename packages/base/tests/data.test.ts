import { describe, it, expect } from 'vitest';
import {
  arrayToMap,
  mapToObject,
  arrayToKv,
  kvToArray,
  dedupArray,
  toArray,
  zipObject,
  omit,
  pick,
  trim,
  sum,
  avg,
  splitParser,
  splitStringify,
  arrayToTree,
  flatChildren
} from '../src';

describe('数据转换工具', () => {
  // 测试 arrayToMap
  it('arrayToMap 应将数组转为Map', () => {
    const data = [
      { id: 1, name: 'A' },
      { id: 2, name: 'B' }
    ];
    const map = arrayToMap(data, 'id');
    expect(map.get(1)).toEqual({ id: 1, name: 'A' });
    expect(map.size).toBe(2);
  });

  // 测试 mapToObject
  it('mapToObject 应将Map转为对象', () => {
    const map = new Map();
    map.set('a', 1);
    map.set('b', 2);
    const obj = mapToObject(map);
    expect(obj).toEqual({ a: 1, b: 2 });
  });

  // 测试 arrayToKv
  it('arrayToKv 应将数组转为键值对', () => {
    const data = [
      { k: 'name', v: 'John' },
      { k: 'age', v: 30 }
    ];
    const result = arrayToKv(data, 'k', 'v');
    expect(result).toEqual({ name: 'John', age: 30 });
  });

  // 测试 kvToArray
  it('kvToArray 应将键值对转为数组', () => {
    const data = { name: 'John', age: 30 };
    const result = kvToArray(data, 'key', 'value');
    expect(result).toEqual([
      { key: 'name', value: 'John' },
      { key: 'age', value: 30 }
    ]);
  });

  // 测试 dedupArray
  it('dedupArray 应去重数组', () => {
    const data = [1, 2, 2, 3];
    expect(dedupArray(data)).toEqual([1, 2, 3]);

    const objs = [{ id: 1 }, { id: 1 }, { id: 2 }];
    expect(dedupArray(objs, 'id')).toEqual([{ id: 1 }, { id: 2 }]);
  });

  // 测试 toArray
  it('toArray 应转换为数组', () => {
    expect(toArray(1)).toEqual([1]);
    expect(toArray([1, 2])).toEqual([1, 2]);
    expect(toArray(null)).toEqual([]);
  });

  // 测试 zipObject
  it('zipObject 应清除空值', () => {
    const obj = { a: 1, b: null, c: undefined, d: 'value' };
    expect(zipObject(obj)).toEqual({ a: 1, d: 'value' });
  });

  // 测试 omit
  it('omit 应排除属性', () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(omit(obj, ['a'])).toEqual({ b: 2, c: 3 });
    expect(omit(obj, (k) => k === 'b')).toEqual({ a: 1, c: 3 });
  });

  // 测试 pick
  it('pick 应提取属性', () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(pick(obj, ['a'])).toEqual({ a: 1 });
    expect(pick(obj, (k) => k !== 'b')).toEqual({ a: 1, c: 3 });
  });

  // 测试 trim
  it('trim 应去除空格', () => {
    expect(trim(' text ')).toBe('text');
    expect(trim({ a: ' a ', b: [' b '] })).toEqual({ a: 'a', b: ['b'] });
  });

  // 测试 sum
  it('sum 应计算合计', () => {
    expect(sum([1, 2, 3])).toBe(6);
    expect(sum([{ v: 1 }, { v: 2 }], 'v')).toBe(3);
  });

  // 测试 avg
  it('avg 应计算平均值', () => {
    expect(avg([1, 2, 3])).toBe(2);
    expect(avg([{ v: 2 }, { v: 4 }], 'v')).toBe(3);
    expect(avg([])).toBe(0);
  });

  // 测试 splitParser
  it('splitParser 应分割字符串', () => {
    expect(splitParser('a,b,c')).toEqual(['a', 'b', 'c']);
    expect(splitParser('a|b', '|')).toEqual(['a', 'b']);
  });

  // 测试 splitStringify
  it('splitStringify 应连接数组', () => {
    expect(splitStringify(['a', 'b'])).toBe('a,b');
    expect(splitStringify(['a', 'b'], '|')).toBe('a|b');
  });

  // 测试 arrayToTree
  it('arrayToTree 应生成树结构', () => {
    const data = [
      { id: 1, parentId: null },
      { id: 2, parentId: 1 },
      { id: 3, parentId: 1 }
    ];
    const tree = arrayToTree(data);
    expect(tree).toEqual([
      {
        id: 1,
        parentId: null,
        children: [
          { id: 2, parentId: 1, children: [] },
          { id: 3, parentId: 1, children: [] }
        ]
      }
    ]);
  });

  // 测试 flatChildren
  it('flatChildren 应扁平化树结构', () => {
    const tree = [
      { id: 1, children: [{ id: 2 }, { id: 3, children: [{ id: 4 }] }] }
    ];
    const flat = flatChildren(tree);
    expect(flat).toEqual([{ id: 2 }, { id: 4 }, { id: 3 }, { id: 1 }]);
  });
});
