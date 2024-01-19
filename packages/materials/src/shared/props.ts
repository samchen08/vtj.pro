import type { MaterialProp } from '@vtj/core';

export function size(name: string = 'size'): MaterialProp {
  return {
    name,
    defaultValue: 'default',
    setters: 'SelectSetter',
    options: ['default', 'large', 'small']
  };
}

export function type(name: string = 'type'): MaterialProp {
  return {
    name,
    defaultValue: 'default',
    setters: 'SelectSetter',
    options: ['default', 'primary', 'success', 'warning', 'danger', 'info']
  };
}
