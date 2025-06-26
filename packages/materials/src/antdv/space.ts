import type { MaterialDescription } from '@vtj/core';

const components: MaterialDescription[] = [
  {
    name: 'ASpace',
    alias: 'Space',
    label: '间距',
    categoryId: 'layout',
    doc: 'https://www.antdv.com/components/space-cn',
    props: [
      {
        name: 'align',
        label: 'align',
        title: '垂直对齐方式',
        setters: 'SelectSetter',
        options: ['top', 'middle', 'bottom', 'stretch'],
        defaultValue: 'top'
      },
      {
        name: 'direction',
        label: 'direction',
        title: '间距方向',
        setters: 'SelectSetter',
        options: ['vertical', 'horizontal'],
        defaultValue: 'horizontal'
      },
      {
        name: 'size',
        label: 'size',
        title: '间距大小',
        setters: ['SelectSetter', 'NumberSetter'],
        options: ['small', 'middle', 'large'],
        defaultValue: 'small'
      },
      {
        name: 'split',
        label: 'split',
        title: '设置拆分',
        setters: ['StringSetter', 'ExpressionSetter'],
        defaultValue: '-'
      },
      {
        name: 'wrap',
        label: 'wrap',
        title: '是否自动换行，仅在 horizontal 时有效',
        setters: 'BooleanSetter',
        defaultValue: false
      }
    ],
    slots: ['default', 'split'],
    snippet: {
      props: {
        style: {
          width: '100%'
        }
      },
      children: [
        {
          name: 'ACard',
          children: [
            { name: 'component', props: { is: 'p' }, children: 'List item' }
          ],
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
      ]
    }
  },
  {
    name: 'ASpaceCompact',
    alias: 'Compact',
    parent: 'Space',
    label: '紧凑间距',
    categoryId: 'layout',
    doc: 'https://www.antdv.com/components/space-cn',
    props: [
      {
        name: 'block',
        label: 'block',
        title: '将宽度调整为父元素宽度的选项',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'direction',
        label: 'direction',
        title: '指定排列方向',
        setters: 'SelectSetter',
        options: ['vertical', 'horizontal'],
        defaultValue: 'horizontal'
      },
      {
        name: 'size',
        label: 'size',
        title: '子组件大小',
        setters: 'SelectSetter',
        options: ['small', 'middle', 'large'],
        defaultValue: 'small'
      }
    ],
    slots: ['default'],
    snippet: {
      props: {
        style: {
          width: '100%'
        }
      },
      children: [
        {
          name: 'ACard',
          children: [
            { name: 'component', props: { is: 'p' }, children: 'List item' }
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
  }
];

export default components;
