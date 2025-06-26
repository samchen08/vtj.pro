import type { MaterialDescription } from '@vtj/core';

const components: MaterialDescription[] = [
  {
    name: 'AResult',
    alias: 'Result',
    label: '结果',
    categoryId: 'feedback',
    doc: 'https://www.antdv.com/components/result-cn',
    props: [
      {
        name: 'status',
        label: 'status',
        title: '结果的状态,决定图标和颜色',
        setters: 'SelectSetter',
        options: ['success', 'error', 'info', 'warning', '404', '403', '500'],
        defaultValue: 'info'
      },
      {
        name: 'subTitle',
        label: 'subTitle',
        title: 'subTitle 文字',
        setters: 'StringSetter' //?? string slot vNode
      },
      {
        name: 'title',
        label: 'title',
        title: 'title文字',
        setters: 'StringSetter' //?? string slot vNode
      }
    ],
    slots: ['default', 'extra', 'icon', 'subTitle', 'title']
  }
];
export default components;
