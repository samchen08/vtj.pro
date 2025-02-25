import type { MaterialDescription } from '@vtj/core';

const desc: MaterialDescription[] = [
  {
    name: 'UniSwipeAction',
    label: '滑动操作',
    categoryId: 'ext',
    snippet: {
      children: [
        {
          name: 'UniSwipeActionItem',
          props: {
            leftOptions: [
              {
                text: '取消',
                style: {
                  backgroundColor: '#007aff'
                }
              },
              {
                text: '确认',
                style: {
                  backgroundColor: '#F56C6C'
                }
              }
            ],
            threshold: '0',
            rightOptions: [
              {
                text: '取消置顶'
              }
            ]
          },
          children: [
            {
              name: 'View',
              children: [{ name: 'Text', children: '使用数据填充' }]
            }
          ]
        }
      ]
    }
  },
  {
    name: 'UniSwipeActionItem',
    label: '滑动操作项',
    categoryId: 'ext',
    props: [
      {
        name: 'show',
        title: '开启关闭组件',
        defaultValue: 'none',
        setters: 'SelectSetter',
        options: ['left', 'right', 'none']
      },
      {
        name: 'threshold',
        title: '滑动阈值',
        defaultValue: 20,
        setters: 'NumberSetter'
      },
      {
        name: 'disabled',
        title: '是否禁止滑动',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'autoClose',
        title: '其他组件开启的时候，当前组件是否自动关闭',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'left-options',
        title: '左侧选项内容及样式',
        defaultValue: {
          text: '按钮的文字',
          style: {
            backgroundColor: '#C7C6CD',
            color: '#FFFFFF',
            fontSize: '14px'
          }
        },
        setters: ['ArraySetter', 'ObjectSetter']
      },
      {
        name: 'right-options',
        title: '右侧选项内容及样式',
        defaultValue: {
          text: '按钮的文字',
          style: {
            backgroundColor: '#C7C6CD',
            color: '#FFFFFF',
            fontSize: '14px'
          }
        },
        setters: ['ArraySetter', 'ObjectSetter']
      }
    ],
    events: ['click', 'change'],
    slots: ['default', 'left', 'right'],
    snippet: {
      props: {
        leftOptions: [
          {
            text: '取消',
            style: {
              backgroundColor: '#007aff'
            }
          },
          {
            text: '确认',
            style: {
              backgroundColor: '#F56C6C'
            }
          }
        ],
        threshold: '0',
        rightOptions: [
          {
            text: '取消置顶'
          }
        ]
      },
      children: [
        { name: 'View', children: [{ name: 'Text', children: '使用数据填充' }] }
      ]
    }
  }
];

export default desc;
