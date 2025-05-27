import type { MaterialDescription } from '@vtj/core';

const components: MaterialDescription[] = [
  {
    name: 'ADescriptions',
    alias: 'Descriptions',
    label: '描述列表',
    categoryId: 'data',
    doc: 'https://www.antdv.com/components/descriptions-cn',
    props: [
      {
        name: 'bordered',
        label: 'bordered',
        title: '是否展示边框',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'colon',
        label: 'colon',
        title: '配置 Descriptions.Item 的 colon 的默认值',
        setters: 'BooleanSetter',
        defaultValue: true
      },
      {
        name: 'column',
        label: 'column',
        title:
          '一行的 DescriptionItems 数量，可以写成像素值或支持响应式的对象写法 { xs: 8, sm: 16, md: 24}',
        setters: 'NumberSetter',
        defaultValue: 3
      },
      {
        name: 'contentStyle',
        label: 'contentStyle',
        title: '自定义内容样式',
        setters: 'ObjectSetter' //?? cssProperties
      },
      {
        name: 'extra',
        label: 'extra',
        title: '描述列表的操作区域，显示在右上方',
        setters: 'StringSetter'
      },
      {
        name: 'labelStyle',
        label: 'labelStyle',
        title: '自定义标签样式',
        setters: 'ObjectSetter'
      },
      {
        name: 'layout',
        label: 'layout',
        title: '描述布局',
        setters: 'SelectSetter',
        options: ['horizontal', 'vertical'],
        defaultValue: 'horizontal'
      },
      {
        name: 'size',
        label: 'size',
        title:
          '设置列表的大小。可以设置为 middle 、small, 或不填（只有设置 bordered={true} 生效）',
        setters: 'SelectSetter',
        options: ['default', 'middle', 'small'],
        defaultValue: 'default'
      },
      {
        name: 'title',
        label: 'title',
        title: '描述列表的标题，显示在最顶部',
        setters: 'StringSetter' //?? 	string | VNode | slot
      }
    ],
    slots: ['default', 'extra', 'title'],
    snippet: {
      props: {
        title: 'User Info'
      },
      children: [
        {
          name: 'ADescriptionsItem',
          props: { label: 'UserName' },
          children: 'chenshuishui'
        },
        {
          name: 'ADescriptionsItem',
          props: { label: 'Telephone' },
          children: '18912345678'
        },
        {
          name: 'ADescriptionsItem',
          props: { label: 'Live' },
          children: 'HongKong'
        },
        {
          name: 'ADescriptionsItem',
          props: { label: 'Remark' },
          children: 'empty'
        },
        {
          name: 'ADescriptionsItem',
          props: {
            label: 'Address'
          },
          children: '弥敦道9号, HongKong, China'
        }
      ]
    }
  },
  {
    name: 'ADescriptionsItem',
    alias: 'DescriptionsItem',
    label: '描述列表项',
    categoryId: 'data',
    doc: 'https://www.antdv.com/components/descriptions-cn',
    props: [
      {
        name: 'contentStyle',
        label: 'contentStyle',
        title: '自定义内容样式',
        setters: 'ObjectSetter' //?? CSSProperties
      },
      {
        name: 'label',
        label: 'label',
        title: '内容的描述',
        setters: 'StringSetter' //?? 	string | VNode | slot
      },
      {
        name: 'labelStyle',
        label: 'labelStyle',
        title: '自定义标签样式',
        setters: 'ObjectSetter' //?? 	CSSProperties
      },
      {
        name: 'span',
        label: 'span',
        title: '包含列的数量',
        setters: 'NumberSetter',
        defaultValue: 1
      }
    ],
    slots: ['default', 'label'],
    snippet: {
      props: {
        label: 'Address'
      },
      children: '弥敦道9号, HongKong, China'
    }
  }
];
export default components;
