import { describe, expect, test } from 'vitest';
import type { BlockSchema } from '@vtj/core';
import { buildEffectiveApiMap } from '../../../src/parser/composition/globalApi';
import { buildSymbolTable } from '../../../src/parser/composition/symbolTable';
import { transformExpression } from '../../../src/parser/composition/transformer';

describe('transformExpression', () => {
  test.each<[string, Partial<BlockSchema>, string]>([
    ['refs', { refs: { $router: 1 } }, '$router.value'],
    [
      'computed',
      { computed: { $router: { type: 'JSFunction', value: '() => 1' } } },
      '$router.value'
    ],
    ['reactives', { reactives: { $router: {} } }, '$router'],
    [
      'methods',
      { methods: { $router: { type: 'JSFunction', value: '() => 1' } } },
      '$router'
    ],
    ['props', { props: ['$router'] }, '__props.$router'],
    ['injects', { inject: [{ name: '$router' }] }, '$router'],
    [
      'composables',
      {
        composables: [
          {
            name: '$router',
            composable: { type: 'JSExpression', value: 'useCustomRouter' }
          }
        ]
      },
      '$router'
    ],
    [
      'dataSources',
      { dataSources: { load: { name: '$router', type: 'mock' } } },
      '$router'
    ]
  ])('should prefer local %s over built-in APIs', (_kind, fields, expected) => {
    const symbols = buildSymbolTable({ name: 'Test', ...fields });
    expect(transformExpression('this.$router', symbols)).toBe(expected);
    expect(transformExpression('this.$router', symbols, 'template')).toBe(
      '$router'
    );
    expect(symbols.globalApis.size).toBe(0);
    expect(symbols.usesInstance).toBe(false);
  });

  test('should unwrap ref/computed value once in scripts and templates', () => {
    const symbols = buildSymbolTable({
      name: 'Test',
      refs: { count: 0 },
      computed: { total: { type: 'JSFunction', value: '() => 1' } }
    });
    const code = 'this.count + this.count.value + this.total.value';
    expect(transformExpression(code, symbols)).toBe(
      'count.value + count.value + total.value'
    );
    expect(transformExpression(code, symbols, 'template')).toBe(
      'count + count + total'
    );
  });

  test('should preserve built-in and UI API mappings', () => {
    const symbols = buildSymbolTable(
      { name: 'Test', state: { count: 0 } },
      buildEffectiveApiMap('element-plus')
    );
    expect(
      transformExpression(
        'this.state.count; this.$router.push("/"); this.$message.success("ok")',
        symbols
      )
    ).toBe('__state.count; __router.push("/"); ElMessage.success("ok")');
    expect([...symbols.globalApis]).toEqual(['state', '$router', '$message']);
    expect(symbols.usesInstance).toBe(false);
  });

  test.each(['custom', '$custom', 'custom$', 'toString'])(
    'should fall back to the instance for %s without a key list',
    (name) => {
      const symbols = buildSymbolTable({ name: 'Test' });
      expect(transformExpression(`this.${name}.value`, symbols)).toBe(
        `__instance.proxy.${name}.value`
      );
      expect(symbols.usesInstance).toBe(true);
      expect(symbols.globalApis.size).toBe(0);
    }
  );

  test('should only transform real this references, including interpolation', () => {
    const symbols = buildSymbolTable({ name: 'Test' });
    const code = [
      'function() {',
      '  // this.$router',
      '  const text = "this.custom";',
      '  const pattern = /this.custom/;',
      '  return `this.custom: ${this.custom}`;',
      '}'
    ].join('\n');
    expect(transformExpression(code, symbols)).toBe(
      code.replace('${this.custom}', '${__instance.proxy.custom}')
    );
    expect(symbols.globalApis.size).toBe(0);
    expect(symbols.usesInstance).toBe(true);
  });

  test('should not confuse value$ properties with ref unwrapping', () => {
    const symbols = buildSymbolTable({ name: 'Test', refs: { count: 0 } });
    expect(transformExpression('this.count.value$', symbols, 'template')).toBe(
      'count.value$'
    );
  });

  test('should not collect globals from text or an object property named this', () => {
    const symbols = buildSymbolTable({ name: 'Test' });
    const code = '"this.custom" + object.this.custom + /this.$router/.source';
    expect(transformExpression(code, symbols)).toBe(code);
    expect(symbols.usesInstance).toBe(false);
    expect(symbols.globalApis.size).toBe(0);
  });

  test.each([
    'const helper = { custom: 42, read() { return this.custom; } }; return helper.read();',
    'function read() { return (() => this.custom)(); } return read.call({custom: 42});',
    'class Helper { custom = 42; read() { return (() => this.custom)(); } } return new Helper().read();',
    'const helper = { custom: 42, [this.methodName]() { return this.custom; } }; return helper.read();'
  ])('should preserve nested receivers: %s', (body) => {
    const code = `function() { ${body} }`;
    const symbols = buildSymbolTable({ name: 'Test' });
    const transformed = transformExpression(code, symbols);
    const proxy = { custom: 7, methodName: 'read' };
    const original = new Function(`return (${code});`)().call(proxy);
    const generated = new Function('__instance', `return (${transformed})();`)({
      proxy
    });
    expect(original).toBe(42);
    expect(generated).toBe(original);
    expect(transformed).toContain('this.custom');
  });

  test.each(['function()', '() =>'])(
    'should inherit component this in arrows inside %s',
    (head) => {
      const symbols = buildSymbolTable({ name: 'Test' });
      const result = transformExpression(
        `${head} { return (() => this.custom)(); }`,
        symbols
      );
      expect(result).toContain('() => __instance.proxy.custom');
      expect(symbols.usesInstance).toBe(true);
    }
  );

  test('should keep computed getters/setters bound to the component', () => {
    const symbols = buildSymbolTable({ name: 'Test', refs: { count: 1 } });
    const code = `({
      'get'() { return this.count.value + this.custom; },
      set: function(value) { this.count.value = value; }
    })`;
    const transformed = transformExpression(code, symbols, 'computed');
    const count = { value: 1 };
    const options = new Function(
      'count',
      '__instance',
      `return (${transformed});`
    )(count, { proxy: { custom: 7 } });
    expect(options.get()).toBe(8);
    options.set(2);
    expect(count.value).toBe(2);
    expect(symbols.usesInstance).toBe(true);
  });

  test('should only strip template context on the component receiver', () => {
    const symbols = buildSymbolTable({ name: 'Test' });
    const code = `() => {
      const helper = {read() { return this.context.item; }};
      return helper.read() + this.context.item + this.context?.value;
    }`;
    const result = transformExpression(code, symbols, 'template');
    expect(result).toContain('return this.context.item;');
    expect(result).toContain('return helper.read() + item + value;');
    expect(symbols.usesInstance).toBe(false);
  });
  test('preserves shadowed context aliases and object property names', () => {
    const symbols = buildSymbolTable({ name: 'Test' });
    const code = `function(__self) {
      const object = { __self: {custom: 1} };
      return __self.custom + $scope.custom + object.__self.custom;
    }`;
    const transformed = transformExpression(code, symbols);
    expect(transformed).toContain('__self.custom');
    expect(transformed).toContain('object.__self.custom');
    expect(
      new Function('__instance', `return (${transformed})({custom: 42});`)({
        proxy: { custom: 7 }
      })
    ).toBe(50);
  });
});
