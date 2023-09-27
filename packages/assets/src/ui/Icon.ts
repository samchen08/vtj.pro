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
      name: 'src',
      label: '图片Url',
      setters: 'InputSetter'
    }
  ],
  snippet: {
    props: {
      icon: 'Star'
    }
  }
};

export default component;
