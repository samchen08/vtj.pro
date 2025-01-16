import type { MaterialDescription } from '@vtj/core';
const Segmented: MaterialDescription[] = [
  {
    name: 'ElSegmented',
    label: '分段控制器',

    doc: 'https://element-plus.org/zh-CN/component/segmented.html',
    categoryId: 'data',
    package: 'element-plus',
    props: [
      {
        name: 'modelValue',
        title: '绑定值',
        setters: ['StringSetter', 'NumberSetter', 'BooleanSetter']
      },
      {
        name: 'options',
        title: '选项的数据',
        defaultValue: [],
        setters: 'ArraySetter'
      },
      {
        name: 'size',
        defaultValue: '',
        options: ['', 'large', 'default', 'small'],
        setters: 'SelectSetter'
      },
      {
        name: 'block',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'disabled',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'validate-event',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'name',
        setters: 'StringSetter'
      },
      {
        name: 'id',
        setters: 'StringSetter'
      },
      {
        name: 'ariaLabel',
        setters: 'StringSetter'
      },
      {
        name: 'direction',
        defaultValue: 'horizontal',
        options: ['horizontal', 'vertical'],
        setters: 'SelectSetter'
      }
    ],
    events: ['change', 'update:modelValue'],
    slots: ['default'],
    snippet: {
      props: {
        modelValue: 'Mom',
        options: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      }
    }
  }
];

export default Segmented;
