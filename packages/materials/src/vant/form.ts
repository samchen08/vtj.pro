import type { MaterialDescription } from '@vtj/core';

const Form: MaterialDescription = {
  name: 'VanForm',
  alias: 'Form',
  label: '表单',
  categoryId: 'form',
  doc: 'https://vant-ui.github.io/vant/#/zh-CN/form',
  props: [
    {
      name: 'label-width',
      title: '表单项 label 宽度，默认单位为px',
      defaultValue: '6.2em',
      setters: ['StringSetter', 'NumberSetter']
    },
    {
      name: 'label-align',
      title: '表单项 label 对齐方式，可选值为 center right top',
      defaultValue: 'left',
      setters: 'SelectSetter',
      options: ['left', 'center', 'right', 'top']
    },
    {
      name: 'input-align',
      title: '输入框对齐方式，可选值为 center right',
      defaultValue: 'left',
      setters: 'SelectSetter',
      options: ['left', 'center', 'right']
    },
    {
      name: 'error-message-align',
      title: '错误提示文案对齐方式，可选值为 center right',
      defaultValue: 'left',
      setters: 'SelectSetter',
      options: ['left', 'center', 'right']
    },
    {
      name: 'validate-trigger',
      title:
        '表单校验触发时机，可选值为 onChange、onSubmit 支持通过数组同时设置多个值',
      defaultValue: 'onBlur',
      setters: ['StringSetter', 'ArraySetter']
    },
    {
      name: 'colon',
      title: '是否在 label 后面添加冒号',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'disabled',
      title: '是否禁用表单中的所有输入框',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'readonly',
      title: '是否将表单中的所有输入框设置为只读状态',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'required',
      title: '是否显示表单必填星号',
      defaultValue: null,
      setters: ['BooleanSetter', 'StringSetter']
    },
    {
      name: 'validate-first',
      title: '是否在某一项校验不通过时停止校验',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'scroll-to-error',
      title: '是否在提交表单且校验不通过时滚动至错误的表单项',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'scroll-to-error-position',
      title:
        '滚动至错误的表单项时的位置，可选值为 center | end | nearest | start',
      setters: 'SelectSetter',
      options: ['center', 'end', 'nearest', 'start']
    },
    {
      name: 'show-error',
      title: '是否在校验不通过时标红输入框',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'show-error-message',
      title: '是否在校验不通过时在输入框下方展示错误提示',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'submit-on-enter',
      title: '是否在按下回车键时提交表单',
      defaultValue: true,
      setters: 'BooleanSetter'
    }
  ],
  events: ['submit', 'failed'],
  slots: ['default'],
  snippet: {
    children: [
      {
        name: 'VanCellGroup',
        props: {
          inset: true
        },
        children: [
          {
            name: 'VanField',
            props: {
              name: 'title',
              label: '标题',
              placeholder: '标题'
            }
          }
        ]
      }
    ]
  }
};

export default Form;
