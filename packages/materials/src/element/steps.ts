import type { MaterialDescription } from '@vtj/core';
const Steps: MaterialDescription[] = [
  {
    name: 'ElSteps',
    label: '步骤条',

    categoryId: 'nav',
    doc: 'https://element-plus.org/zh-CN/component/steps.html',
    package: 'element-plus',
    props: [
      {
        name: 'space',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'direction',
        defaultValue: 'horizontal',
        setters: 'SelectSetter',
        options: ['vertical', 'horizontal']
      },
      {
        name: 'active',
        defaultValue: 0,
        setters: 'NumberSetter'
      },
      {
        name: 'processStatus',
        defaultValue: 'process',
        setters: 'SelectSetter',
        options: ['wait', 'process', 'finish', 'error', 'success']
      },
      {
        name: 'finishStatus',
        defaultValue: 'finish',
        setters: 'SelectSetter',
        options: ['wait', 'process', 'finish', 'error', 'success']
      },
      {
        name: 'alignCenter',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'simple',
        defaultValue: false,
        setters: 'BooleanSetter'
      }
    ],
    slots: ['default'],
    snippet: {
      name: 'ElSteps',
      children: [
        {
          name: 'ElStep',
          props: {
            title: 'Step 1'
          }
        },
        {
          name: 'ElStep',
          props: {
            title: 'Step 2'
          }
        },
        {
          name: 'ElStep',
          props: {
            title: 'Step 3'
          }
        }
      ],
      props: {
        active: 0,
        finishStatus: 'success'
      }
    }
  },
  {
    name: 'ElStep',
    label: '步骤项',

    categoryId: 'nav',
    package: 'element-plus',
    props: [
      {
        name: 'title',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'description',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'icon',
        defaultValue: '',
        setters: ['InputSetter']
      },
      {
        name: 'status',
        defaultValue: '',
        setters: 'SelectSetter',
        options: ['wait', 'process', 'finish', 'error', 'success']
      }
    ],
    slots: [
      {
        name: 'icon'
      },
      {
        name: 'title'
      },
      {
        name: 'description'
      }
    ],
    snippet: {
      props: {
        title: '步骤'
      }
    }
  }
];

export default Steps;
