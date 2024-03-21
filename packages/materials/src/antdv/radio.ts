import type { MaterialDescription } from '@vtj/core';

const components: MaterialDescription[] = [
  {
    name: 'ARadio',
    alias: 'Radio',
    label: '单选框',
    categoryId: 'input',
    doc: 'https://www.antdv.com/components/radio-cn',
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
        title: '禁用 Radio',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'value',
        label: 'value',
        title: '根据 value 进行比较，判断是否选中',
        setters: 'AnySetter' //! any
      }
    ],
    events: ['update:checked'],
    snippet: { children: 'radio' }
  },
  {
    name: 'ARadioButton',
    alias: 'RadioButton',
    parent: 'Radio',
    label: '单选按钮',
    categoryId: 'input',
    doc: 'https://www.antdv.com/components/radio-cn',
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
        title: '禁用 Radio',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'value',
        label: 'value',
        title: '根据 value 进行比较，判断是否选中',
        setters: 'AnySetter'
      }
    ],
    events: ['update:checked'],
    snippet: {
      props: { size: 'large', value: 'value1' },
      children: [
        {
          name: 'ARadioButton',
          children: 'Hangzhou',
          props: {
            value: 'a',
            style: { padding: '5px', border: '1px solid red' }
          }
        },
        {
          name: 'ARadioButton',
          children: 'Shanghai',
          props: {
            value: 'b',
            style: { padding: '5px', border: '1px solid red' }
          }
        },
        {
          name: 'ARadioButton',
          children: 'Beijing',
          props: {
            value: 'c',
            style: { padding: '5px', border: '1px solid red' }
          }
        }
      ]
    }
  },
  {
    name: 'ARadioGroup',
    alias: 'RadioGroup',
    parent: 'Radio',
    label: '单选按钮组',
    categoryId: 'input',
    doc: 'https://www.antdv.com/components/radio-cn',
    props: [
      {
        name: 'buttonStyle',
        label: 'buttonStyle',
        title: 'RadioButton 的风格样式，目前有描边和填色两种风格',
        setters: 'SelectSetter',
        options: ['outline', 'solid'],
        defaultValue: 'outline'
      },
      {
        name: 'disabled',
        label: 'disabled',
        title: '禁选所有子单选器',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'name',
        label: 'name',
        title: 'RadioGroup 下所有 input[type="radio"] 的 name 属性',
        setters: 'StringSetter'
      },
      {
        name: 'options',
        label: 'options',
        title: '以配置形式设置子元素',
        setters: 'ArraySetter'
      },
      {
        name: 'optionType',
        label: 'optionType',
        title: '用于设置 Radio options 类型',
        setters: 'SelectSetter',
        options: ['default', 'button'],
        defaultValue: 'default'
      },
      {
        name: 'size',
        label: 'size',
        title: '大小，只对按钮样式生效',
        setters: 'SelectSetter',
        options: ['large', 'default', 'small'],
        defaultValue: 'default'
      },
      {
        name: 'value',
        label: 'value',
        title: '用于设置当前选中的值',
        setters: 'anySetter'
      }
    ],
    events: ['change', 'update:value'],
    snippet: {
      children: [
        { name: 'ARadio', children: 'radio1' },
        { name: 'ARadio', children: 'radio2' },
        { name: 'ARadio', children: 'radio3' }
      ]
    }
  }
];
export default components;
