import type { MaterialDescription } from '@vtj/core';

// todo tabs 内部元素拖动 ？？

const Tab: MaterialDescription[] = [
  {
    name: 'VanTabs',
    alias: 'Tabs',
    label: '标签页',
    categoryId: 'nav',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/tap',
    props: [
      {
        name: 'active',
        title: '绑定当前选中标签的标识符',
        defaultValue: 0,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'type',
        title: '样式风格类型，可选值为 card',
        defaultValue: 'line',
        setters: 'SelectSetter',
        options: ['line', 'card']
      },
      {
        name: 'color',
        title: '标签主题色',
        defaultValue: '#1989fa',
        setters: 'StringSetter'
      },
      {
        name: 'background',
        title: '标签栏背景色',
        defaultValue: 'white',
        setters: 'StringSetter'
      },
      {
        name: 'duration',
        title: '动画时间，单位秒，设置为 0 可以禁用动画',
        defaultValue: 0.3,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'line-width',
        title: '底部条宽度，默认单位 px',
        defaultValue: 40,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'line-height',
        title: '底部条高度，默认单位 px',
        defaultValue: 3,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'animated',
        title:
          '是否开启切换标签内容时的转场动画（开启该属性后，内容区如果有粘性布局将会不达预期）',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'border',
        title: '是否显示标签栏外边框，仅在 type="line" 时有效',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'ellipsis',
        title:
          '是否省略过长的标题文字（仅在 shrink 为 false 且 tab 数量小于等于 swipe-threshold 时生效）',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'sticky',
        title: '是否使用粘性布局',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'shrink',
        title: '是否开启左侧收缩布局',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'swipeable',
        title:
          '是否开启手势左右滑动切换（开启该属性后，内容区如果有粘性布局将会不达预期）',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'lazy-render',
        title: '是否开启延迟渲染（首次切换到标签时才触发内容渲染）',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'scrollspy',
        title: '是否开启滚动导航',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'show-header',
        title: '是否显示标题栏',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'offset-top',
        title: '粘性布局下吸顶时与顶部的距离，支持 px vw vh rem 单位，默认 px',
        defaultValue: 0,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'swipe-threshold',
        title:
          '滚动阈值，标签数量超过阈值且总宽度超过标签栏宽度时开始横向滚动（仅在 shrink 为 false 且 ellipsis 为 true 时生效）',
        defaultValue: 0,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'title-active-color',
        title: '标题选中态颜色',
        setters: 'StringSetter'
      },
      {
        name: 'title-inactive-color',
        title: '标题默认态颜色',
        setters: 'StringSetter'
      },
      {
        name: 'before-change',
        title: '切换标签前的回调函数，返回 false 可阻止切换，支持返回 Promise',
        setters: 'FunctionSetter'
      }
    ],
    events: [
      { name: 'update:active' },
      { name: 'clickTab', params: ['data'] },
      { name: 'change', params: ['name', 'title'] },
      { name: 'rendered', params: ['name', 'title'] },
      { name: 'scroll', params: ['data'] }
    ],
    slots: ['default', 'nav-left', 'nav-right', 'nav-bottom'], // todo default 文档中没有
    snippet: {
      props: {
        active: 0
      },
      children: [
        { name: 'VanTab', props: { title: '内容1' }, children: '标题1' },
        { name: 'VanTab', props: { title: '内容2' }, children: '标题2' },
        { name: 'VanTab', props: { title: '内容3' }, children: '标题3' }
      ]
    }
  },
  {
    name: 'VanTab',
    alias: 'Tab',
    label: '标签页项',
    categoryId: 'nav',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/tap',
    props: [
      {
        name: 'title',
        title: '标题',
        setters: 'StringSetter'
      },
      {
        name: 'disabled',
        title: '是否禁用标签',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'dot',
        title: '是否在标题右上角显示小红点',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'badge',
        title: '图标右上角徽标的内容（dot 为 fasle 时生效）',
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'name',
        title: '标签名称，作为匹配的标识符',
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'url',
        title: '点击后跳转的链接地址',
        setters: 'StringSetter'
      },
      {
        name: 'to',
        title: '点击后跳转的目标路由对象，等同于 Vue Router 的 to 属性',
        setters: ['StringSetter', 'ObjectSetter']
      },
      {
        name: 'replace',
        title: '是否在跳转时替换当前页面历史',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'title-style',
        title: '自定义标题样式',
        setters: ['StringSetter', 'ArraySetter', 'ObjectSetter']
      },
      {
        name: 'title-class',
        title: '自定义标题类名',
        setters: ['StringSetter', 'ArraySetter', 'ObjectSetter']
      },
      {
        name: 'show-zero-badge',
        title: '当 badge 为数字 0 时，是否展示徽标',
        defaultValue: true,
        setters: 'BooleanSetter'
      }
    ],
    slots: ['default', 'title'],
    snippet: {
      props: { title: '内容-标题项' },
      children: '内容-标题项'
    }
  }
];

export default Tab;
