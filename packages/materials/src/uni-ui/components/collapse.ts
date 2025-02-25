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
        accordion: true
      },
      children: [
        {
          name: 'UniCollapseItem',
          props: { title: '手风琴效果' },
          children: [{ name: 'Text', children: '折叠内容' }]
          // directives: [
          //   {
          //     name: 'vFor',
          //     value: {
          //       type: 'JSExpression',
          //       value: '4'
          //     }
          //   }
          // ]
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
      props: { title: '手风琴效果' },
      children: [{ name: 'Text', children: '折叠内容' }],
      directives: [
        {
          name: 'vFor',
          value: {
            type: 'JSExpression',
            value: '2'
          }
        }
      ]
    }
  }
];

export default desc;
