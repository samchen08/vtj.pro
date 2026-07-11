import { expect, test, describe, vi } from 'vitest';
import {
  createSchemaApi,
  createMetaApi,
  createSchemaApis,
  createMock,
  mockApi,
  mockCleanup
} from '../src/provider/apis';

describe('createSchemaApi', () => {
  test('creates jsonp API when method is jsonp', async () => {
    const mockJsonp = vi.fn().mockResolvedValue({ data: 'ok' });
    const adapter = { jsonp: mockJsonp, request: { send: vi.fn() } };
    const schema = {
      id: 'api1',
      name: 'fetchJsonp',
      url: 'https://api.example.com/data',
      method: 'jsonp',
      jsonpOptions: { timeout: 5000 }
    };

    const api = createSchemaApi(schema as any, adapter as any);
    expect(typeof api).toBe('function');

    const result = await api({ page: 1 });
    expect(mockJsonp).toHaveBeenCalledWith(
      'https://api.example.com/data',
      expect.objectContaining({ query: { page: 1 }, timeout: 5000 })
    );
  });

  test('creates request API with standard method', async () => {
    const mockSend = vi.fn().mockResolvedValue({ data: 'result' });
    const adapter = { jsonp: vi.fn(), request: { send: mockSend } };
    const schema = {
      id: 'api2',
      name: 'fetchData',
      url: 'https://api.example.com/users',
      method: 'get',
      settings: { type: 'json' }
    };

    const api = createSchemaApi(schema as any, adapter as any);
    expect(typeof api).toBe('function');

    await api({ userId: 1 });
    expect(mockSend).toHaveBeenCalled();
  });
});

describe('createMetaApi', () => {
  test('returns undefined when metaQuery is not available', () => {
    const adapter = { metaQuery: undefined } as any;
    const meta = { id: 'meta1', code: 'test', queryCode: '' };
    const result = createMetaApi(meta as any, adapter);
    expect(result).toBeUndefined();
  });

  test('returns a function when metaQuery is available', () => {
    const mockMetaQuery = vi.fn().mockResolvedValue([]);
    const adapter = { metaQuery: mockMetaQuery } as any;
    const meta = { id: 'meta1', code: 'users', queryCode: 'queryUsers' };

    const api = createMetaApi(meta as any, adapter);
    expect(typeof api).toBe('function');

    (api as Function)({ filter: 'active' }, { method: 'post' });
    expect(mockMetaQuery).toHaveBeenCalledWith(
      'users',
      'queryUsers',
      { filter: 'active' },
      { method: 'post' }
    );
  });
});

describe('createSchemaApis', () => {
  test('creates apis from schemas and meta schemas', () => {
    const mockMetaQuery = vi.fn();
    const mockSend = vi.fn();
    const adapter = {
      jsonp: vi.fn(),
      request: { send: mockSend },
      metaQuery: mockMetaQuery
    } as any;

    const apis = [
      { id: 'a1', name: 'api1', url: '/api1', method: 'get' },
      { id: 'a2', name: 'api2', url: '/api2', method: 'post' }
    ];
    const metas = [{ id: 'm1', code: 'users', queryCode: 'qUsers' }];

    const result = createSchemaApis(apis as any, metas as any, adapter);
    // apis registered by both id and name
    expect(result.a1).toBeDefined();
    expect(result.api1).toBeDefined();
    expect(result.a2).toBeDefined();
    expect(result.api2).toBeDefined();
    // meta registered by id only
    expect(result.m1).toBeDefined();
    expect(typeof result.a1).toBe('function');
    expect(typeof result.api1).toBe('function');
  });

  test('handles empty arrays', () => {
    const adapter = { jsonp: vi.fn(), request: { send: vi.fn() } } as any;
    const result = createSchemaApis([], [], adapter);
    expect(result).toEqual({});
  });
});

describe('createMock', () => {
  test('returns a function even without Mock global', () => {
    // ensure Mock is not present
    delete (globalThis as any).Mock;
    const source = { type: 'mock' };
    const mock = createMock(source as any);
    expect(typeof mock).toBe('function');
  });

  test('creates mock with JSFunction template', async () => {
    const mockGlobal = {
      mock: vi.fn().mockReturnValue({ name: 'mock-result' })
    };
    (globalThis as any).Mock = {
      mock: mockGlobal.mock
    };

    const source = {
      type: 'mock',
      mockTemplate: {
        type: 'JSFunction',
        value: 'function() { return { name: "test" }; }'
      }
    };
    const mock = createMock(source as any);
    const result = await mock();
    expect(mockGlobal.mock).toHaveBeenCalled();
    expect(result).toBeDefined();

    delete (globalThis as any).Mock;
  });
});

describe('mockApi', () => {
  test('returns early when no mock', () => {
    const Mock = { mock: vi.fn() };
    const schema = { url: '/api/test', method: 'get' };
    expect(() => mockApi(Mock, schema as any)).not.toThrow();
    expect(Mock.mock).not.toHaveBeenCalled();
  });

  test('returns early when no url', () => {
    const Mock = { mock: vi.fn() };
    const schema = { mockTemplate: {}, method: 'get' };
    expect(() => mockApi(Mock, schema as any)).not.toThrow();
  });

  test('registers mock handler for url', () => {
    const mockFn = vi.fn().mockReturnValue({ data: 'mock' });
    const Mock = { mock: mockFn };
    const schema = {
      url: '/api/users',
      method: 'get',
      mock: true,
      mockTemplate: {
        type: 'JSFunction',
        value: 'function() { return { data: [] }; }'
      }
    };

    expect(() => mockApi(Mock, schema as any)).not.toThrow();
    expect(mockFn).toHaveBeenCalled();
  });

  test('registers mock with POST method', () => {
    const mockFn = vi.fn().mockReturnValue({ data: 'mock' });
    const Mock = { mock: mockFn };
    const schema = {
      url: '/api/create',
      method: 'post',
      mock: true,
      mockTemplate: {
        type: 'JSFunction',
        value: 'function() { return { id: 1 }; }'
      }
    };

    expect(() => mockApi(Mock, schema as any)).not.toThrow();
    expect(mockFn).toHaveBeenCalled();
  });
});

describe('mockCleanup', () => {
  test('cleans up mock data', () => {
    const Mock = { _mocked: { '/api/test': vi.fn() } };
    (globalThis as any).Mock = Mock;
    mockCleanup();
    expect((Mock as any)._mocked).toEqual({});
    delete (globalThis as any).Mock;
  });

  test('handles case when Mock is not available', () => {
    delete (globalThis as any).Mock;
    expect(() => mockCleanup()).not.toThrow();
  });
});
