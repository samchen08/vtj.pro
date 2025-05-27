import type { MaterialDescription } from '@vtj/core';

const components: MaterialDescription[] = [
  {
    name: 'ASpin',
    alias: 'Spin',
    label: '加载中',
    categoryId: 'feedback',
    doc: 'https://www.antdv.com/components/spin-cn',
    props: [
      {
        name: 'delay',
        label: 'delay',
        title: '延迟显示加载效果的时间（防止闪烁）',
        setters: 'NumberSetter'
      },
      {
        name: 'indicator',
        label: 'indicator',
        title: '加载指示符'
      },
      {
        name: 'size',
        label: 'size',
        title: '组件大小，可选值为 small default large',
        setters: 'SelectSetter',
        options: ['small', 'default', 'large'],
        defaultValue: 'default'
      },
      {
        name: 'spinning',
        label: 'spinning',
        title: '是否为加载中状态',
        setters: 'BooleanSetter',
        defaultValue: true
      },
      {
        name: 'tip',
        label: 'tip',
        title: '当作为包裹元素时，可以自定义描述文案',
        setters: 'StringSetter' //?? slot string
      },
      {
        name: 'wrapperClassName',
        label: 'wrapperClassName',
        title: '包装器的类属性',
        setters: 'StringSetter'
      }
    ],
    slots: ['default', 'indicator', 'tip']
  }
];
export default components;
