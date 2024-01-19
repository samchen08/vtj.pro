import type { MaterialDescription } from '@vtj/core';
const Descriptions: MaterialDescription[] = [
  {
    name: 'ElDescriptions',
    label: '描述列表',

    categoryId: 'data',
    package: 'element-plus',
    doc: 'https://element-plus.org/zh-CN/component/descriptions.html',
    props: [
      {
        name: 'border',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'column',
        defaultValue: 3,
        setters: 'NumberSetter'
      },
      {
        name: 'direction',
        defaultValue: 'horizontal',
        options: ['vertical', 'horizontal'],
        setters: 'SelectSetter'
      },
      {
        name: 'size',
        defaultValue: 'default',
        options: ['large', 'default', 'small'],
        setters: 'SelectSetter'
      },
      {
        name: 'title',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'extra',
        defaultValue: '',
        setters: 'InputSetter'
      }
    ],
    slots: ['default', 'title', 'extra'],
    snippet: {
      props: {
        border: true
      },
      children: [
        {
          name: 'ElDescriptionsItem',
          children: 'kooriookami',
          props: {
            label: 'Username'
          }
        },
        {
          name: 'ElDescriptionsItem',
          children: '18100000000',
          props: {
            label: 'Telephone'
          }
        },
        {
          name: 'ElDescriptionsItem',
          children: 'Suzhou',
          props: {
            label: 'Place'
          }
        },
        {
          name: 'ElDescriptionsItem',
          children:
            'No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangs Province',
          props: {
            label: 'Address'
          }
        }
      ]
    }
  },
  {
    name: 'ElDescriptionsItem',
    label: '描述列表子项',

    categoryId: 'data',
    parentIncludes: ['ElDescriptions'],
    package: 'element-plus',
    props: [
      {
        name: 'label',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'span',
        defaultValue: 1,
        setters: 'NumberSetter'
      },
      {
        name: 'width',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'min-width',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'align',
        defaultValue: 'left',
        options: ['left', 'center', 'right'],
        setters: 'SelectSetter'
      },
      {
        name: 'label-align',
        defaultValue: '',
        options: ['left', 'center', 'right'],
        setters: 'SelectSetter'
      },
      {
        name: 'class-name',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'label-class-name',
        defaultValue: '',
        label: '标题类名',
        setters: 'InputSetter'
      }
    ],
    slots: ['default', 'label'],
    snippet: {
      children: '内容',
      props: {
        label: '标题'
      }
    }
  }
];

export default Descriptions;
