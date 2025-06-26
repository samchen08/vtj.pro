import type { MaterialDescription } from '@vtj/core';

const components: MaterialDescription[] = [
  {
    name: 'ACheckbox',
    alias: 'Checkbox',
    label: '多选框',
    categoryId: 'input',
    doc: 'https://www.antdv.com/components/checkbox-cn',
    props: [
      {
        name: 'autofocus',
        label: 'autofocus',
        title: '自动获取焦点',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'checked',
        label: 'checked',
        title: '指定当前是否选中',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'disabled',
        label: 'disabled',
        title: '失效状态',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'indeterminate',
        label: 'indeterminate',
        title: '设置 indeterminate 状态，只负责样式控制',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'value',
        label: 'value',
        title: '与 CheckboxGroup 组合使用时的值',
        setters: ['BooleanSetter', 'StringSetter', 'NumberSetter']
      }
    ],
    events: ['change', 'update:checked'],
    snippet: {
      children: 'checkbox'
    }
  },
  {
    name: 'ACheckboxGroup',
    alias: 'Group',
    parent: 'Checkbox',
    label: '多选框组',
    categoryId: 'input',
    doc: 'https://www.antdv.com/components/checkbox-cn',
    props: [
      {
        name: 'disabled',
        label: 'disabled',
        title: '整组失效',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'name',
        label: 'name',
        title: 'CheckboxGroup 下所有 input[type="checkbox"] 的 name 属性',
        setters: 'StringSetter'
      },
      {
        name: 'options',
        label: 'options',
        title:
          '指定可选项，可以通过 slot="label" slot-scope="option" 定制label',
        setters: 'ArraySetter',
        defaultValue: []
      },
      {
        name: 'value',
        label: 'value',
        title: '指定选中的选项',
        setters: 'ArraySetter',
        defaultValue: []
      }
    ],
    events: ['change', 'update:value'],
    slots: ['default', 'label'],
    snippet: {
      props: {
        options: [
          { label: 'Apple', value: 'Apple' },
          { label: 'Pear', value: 'Pear' },
          { label: 'Orange', value: 'Orange' }
        ]
      }
    }
  }
];

export default components;
