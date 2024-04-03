import type { MaterialDescription } from '@vtj/core';

const text: MaterialDescription = {
  name: 'ElText',
  label: '文本',
  categoryId: 'base',
  doc: 'https://element-plus.org/zh-CN/component/text.html',
  props: [
    {
      name: 'type',
      label: 'type',
      title: '类型',
      setters: 'SelectSetter',
      options: ['primary', 'success', 'warning', 'danger', 'info']
    },
    {
      name: 'size',
      label: 'size',
      title: '大小',
      setters: 'SelectSetter',
      options: ['large', 'default', 'small'],
      defaultValue: 'default'
    },
    {
      name: 'truncated',
      label: 'truncated',
      title: '显示省略号',
      setters: 'BooleanSetter',
      defaultValue: false
    },
    {
      name: 'lineClamp',
      label: 'lineClamp',
      title: '最大行数',
      setters: ['StringSetter', 'NumberSetter']
    },
    {
      name: 'tag',
      label: 'tag',
      title: '自定义元素标签',
      setters: 'StringSetter',
      defaultValue: 'span'
    }
  ],
  slots: ['default'],
  snippet: {
    props: {
      type: 'primary'
    },
    children: '这是一段Primary颜色的文本'
  }
};

export default text;
