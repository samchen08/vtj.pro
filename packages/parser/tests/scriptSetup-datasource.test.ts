import { expect, test, describe } from 'vitest';
import { parseScriptSetup } from '../src/vue/scriptSetup';
import { project } from './sources/project';

describe('parseScriptSetup - dataSource from __provider.createMock', () => {
  test('should extract mock dataSource with then callback', () => {
    const source = `
import { useProvider } from '@vtj/renderer';

const __provider = useProvider({ id: 'test', version: '1' });

const fetchMock = async (...args) => {
  return await __provider.createMock
    .apply(null, args)
    .then((res) => {
      return res.data;
    });
};
`;
    const result = parseScriptSetup(source, project);
    expect(result.dataSources).toBeDefined();
    expect(result.dataSources!['fetchMock']).toBeDefined();
    expect(result.dataSources!['fetchMock'].type).toBe('mock');
    expect(result.dataSources!['fetchMock'].name).toBe('fetchMock');
    expect(result.dataSources!['fetchMock'].transform).toBeDefined();
  });

  test('should extract mock dataSource without then callback', () => {
    const source = `
import { useProvider } from '@vtj/renderer';

const __provider = useProvider({ id: 'test', version: '1' });

const fetchNoThen = async (...args) => {
  return await __provider.createMock.apply(null, args);
};
`;
    const result = parseScriptSetup(source, project);
    expect(result.dataSources).toBeDefined();
    expect(result.dataSources!['fetchNoThen']).toBeDefined();
    expect(result.dataSources!['fetchNoThen'].type).toBe('mock');
  });

  test('should extract api dataSource with then callback', () => {
    const source = `
import { useProvider } from '@vtj/renderer';

const __provider = useProvider({ id: 'test', version: '1' });

const fetchApi = async (...args) => {
  return await __provider.apis['findCache']
    .apply(null, args)
    .then((res) => {
      return res;
    });
};
`;
    const result = parseScriptSetup(source, project);
    expect(result.dataSources).toBeDefined();
    const ds = result.dataSources!['fetchApi'];
    if (ds) {
      expect(ds.type).toBe('api');
      expect(ds.ref).toBe('findCache');
    }
  });

  test('should detect dataSource from function declaration with apis', () => {
    const source = `
import { useProvider } from '@vtj/renderer';

const __provider = useProvider({ id: 'test', version: '1' });

async function fetchData(...args) {
  return await __provider.apis['findCache']
    .apply(null, args)
    .then((res) => {
      return res;
    });
}
`;
    const result = parseScriptSetup(source, project);
    expect(result.dataSources).toBeDefined();
    const ds = result.dataSources!['fetchData'];
    if (ds) {
      expect(ds.type).toBe('api');
    }
  });

  test('should not create dataSource when no apis in function', () => {
    const source = `
import { useProvider } from '@vtj/renderer';

const __provider = useProvider({ id: 'test', version: '1' });

function regularFunction() {
  return 42;
}
`;
    const result = parseScriptSetup(source, project);
    expect(result.methods).toBeDefined();
    expect(result.methods!['regularFunction']).toBeDefined();
  });

  test('should degrade collect dataSource when api not exists but standard template', () => {
    // 标准模板写法 + API 未命中（getArticleList 不存在于 project.apis）→ 降级采集而非静默丢失
    const source = `
import { useProvider } from '@vtj/renderer';

const __provider = useProvider({ id: 'test', version: '1' });

const loadArticles = async (...args) => {
  return await __provider.apis['getArticleList'].apply(null, args);
};
`;
    const result = parseScriptSetup(source, project);
    expect(result.dataSources).toBeDefined();
    const ds = result.dataSources!['loadArticles'];
    expect(ds).toBeDefined();
    expect(ds.type).toBe('api');
    expect(ds.ref).toBe('getArticleList');
    expect(ds.label).toBe('');
    expect(result.methods!['loadArticles']).toBeUndefined();
  });

  test('should treat non-standard direct call as regular method', () => {
    // 非标准写法：直接调用 __provider.apis['x']()，无 return await ... .apply(...).then(...) 链，
    // 不采集为数据源，作为普通方法保留完整逻辑
    const source = `
import { useProvider } from '@vtj/renderer';

const __provider = useProvider({ id: 'test', version: '1' });

const loadArticles = async () => {
  const res = await __provider.apis['getArticleList']();
  return res;
};
`;
    const result = parseScriptSetup(source, project);
    expect(result.dataSources).toBeDefined();
    expect(result.dataSources!['loadArticles']).toBeUndefined();
    expect(result.methods!['loadArticles']).toBeDefined();
    expect(result.methods!['loadArticles'].value).toContain(
      "__provider.apis['getArticleList']()"
    );
  });

  test('should treat non-standard body with business logic as regular method', () => {
    // 非标准写法：函数体含 try/finally 与赋值逻辑 → 普通方法，避免 transform 丢失
    const source = `
import { useProvider } from '@vtj/renderer';

const __provider = useProvider({ id: 'test', version: '1' });

const fetchData = async () => {
  const res = await __provider.apis['findCache']();
  return res && res.data ? res.data : res;
};
`;
    const result = parseScriptSetup(source, project);
    expect(result.dataSources).toBeDefined();
    expect(result.dataSources!['fetchData']).toBeUndefined();
    expect(result.methods!['fetchData']).toBeDefined();
  });
});
