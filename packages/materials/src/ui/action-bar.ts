import type { MaterialDescription } from '@vtj/core';
import { size, type } from '../shared';
const desc: MaterialDescription = {
  name: 'XActionBar',
  label: '操作按钮集',
  categoryId: 'base',
  props: [
    {
      name: 'items',
      title: '动作项',
      setters: 'ArraySetter'
    },
    {
      name: 'mode',
      label: '模式',
      setters: 'SelectSetter',
      options: ['button', 'text', 'icon'],
      defaultValue: 'button'
    },
    size(),
    type(),
    {
      name: 'tooltip',
      label: 'Tooltip配置',
      setters: ['StringSetter', 'JsonSetter']
    },
    {
      name: 'badge',
      label: 'Badge配置',
      setters: ['StringSetter', 'NumberSetter', 'JsonSetter']
    },
    {
      name: 'dropdown',
      label: 'Dropdown配置',
      setters: 'JsonSetter'
    },
    {
      name: 'button',
      label: 'Button配置',
      setters: 'JsonSetter',
      title: 'mode为button时有效'
    },
    {
      name: 'disabled',
      label: '禁用',
      setters: 'BooleanSetter'
    },
    {
      name: 'background',
      label: '背景',
      setters: 'SelectSetter',
      options: ['always', 'hover', 'none']
    },
    {
      name: 'circle',
      label: '圆形',
      setters: 'BooleanSetter'
    }
  ],
  events: ['click', 'command'],
  snippet: {
    props: {
      items: [
        {
          label: '操作一',
          value: 1
        },
        {
          label: '操作二',
          value: 2
        },
        {
          label: '操作三',
          value: 3
        }
      ]
    }
  }
};

export default desc;
