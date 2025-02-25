import type { MaterialDescription } from '@vtj/core';

const Grid: MaterialDescription[] = [
  {
    name: 'VanGrid',
    alias: 'Grid',
    label: '宫格',
    categoryId: 'nav',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/grid',
    props: [
      {
        name: 'column-num',
        title: '列数',
        defaultValue: 4,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'icon-size',
        title: '图标大小，默认单位为px',
        defaultValue: 28,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'gutter',
        title: '格子之间的间距，默认单位为px',
        defaultValue: 0,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'border',
        title: '是否显示边框',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'center',
        title: '是否将格子内容居中显示',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'square',
        title: '是否将格子固定为正方形',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'clickable',
        title: '是否开启格子点击反馈',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'direction',
        title: '格子内容排列的方向',
        defaultValue: 'vertical',
        setters: 'SelectSetter',
        options: ['vertical', 'horizontal']
      },
      {
        name: 'reverse',
        title: '是否调换图标和文本的位置',
        defaultValue: false,
        setters: 'BooleanSetter'
      }
    ],
    snippet: {
      children: [
        {
          name: 'VanGridItem',
          props: {
            icon: 'photo-o',
            text: '文字'
          },
          directives: [
            {
              name: 'vFor',
              value: {
                type: 'JSExpression',
                value: '8'
              }
            }
          ]
        }
      ]
    }
  },
  {
    name: 'VanGridItem',
    alias: 'GridItem',
    label: '宫格项',
    categoryId: 'nav',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/grid',
    props: [
      {
        name: 'text',
        title: '文字',
        setters: 'StringSetter'
      },
      {
        name: 'icon',
        title: '图标名称或图片链接，等同于 Icon 组件的 name 属性',
        setters: ['VanIconSetter', 'StringSetter']
      },
      {
        name: 'icon-prefix',
        title: '图标类名前缀，等同于 Icon 组件的 class-prefix 属性',
        defaultValue: 'van-icon',
        setters: 'StringSetter'
      },
      {
        name: 'icon-color',
        title: '图标颜色，等同于 Icon 组件的 color 属性',
        setters: 'StringSetter'
      },
      {
        name: 'dot',
        title: '是否显示图标右上角小红点',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'badge',
        title: '图标右上角徽标的内容',
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'badge-props',
        title: '自定义徽标的属性，传入的对象会被透传给 Badge 组件的 props',
        setters: 'ObjectSetter'
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
      }
    ],
    events: [{ name: 'click', params: ['event'] }],
    slots: ['default', 'icon', 'text'],
    snippet: {
      props: {
        icon: 'photo-o',
        text: '文字'
      }
    }
  }
];

export default Grid;
