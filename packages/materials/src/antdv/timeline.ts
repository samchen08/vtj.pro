import type { MaterialDescription } from '@vtj/core';

const components: MaterialDescription[] = [
  {
    name: 'ATimeline',
    alias: 'Timeline',
    label: '时间轴',
    categoryId: 'data',
    doc: 'https://www.antdv.com/components/timeline-cn',
    props: [
      {
        name: 'mode',
        label: 'mode',
        title: '通过设置 mode 可以改变时间轴和内容的相对位置',
        setters: 'SelectSetter',
        options: ['left', 'alternate', 'right']
      },
      {
        name: 'pending',
        label: 'pending',
        title: '指定最后一个幽灵节点是否存在或内容',
        setters: ['BooleanSetter', 'StringSetter'],
        defaultValue: false
      },
      {
        name: 'pendingDot',
        label: 'pendingDot',
        title: '当最后一个幽灵节点存在時，指定其时间图点',
        setters: 'StringSetter'
      },
      {
        name: 'reverse',
        label: 'reverse',
        title: '节点排序',
        setters: 'BooleanSetter',
        defaultValue: false
      }
    ],
    slots: ['default', 'pending', 'pendingDot'],
    snippet: {
      children: [
        { name: 'ATimelineItem', children: 'Create a services site 2015-09-01' }
      ],
      directives: [
        {
          name: 'vFor',
          value: {
            type: 'JSExpression',
            value: '4'
          }
        }
      ]
    }
  },
  {
    name: 'ATimelineItem',
    alias: 'Item',
    parent: 'Timeline',
    label: '时间轴项',
    categoryId: 'data',
    doc: 'https://www.antdv.com/components/timeline-cn',
    props: [
      {
        name: 'color',
        label: 'color',
        title: '指定圆圈颜色 blue, red, green，或自定义的色值',
        setters: 'StringSetter',
        defaultValue: 'blue'
      },
      {
        name: 'dot',
        label: 'dot',
        title: '自定义时间轴点',
        setters: 'StringSetter'
      },
      {
        name: 'label',
        label: 'label',
        title: '设置标签',
        setters: 'StringSetter'
      },
      {
        name: 'position',
        label: 'position',
        title: '自定义节点位置',
        setters: 'SelectSetter',
        options: ['left', 'right']
      }
    ],
    slots: ['default', 'dot', 'label'],
    snippet: {
      children: '创建服务现场 2015-09-01'
    }
  }
];
export default components;
