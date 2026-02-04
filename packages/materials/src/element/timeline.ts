import type { MaterialDescription } from '@vtj/core';
const Timeline: MaterialDescription[] = [
  {
    name: 'ElTimeline',
    label: '时间线',

    doc: 'https://element-plus.org/zh-CN/component/timeline.html',
    categoryId: 'form',
    package: 'element-plus',

    props: [
      {
        name: 'reverse',
        title: '是否逆序排序',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'mode',
        title: '时间线与内容的相对位置',
        defaultValue: 'start',
        setters: 'SelectSetter',
        options: ['start', 'alternate', 'alternate-reverse', 'end']
      },
    ],
    slots: ['default'],
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
        title: '时间戳',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'hide-timestamp',
        title: '是否隐藏时间戳',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'center',
        title: '是否垂直居中',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'placement',
        title: '时间戳位置',
        defaultValue: 'bottom',
        options: ['top', 'bottom'],
        setters: 'SelectSetter'
      },
      {
        name: 'type',
        title: '节点类型',
        defaultValue: '',
        options: ['primary', 'success', 'warning', 'danger', 'info'],
        setters: 'SelectSetter'
      },
      {
        name: 'color',
        title: '节点颜色',
        defaultValue: '',
        options: ['hsl', 'hsv', 'hex', 'rgb'],
        setters: 'SelectSetter'
      },
      {
        name: 'size',
        title: '节点尺寸',
        defaultValue: 'normal',
        options: ['normal', 'large'],
        setters: 'SelectSetter'
      },
      {
        name: 'icon',
        title: '自定义图标',
        defaultValue: '',
        setters: 'IconSetter'
      },
      {
        name: 'hollow',
        title: '是否空心点',
        defaultValue: false,
        setters: 'BooleanSetter'
      }
    ],
    slots: ['default', 'dot']
  }
];

export default Timeline;
