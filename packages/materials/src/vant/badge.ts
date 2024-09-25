import type { MaterialDescription } from '@vtj/core';

const Badge: MaterialDescription = {
  name: 'VantBadge',
  alias: 'Badge',
  label: '徽标',
  categoryId: 'view',
  doc: 'https://vant-ui.github.io/vant/#/zh-CN/button',
  props: [
    {
      name: 'content',
      title: '徽标内容（dot 为 fasle 时生效）',
      setters: ['StringSetter', 'NumberSetter']
    },
    {
      name: 'color',
      title: '徽标背景颜色',
      defaultValue: '#ee0a24',
      setters: 'StringSetter'
    },
    {
      name: 'dot',
      title: '是否展示为小红点',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'max',
      title: '最大值，超过最大值会显示 {max}+，仅当 content 为数字时有效',
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'offset',
      title:
        '设置徽标的偏移量，数组的两项分别对应水平向右和垂直向下方向的偏移量，默认单位为 px',
      defaultValue: [],
      setters: 'ArraySetter'
    },
    {
      name: 'show-zero',
      title: '当 content 为数字 0 或字符串 "0" 时，是否展示徽标',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'position',
      title: '徽标位置',
      defaultValue: 'top-right',
      setters: 'SelectSetter',
      options: ['top-left', 'top-right', 'bottom-left', 'bottom-right']
    }
  ],
  slots: ['default', 'content'],
  snippet: {
    props: {
      content: '5'
    },
    children: [
      {
        name: 'div',
        props: {
          style: {
            width: '40px',
            height: '40px',
            background: '#f2f3f5',
            borderRadius: '4px'
          }
        }
      }
    ]
  }
};

export default Badge;
