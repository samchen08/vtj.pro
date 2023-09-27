import { ComponentDescription } from '@vtj/engine';
const component: ComponentDescription = {
  name: 'XContainer',
  title: '容器',
  categoryId: 'base',
  package: '@vtj/ui',
  props: [
    {
      name: 'tag',
      label: '标签名',
      defaultValue: 'div',
      setters: 'InputSetter'
    },
    {
      name: 'fit',
      label: '自适应',
      setters: 'BooleanSetter',
      defaultValue: false
    },
    {
      name: 'width',
      label: '宽度',
      setters: ['NumberSetter', 'InputSetter']
    },
    {
      name: 'height',
      label: '高度',
      setters: ['NumberSetter', 'InputSetter']
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
      setters: 'BooleanSetter',
      defaultValue: false
    },
    {
      name: 'direction',
      label: '主轴方向',
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
      label: '副轴对齐',
      setters: 'SelectSetter',
      options: ['flex-start', 'flex-end', 'center', 'baseline', 'stretch'],
      defaultValue: 'flex-start'
    },
    {
      name: 'alignContent',
      label: '多轴对齐',
      setters: 'SelectSetter',
      options: [
        'flex-start',
        'flex-end',
        'center',
        'space-between',
        'space-around',
        'stretch'
      ],
      defaultValue: 'stretch',
      title: '多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用'
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
      setters: 'SelectSetter',
      options: [
        'auto',
        'flex-start',
        'flex-end',
        'center',
        'baseline',
        'stretch'
      ],
      defaultValue: 'auto',
      title: '单个项目有与其他项目不一样的对齐方式。可覆盖容器的align-items属性'
    },
    {
      name: 'overflow',
      label: 'overflow',
      setters: 'SelectSetter',
      options: ['auto', 'hidden', 'visible']
    },
    {
      name: 'padding',
      label: '开启内边距',
      setters: 'BooleanSetter',
      defaultValue: false
    }
  ],
  snippet: {
    props: {
      fit: true,
      auto: true
    }
  }
};

export default component;
