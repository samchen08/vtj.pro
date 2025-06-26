import type { MaterialDescription } from '@vtj/core';

const desc: MaterialDescription[] = [
  {
    name: 'UniGrid',
    label: '宫格',
    categoryId: 'ext',
    props: [
      {
        name: 'column',
        title: '每列显示个数',
        defaultValue: 3,
        setters: 'NumberSetter'
      },
      {
        name: 'borderColor',
        title: '边框颜色',
        defaultValue: '#d0dee5',
        setters: 'ColorSetter'
      },
      {
        name: 'showBorder',
        title: '是否显示边框',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'square',
        title: '是否方形显示',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'highlight',
        title: '点击背景是否高亮',
        defaultValue: true,
        setters: 'BooleanSetter'
      }
    ],
    events: ['change'],
    snippet: {
      props: {
        column: '4',
        highlight: true
      },
      children: [
        {
          name: 'UniGridItem',
          children: [
            {
              name: 'View',
              children: [
                {
                  name: 'UniIcons',
                  props: { type: 'image', size: 30, color: '#777' }
                },
                { name: 'Text', children: '文本信息' }
              ]
            }
          ]
        }
      ]
    }
  },
  {
    name: 'UniGridItem',
    label: '宫格项',
    parentIncludes: ['UniGrid'],
    categoryId: 'ext',
    props: [
      {
        name: 'index',
        title: '子组件的唯一标识 ，点击grid会返回当前的标识',
        defaultValue: '',
        setters: 'NumberSetter'
      }
    ],
    snippet: {
      children: [
        {
          name: 'View',
          children: [
            {
              name: 'UniIcons',
              props: { type: 'image', size: 30, color: '#777' }
            },
            { name: 'Text', children: '文本信息' }
          ]
        }
      ]
    }
  }
];

export default desc;
