import type { MaterialDescription } from '@vtj/core';

const Loading: MaterialDescription = {
  name: 'VanLoading',
  alias: 'Loading',
  label: '加载',
  categoryId: 'feedback',
  doc: 'https://vant-ui.github.io/vant/#/zh-CN/loading',
  props: [
    {
      name: 'color',
      title: '颜色',
      defaultValue: '#c9c9c9',
      setters: 'StringSetter'
    },
    {
      name: 'type',
      title: '类型',
      defaultValue: 'circular',
      setters: 'SelectSetter',
      options: ['circular', 'spinner']
    },
    {
      name: 'size',
      title: '加载图标大小，默认单位为 px',
      defaultValue: 30,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'text-size',
      title: '文字大小，默认单位为 px',
      defaultValue: 14,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'text-color',
      title: '文字颜色',
      defaultValue: '#c9c9c9',
      setters: 'StringSetter'
    },
    {
      name: 'vertical',
      title: '是否垂直排列图标和文字内容',
      defaultValue: false,
      setters: 'BooleanSetter'
    }
  ],
  slots: ['default', 'icon']
};

export default Loading;
