import type { MaterialDescription } from '@vtj/core';

const desc: MaterialDescription[] = [
  {
    name: 'UniCollapse',
    label: '折叠面板',
    categoryId: 'ext',
    props: [
      {
        name: 'modelValue',
        title:
          '当前激活面板改变时触发(如果是手风琴模式，参数类型为string，否则为array)',
        setters: ['StringSetter', 'ArraySetter']
      },
      {
        name: 'accordion',
        title: '是否开启手风琴效果',
        defaultValue: false,
        setters: 'BooleanSetter'
      }
    ],
    events: ['change', 'update:modelValue'],
    snippet: {
      props: {
        modelValue: ['0']
      },
      children: [
        {
          name: 'UniCollapseItem',
          props: { title: '默认开启"' },
          children: [
            {
              name: 'Text',
              children:
                '折叠内容主体，这是一段比较长内容。默认折叠主要内容，只显示当前项标题。点击标题展开，才能看到这段文字。再次点击标题，折叠内容。'
            }
          ]
        },
        {
          name: 'UniCollapseItem',
          props: { title: '折叠内容' },
          children: [
            {
              name: 'Text',
              children:
                '折叠内容主体，这是一段比较长内容。默认折叠主要内容，只显示当前项标题。点击标题展开，才能看到这段文字。再次点击标题，折叠内容。'
            }
          ]
        }
      ]
    }
  },
  {
    name: 'UniCollapseItem',
    label: '折叠面板项',
    parentIncludes: ['UniCollapse'],
    categoryId: 'ext',
    props: [
      {
        name: 'title',
        title: '标题文字',
        defaultValue: '',
        setters: 'StringSetter'
      },
      {
        name: 'thumb',
        title: '标题左侧缩略图',
        defaultValue: '',
        setters: 'StringSetter'
      },
      {
        name: 'disabled',
        title: '是否禁用',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'open',
        title: '是否展开面板',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'show-animation',
        title: '开启动画',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'border',
        title: '折叠面板内容分隔线',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'title-border',
        title: '折叠面板标题分隔线',
        defaultValue: 'auto',
        setters: 'SelectSetter',
        options: ['auto', 'none', 'show']
      },
      {
        name: 'show-arrow',
        title: '是否显示右侧箭头',
        defaultValue: true,
        setters: 'BooleanSetter'
      }
    ],
    slots: ['default', 'title'],
    snippet: {
      props: { title: '基本使用' },
      children: [{ name: 'Text', children: '折叠内容' }]
    }
  }
];

export default desc;
