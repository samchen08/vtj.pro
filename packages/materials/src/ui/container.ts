import type { MaterialDescription } from '@vtj/core';

const desc: MaterialDescription = {
  name: 'XContainer',
  label: '容器',
  categoryId: 'base',
  props: [
    {
      name: 'tag',
      label: '标签名',
      setters: 'StringSetter',
      defaultValue: 'div'
    },
    {
      name: 'fit',
      label: '高度自适应',
      setters: 'BooleanSetter'
    },
    {
      name: 'width',
      label: '宽度',
      setters: 'StringSetter'
    },
    {
      name: 'height',
      label: '高度',
      setters: 'StringSetter'
    },
    {
      name: 'flex',
      label: 'flex布局',
      setters: 'BooleanSetter',
      defaultValue: true
    },
    {
      name: 'inline',
      label: 'inline-flex',
      setters: 'BooleanSetter'
    },
    {
      name: 'direction',
      label: '排版方向',
      setters: 'SelectSetter',
      options: ['row', 'row-reverse', 'column', 'column-reverse'],
      defaultValue: 'row'
    },
    {
      name: 'wrap',
      label: '换行',
      setters: 'SelectSetter',
      options: ['nowrap', 'wrap', 'wrap-reverse'],
      defaultValue: 'nowrap'
    },
    {
      name: 'justify',
      label: '主轴对齐',
      setters: 'SelectSetter',
      options: [
        'flex-start',
        'flex-end',
        'center',
        'space-between',
        'space-around'
      ],
      defaultValue: 'flex-start'
    },
    {
      name: 'align',
      label: '交叉轴对齐',
      setters: 'SelectSetter',
      options: ['flex-start', 'flex-end', 'center', 'baseline', 'stretch'],
      defaultValue: 'flex-start'
    },
    {
      name: 'alignContent',
      label: '多轴线对齐',
      title: '多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用',
      setters: 'SelectSetter',
      options: [
        'flex-start',
        'flex-end',
        'center',
        'space-between',
        'space-around',
        'stretch'
      ],
      defaultValue: 'stretch'
    },
    {
      name: 'grow',
      label: '自动放大',
      setters: 'BooleanSetter',
      defaultValue: false
    },
    {
      name: 'shrink',
      label: '自动缩小',
      setters: 'BooleanSetter',
      defaultValue: false
    },
    {
      name: 'alignSelf',
      label: 'alignSelf',
      title:
        '单个项目有与其他项目不一样的对齐方式。可覆盖容器的align-items属性',
      setters: 'SelectSetter',
      options: ['flex-start', 'flex-end', 'center', 'baseline', 'stretch'],
      defaultValue: 'auto'
    },
    {
      name: 'overflow',
      label: 'overflow',
      setters: 'SelectSetter',
      options: ['auto', 'hidden', 'visible']
    },
    {
      name: 'padding',
      label: '内边距',
      setters: 'BooleanSetter',
      defaultValue: false
    },
    {
      name: 'gap',
      label: '子组件间隔',
      setters: 'BooleanSetter'
    },
    {
      name: 'autoPointer',
      label: 'autoPointer',
      setters: 'BooleanSetter'
    }
  ],
  snippet: {
    props: {
      padding: true
    }
  }
};

export default desc;
