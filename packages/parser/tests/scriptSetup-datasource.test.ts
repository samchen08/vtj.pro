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
});
