import type { MaterialDescription } from '@vtj/core';

const components: MaterialDescription[] = [
  {
    name: 'AFloatButton',
    alias: 'FloatButton',
    label: '悬浮按钮',
    categoryId: 'other',
    doc: 'https://www.antdv.com/components/float-button-cn',
    props: [
      {
        name: 'description',
        label: 'description',
        title: '文字及其它内容',
        setters: 'StringSetter'
      },
      {
        name: 'tooltip',
        label: 'tooltip',
        title: '气泡卡片的内容',
        setters: 'StringSetter'
      },
      {
        name: 'type',
        label: 'type',
        title: '设置按钮类型',
        setters: 'SelectSetter',
        options: ['default', 'primary'],
        defaultValue: 'default'
      },
      {
        name: 'shape',
        label: 'shape',
        title: '设置按钮形状',
        setters: 'SelectSetter',
        options: ['circle', 'square'],
        defaultValue: 'circle'
      },
      {
        name: 'onClick',
        label: 'onClick',
        title: '点击按钮时的回调',
        setters: 'FunctionSetter'
      },
      {
        name: 'href',
        label: 'href',
        title: '点击跳转的地址，指定此属性 button 的行为和 a 链接一致',
        setters: 'StringSetter'
      },
      {
        name: 'target',
        label: 'target',
        title: '相当于 a 标签的 target 属性，href 存在时生效',
        setters: 'StringSetter'
      },
      {
        name: 'badge',
        label: 'badge',
        title: '带徽标数字的悬浮按钮（不支持 status 以及相关属性）',
        setters: 'ObjectSetter'
      }
    ],
    events: ['click'],
    slots: ['icon', 'description', 'tooltip']
  },
  {
    name: 'AFloatButtonGroup',
    alias: 'Group',
    parent: 'FloatButton',
    label: '悬浮按钮组',
    categoryId: 'other',
    doc: 'https://www.antdv.com/components/float-button-cn',
    props: [
      {
        name: 'shape',
        label: 'shape',
        title: '设置包含的 FloatButton 按钮形状',
        setters: 'SelectSetter',
        options: ['circle', 'square'],
        defaultValue: 'circle'
      },
      {
        name: 'trigger',
        label: 'trigger',
        title: '触发方式（有触发方式为菜单模式）',
        setters: 'SelectSetter',
        options: ['click', 'hover']
      },
      {
        name: 'open',
        label: 'open',
        title: '受控展开',
        setters: 'BooleanSetter'
      }
    ],
    events: ['openChange', 'click', 'update:open']
  },
  {
    name: 'ABackTop',
    alias: 'BackTop',
    parent: 'FloatButton',
    label: '悬浮回到顶部',
    categoryId: 'other',
    doc: 'https://www.antdv.com/components/float-button-cn',
    props: [
      {
        name: 'duration',
        label: 'duration',
        title: '回到顶部所需时间（ms）',
        setters: 'NumberSetter',
        defaultValue: 450
      },
      {
        name: 'target',
        label: 'target',
        title: '设置需要监听其滚动事件的元素',
        setters: 'FunctionSetter'
      },
      {
        name: 'visibilityHeight',
        label: 'visibilityHeight',
        title: '滚动高度达到此参数值才出现 BackTop',
        setters: 'NumberSetter',
        defaultValue: 400
      },
      {
        name: 'onClick',
        label: 'onClick',
        title: '点击按钮的回调函数',
        setters: 'FunctionSetter'
      }
    ],
    events: ['click']
  }
];
export default components;
