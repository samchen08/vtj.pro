import type { MaterialDescription } from '@vtj/core';

const Cell: MaterialDescription[] = [
  {
    name: 'VanCell',
    alias: 'Cell',
    label: '单元格',
    categoryId: 'base',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/cell',
    props: [
      {
        name: 'title',
        title: '左侧标题',
        setters: ['StringSetter']
      },
      {
        name: 'value',
        title: '右侧标题',
        setters: ['StringSetter']
      },
      {
        name: 'label',
        title: '标题下方的描述信息',
        setters: ['StringSetter']
      },
      {
        name: 'size',
        title: '单元格大小，可选值为 large normal',
        setters: 'SelectSetter',
        options: ['large', 'normal']
      },
      {
        name: 'icon',
        title: '左侧图标名称或图片链接，等同于 Icon 组件的 name 属性',
        setters: ['VanIconSetter', 'StringSetter']
      },
      {
        name: 'icon-prefix',
        title: '图标类名前缀，等同于 Icon 组件的 class-prefix 属性',
        defaultValue: 'van-icon',
        setters: 'StringSetter'
      },
      {
        name: 'tag',
        title: '根节点对应的 HTML 标签名',
        defaultValue: 'div',
        setters: 'StringSetter'
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
        name: 'border',
        title: '是否显示内边框',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'replace',
        title: '是否在跳转时替换当前页面历史',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'clickable',
        title: '是否开启点击反馈',
        defaultValue: null,
        setters: 'BooleanSetter'
      },
      {
        name: 'is-link',
        title: '是否展示右侧箭头并开启点击反馈',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'required',
        title: '是否显示表单必填星号',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'center',
        title: '是否使内容垂直居中',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'arrow-direction',
        title: '箭头方向，可选值为 left up down',
        defaultValue: 'right',
        setters: 'SelectSetter',
        options: ['left', 'right', 'up', 'down']
      },
      {
        name: 'title-style',
        title: '左侧标题额外样式',
        setters: ['StringSetter', 'ArraySetter', 'ObjectSetter']
      },
      {
        name: 'title-class',
        title: '左侧标题额外类名',
        setters: ['StringSetter', 'ArraySetter', 'ObjectSetter']
      },
      {
        name: 'value-class',
        title: '右侧内容额外类名',
        setters: ['StringSetter', 'ArraySetter', 'ObjectSetter']
      },
      {
        name: 'label-class',
        title: '描述信息额外类名',
        setters: ['StringSetter', 'ArraySetter', 'ObjectSetter']
      }
    ],
    events: ['click'],
    slots: ['title', 'value', 'label', 'icon', 'right-icon', 'extra'],
    snippet: {
      props: {
        title: '单元格',
        value: '内容'
      }
    }
  },
  {
    name: 'VanCellGroup',
    alias: 'CellGroup',
    label: '单元格组',
    categoryId: 'base',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/cell',
    props: [
      {
        name: 'title',
        title: '分组标题',
        setters: 'StringSetter'
      },
      {
        name: 'inset',
        title: '是否展示为圆角卡片风格',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'border',
        title: '是否显示外边框',
        setters: 'BooleanSetter',
        defaultValue: true
      }
    ],
    slots: ['default', 'title'],
    snippet: {
      children: [
        {
          name: 'VanCell',
          props: {
            title: '单元格',
            value: '内容'
          }
        },
        {
          name: 'VanCell',
          props: {
            title: '单元格',
            value: '内容',
            label: '描述信息'
          }
        }
      ]
    }
  }
];

export default Cell;
