import { ComponentDescription } from '@vtj/engine';
const component: ComponentDescription = {
  name: 'XIcon',
  title: '图标',
  categoryId: 'base',
  package: '@vtj/ui',
  props: [
    {
      name: 'icon',
      label: '图标',
      setters: 'IconSetter'
    },
    {
      name: 'size',
      label: '尺寸',
      setters: ['SelectSetter', 'NumberSetter'],
      options: ['default', 'small', 'large']
    },
    {
      name: 'color',
      label: '颜色',
      setters: 'ColorSetter'
    },
    {
      name: 'background',
      label: '背景色',
      setters: 'ColorSetter'
    },
    {
      name: 'src',
      label: '图片Url',
      setters: 'InputSetter'
    },
    {
      name: 'radius',
      label: '圆角值',
      setters: 'NumberSetter'
    },
    {
      name: 'padding',
      label: '内边距',
      setters: 'NumberSetter'
    }
  ],
  snippet: {
    props: {
      icon: 'Star'
    }
  }
};

export default component;
