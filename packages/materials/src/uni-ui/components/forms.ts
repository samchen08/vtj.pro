import type { MaterialDescription } from '@vtj/core';

const desc: MaterialDescription[] = [
  {
    name: 'UniForms',
    label: '表单',
    categoryId: 'ext',
    props: [
      {
        name: 'mode',
        title: '表单数据',
        defaultValue: '',
        setters: 'ObjectSetter'
      },
      {
        name: 'rules',
        title: '表单校验规则',
        defaultValue: '',
        setters: 'ObjectSetter'
      },
      {
        name: 'validateTrigger',
        title: '表单校验时机,blur仅在 uni-easyinput 中生效	',
        defaultValue: 'submit',
        setters: 'SelectSetter',
        options: ['bind', 'submit', 'blur']
      },
      {
        name: 'label-position',
        title: 'label 位置',
        defaultValue: 'left',
        setters: 'SelectSetter',
        options: ['left', 'top']
      },
      {
        name: 'label-width',
        title: 'label 宽度，单位 px',
        defaultValue: 75,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'label-align',
        title: 'label 居中方式',
        defaultValue: 'left',
        setters: 'SelectSetter',
        options: ['left', 'center', 'right']
      },
      {
        name: 'err-show-type',
        title: '表单错误信息提示方式',
        defaultValue: 'undertext',
        setters: 'SelectSetter',
        options: ['undertext', 'toast', 'modal']
      },
      {
        name: 'border',
        title: '是否显示分格线',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'value',
        title: '表单数据，兼容vue2',
        defaultValue: '',
        setters: 'ObjectSetter'
      },
      {
        name: 'modelValue',
        title: '表单数据，兼容vue3',
        defaultValue: '',
        setters: 'ObjectSetter'
      }
    ],
    events: ['validate', 'update:modelValue'],
    snippet: {
      props: {
        modelValue: {
          name: '',
          age: ''
        }
      },
      children: [
        {
          name: 'UniFormsItem',
          props: {
            label: '姓名',
            required: true
          },
          children: [
            {
              name: 'UniEasyinput',
              props: {
                placeholder: '请输入姓名'
              }
            }
          ]
        },
        {
          name: 'UniFormsItem',
          props: {
            label: '年龄',
            required: true
          },
          children: [
            {
              name: 'UniEasyinput',
              props: {
                placeholder: '请输入年龄'
              }
            }
          ]
        }
      ]
    }
  },
  {
    name: 'UniFormsItem',
    label: '表单项',
    categoryId: 'ext',
    props: [
      {
        name: 'name',
        title: '表单域的属性名，在使用校验规则时必填',
        defaultValue: '',
        setters: ['StringSetter', 'ArraySetter']
      },
      {
        name: 'rules',
        title: '表单校验规则',
        defaultValue: '',
        setters: 'ObjectSetter'
      },
      {
        name: 'required',
        title: 'label 右边显示红色"*"号，样式显示不会对校验规则产生效果',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'label',
        title: '输入框左边的文字提示',
        defaultValue: '',
        setters: 'StringSetter'
      },
      {
        name: 'label-width',
        title: 'label的宽度，单位px',
        defaultValue: 70,
        setters: 'NumberSetter'
      },
      {
        name: 'error-message',
        title: '显示的错误提示内容，如果为空字符串或者false，则不显示错误信息',
        defaultValue: '',
        setters: 'StringSetter'
      },
      {
        name: 'label-align',
        title: 'label的文字对齐方式',
        defaultValue: 'left',
        setters: 'SelectSetter',
        options: ['left', 'center', 'right']
      },
      {
        name: 'label-position',
        title: 'label的文字的位置',
        defaultValue: 'left',
        setters: 'SelectSetter',
        options: ['top', 'left']
      },
      {
        name: 'validateTrigger',
        title: '表单校验时机',
        defaultValue: 'submit',
        setters: 'SelectSetter',
        options: ['bind', 'submit']
      },
      {
        name: 'left-icon',
        title: 'label左边的图标，限uni-ui的图标名称',
        defaultValue: '',
        setters: 'StringSetter'
      },
      {
        name: 'icon-color',
        title: '左边通过icon配置的图标的颜色',
        defaultValue: '#606266',
        setters: 'ColorSetter'
      }
    ],
    slots: ['default', 'label'],
    snippet: {
      props: {
        label: '姓名',
        required: true
      },
      children: [
        {
          name: 'UniEasyinput',
          props: {
            placeholder: '请输入姓名'
          }
        }
      ]
    }
  }
];

export default desc;
