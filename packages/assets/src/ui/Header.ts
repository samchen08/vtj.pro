import { ComponentDescription } from '@vtj/engine';
const component: ComponentDescription = {
  name: 'XHeader',
  title: '标题',
  categoryId: 'base',
  package: '@vtj/ui',
  props: [
    {
      name: 'size',
      label: '尺寸',
      setters: 'SelectSetter',
      options: ['default', 'small', 'large']
    },
    {
      name: 'content',
      label: '内容',
      setters: 'InputSetter'
    },
    {
      name: 'subtitle',
      label: '子标题',
      setters: 'InputSetter'
    },
    {
      name: 'icon',
      label: '图标',
      setters: 'IconSetter'
    },
    {
      name: 'border',
      label: '边框',
      setters: 'BooleanSetter'
    },
    {
      name: 'more',
      label: '更多链接',
      setters: 'BooleanSetter'
    }
  ],
  slots: ['default', 'subtitle', 'actions'],
  snippet: {
    props: {
      content: '标题文本内容'
    }
  }
};

export default component;
