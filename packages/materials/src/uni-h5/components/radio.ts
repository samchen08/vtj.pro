import type { MaterialDescription } from '@vtj/core';

const desc: MaterialDescription[] = [
  {
    name: 'RadioGroup',
    label: '单项选择器',
    categoryId: 'form',
    events: ['change'],
    snippet: {
      props: {},
      children: [
        {
          name: 'Label',
          props: {
            key: {
              type: 'JSExpression',
              value: 'this.context.item.value'
            },
            style: { display: 'flex', flexDirection: 'row' }
          },

          children: [
            {
              name: 'View',
              children: [
                {
                  name: 'Radio',
                  props: {
                    value: {
                      type: 'JSExpression',
                      value: 'this.context.item.value'
                    },
                    checked: 'this.context.index === 0'
                  }
                }
              ]
            },
            {
              name: 'View',
              children: {
                type: 'JSExpression',
                value: 'this.context.item.name'
              }
            }
          ],
          directives: [
            {
              name: 'vFor',
              value: {
                type: 'JSExpression',
                value:
                  "[{value: 'USA',name: '美国',checked: 'true'},{value: 'CHN',name:'中国'},{value: 'BRA',	name: '巴西'},{value: 'JPN',name: '日本'},{value: 'ENG',name: '英国'},{value: 'FRA',name: '法国'}]"
              }
            }
          ]
        }
      ]
    }
  },
  {
    name: 'Radio',
    label: '单选项目',
    categoryId: 'form',
    props: [
      {
        name: 'value',
        title:
          '<radio> 标识。当该 <radio> 选中时，<radio-group> 的 change 事件会携带 <radio> 的 value',
        setters: 'StringSetter'
      },
      {
        name: 'checked',
        title: '当前是否选中',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'disabled',
        title: '是否禁用',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'color',
        title: 'radio的颜色，同css的color',
        setters: 'ColorSetter'
      },
      {
        name: 'backgroundColor',
        title: 'radio默认的背景颜色',
        defaultValue: '#ffffff',
        setters: 'ColorSetter'
      },
      {
        name: 'borderColor',
        title: 'radio默认的边框颜色',
        defaultValue: '#d1d1d1',
        setters: 'ColorSetter'
      },
      {
        name: 'activeBackgroundColor',
        title: 'radio选中时的背景颜色，优先级大于color属性',
        defaultValue: '#007AFF',
        setters: 'ColorSetter'
      },
      {
        name: 'activeBorderColor',
        title: 'radio选中时的边框颜色',
        setters: 'ColorSetter'
      },
      {
        name: 'iconColor',
        title: 'radio的图标颜色',
        defaultValue: '#ffffff',
        setters: 'ColorSetter'
      }
    ],
    snippet: {
      props: {
        checked: false
      },
      children: '选项'
    }
  }
];

export default desc;
