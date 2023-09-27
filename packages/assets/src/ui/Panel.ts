import { ComponentDescription } from '@vtj/engine';
const component: ComponentDescription = {
  name: 'XPanel',
  title: '面板',
  categoryId: 'base',
  package: '@vtj/ui',
  props: [
    {
      name: 'fit',
      label: '自适应',
      setters: 'BooleanSetter'
    },
    {
      name: 'width',
      label: '宽度',
      setters: ['InputSetter', 'NumberSetter']
    },
    {
      name: 'height',
      label: '高度',
      setters: ['InputSetter', 'NumberSetter']
    },
    {
      name: 'border',
      label: '边框',
      setters: 'BooleanSetter',
      defaultValue: true
    },

    {
      name: 'radius',
      label: '圆角',
      setters: 'BooleanSetter',
      defaultValue: true
    },
    {
      name: 'card',
      label: '卡片模式',
      setters: 'BooleanSetter',
      defaultValue: false
    },
    {
      name: 'size',
      label: '尺寸',
      setters: 'SelectSetter',
      options: ['default', 'small', 'large']
    },
    {
      name: 'shadow',
      label: '阴影',
      setters: 'SelectSetter',
      options: ['none', 'always', 'hover'],
      defaultValue: 'none'
    },
    {
      name: 'header',
      label: '标题',
      setters: ['InputSetter', 'JSONSetter']
    },
    {
      name: 'bodyPadding',
      label: 'bodyPadding',
      setters: 'BooleanSetter'
    },
    {
      name: 'footerPadding',
      label: 'footerPadding',
      setters: 'BooleanSetter'
    },
    {
      name: 'body',
      label: 'body',
      setters: 'JSONSetter'
    },
    {
      name: 'footer',
      label: 'footer',
      setters: 'JSONSetter'
    }
  ],
  slots: ['default', 'header', 'footer', 'actions', 'title'],
  snippet: {
    props: {
      header: '面板标题'
    }
  }
};

export default component;
