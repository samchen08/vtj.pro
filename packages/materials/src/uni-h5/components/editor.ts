import type { MaterialDescription } from '@vtj/core';

const desc: MaterialDescription = {
  name: 'Editor',
  label: '富文本编辑器',
  categoryId: 'form',
  props: [
    {
      name: 'read-only',
      title: '设置编辑器为只读',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'placeholder',
      title: '提示信息',
      setters: 'BooleanSetter'
    },
    {
      name: 'show-img-size',
      title: '点击图片时显示图片大小控件',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'show-img-toolbar',
      title: '点击图片时显示工具栏控件',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'show-img-resize',
      title: '点击图片时显示修改尺寸控件',
      defaultValue: false,
      setters: 'BooleanSetter'
    }
  ],
  events: ['ready', 'focus', 'blur', 'input', 'statuschange'],
  snippet: {
    props: {
      placeholder: '开始输入...',
      'show-img-size': true,
      'show-img-toolbar': true,
      'show-img-resize': true
    }
  }
};

export default desc;
