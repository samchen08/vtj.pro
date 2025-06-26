import type { MaterialDescription } from '@vtj/core';

const components: MaterialDescription[] = [
  {
    name: 'ARate',
    alias: 'Rate',
    label: '评分',
    categoryId: 'input',
    doc: 'https://www.antdv.com/components/rate-cn',
    props: [
      {
        name: 'allowClear',
        label: 'allowClear',
        title: '是否允许再次点击后清除',
        setters: 'BooleanSetter',
        defaultValue: true
      },
      {
        name: 'allowHalf',
        label: 'allowHalf',
        title: '是否允许半选',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'autofocus',
        label: 'autofocus',
        title: '自动获取焦点',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'character',
        label: 'character',
        title: '自定义字符',
        setters: 'StringSetter'
      },
      {
        name: 'count',
        label: 'count',
        title: 'star 总数',
        setters: 'NumberSetter',
        defaultValue: 5
      },
      {
        name: 'disabled',
        label: 'disabled',
        title: '只读，无法进行交互',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'tooltips',
        label: 'tooltips',
        title: '自定义每项的提示信息',
        setters: 'ArraySetter'
      },
      {
        name: 'value',
        label: 'value',
        title: '当前数，受控值',
        setters: 'NumberSetter'
      }
    ],
    events: [
      'blur',
      'change',
      'focus',
      'hoverChange',
      'keydown',
      'update:value'
    ],
    slots: ['default', 'character'],
    snippet: {
      props: { value: 2 }
    }
  }
];
export default components;
