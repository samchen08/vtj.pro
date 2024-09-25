import type { MaterialDescription } from '@vtj/core';

const DropdownMenu: MaterialDescription[] = [
  {
    name: 'VantDropdownMenu',
    alias: 'DropdownMenu',
    label: '下拉菜单',
    categoryId: 'feedback',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/dropdown-menu',
    props: [
      {
        name: 'active-color',
        title: '菜单标题和选项的选中态颜色',
        defaultValue: '#1989fa',
        setters: 'StringSetter'
      },
      {
        name: 'direction',
        title: '菜单展开方向，可选值为up',
        defaultValue: 'down',
        setters: 'SelectSetter',
        options: ['up', 'down']
      },
      {
        name: 'z-index',
        title: '菜单栏 z-index 层级',
        defaultValue: 10,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'duration',
        title: '动画时长，单位秒，设置为 0 可以禁用动画',
        defaultValue: 0.2,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'overlay',
        title: '是否显示遮罩层',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'close-on-click-overlay',
        title: '是否在点击遮罩层后关闭菜单',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'close-on-click-outside',
        title: '是否在点击外部元素后关闭菜单',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'swipe-threshold',
        title:
          '滚动阈值，选项数量超过阈值且总宽度超过菜单栏宽度时，可以横向滚动',
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'auto-locate',
        title: '当祖先元素设置了 transform 时，自动调整下拉菜单的位置',
        defaultValue: false,
        setters: 'BooleanSetter'
      }
    ],
    snippet: {
      children: [
        {
          name: 'VantDropdownItem',
          props: {
            modelValue: 0,
            options: [
              { text: '全部商品', value: 0 },
              { text: '新款商品', value: 1 },
              { text: '活动商品', value: 2 }
            ]
          }
        },
        {
          name: 'VantDropdownItem',
          props: {
            modelValue: 'a',
            options: [
              { text: '默认排序', value: 'a' },
              { text: '好评排序', value: 'b' },
              { text: '销量排序', value: 'c' }
            ]
          }
        }
      ]
    }
  },
  {
    name: 'VantDropdownItem',
    alias: 'DropdownItem',
    label: '下拉菜单项',
    categoryId: 'feedback',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/dropdown-menu',
    props: [
      {
        name: 'modelValue',
        title: '当前选中项对应的 value',
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'title',
        title: '菜单项标题',
        setters: 'StringSetter'
      },
      {
        name: 'options',
        title: '选项数组',
        defaultValue: [],
        setters: 'ArraySetter'
      },
      {
        name: 'disabled',
        title: '是否禁用菜单',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'lazy-render',
        title: '是否在首次展开时才渲染菜单内容',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'title-class',
        title: '标题额外类名',
        setters: ['StringSetter', 'ArraySetter', 'ObjectSetter']
      },
      {
        name: 'teleport',
        title: '指定挂载的节点，等同于 Teleport 组件的 to 属性',
        setters: ['StringSetter', 'ExpressionSetter']
      }
    ],
    events: [
      { name: 'update:modelValue' },
      { name: 'change', params: ['value'] },
      { name: 'open' },
      { name: 'close' },
      { name: 'opened' },
      { name: 'closed' }
    ],
    slots: ['default', 'title'],
    snippet: {
      props: {
        modelValue: 'a',
        options: [
          { text: '默认排序', value: 'a' },
          { text: '好评排序', value: 'b' },
          { text: '销量排序', value: 'c' }
        ]
      }
    }
  }
];

export default DropdownMenu;
