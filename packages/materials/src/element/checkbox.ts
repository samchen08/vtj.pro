import type { MaterialDescription } from '@vtj/core';
const Checkbox: MaterialDescription[] = [
  {
    name: 'ElCheckbox',
    label: '多选框',

    categoryId: 'form',
    doc: 'https://element-plus.org/zh-CN/component/checkbox.html',
    package: 'element-plus',
    props: [
      {
        name: 'modelValue',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter', 'BooleanSetter']
      },
      {
        name: 'label',
        defaultValue: '',
        setters: ['InputSetter']
      },
      {
        name: 'value',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter', 'BooleanSetter', 'JSONSetter']
      },
      {
        name: 'trueLabel',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'falseLabel',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'disabled',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'border',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'size',
        defaultValue: 'default',
        options: ['large', 'default', 'small'],
        setters: 'SelectSetter'
      },
      {
        name: 'name',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'checked',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'indeterminate',
        defaultValue: false,
        title: '设置 indeterminate 状态，只负责样式控制',
        label: '半选',
        setters: 'BooleanSetter'
      },
      {
        name: 'validateEvent',
        defaultValue: true,
        title: '输入时是否触发表单的校验',
        label: '表单校验',
        setters: 'BooleanSetter'
      }
    ],
    events: [
      {
        name: 'change'
      },
      {
        name: 'update:modelValue'
      }
    ],
    snippet: {
      props: {
        label: '选项一',
        value: 1
      }
    }
  },
  {
    name: 'ElCheckboxGroup',
    label: '多选框组',

    childIncludes: ['ElCheckbox', 'ElCheckboxButton'],
    categoryId: 'form',
    package: 'element-plus',
    props: [
      {
        name: 'modelValue',
        defaultValue: [],
        setters: 'JSONSetter'
      },
      {
        name: 'size',
        defaultValue: '',
        options: ['large', 'default', 'small'],
        setters: 'SelectSetter'
      },
      {
        name: 'disabled',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'min',
        defaultValue: '',
        setters: 'NumberSetter'
      },
      {
        name: 'max',
        defaultValue: '',
        setters: 'NumberSetter'
      },
      {
        name: 'label',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'value',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter', 'BooleanSetter', 'JSONSetter']
      },
      {
        name: 'textColor',
        defaultValue: '#ffffff',
        setters: 'ColorSetter'
      },
      {
        name: 'fill',
        defaultValue: '#409EFF',
        title: '当按钮为活跃状态时的边框和背景颜色',
        setters: 'ColorSetter'
      },
      {
        name: 'validateEvent',
        defaultValue: true,
        title: '输入时是否触发表单的校验',
        label: '表单校验',
        setters: 'BooleanSetter'
      }
    ],
    events: ['change', 'update:modelValue'],
    snippet: {
      children: [
        {
          name: 'ElCheckbox',
          props: {
            label: '选项一',
            value: '1'
          }
        },
        {
          name: 'ElCheckbox',
          props: {
            label: '选项二',
            value: '2'
          }
        },
        {
          name: 'ElCheckbox',
          props: {
            label: '选项三',
            value: '3'
          }
        }
      ]
    }
  },
  {
    name: 'ElCheckboxButton',
    label: '按钮样式的多选组合',

    categoryId: 'form',
    package: 'element-plus',
    props: [
      {
        name: 'label',
        defaultValue: '',
        setters: ['JSONSetter', 'InputSetter', 'NumberSetter', 'BooleanSetter']
      },
      {
        name: 'trueLabel',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'falseLabel',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'disabled',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'name',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'checked',
        defaultValue: false,
        setters: 'BooleanSetter'
      }
    ],
    snippet: {
      props: {
        label: '按钮选项'
      }
    }
  }
];

export default Checkbox;
