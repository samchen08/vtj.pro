import type { MaterialDescription } from '@vtj/core';

const components: MaterialDescription[] = [
  {
    name: 'ATag',
    alias: 'Tag',
    label: '标签',
    categoryId: 'data',
    doc: 'https://www.antdv.com/components/tag-cn',
    props: [
      {
        name: 'closable',
        label: 'closable',
        title: '标签是否可以关闭',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'color',
        label: 'color',
        title: '标签色',
        setters: ['StringSetter', 'ColorSetter']
      },
      {
        name: 'bordered',
        label: 'bordered',
        title: '是否有边框',
        setters: 'BooleanSetter',
        defaultValue: true
      }
    ],
    events: ['close'],
    slots: ['default', 'closeIcon', 'icon'],
    snippet: {
      children: 'Tag'
    }
  },
  {
    name: 'ACheckableTag',
    alias: 'CheckableTag',
    parent: 'Tag',
    label: '可选择标签',
    categoryId: 'data',
    doc: 'https://www.antdv.com/components/tag-cn',
    props: [
      {
        name: 'checked',
        label: 'checked',
        title: '设置标签的选中状态',
        setters: 'BooleanSetter',
        defaultValue: false
      }
    ],
    events: ['change', 'update:checked'],
    snippet: {
      children: 'checkTag',
      props: {
        checked: true
      },
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
