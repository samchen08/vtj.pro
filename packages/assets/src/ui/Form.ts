import { ComponentDescription } from '@vtj/engine';
const component: ComponentDescription = {
  name: 'XForm',
  title: '表单',
  categoryId: 'base',
  package: '@vtj/ui',
  props: [
    {
      name: 'model',
      label: '表单模型',
      setters: 'JSONSetter'
    },
    {
      name: 'inline',
      label: '横向排版',
      setters: 'BooleanSetter'
    },
    {
      name: 'inlineColumns',
      label: '横向显示列',
      setters: 'NumberSetter'
    },
    {
      name: 'footer',
      label: '显示底部',
      setters: 'BooleanSetter'
    },
    {
      name: 'submitText',
      label: '提交按钮',
      setters: 'InputSetter',
      defaultValue: '提交'
    },
    {
      name: 'resetText',
      label: '重置按钮',
      setters: 'InputSetter',
      defaultValue: '重置'
    },
    {
      name: 'submitMethod',
      label: '提交回调函数',
      setters: 'FunctionSetter'
    },
    {
      name: 'rules',
      defaultValue: '',
      setters: 'JSONSetter'
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
  events: ['change', 'submit', 'reset'],
  slots: ['default', 'footer'],
  snippet: {
    children: [
      {
        name: 'XField',
        props: {
          name: 'title',
          label: '标题'
        }
      },
      {
        name: 'XField',
        props: {
          name: 'type',
          label: '分类',
          editor: 'select',
          options: [
            {
              label: '类别一',
              value: 1
            },
            {
              label: '类别二',
              value: 2
            },
            {
              label: '类别三',
              value: 3
            }
          ]
        }
      }
    ]
  }
};

export default component;
