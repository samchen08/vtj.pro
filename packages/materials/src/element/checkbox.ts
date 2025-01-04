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
        title: '选中项绑定值',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter', 'BooleanSetter']
      },
      {
        name: 'label',
        title:
          '选中状态的值，只有在绑定对象类型为 array 时有效。 如果没有 value， label则作为value使用',
        defaultValue: '',
        setters: ['InputSetter']
      },
      {
        name: 'value',
        title:
          '选中状态的值（只有在checkbox-group或者绑定对象类型为array时有效）',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter', 'BooleanSetter', 'JSONSetter']
      },
      {
        name: 'trueValue',
        title: '选中时的值',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'falseValue',
        title: '没有选中时的值',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'disabled',
        title: '是否禁用',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'border',
        title: '是否显示边框',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'size',
        title: 'Checkbox 的尺寸',
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
        title: '当前是否勾选',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'indeterminate',
        defaultValue: false,
        title: '设置 indeterminate 状态，只负责样式控制',
        // label: '半选',
        setters: 'BooleanSetter'
      },
      {
        name: 'validateEvent',
        defaultValue: true,
        title: '输入时是否触发表单的校验',
        // label: '表单校验',
        setters: 'BooleanSetter'
      },
      {
        name: 'tabindex',
        label: 'tabindex',
        title: '输入框的 tabindex',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'id',
        label: 'id',
        title: 'input id',
        setters: 'StringSetter'
      },
      {
        name: 'aria-controls',
        title: '与 aria-control一致, 当 indeterminate为 true时生效',
        setters: 'BooleanSetter'
      },
      {
        name: 'trueLabel',
        title: '选中时的值(deprecated)',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'falseLabel',
        title: '没有选中时的值(deprecated)',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'controls(deprecated)',
        title: '与 aria-control一致, 当 indeterminate为 true时生效',
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
    slots: ['default'],
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
        title: '绑定值',
        defaultValue: [],
        setters: 'JSONSetter'
      },
      {
        name: 'size',
        title: '多选框组尺寸',
        defaultValue: '',
        options: ['large', 'default', 'small'],
        setters: 'SelectSetter'
      },
      {
        name: 'disabled',
        title: '是否禁用',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'min',
        title: '可被勾选的 checkbox 的最小数量',
        defaultValue: '',
        setters: 'NumberSetter'
      },
      {
        name: 'max',
        title: '可被勾选的 checkbox 的最大数量',
        defaultValue: '',
        setters: 'NumberSetter'
      },
      {
        name: 'aria-label',
        title: '原生 aria-label属性',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'textColor',
        title: '当按钮为活跃状态时的字体颜色',
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
        name: 'tag',
        defaultValue: 'div',
        title: '复选框组元素标签',
        setters: 'StringSetter'
      },
      {
        name: 'validateEvent',
        defaultValue: true,
        title: '输入时是否触发表单的校验',
        setters: 'BooleanSetter'
      },
      {
        name: 'label',
        title: '原生 aria-label属性',
        defaultValue: '',
        setters: 'StringSetter'
      }
    ],
    events: ['change', 'update:modelValue'],
    slots: ['default'],
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
        name: 'modelValue',
        title: '选中状态的值，只有在绑定对象类型为 array 时有效。',
        defaultValue: [],
        setters: ['StringSetter', 'NumberSetter', 'BooleanSetter', 'JSONSetter']
      },
      {
        name: 'label',
        title:
          '选中状态的值，只有在绑定对象类型为 array 时有效。 如果没有 value， label则作为value使用',
        defaultValue: '',
        setters: ['StringSetter', 'NumberSetter', 'BooleanSetter', 'JSONSetter']
      },
      {
        name: 'trueValue',
        title: '选中时的值',
        defaultValue: '',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'falseValue',
        title: '没有选中时的值',
        defaultValue: '',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'disabled',
        title: '是否禁用',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'name',
        title: '原生 name 属性',
        defaultValue: '',
        setters: 'StringSetter'
      },
      {
        name: 'checked',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'trueLabel',
        title: '选中时的值',
        defaultValue: '',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'falseLabel',
        title: '没有选中时的值',
        defaultValue: '',
        setters: ['StringSetter', 'NumberSetter']
      }
    ],
    slots: ['default'],
    snippet: {
      props: {
        label: '按钮选项'
      }
    }
  }
];

export default Checkbox;
