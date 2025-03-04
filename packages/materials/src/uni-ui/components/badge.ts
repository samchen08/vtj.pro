import type { MaterialDescription } from '@vtj/core';

const desc: MaterialDescription = {
  name: 'UniBadge',
  label: '数字角标',
  categoryId: 'ext',
  props: [
    {
      name: 'text',
      title: '角标内容',
      setters: 'StringSetter'
    },
    {
      name: 'type',
      title: '颜色类型',
      defaultValue: 'default',
      setters: 'SelectSetter',
      options: ['default', 'primary', 'success', 'warning', 'error']
    },
    {
      name: 'size',
      title: 'Badge 大小',
      defaultValue: 'small',
      setters: 'SelectSetter',
      options: ['normal', 'small']
    },
    {
      name: 'is-dot',
      title: '不展示数字，只有一个小点',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'max-num',
      title: '展示封顶的数字值，超过 99 显示99+',
      defaultValue: '99',
      setters: ['StringSetter', 'NumberSetter']
    },
    {
      name: 'custom-style',
      title: '自定义 Badge 样式, 样式对象语法',
      defaultValue: {},
      setters: 'ObjectSetter'
    },
    {
      name: 'inverted',
      title: '是否无需背景颜色，为 true 时，背景颜色将变为文字的字体颜色',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'absolute',
      title: '开启绝对定位, 角标将定位到其包裹的标签的四个角上',
      defaultValue: 'rightTop',
      setters: 'SelectSetter',
      options: ['rightTop', 'rightBottom', 'leftBottom', 'leftTop']
    },
    {
      name: 'offset',
      title: '距定位角中心点的偏移量',
      defaultValue: [0, 0],
      setters: 'ArraySetter'
    }
  ],
  events: ['click'],
  snippet: {
    props: {
      text: '1'
    }
  }
};

export default desc;
