import type { MaterialDescription } from '@vtj/core';

const desc: MaterialDescription[] = [
  {
    name: 'PickerView',
    label: '选择器',
    categoryId: 'form',
    props: [
      {
        name: 'value',
        title: '选中的项',
        defaultValue: [],
        setters: 'ArraySetter'
      },
      {
        name: 'indicator-style',
        title: '设置选择器中间选中框的样式',
        setters: 'StringSetter'
      },
      {
        name: 'indicator-class',
        title: '设置选择器中间选中框的类名',
        setters: 'StringSetter'
      },
      {
        name: 'mask-style',
        title: '设置蒙层的样式',
        setters: 'StringSetter'
      },
      {
        name: 'mask-top-style',
        title: '设置蒙层上半部分的样式',
        setters: 'StringSetter'
      },
      {
        name: 'mask-bottom-style',
        title: '设置蒙层下半部分的样式',
        setters: 'StringSetter'
      },
      {
        name: 'mask-class',
        title: '设置蒙层的类名',
        setters: 'StringSetter'
      },
      {
        name: 'immediate-change',
        title:
          '是否在手指松开时立即触发 change 事件。若不开启则会在滚动动画结束后触发 change 事件。',
        setters: 'BooleanSetter'
      }
    ],
    events: ['change', 'pickstart', 'pickend'],
    snippet: {
      props: {
        value: [9999, 10, 10],
        'indicator-style': `height: 50px;`,
        style: { width: ' 100%', height: '300px', marginTop: '20px' }
      },
      children: [
        {
          name: 'PickerViewColumn',
          children: [
            {
              name: 'View',
              props: {
                style: { 'text-align': 'center' }
              },
              children: {
                type: 'JSExpression',
                value: 'this.context.item'
              },
              directives: [
                {
                  name: 'vFor',
                  value: {
                    type: 'JSExpression',
                    value: '["2021年","2022年","2023年","2024年"]'
                  }
                }
              ]
            }
          ]
        },
        {
          name: 'PickerViewColumn',
          children: [
            {
              name: 'View',
              props: {
                style: { 'text-align': 'center' }
              },
              children: {
                type: 'JSExpression',
                value: 'this.context.item'
              },
              directives: [
                {
                  name: 'vFor',
                  value: {
                    type: 'JSExpression',
                    value: '["3月","4月","5月","6月", "7月"]'
                  }
                }
              ]
            }
          ]
        },
        {
          name: 'PickerViewColumn',
          children: [
            {
              name: 'View',
              props: {
                style: { 'text-align': 'center' }
              },
              children: {
                type: 'JSExpression',
                value: 'this.context.item'
              },
              directives: [
                {
                  name: 'vFor',
                  value: {
                    type: 'JSExpression',
                    value: '["3号","4号","5号","6号", "7号"]'
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  },
  {
    name: 'PickerViewColumn',
    label: '选择器列',
    parentIncludes: ['PickerView'],
    categoryId: 'form',
    snippet: {
      children: [
        {
          name: 'View',
          children: {
            type: 'JSExpression',
            value: 'this.context.item'
          },
          directives: [
            {
              name: 'vFor',
              value: {
                type: 'JSExpression',
                value: '["2021年","2022年","2023年","2024年"]'
              }
            }
          ]
        }
      ]
    }
  }
];

export default desc;
