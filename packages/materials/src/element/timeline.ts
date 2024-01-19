import type { MaterialDescription } from '@vtj/core';
const Timeline: MaterialDescription[] = [
  {
    name: 'ElTimeline',
    label: '时间线',

    doc: 'https://element-plus.org/zh-CN/component/timeline.html',
    categoryId: 'form',
    package: 'element-plus',
    snippet: {
      name: 'ElTimeline',
      children: [
        {
          name: 'ElTimelineItem',
          children: 'Event start',
          props: {
            timestamp: '2018-04-15',
            size: 'large',
            type: 'primary',
            icon: 'MoreFilled'
          }
        },
        {
          name: 'ElTimelineItem',
          children: 'Approved',
          props: {
            timestamp: '2018-04-13',
            color: '#0bbd87'
          }
        },
        {
          name: 'ElTimelineItem',
          children: 'Success',
          props: {
            timestamp: '2018-04-11',
            hollow: true,
            icon: 'el-icon-more'
          }
        }
      ]
    }
  },
  {
    name: 'ElTimelineItem',
    label: '时间线子项',

    // childIncludes: false,
    categoryId: 'form',
    package: 'element-plus',
    props: [
      {
        name: 'timestamp',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'hide-timestamp',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'center',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'placement',
        defaultValue: 'bottom',
        options: ['top', 'bottom'],
        setters: 'SelectSetter'
      },
      {
        name: 'type',
        defaultValue: '',
        options: ['primary', 'success', 'warning', 'danger', 'info'],
        setters: 'SelectSetter'
      },
      {
        name: 'color',
        defaultValue: '',
        options: ['hsl', 'hsv', 'hex', 'rgb'],
        setters: 'SelectSetter'
      },
      {
        name: 'size',
        defaultValue: 'normal',
        options: ['normal', 'large'],
        setters: 'SelectSetter'
      },
      {
        name: 'icon',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'hollow',
        defaultValue: false,
        setters: 'BooleanSetter'
      }
    ],
    slots: ['default', 'dot']
  }
];

export default Timeline;
