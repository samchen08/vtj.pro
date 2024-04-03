import type { MaterialDescription } from '@vtj/core';
import { size, type } from '../shared';

const button: MaterialDescription = {
  name: 'ElButton',
  label: '按钮',
  categoryId: 'base',
  doc: 'https://element-plus.org/zh-CN/component/button.html',
  props: [
    size('size'),
    type('type'),
    {
      name: 'plain',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    { name: 'text', defaultValue: false, setters: 'BooleanSetter' },
    { name: 'bg', defaultValue: false, setters: 'BooleanSetter' },
    { name: 'link', defaultValue: false, setters: 'BooleanSetter' },
    {
      name: 'round',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'circle',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'loading',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    { name: 'loadingIcon', defaultValue: undefined, setters: 'IconSetter' }, //??
    {
      name: 'disabled',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'icon',
      defaultValue: undefined,
      setters: 'IconSetter'
    },
    {
      name: 'autofocus',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'nativeType',
      defaultValue: 'button',
      setters: 'SelectSetter',
      options: ['button ', 'submit', 'reset']
    },
    {
      name: 'autoInsertSpace',
      setters: 'BooleanSetter'
    },
    {
      name: 'color',
      setters: 'StringSetter'
    },
    {
      name: 'dark',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'tag',
      setters: 'StringSetter',
      defaultValue: 'button'
    }
  ],
  events: ['click'],
  slots: ['default', 'loading', 'icon', 'loading', 'icon', 'tag'],
  snippet: {
    name: 'ElButton',
    children: '按钮',
    props: {
      type: 'primary'
    }
  }
};

const buttonGroup: MaterialDescription = {
  name: 'ElButtonGroup',
  childIncludes: ['ElButton'],
  label: '按钮组',
  categoryId: 'base',
  props: [size('size'), type('type')],
  slots: ['default'],
  snippet: {
    name: 'ElButtonGroup',
    children: [
      {
        name: 'ElButton',
        children: 'Button1'
      },
      {
        name: 'ElButton',
        children: 'Button2'
      },
      {
        name: 'ElButton',
        children: 'Button3'
      }
    ]
  }
};

export default [button, buttonGroup];
