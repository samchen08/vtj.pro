import { expect, describe, test } from 'vitest';
import { Collecter } from '../src/collecter';
import type { BlockSchema, Dependencie, NodeSchema } from '@vtj/core';

const minimalDependencies: Dependencie[] = [
  {
    package: 'element-plus',
    version: 'latest',
    library: 'ElementPlus',
    urls: [],
    required: true,
    official: true,
    enabled: true
  }
];

describe('Collecter', () => {
  describe('constructor', () => {
    test('should initialize with minimal DSL', () => {
      const dsl: BlockSchema = { id: 'test', name: 'Test', nodes: [] };
      const collecter = new Collecter(dsl, []);
      expect(collecter.imports).toEqual({});
      expect(collecter.context).toEqual({});
      expect(collecter.style).toEqual({});
      expect(collecter.members).toEqual([]);
      expect(collecter.urlSchemas).toEqual({});
      expect(collecter.blockPlugins).toEqual({});
    });

    test('should handle null/undefined nodes', () => {
      const dsl = { id: 'test', name: 'Test' } as any;
      const collecter = new Collecter(dsl, []);
      expect(collecter.imports).toEqual({});
    });
  });

  describe('collectLibrary', () => {
    test('should create regex for library dependencies', () => {
      const dsl: BlockSchema = { id: 'test', name: 'Test', nodes: [] };
      const collecter = new Collecter(dsl, minimalDependencies);
      const regex = (collecter as any).libraryRegex;
      expect(regex.length).toBe(1);
      expect(regex[0] instanceof RegExp).toBe(true);
    });

    test('should skip dependencies without library', () => {
      const deps: Dependencie[] = [
        {
          package: 'vue',
          version: 'latest',
          library: '',
          urls: [],
          required: true,
          official: true,
          enabled: true
        } as Dependencie
      ];
      const dsl: BlockSchema = { id: 'test', name: 'Test', nodes: [] };
      const collecter = new Collecter(dsl, deps);
      expect((collecter as any).libraryRegex).toEqual([]);
    });
  });

  describe('collectImport', () => {
    test('should collect import from library reference', () => {
      const dsl: BlockSchema = { id: 'test', name: 'Test', nodes: [] };
      const collecter = new Collecter(dsl, minimalDependencies);
      const result = (collecter as any).collectImport(
        'this.$libs.ElementPlus.ElButton'
      );
      expect(result).toEqual({
        name: 'ElButton',
        path: 'this.$libs.ElementPlus.',
        library: 'ElementPlus'
      });
      expect(collecter.imports['element-plus']).toBeDefined();
      expect(Array.from(collecter.imports['element-plus'])).toContain(
        'ElButton'
      );
    });

    test('should return null for incorrect format', () => {
      const dsl: BlockSchema = { id: 'test', name: 'Test', nodes: [] };
      const collecter = new Collecter(dsl, minimalDependencies);
      const result = (collecter as any).collectImport('invalid');
      expect(result).toBeNull();
    });
  });

  describe('walk', () => {
    test('should replace library paths in JSExpression values', () => {
      const dsl: BlockSchema = {
        id: 'test',
        name: 'Test',
        nodes: [
          {
            name: 'div',
            children: {
              type: 'JSExpression',
              value: 'this.$libs.ElementPlus.ElButton.label'
            }
          }
        ]
      };
      const collecter = new Collecter(dsl, minimalDependencies);
      expect(collecter.imports['element-plus']).toBeDefined();
      expect(Array.from(collecter.imports['element-plus'])).toContain(
        'ElButton'
      );
    });

    test('should replace library paths in JSFunction values', () => {
      const dsl: BlockSchema = {
        id: 'test',
        name: 'Test',
        methods: {
          getLabel: {
            type: 'JSFunction',
            value: '() => this.$libs.ElementPlus.ElButton.label'
          }
        },
        nodes: []
      };
      const collecter = new Collecter(dsl, minimalDependencies);
      expect(collecter.imports['element-plus']).toBeDefined();
    });

    test('should handle nested objects with JSExpression', () => {
      const dsl: BlockSchema = {
        id: 'test',
        name: 'Test',
        state: {
          value: {
            type: 'JSExpression',
            value: 'this.$libs.ElementPlus.ElButton.label'
          }
        },
        nodes: []
      };
      const collecter = new Collecter(dsl, minimalDependencies);
      expect(Array.from(collecter.imports['element-plus'])).toContain(
        'ElButton'
      );
    });
  });

  describe('getLibraryMember', () => {
    test('should collect members excluding uni dependencies', () => {
      const deps: Dependencie[] = [
        {
          package: 'element-plus',
          version: 'latest',
          library: 'ElementPlus',
          urls: [],
          required: true,
          official: true,
          enabled: true
        },
        {
          package: '@dcloudio/uni-h5',
          version: 'latest',
          library: 'UniH5',
          urls: [],
          required: true,
          official: true,
          enabled: true,
          platform: 'uniapp'
        },
        {
          package: 'uni-ui',
          version: 'latest',
          library: 'UniUI',
          urls: [],
          required: true,
          official: true,
          enabled: true,
          platform: 'uniapp'
        }
      ];
      const dsl: BlockSchema = {
        id: 'test',
        name: 'Test',
        nodes: [
          {
            name: 'div',
            children: {
              type: 'JSExpression',
              value:
                'this.$libs.ElementPlus.ElButton.label + this.$libs.UniH5.View + this.$libs.UniUI.Text'
            }
          }
        ]
      };
      const collecter = new Collecter(dsl, deps);
      expect(collecter.members).toContain('ElButton');
      expect(collecter.members).not.toContain('View');
      expect(collecter.members).not.toContain('Text');
    });
  });

  describe('collectContext', () => {
    test('should collect vFor context with item and index', () => {
      const parent: NodeSchema = {
        name: 'div'
      };
      const node: NodeSchema = {
        id: 'n1',
        name: 'span',
        directives: [
          {
            name: 'vFor',
            value: { type: 'JSExpression', value: 'list' },
            iterator: { item: 'item', index: 'index' }
          }
        ]
      };
      const collecter = new Collecter(
        { id: 'test', name: 'Test', nodes: [] },
        []
      );
      (collecter as any).collectContext(node, parent);
      const ctx = collecter.context['n1'];
      expect(Array.from(ctx)).toContain('item');
      expect(Array.from(ctx)).toContain('index');
    });

    test('should collect slot context', () => {
      const parent: NodeSchema = { id: 'p1', name: 'div' };
      const node: NodeSchema = {
        id: 'n2',
        name: 'slot-content',
        slot: { name: 'default', params: ['scopeData'] }
      };
      const collecter = new Collecter(
        { id: 'test', name: 'Test', nodes: [] },
        []
      );
      (collecter as any).collectContext(node, parent);
      const ctx = collecter.context['n2'];
      expect(Array.from(ctx)).toContain('scopeData');
    });

    test('should inherit parent context', () => {
      const parent: NodeSchema = {
        id: 'p1',
        name: 'div',
        directives: [
          {
            name: 'vFor',
            value: { type: 'JSExpression', value: 'items' },
            iterator: { item: 'parentItem', index: 'parentIndex' }
          }
        ]
      };
      const child: NodeSchema = {
        id: 'n3',
        name: 'span'
      };
      const collecter = new Collecter(
        { id: 'test', name: 'Test', nodes: [] },
        []
      );
      (collecter as any).collectContext(parent);
      (collecter as any).collectContext(child, parent);
      const parentCtx = collecter.context['p1'];
      const childCtx = collecter.context['n3'];
      expect(Array.from(parentCtx)).toContain('parentItem');
      expect(Array.from(parentCtx)).toContain('parentIndex');
      expect(Array.from(childCtx)).toContain('parentItem');
      expect(Array.from(childCtx)).toContain('parentIndex');
    });
  });

  describe('collectStyle', () => {
    test('should collect non-JSExpression style props', () => {
      const node: NodeSchema = {
        id: 'n1',
        name: 'my-div',
        props: {
          style: { color: 'red', fontSize: '14px' }
        }
      };
      const collecter = new Collecter(
        { id: 'test', name: 'Test', nodes: [] },
        []
      );
      (collecter as any).collectStyle(node);
      expect(collecter.style['.my-div_n1']).toEqual({
        color: 'red',
        fontSize: '14px'
      });
    });

    test('should ignore JSExpression style', () => {
      const node: NodeSchema = {
        id: 'n1',
        name: 'my-div',
        props: {
          style: { type: 'JSExpression', value: 'dynamicStyle' }
        }
      };
      const collecter = new Collecter(
        { id: 'test', name: 'Test', nodes: [] },
        []
      );
      (collecter as any).collectStyle(node);
      expect(collecter.style['.my-div_n1']).toBeUndefined();
    });

    test('should skip when there is no style field', () => {
      const node: NodeSchema = {
        id: 'n1',
        name: 'my-div',
        props: {}
      };
      const collecter = new Collecter(
        { id: 'test', name: 'Test', nodes: [] },
        []
      );
      (collecter as any).collectStyle(node);
      expect(collecter.style['.my-div_n1']).toBeUndefined();
    });

    test('should skip when style object is empty', () => {
      const node: NodeSchema = {
        id: 'n1',
        name: 'my-div',
        props: { style: {} }
      };
      const collecter = new Collecter(
        { id: 'test', name: 'Test', nodes: [] },
        []
      );
      (collecter as any).collectStyle(node);
      expect(collecter.style['.my-div_n1']).toBeUndefined();
    });
  });

  describe('collectUrlSchema', () => {
    test('should collect URL schema node', () => {
      const node: NodeSchema = {
        id: 'n1',
        name: 'RemoteComp',
        from: { type: 'UrlSchema', url: 'https://example.com/comp.js' } as any
      };
      const collecter = new Collecter(
        { id: 'test', name: 'Test', nodes: [] },
        []
      );
      (collecter as any).collectUrlSchema(node);
      expect(collecter.urlSchemas['RemoteComp']).toEqual({
        type: 'UrlSchema',
        url: 'https://example.com/comp.js'
      });
    });

    test('should not collect when from is a string', () => {
      const node: NodeSchema = {
        id: 'n1',
        name: 'div',
        from: ''
      };
      const collecter = new Collecter(
        { id: 'test', name: 'Test', nodes: [] },
        []
      );
      (collecter as any).collectUrlSchema(node);
      expect(collecter.urlSchemas['div']).toBeUndefined();
    });
  });

  describe('collectBlockPlugin', () => {
    test('should collect block plugin node', () => {
      const node: NodeSchema = {
        id: 'n1',
        name: 'PluginComp',
        from: {
          type: 'Plugin',
          source: '@/plugins/my-plugin',
          name: 'MyPlugin'
        } as any
      };
      const collecter = new Collecter(
        { id: 'test', name: 'Test', nodes: [] },
        []
      );
      (collecter as any).collectBlockPlugin(node);
      expect(collecter.blockPlugins['PluginComp']).toEqual({
        type: 'Plugin',
        source: '@/plugins/my-plugin',
        name: 'MyPlugin'
      });
    });
  });

  describe('walkNodes', () => {
    test('should traverse nested nodes and collect context/style/schema/plugin', () => {
      const dsl: BlockSchema = {
        id: 'test',
        name: 'Test',
        nodes: [
          {
            id: 'n1',
            name: 'div',
            props: { style: { color: 'red' } },
            children: [
              {
                id: 'n2',
                name: 'span',
                children: [],
                directives: [
                  {
                    name: 'vFor',
                    value: { type: 'JSExpression', value: 'list' },
                    iterator: { item: 'item', index: 'index' }
                  }
                ]
              }
            ]
          }
        ]
      };
      const collecter = new Collecter(dsl, []);
      expect(collecter.style['.div_n1']).toEqual({ color: 'red' });
      expect(collecter.context['n2']).toBeDefined();
      const ctx = Array.from(collecter.context['n2']);
      expect(ctx).toContain('item');
      expect(ctx).toContain('index');
    });
  });
});
