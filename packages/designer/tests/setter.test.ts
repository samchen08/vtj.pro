import { describe, it, expect, vi } from 'vitest';
import { SetterManager } from '../src/managers/setter';
import type { Setter } from '../src/framework';

const defaultSetter: Setter = {
  name: 'Default',
  component: {},
  type: 'String'
};

describe('SetterManager', () => {
  it('registers and gets a setter', () => {
    const manager = new SetterManager([], defaultSetter);
    const setter: Setter = {
      name: 'CustomSetter',
      component: {},
      type: 'String'
    };
    manager.register(setter);
    expect(manager.get('CustomSetter')).toBe(setter);
  });

  it('modifies an existing setter', () => {
    const manager = new SetterManager([], defaultSetter);
    manager.register({ name: 'CustomSetter', component: {}, type: 'String' });
    manager.set('CustomSetter', { type: 'Number' });
    expect(manager.get('CustomSetter')?.type).toBe('Number');
  });

  it('warns when setting a missing setter', () => {
    const manager = new SetterManager([], defaultSetter);
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    manager.set('MissingSetter', { type: 'String' });
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('is not found')
    );
    warnSpy.mockRestore();
  });

  it('finds setters by type case-insensitively', () => {
    const manager = new SetterManager(
      [
        { name: 'StringSetter', component: {}, type: 'String' },
        { name: 'InputSetter', component: {}, type: 'String' },
        { name: 'NumberSetter', component: {}, type: 'Number' }
      ],
      defaultSetter
    );
    const names = manager.getByType('string' as any);
    expect(names).toContain('StringSetter');
    expect(names).toContain('InputSetter');
    expect(names).not.toContain('NumberSetter');
  });

  it('finds setters by Object type', () => {
    const manager = new SetterManager(
      [
        { name: 'ExpressionSetter', component: {}, type: 'Object' },
        { name: 'ObjectSetter', component: {}, type: 'Object' }
      ],
      defaultSetter
    );
    const names = manager.getByType('Object');
    expect(names).toContain('ExpressionSetter');
    expect(names).toContain('ObjectSetter');
  });

  it('returns empty array for unmatched type', () => {
    const manager = new SetterManager([], defaultSetter);
    const names = manager.getByType('Unknown' as any);
    expect(names).toEqual([]);
  });
});
