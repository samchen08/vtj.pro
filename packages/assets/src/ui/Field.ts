import { ComponentDescription } from '@vtj/engine';
const component: ComponentDescription = {
  name: 'XField',
  title: '表单字段',
  categoryId: 'form',
  package: '@vtj/ui',
  props: [
    {
      name: 'name',
      label: '字段名称',
      setters: 'InputSetter'
    },
    {
      name: 'label',
      label: '字段标题',
      setters: 'InputSetter'
    },
    {
      name: 'modelValue',
      label: '字段值',
      setters: 'InputSetter'
    },
    {
      name: 'editor',
      label: '编辑器',
      setters: 'SelectSetter',
      options: [
        'none',
        'text',
        'textarea',
        'select',
        'checkbox',
        'radio',
        'number',
        'date',
        'time',
        'datetime',
        'switch',
        'slider',
        'rate',
        'cascader'
      ],
      defaultValue: 'text'
    },
    {
      name: 'props',
      label: '编辑器参数',
      setters: 'JSONSetter'
    },
    {
      name: 'size',
      defaultValue: '',
      options: ['large', 'default', 'small'],
      setters: 'SelectSetter'
    },
    {
      name: 'width',
      label: '宽度',
      setters: ['InputSetter', 'NumberSetter']
    },
    {
      name: 'tooltipMessage',
      label: 'tooltipMessage',
      setters: 'BooleanSetter',
      title: '是否在tooltip显示校验信息',
      defaultValue: true
    },
    {
      name: 'tooltipPosition',
      defaultValue: 'outer',
      options: ['inner', 'outer'],
      setters: ['SelectSetter', 'NumberSetter'],
      title: 'tooltip信息显示相对输入框的位置'
    },
    {
      name: 'options',
      label: '选项数据',
      setters: ['JSONSetter', 'FunctionSetter']
    },
    {
      name: 'visible',
      label: '显示控制',
      setters: ['BooleanSetter', 'JSONSetter', 'FunctionSetter'],
      defaultValue: true
    },
    {
      name: 'cascader',
      label: '级联字段',
      setters: ['InputSetter', 'JSONSetter']
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
      label: '行内校验信息',
      setters: 'BooleanSetter'
    }
  ],
  events: ['update:modelValue', 'change', 'focus', 'blur'],
  slots: ['label', 'editor', 'option'],
  snippet: {}
};

export default component;
