import type { MaterialDescription } from '@vtj/core';
import { size } from '../shared';
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
        name: 'props',
        title: '配置选项',
        setters: 'ObjectSetter'
      },
      size('size'),
      {
        name: 'block',
        title: '撑满父元素宽度',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'disabled',
        title: '是否禁用',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'validate-event',
        title: '是否触发表单验证',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'name',
        title: '原生 name 属性',
        setters: 'StringSetter'
      },
      {
        name: 'id',
        title: '原生 id 属性',
        setters: 'StringSetter'
      },
      {
        name: 'ariaLabel',
        title: '原生 aria-label 属性',
        setters: 'StringSetter'
      },
      {
        name: 'direction',
        title: '展示的方向',
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
