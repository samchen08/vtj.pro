import type { MaterialDescription } from '@vtj/core';
import { size, type } from '../shared';
const desc: MaterialDescription = {
  name: 'XAction',
  label: '操作按钮',
  categoryId: 'base',
  props: [
    {
      name: 'name',
      label: '名称标识',
      setters: 'StringSetter'
    },
    {
      name: 'label',
      label: '标题文本',
      setters: 'StringSetter'
    },
    {
      name: 'value',
      label: '动作值',
      setters: 'StringSetter',
      title: '用来传输数据'
    },
    {
      name: 'icon',
      label: '图标配置',
      setters: 'IconSetter'
    },
    {
      name: 'mode',
      label: '模式',
      setters: 'SelectSetter',
      options: ['button', 'text', 'icon'],
      defaultValue: 'button'
    },
    {
      name: 'menus',
      label: '菜单配置',
      setters: 'JsonSetter'
    },
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
    size(),
    type(),
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
  slots: [
    {
      name: 'item',
      params: ['item', 'index']
    },
    {
      name: 'default'
    }
  ],
  snippet: {
    props: {
      label: '操作按钮'
    }
  }
};

export default desc;
