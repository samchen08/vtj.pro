import type { MaterialDescription } from '@vtj/core';

const components: MaterialDescription[] = [
  {
    name: 'AButton',
    alias: 'Button',
    label: '按钮',
    categoryId: 'base',
    doc: 'https://www.antdv.com/components/button-cn',
    props: [
      {
        name: 'block',
        label: 'block',
        title: '将按钮宽度调整为其父宽度的选项',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'danger',
        label: 'danger',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'disabled',
        label: 'disabled',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'ghost',
        label: 'ghost',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'href',
        label: 'href',
        setters: 'InputSetter'
      },
      {
        name: 'loading',
        label: 'loading',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'shape',
        label: 'shape',
        setters: 'SelectSetter',
        options: ['default', 'circle', 'round'],
        defaultValue: 'default'
      },
      {
        name: 'size',
        label: 'size',
        setters: 'SelectSetter',
        options: ['large', 'middle', 'small'],
        defaultValue: 'middle'
      },
      {
        name: 'target',
        label: 'target',
        setters: 'InputSetter',
        title: '相当于 a 链接的 target 属性，href 存在时生效'
      },
      {
        name: 'type',
        label: 'type',
        setters: 'SelectSetter',
        options: ['primary', 'ghost', 'dashed', 'link', 'text', 'default'],
        defaultValue: 'default'
      }
    ],
    events: ['click'],
    slots: ['default','icon'],
    snippet: {
      children: 'Button'
    }
  },
  {
    name: 'AButtonGroup',
    alias: 'Group',
    parent: 'Button',
    label: '按钮组',
    categoryId: 'base',
    doc: 'https://www.antdv.com/components/button-cn',
    props: [
      {
        name: 'size',
        label: 'size',
        setters: 'SelectSetter',
        options: ['large', 'middle', 'small'],
        defaultValue: 'middle'
      }
    ],
    snippet: {
      children: [
        {
          name: 'AButton',
          children: 'Button1'
        },
        {
          name: 'AButton',
          children: 'Button2'
        },
        {
          name: 'AButton',
          children: 'Button3'
        }
      ]
    }
  }
];

export default components;
