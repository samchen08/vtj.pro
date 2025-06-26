import type { MaterialDescription } from '@vtj/core';

const components: MaterialDescription[] = [
  {
    name: 'AEmpty',
    alias: 'Empty',
    label: '空状态',
    categoryId: 'data',
    doc: 'https://www.antdv.com/components/empty-cn',
    props: [
      {
        name: 'description',
        label: 'description',
        title: '自定义描述内容',
        setters: 'StringSetter'
      },
      {
        name: 'image',
        label: 'image',
        title: '设置显示图片，为 string 时表示自定义图片地址',
        setters: 'StringSetter',
        defaultValue: false
      },
      {
        name: 'imageStyle',
        label: 'imageStyle',
        title: '图片样式',
        setters: 'ObjectSetter'
      }
    ],
    slots: ['default', 'description', 'image']
  }
];
export default components;
