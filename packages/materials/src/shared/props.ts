import type { MaterialProp } from '@vtj/core';

export function size(name: string = 'size'): MaterialProp {
  return {
    name,
    title: '尺寸',
    defaultValue: 'default',
    setters: 'SelectSetter',
    options: ['default', 'large', 'small']
  };
}

export function type(name: string = 'type'): MaterialProp {
  return {
    name,
    title: '类型',
    defaultValue: 'default',
    setters: 'SelectSetter',
    options: ['default', 'primary', 'success', 'warning', 'danger', 'info']
  };
}
