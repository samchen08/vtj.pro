import type { MaterialDescription } from '@vtj/core';

const desc: MaterialDescription = {
  name: 'UniTag',
  label: '标签',
  categoryId: 'ext',
  props: [
    {
      name: 'text',
      title: '标签内容',
      defaultValue: '',
      setters: 'StringSetter'
    },
    {
      name: 'size',
      title: '大小尺寸',
      defaultValue: 'normal',
      setters: 'SelectSetter',
      options: ['normal', 'small', 'mini']
    },
    {
      name: 'type',
      title: '颜色类型',
      defaultValue: 'default',
      setters: 'SelectSetter',
      options: ['default', 'primary', 'success', 'warning', 'error']
    },
    {
      name: 'disabled',
      title: '是否为禁用状态',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'inverted',
      title: '是否无需背景颜色（空心标签）',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'circle',
      title: '是否为圆角',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'mark',
      title: '是否为标记标签',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'custom-style',
      title: '自定义样式',
      setters: 'StringSetter'
    }
  ],
  events: ['click'],
  snippet: {
    props: {
      text: '标签',
      type: 'default'
    }
  }
};

export default desc;
