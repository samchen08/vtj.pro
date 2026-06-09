import { expect, test, vi, describe } from 'vitest';
import { DirectiveModel } from '../../src/models';
import type { NodeDirective, JSExpression } from '../../src/protocols';

describe('DirectiveModel', () => {
  test('should create from NodeDirective with auto-generated id', () => {
    const schema: NodeDirective = {
      name: 'show',
      value: { type: 'JSExpression', value: 'visible' }
    };
    const directive = new DirectiveModel(schema);
    expect(directive.id).toBeDefined();
    expect(directive.name).toBe('show');
    expect(directive.value).toEqual({ type: 'JSExpression', value: 'visible' });
  });

  test('should use provided id', () => {
    const schema: NodeDirective = {
      id: 'custom-id',
      name: 'model',
      value: { type: 'JSExpression', value: 'name' }
    };
    const directive = new DirectiveModel(schema);
    expect(directive.id).toBe('custom-id');
  });

  test('should create with all fields', () => {
    const schema: NodeDirective = {
      name: 'for',
      arg: 'item',
      modifiers: { track: true },
      value: { type: 'JSExpression', value: 'items' },
      iterator: { item: 'item', index: 'index' }
    };
    const directive = new DirectiveModel(schema);
    expect(directive.name).toBe('for');
    expect(directive.arg).toBe('item');
    expect(directive.modifiers).toEqual({ track: true });
    expect(directive.value).toEqual({ type: 'JSExpression', value: 'items' });
    expect(directive.iterator).toEqual({ item: 'item', index: 'index' });
  });

  test('update should change properties', () => {
    const schema: NodeDirective = {
      name: 'show',
      value: { type: 'JSExpression', value: 'false' }
    };
    const directive = new DirectiveModel(schema);
    directive.update({
      name: 'if',
      value: { type: 'JSExpression', value: 'true' },
      modifiers: { once: true }
    });
    expect(directive.name).toBe('if');
    expect(directive.value).toEqual({ type: 'JSExpression', value: 'true' });
    expect(directive.modifiers).toEqual({ once: true });
  });

  describe('parse', () => {
    test('should parse NodeDirective array to DirectiveModel array', () => {
      const directives: NodeDirective[] = [
        { name: 'show', value: { type: 'JSExpression', value: 'visible' } },
        { name: 'model', value: { type: 'JSExpression', value: 'name' } }
      ];
      const result = DirectiveModel.parse(directives);
      expect(result).toHaveLength(2);
      expect(result[0]).toBeInstanceOf(DirectiveModel);
      expect(result[1]).toBeInstanceOf(DirectiveModel);
      expect(result[0].name).toBe('show');
      expect(result[1].name).toBe('model');
    });

    test('should return empty array for empty input', () => {
      expect(DirectiveModel.parse([])).toEqual([]);
    });
  });

  describe('toDsl', () => {
    test('should convert DirectiveModel array to NodeDirective array', () => {
      const models = DirectiveModel.parse([
        {
          name: 'show',
          value: { type: 'JSExpression', value: 'visible' },
          arg: 'test'
        },
        {
          id: 'test-id',
          name: 'model',
          value: { type: 'JSExpression', value: 'name' }
        }
      ]);
      const result = DirectiveModel.toDsl(models);
      expect(result).toHaveLength(2);
      expect(result[0]).toHaveProperty('id');
      expect(result[0].name).toBe('show');
      expect(result[0].arg).toBe('test');
      expect(result[1].id).toBe('test-id');
      expect(result[1].name).toBe('model');
    });

    test('should return empty array for empty input', () => {
      expect(DirectiveModel.toDsl([])).toEqual([]);
    });
  });
});
