import { expect, describe, test } from 'vitest';
import { parseDataSources } from '../../src/parser/dataSources';

describe('parseDataSources', () => {
  test('should parse mock data source', () => {
    const result = parseDataSources({
      mockData: {
        type: 'mock',
        name: 'mockData',
        ref: 'mockRef',
        mockTemplate: { type: 'JSFunction', value: '(params) => ({ data: params })' }
      }
    });
    expect(result[0]).toContain('mockData');
    expect(result[0]).toContain('mock');
    expect(result[0]).toContain('DataSource:');
  });

  test('should parse api data source', () => {
    const result = parseDataSources({
      apiData: {
        type: 'api',
        name: 'apiData',
        ref: 'getUsers',
        transform: { type: 'JSFunction', value: '(res) => res.data' }
      }
    });
    expect(result[0]).toContain('apiData');
    expect(result[0]).toContain('getUsers');
    expect(result[0]).toContain('DataSource:');
  });

  test('should handle empty data sources', () => {
    expect(parseDataSources({})).toEqual([]);
  });

  test('should use default transform when not a JSFunction', () => {
    const result = parseDataSources({
      api: {
        type: 'api',
        name: 'api',
        ref: 'getData',
        transform: 'not a function' as any
      }
    });
    expect(result[0]).toContain('(res) => res');
  });

  test('should use default mock template when not a JSFunction', () => {
    const result = parseDataSources({
      mock: {
        type: 'mock',
        name: 'mock',
        ref: 'mockRef',
        mockTemplate: 'not a function' as any
      }
    });
    expect(result[0]).toContain('createMock');
    expect(result[0]).toContain('params');
  });
});
