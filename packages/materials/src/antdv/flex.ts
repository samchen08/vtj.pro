import type { MaterialDescription } from '@vtj/core';

const components: MaterialDescription[] = [
  {
    name: 'AFlex',
    alias: 'Flex',
    label: '弹性布局',
    categoryId: 'layout',
    doc: 'https://www.antdv.com/components/flex-cn',
    props: [
      {
        name: 'vertical',
        label: 'vertical',
        title: 'flex 主轴的方向是否垂直，使用 flex-direction: column',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'wrap',
        label: 'wrap',
        title: '设置元素单行显示还是多行显示',
        setters: 'SelectSetter',
        options: [
          'nowrap ',
          'wrap',
          'wrap-reverse',
          'inherit',
          'initial',
          'revert',
          'unset'
        ],
        defaultValue: 'nowrap'
      },
      {
        name: 'justify',
        label: 'justify',
        title: '设置元素在主轴方向上的对齐方式',
        setters: 'SelectSetter',
        options: [
          'start ',
          'center',
          'end',
          'flex-start',
          'flex-end',
          'left',
          'right',
          'baseline',
          'first baseline',
          'last baseline',
          'space-between',
          'space-around',
          'space-evenly',
          'stretch',
          'safe center',
          'unsafe center',
          'inherit',
          'initial',
          'unset'
        ],
        defaultValue: 'normal'
      },
      {
        name: 'align',
        label: 'align',
        title: '设置元素在交叉轴方向上的对齐方式',
        setters: 'SelectSetter',
        options: [
          /* 基本关键字 */
          'normal',
          'stretch',
          /* 定位对齐 */
          /* align-items 不能设置为 left 和 right */
          'center',
          'start ',
          'end',
          'flex-start',
          'flex-end',
          'self-start',
          'self-end',
          /* 基线对齐 */
          'baseline',
          'first baseline',
          'last baseline' /* 溢出对齐（仅用于位置对齐） */,
          'safe center',
          'unsafe center',
          /* 全局值 */
          'inherit',
          'initial',
          'revert',
          'revert-layer',
          'unset'
        ],
        defaultValue: 'normal'
      },
      {
        name: 'flex',
        label: 'flex',
        title: 'flex CSS 简写属性',
        setters: ['SelectSetter', 'NumberSetter', 'StringSetter'],
        options: [
          /* 关键字值 */
          'auto',
          'initial',
          'none',
          /* 全局值 */
          'inherit',
          'initial',
          'revert',
          'revert-layer',
          'unset'
        ],
        defaultValue: 'normal'
      },
      {
        name: 'gap',
        label: 'gap',
        title: '设置网格之间的间隙',
        setters: ['SelectSetter', 'NumberSetter', 'StringSetter'],
        options: ['small', 'middle', 'large'],
        defaultValue: ''
      },
      {
        name: 'component',
        label: 'component',
        title: '自定义元素类型',
        setters: 'StringSetter',
        defaultValue: 'div'
      }
    ],
    slots: ['default', 'component'],
    snippet: {
      props: {
        vertical: false,
        gap: 'middle',
        style: {
          width: '100%'
        }
      },
      children: [
        {
          name: 'component',
          props: {
            is: 'div',
            style: {
              width: '25%',
              height: '54px',
              color: '#fff',
              background: '#1677ff'
            }
          },
          children: 'flex item111'
        },
        {
          name: 'component',
          props: {
            is: 'div',
            style: {
              width: '25%',
              height: '54px',
              color: '#fff',
              background: '#1677ffbf'
            }
          },
          children: 'flex item222'
        },
        {
          name: 'component',
          props: {
            is: 'div',
            style: {
              width: '25%',
              height: '54px',
              color: '#fff',
              background: '#1677ff'
            }
          },
          children: 'flex item333'
        },
        {
          name: 'component',
          props: {
            is: 'div',
            style: {
              width: '25%',
              height: '54px',
              color: '#fff',
              background: '#1677ffbf'
            }
          },
          children: 'flex item444'
        }
      ]
    }
  }
];

export default components;
