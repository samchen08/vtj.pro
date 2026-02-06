import type { MaterialDescription } from '@vtj/core';
const Empty: MaterialDescription = {
  name: 'ElEmpty',
  label: '空状态',
  doc: 'https://element-plus.org/zh-CN/component/empty.html',

  categoryId: 'data',
  package: 'element-plus',
  props: [
    {
      name: 'image',
      title: 'empty 组件的图像地址',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'imageSize',
      title: 'empty 组件的图像尺寸（宽度）',
      defaultValue: '',
      setters: 'NumberSetter'
    },
    {
      name: 'description',
      title: 'empty 组件的描述信息',
      defaultValue: '',
      setters: 'InputSetter'
    }
  ],
  slots: [
    {
      name: 'default'
    },
    {
      name: 'image'
    },
    {
      name: 'description'
    }
  ]
};

export default Empty;
