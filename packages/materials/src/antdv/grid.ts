import type { MaterialDescription } from '@vtj/core';

const components: MaterialDescription[] = [
  {
    name: 'ARow',
    alias: 'Row',
    label: '布局行',
    categoryId: 'layout',
    doc: 'https://www.antdv.com/components/grid-cn',
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
        name: 'gutter',
        label: 'gutter',
        title:
          '栅格间隔，可以写成像素值或支持响应式的对象写法来设置水平间隔 { xs: 8, sm: 16, md: 24}。或者使用数组形式同时设置 [水平间距, 垂直间距]（1.5.0 后支持）。',
        setters: ['NumberSetter', 'ObjectSetter', 'ArraySetter'],
        defaultValue: 0
      },
      {
        name: 'justify',
        label: 'justify',
        title: '水平排列方式',
        setters: 'SelectSetter',
        options: [
          'start',
          'end',
          'center',
          'space-around',
          'space-between',
          'space-evenly'
        ],
        defaultValue: 'start'
      },
      {
        name: 'wrap',
        label: 'wrap',
        title: '是否自动换行',
        setters: 'BooleanSetter',
        defaultValue: 'false'
      }
    ],
    snippet: {
      props: {
        gutter: 10
      },
      children: [
        {
          name: 'ACol',

          props: {
            span: 6
          },
          children: [
            {
              name: 'component',
              props: {
                is: 'div',
                style: {
                  height: '50px',
                  background: '#ecf5ff'
                }
              }
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
      ]
    }
  },
  {
    name: 'ACol',
    alias: 'Col',
    label: '布局列',
    categoryId: 'layout',
    doc: 'https://www.antdv.com/components/grid-cn',
    props: [
      {
        name: 'flex',
        label: 'flex',
        title: 'flex 布局填充',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'offset',
        label: 'offset',
        title: '栅格左侧的间隔格数，间隔内不可以有栅格',
        setters: 'NumberSetter',
        defaultValue: 0
      },
      {
        name: 'order',
        label: 'order',
        title: '栅格顺序，flex 布局模式下有效',
        setters: 'NumberSetter',
        defaultValue: 0
      },
      {
        name: 'pull',
        label: 'pull',
        title: '栅格向左移动格数',
        setters: 'NumberSetter',
        defaultValue: 0
      },
      {
        name: 'push',
        label: 'push',
        title: '栅格向右移动格数',
        setters: 'NumberSetter',
        defaultValue: 0
      },
      {
        name: 'span',
        label: 'span',
        title: '栅格占位格数，为 0 时相当于 display: none',
        setters: 'NumberSetter',
        defaultValue: 0
      },
      {
        name: 'xs',
        label: 'xs',
        title: '<576px 响应式栅格，可为栅格数或一个包含其他属性的对象',
        setters: ['NumberSetter', 'ObjectSetter']
      },
      {
        name: 'sm',
        label: 'sm',
        title: '≥576px 响应式栅格，可为栅格数或一个包含其他属性的对象',
        setters: ['NumberSetter', 'ObjectSetter']
      },
      {
        name: 'md',
        label: 'md',
        title: '≥768px 响应式栅格，可为栅格数或一个包含其他属性的对象',
        setters: ['NumberSetter', 'ObjectSetter']
      },
      {
        name: 'lg',
        label: 'lg',
        title: '≥992px 响应式栅格，可为栅格数或一个包含其他属性的对象',
        setters: ['NumberSetter', 'ObjectSetter']
      },
      {
        name: 'xl',
        label: 'xl',
        title: '≥1200px 响应式栅格，可为栅格数或一个包含其他属性的对象',
        setters: ['NumberSetter', 'ObjectSetter']
      },
      {
        name: 'xxl',
        label: 'xxl',
        title: '≥1600px 响应式栅格，可为栅格数或一个包含其他属性的对象',
        setters: ['NumberSetter', 'ObjectSetter']
      }
    ],
    snippet: {
      props: {
        span: 6
      },
      children: [
        {
          name: 'component',
          props: {
            is: 'div',
            style: {
              height: '50px',
              background: '#ecf5ff'
            }
          },
          children: 'ACol'
        }
      ]
    }
  }
];

export default components;
