import type { MaterialDescription } from '@vtj/core';

const desc: MaterialDescription = {
  name: 'UniTitle',
  label: '章节标题',
  categoryId: 'ext',
  props: [
    {
      name: 'type',
      title: '标题类型',
      defaultValue: '',
      setters: 'SelectSetter',
      options: ['h1', 'h2', 'h3', 'h4', 'h5']
    },
    {
      name: 'title',
      title: '章节标题内容',
      defaultValue: '',
      setters: 'StringSetter'
    },
    {
      name: 'align',
      title: '对齐方式',
      setters: 'SelectSetter',
      options: ['left', 'center', 'right']
    },
    {
      name: 'color',
      title: '字体颜色',
      defaultValue: '',
      setters: 'ColorSetter'
    },
    {
      name: 'stat',
      title: '是否开启统计功能呢',
      defaultValue: false,
      setters: 'BooleanSetter'
    }
  ],
  snippet: {
    props: {
      type: 'h1',
      title: 'h1 一级标题',
      color: '#027fff'
    }
  }
};

export default desc;
