import { expect, describe, test } from 'vitest';
import { parseUrlSchemas, parseBlockPlugins } from '../../src/parser/defines';

describe('parseUrlSchemas', () => {
  test('should generate defineUrlSchemaComponent call', () => {
    const result = parseUrlSchemas({
      RemoteComp: { type: 'UrlSchema', url: 'https://example.com/comp.js' }
    });
    expect(result[0]).toContain(
      "const RemoteComp = provider.defineUrlSchemaComponent('https://example.com/comp.js')"
    );
  });

  test('should handle empty object', () => {
    expect(parseUrlSchemas({})).toEqual([]);
  });
});

describe('parseBlockPlugins', () => {
  test('should generate definePluginComponent call', () => {
    const result = parseBlockPlugins({
      MyPlugin: {
        type: 'Plugin',
        source: '@/plugins/my-plugin',
        name: 'MyPlugin'
      } as any
    });
    expect(result[0]).toContain(
      'const MyPlugin = provider.definePluginComponent'
    );
    expect(result[0]).toContain('"source":"@/plugins/my-plugin"');
  });

  test('should handle empty object', () => {
    expect(parseBlockPlugins({})).toEqual([]);
  });
});
