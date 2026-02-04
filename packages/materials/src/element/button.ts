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
      title: '是否为朴素按钮',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    { name: 'text', title: '是否为文字按钮', defaultValue: false, setters: 'BooleanSetter' },
    { name: 'bg', title: '是否显示文字按钮背景颜色',  defaultValue: false, setters: 'BooleanSetter' },
    { name: 'link', title: '是否为链接按钮',  defaultValue: false, setters: 'BooleanSetter' },
    {
      name: 'round',
      title: '是否为圆角按钮',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'circle',
      title: '是否为圆形按钮',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'loading',
      title: '是否为加载中状态',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    { name: 'loadingIcon', title: '自定义加载中状态图标', defaultValue: undefined, setters: 'IconSetter' }, //??
    {
      name: 'disabled',
      title: '按钮是否为禁用状态',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'icon',
      title: '图标组件',
      defaultValue: undefined,
      setters: 'IconSetter'
    },
    {
      name: 'autofocus',
      title: '原生 autofocus 属性',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'nativeType',
      title: '原生 type 属性',
      defaultValue: 'button',
      setters: 'SelectSetter',
      options: ['button ', 'submit', 'reset']
    },
    {
      name: 'autoInsertSpace',
      title: '两个中文字符之间自动插入空格(仅当文本长度为 2 且所有字符均为中文时才生效)',
      setters: 'BooleanSetter'
    },
    {
      name: 'color',
      title: '自定义按钮颜色, 并自动计算 hover 和 active 触发后的颜色',
      setters: 'StringSetter'
    },
    {
      name: 'dark',
      title: 'dark 模式, 意味着自动设置 color 为 dark 模式的颜色',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'tag',
      title: '自定义元素标签',
      setters: 'StringSetter',
      defaultValue: 'button'
    }
  ],
  events: ['click'],
  slots: ['default', 'loading', 'icon', 'tag'],
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
