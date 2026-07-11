import { expect, test, describe, vi, beforeEach } from 'vitest';
import { Context } from '../src/render/context';
import { ContextMode } from '../src/constants';

describe('Context - Design mode', () => {
  test('__parseExpression in Design mode', () => {
    const ctx = new Context({ mode: ContextMode.Design });
    const result = ctx.__parseExpression({ type: 'JSExpression', value: '42' });
    expect(result).toBe(42);
  });

  test('__parseFunction in Design mode', () => {
    const ctx = new Context({ mode: ContextMode.Design });
    const result = ctx.__parseFunction({
      type: 'JSFunction',
      value: 'function() { return 1; }'
    });
    expect(typeof result).toBe('function');
  });

  test('__ref in Design mode returns function', () => {
    const ctx = new Context({ mode: ContextMode.Design });
    const ref = ctx.__ref('test-id');
    expect(ref).toBeDefined();
    expect(typeof ref).toBe('function');
  });

  test('__clone creates new context instance', () => {
    const ctx = new Context({
      mode: ContextMode.Runtime,
      attrs: { $components: {}, $libs: {} }
    });
    const cloned = ctx.__clone({ extra: 'val' });
    expect(cloned).toBeInstanceOf(Context);
    expect(cloned).not.toBe(ctx);
  });

  test('$components accessor', () => {
    const ctx = new Context({
      mode: ContextMode.Runtime,
      attrs: { $components: { CompA: {} }, $libs: {} }
    });
    expect(ctx.$components).toEqual({ CompA: {} });
  });

  test('design mode creates context with attrs', () => {
    const ctx = new Context({
      mode: ContextMode.Design,
      attrs: { $components: { Button: {} }, $libs: {}, $provider: null }
    });
    expect(ctx.$components).toBeDefined();
    expect(ctx.__mode).toBe(ContextMode.Design);
  });
});
