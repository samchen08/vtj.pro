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
        title: '每个 step 的间距，不填写将自适应间距。 支持百分比;',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'direction',
        title: '显示方向',
        defaultValue: 'horizontal',
        setters: 'SelectSetter',
        options: ['vertical', 'horizontal']
      },
      {
        name: 'active',
        title: '设置当前激活步骤',
        defaultValue: 0,
        setters: 'NumberSetter'
      },
      {
        name: 'processStatus',
        title: '设置当前步骤的状态',
        defaultValue: 'process',
        setters: 'SelectSetter',
        options: ['wait', 'process', 'finish', 'error', 'success']
      },
      {
        name: 'finishStatus',
        title: '设置结束步骤的状态',
        defaultValue: 'finish',
        setters: 'SelectSetter',
        options: ['wait', 'process', 'finish', 'error', 'success']
      },
      {
        name: 'alignCenter',
        title: '进行居中对齐',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'simple',
        title: '是否应用简洁风格',
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
        title: '标题',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'description',
        title: '描述文案',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'icon',
        title: 'Step 组件的自定义图标',
        defaultValue: '',
        setters: ['InputSetter']
      },
      {
        name: 'status',
        title: '设置当前步骤的状态， 不设置则根据 steps 确定状态',
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
