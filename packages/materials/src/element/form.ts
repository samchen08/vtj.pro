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
        defaultValue: '',
        setters: 'ExpressionSetter'
      },
      {
        name: 'rules',
        defaultValue: '',
        setters: 'ExpressionSetter'
      },
      {
        name: 'inline',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'labelPosition',
        defaultValue: 'right',
        options: ['left', 'right', 'top'],
        setters: 'SelectSetter'
      },
      {
        name: 'labelWidth',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'labelSuffix',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'hideRequiredAsterisk',
        defaultValue: false,
        title: '是否显示必填字段的标签旁边的红色星号',
        label: '隐藏必填星号',
        setters: 'BooleanSetter'
      },
      {
        name: 'requireAsteriskPosition',
        defaultValue: 'left',
        title: '星号的位置',
        label: '星号位置',
        options: ['left', 'right'],
        setters: 'SelectSetter'
      },
      {
        name: 'showMessage',
        defaultValue: true,
        title: '是否显示校验错误信息',
        label: '显示错误',
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
        label: 'validate',
        setters: 'BooleanSetter'
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
        name: 'scrollToError',
        defaultValue: false,
        setters: 'BooleanSetter'
      }
    ],
    events: [
      {
        name: 'validate'
      }
    ],
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
        defaultValue: '',
        setters: ['InputSetter']
      },
      {
        name: 'label',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'labelWidth',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'required',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'rules',
        defaultValue: '',
        setters: 'JSONSetter'
      },
      {
        name: 'error',
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
        defaultValue: 'default',
        options: ['large', 'default', 'small'],
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
