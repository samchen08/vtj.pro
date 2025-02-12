import type { MaterialDescription } from '@vtj/core';

const Collapse: MaterialDescription[] = [
  {
    name: 'VanCollapse',
    alias: 'Collapse',
    label: '折叠面板',
    categoryId: 'view',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/collapse',
    props: [
      {
        name: 'modelValue',
        title: '当前展开面板的 name',
        setters: ['NumberSetter', 'StringSetter', 'ArraySetter']
      },
      {
        name: 'accordion',
        title: '是否开启手风琴模式',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'border	',
        title: '是否显示外边框',
        defaultValue: true,
        setters: 'BooleanSetter'
      }
    ],
    events: ['update:modelValue', 'change'],
    snippet: {
      props: {
        modelValue: ['1']
      },
      children: [
        {
          name: 'VanCollapseItem',
          props: {
            title: '标题1',
            name: '1'
          },
          children: '代码是写出来给人看的，附带能在机器上运行。'
        },
        {
          name: 'VanCollapseItem',
          props: {
            title: '标题2',
            name: '2'
          },
          children: '技术无非就是那些开发它的人的共同灵魂。。'
        },
        {
          name: 'VanCollapseItem',
          props: {
            title: '标题3',
            name: '3'
          },
          children: '在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。'
        }
      ]
    }
  },
  {
    name: 'VanCollapseItem',
    alias: 'CollapseItem',
    label: '折叠面板',
    categoryId: 'view',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/collapse',
    props: [
      {
        name: 'name',
        title: '唯一标识符，默认为索引值',
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'icon',
        title: '标题栏左侧图标名称或图片链接，等同于 Icon 组件的 name 属性',
        setters: ['VanIconSetter', 'StringSetter']
      },
      {
        name: 'size',
        title: '标题栏大小，可选值为 large',
        setters: 'SelectSetter',
        options: ['large']
      },
      {
        name: 'title',
        title: '标题栏左侧内容',
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'value',
        title: '标题栏右侧内容',
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'label',
        title: '标题栏描述信息',
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'border',
        title: '是否显示内边框',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'is-link',
        title: '是否展示标题栏右侧箭头并开启点击反馈',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'disabled',
        title: '是否禁用面板',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'readonly',
        title: '是否为只读状态，只读状态下无法操作面板',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'lazy-render',
        title: '是否在首次展开时才渲染面板内容',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'title-class',
        title: '左侧标题额外类名',
        setters: 'StringSetter'
      },
      {
        name: 'value-class',
        title: '右侧内容额外类名',
        setters: 'StringSetter'
      },
      {
        name: 'label-class',
        title: 'label-class',
        setters: 'StringSetter'
      }
    ],
    events: ['toggle'],
    slots: ['default', 'title', 'value', 'label', 'icon', 'right-icon'],
    snippet: {
      props: {
        title: '这是个标题'
      },
      children: '代码是写出来给人看的，附带能在机器上运行。'
    }
  }
];

export default Collapse;
