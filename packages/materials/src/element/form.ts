import type { MaterialDescription } from '@vtj/core';
const form: MaterialDescription[] = [
  {
    name: 'ElForm',
    label: '表单',

    categoryId: 'form',
    doc: 'https://element-plus.org/zh-CN/component/form.html',
    package: 'element-plus',
    props: [
      {
        name: 'model',
        title: '表单数据对象',
        defaultValue: '',
        setters: 'ExpressionSetter'
      },
      {
        name: 'rules',
        title: '表单验证规则',
        defaultValue: '',
        setters: 'ExpressionSetter'
      },
      {
        name: 'inline',
        title: '行内表单模式',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'labelPosition',
        title: '表单域标签的位置， 当设置为 left 或 right 时，则也需要设置 label-width 属性',
        defaultValue: 'right',
        options: ['left', 'right', 'top'],
        setters: 'SelectSetter'
      },
      {
        name: 'labelWidth',
        title: '标签的长度，例如 \'50px\'。 作为 Form 直接子元素的 form-item 会继承该值。 可以使用 auto',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'labelSuffix',
        title: '表单域标签的后缀',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'hideRequiredAsterisk',
        defaultValue: false,
        title: '是否显示必填字段的标签旁边的红色星号',
        setters: 'BooleanSetter'
      },
      {
        name: 'requireAsteriskPosition',
        defaultValue: 'left',
        title: '星号的位置',
        options: ['left', 'right'],
        setters: 'SelectSetter'
      },
      {
        name: 'showMessage',
        defaultValue: true,
        title: '是否显示校验错误信息',
        setters: 'BooleanSetter'
      },
      {
        name: 'inlineMessage',
        defaultValue: false,
        title: '是否以行内形式展示校验信息',
        setters: 'BooleanSetter'
      },
      {
        name: 'statusIcon',
        defaultValue: false,
        title: '是否在输入框中显示校验结果反馈图标',
        setters: 'BooleanSetter'
      },
      {
        name: 'validateOnRuleChange',
        defaultValue: true,
        title: '是否在 rules 属性改变后立即触发一次验证',
        setters: 'BooleanSetter'
      },
      {
        name: 'size',
        title: '用于控制该表单内组件的尺寸',
        defaultValue: '',
        options: ['large', 'default', 'small'],
        setters: 'SelectSetter'
      },
      {
        name: 'disabled',
        title: '是否禁用该表单内的所有组件',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'scrollToError',
        title: '当校验失败时，滚动到第一个错误表单项',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'scrollIntoViewOptions',
        title: '当校验有失败结果时，滚动到第一个失败的表单项目',
        defaultValue: '',
        setters: ['ExpressionSetter', 'BooleanSetter']
      }
    ],
    events: [
      {
        name: 'validate'
      }
    ],
    slots: ['default'],
    snippet: {
      name: 'ElForm',
      props: {
        labelWidth: '80px'
      },
      children: [
        {
          name: 'ElFormItem',
          props: {
            label: '表单项'
          },
          children: [
            {
              name: 'ElInput'
            }
          ]
        },
        {
          name: 'ElFormItem',
          props: {
            label: ' '
          },
          children: [
            {
              name: 'ElButton',
              props: {
                type: 'primary'
              },
              children: '确定'
            }
          ]
        }
      ]
    }
  },
  {
    name: 'ElFormItem',
    label: '表单项',

    categoryId: 'form',
    package: 'element-plus',
    props: [
      {
        name: 'prop',
        title: 'model 的键名。 它可以是属性的路径（如 a.b.0 或 [\'a\', \'b\', \'0\']）。 在使用了 validate、resetFields 的方法时，该属性是必填的',
        defaultValue: '',
        setters: ['InputSetter', 'ArraySetter']
      },
      {
        name: 'label',
        title: '标签文本',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'labelPosition',
        title: '表单域标签的位置， 当设置为 left 或 right 时，则也需要设置 label-width 属性 默认会继承 Form的label-position',
        defaultValue: '',
        setters: 'SelectSetter',
        options: ['left', 'right', 'top']
      },
      {
        name: 'labelWidth',
        title: '标签宽度，例如 \'50px\'。 可以使用 auto',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'required',
        title: '是否为必填项，如不设置，则会根据校验规则确认',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'rules',
        title: '表单验证规则',
        defaultValue: '',
        setters: 'JSONSetter'
      },
      {
        name: 'error',
        title: '表单域验证错误时的提示信息。设置该值会导致表单验证状态变为 error，并显示该错误信息',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'showMessage',
        defaultValue: true,
        title: '是否显示校验错误信息',
        label: '错误信息',
        setters: 'BooleanSetter'
      },
      {
        name: 'inlineMessage',
        defaultValue: false,
        title: '是否在行内显示校验信息',
        label: '校验信息',
        setters: 'BooleanSetter'
      },
      {
        name: 'size',
        title: '用于控制该表单域下组件的默认尺寸',
        defaultValue: 'default',
        options: ['large', 'default', 'small'],
        setters: 'SelectSetter'
      },
      {
        name: 'for',
        title: '和原生标签相同能力',
        defaultValue: '',
        setters: 'StringSetter'
      },
      {
        name: 'validateStatus',
        title: 'formitem 校验的状态',
        options: ['', 'error', 'validating', 'success'],
        setters: 'SelectSetter'
      }
    ],
    slots: ['default', 'label', 'error'],
    snippet: {
      props: {
        label: '表单项'
      },
      children: [
        {
          name: 'ElInput'
        }
      ]
    }
  }
];

export default form;
