import { ComponentDescription } from '@vtj/engine';

export default {
  name: 'AMentions',
  alias: 'Mentions',
  title: '提及',
  categoryId: 'input',
  doc: 'https://www.antdv.com/components/button-cn',
  package: 'ant-design-vue',
  props: [
    {
      name: 'autofocus',
      label: 'autofocus',
      title: '自动获得焦点',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'defaultValue',
      label: 'defaultValue',
      title: '默认值',
      setters: 'InputSetter'
    },
    {
      name: 'filterOption',
      label: 'filterOption',
      title: '自定义过滤逻辑',
      setters: 'FunctionSetter'
    },
    {
      name: 'getPopupContainer',
      label: 'getPopupContainer',
      title: '指定建议框挂载的 HTML 节点',
      setters: 'FunctionSetter'
    },
    {
      name: 'notFoundContent',
      label: 'notFoundContent',
      title: '当下拉列表为空时显示的内容',
      setters: 'InputSetter'
    },
    {
      name: 'placement',
      label: 'placement',
      title: '弹出层展示位置',
      setters: 'SelectSetter',
      options: ['top', 'bottom'],
      defaultValue: 'bottom'
    },
    {
      name: 'prefix',
      label: 'prefix',
      title: '设置触发关键字',
      setters: 'InputSetter',
      defaultValue: '@'
    },
    {
      name: 'split',
      label: 'split',
      title: '设置选中项前后分隔符',
      setters: 'InputSetter'
    },
    {
      name: 'status',
      label: 'status',
      title: '设置校验状态',
      setters: 'SelectSetter',
      options: ['error', 'warning']
    },
    {
      name: 'validateSearch',
      label: 'validateSearch',
      title: '自定义过滤逻辑',
      setters: 'FunctionSetter'
    },
    {
      name: 'value',
      label: 'value',
      title: '设置值',
      setters: 'InputSetter'
    },
    {
      name: 'options',
      label: 'options',
      title: '选项配置',
      setters: 'JSONSetter'
    }
  ],
  events: ['update:value', 'blur', 'change', 'focus', 'search', 'select'],
  slots: ['notFoundContent', 'option']
} as ComponentDescription;
