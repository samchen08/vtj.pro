import type { MaterialDescription } from '@vtj/core';

const components: MaterialDescription[] = [
  {
    name: 'ASteps',
    alias: 'Steps',
    label: '步骤条',
    categoryId: 'nav',
    doc: 'https://www.antdv.com/components/steps-cn',
    props: [
      {
        name: 'current',
        label: 'current',
        title:
          '指定当前步骤，从 0 开始记数。在子 Step 元素中，可以通过 status 属性覆盖状态',
        setters: 'NumberSetter',
        defaultValue: 0
      },
      {
        name: 'direction',
        label: 'direction',
        title: '指定步骤条方向',
        setters: 'SelectSetter',
        options: ['vertical', 'horizontal'],
        defaultValue: 'horizontal'
      },
      {
        name: 'initial',
        label: 'initial',
        title: '起始序号，从 0 开始记数',
        setters: 'NumberSetter',
        defaultValue: 0
      },
      {
        name: 'labelPlacement',
        label: 'labelPlacement',
        title: '指定标签放置位置，默认水平放图标右侧，可选vertical放图标下方',
        setters: 'SelectSetter',
        options: ['vertical', 'horizontal'],
        defaultValue: 'horizontal'
      },
      {
        name: 'percent',
        label: 'percent',
        title: '当前 process 步骤显示的进度条进度（只对基本类型的 Steps 生效）',
        setters: 'NumberSetter'
      },
      {
        name: 'progressDot',
        label: 'progressDot',
        title:
          '点状步骤条，可以设置为一个 作用域插槽,labelPlacement 将强制为vertical',
        setters: 'BooleanSetter', //??
        defaultValue: false
      },
      {
        name: 'responsive',
        label: 'responsive',
        title: '当屏幕宽度小于 532px 时自动变为垂直模式',
        setters: 'BooleanSetter',
        defaultValue: true
      },
      {
        name: 'size',
        label: 'size',
        title: '指定大小',
        setters: 'SelectSetter',
        options: ['default', 'small'],
        defaultValue: 'default'
      },
      {
        name: 'status',
        label: 'status',
        title: '指定当前步骤的状态，可选 wait process finish error',
        setters: 'SelectSetter',
        options: ['wait', 'process', 'finish', 'error'],
        defaultValue: 'default'
      },
      {
        name: 'items',
        label: 'items',
        title: '配置选项卡内容',
        setters: 'ArraySetter',
        defaultValue: []
      }
    ],
    events: ['change', 'update:current'],
    slots: ['default', 'progressDot'],
    snippet: {
      props: {
        current: 1,
        items: [
          {
            title: 'Finished',
            description: 'This is a description.'
          },
          {
            title: 'In Progress',
            description: 'This is a description.',
            subTitle: 'Left 00:00:08'
          },
          {
            title: 'Waiting',
            description: 'This is a description.'
          }
        ]
      }
    }
  },
  {
    name: 'AStep',
    alias: 'Step',
    parent: 'Steps',
    label: '步骤项',
    categoryId: 'nav',
    doc: 'https://www.antdv.com/components/steps-cn',
    props: [
      {
        name: 'description',
        label: 'description',
        title: '步骤的详情描述',
        setters: 'StringSetter' //
      },
      {
        name: 'disabled',
        label: 'disabled',
        title: '	禁用点击',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'icon',
        label: 'icon',
        title: '步骤图标的类型',
        setters: 'StringSetter' //
      },
      {
        name: 'status',
        label: 'status',
        title:
          '指定状态。当不配置该属性时，会使用 Steps 的 current 来自动指定状态',
        setters: 'SelectSetter',
        options: ['wait', 'process', 'finish'],
        defaultValue: 'wait'
      },
      {
        name: 'subTitle',
        label: 'subTitle',
        title: '子标题',
        setters: 'StringSetter' //
      },
      {
        name: 'title',
        label: 'title',
        title: '标题',
        setters: 'StringSetter' //
      }
    ],
    slots: ['description', 'icon', 'subTitle', 'title'],
    snippet: {
      props: {
        title: '步骤',
        description: '步骤的详情描述'
      }
    }
  }
];
export default components;
