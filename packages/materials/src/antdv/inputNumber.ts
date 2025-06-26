import type { MaterialDescription } from '@vtj/core';

const components: MaterialDescription[] = [
  {
    name: 'AInputNumber',
    alias: 'InputNumber',
    label: '数字输入框',
    categoryId: 'input',
    doc: 'https://www.antdv.com/components/input-number-cn',
    props: [
      {
        name: 'autofocus',
        label: 'autofocus',
        title: '自动获取焦点',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'bordered',
        label: 'bordered',
        title: '是否有边框',
        setters: 'BooleanSetter',
        defaultValue: true
      },
      {
        name: 'controls',
        label: 'controls',
        title: '是否显示增减按钮',
        setters: 'BooleanSetter',
        defaultValue: true
      },
      {
        name: 'decimalSeparator',
        label: 'decimalSeparator',
        title: '小数点',
        setters: 'StringSetter'
      },
      {
        name: 'defaultValue',
        label: 'defaultValue',
        title: '初始值',
        setters: 'NumberSetter'
      },
      {
        name: 'disabled',
        label: 'disabled',
        title: '禁用',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'formatter',
        label: 'formatter',
        title: '指定输入框展示值的格式',
        setters: 'FunctionSetter'
      },
      {
        name: 'keyboard',
        label: 'keyboard',
        title: '是否启用键盘快捷行为',
        setters: 'BooleanSetter',
        defaultValue: true
      },
      {
        name: 'max',
        label: 'max',
        title: '最大值',
        setters: 'NumberSetter',
        defaultValue: Infinity
      },
      {
        name: 'min',
        label: 'min',
        title: '最小值',
        setters: 'NumberSetter',
        defaultValue: -Infinity
      },
      {
        name: 'parser',
        label: 'parser',
        title: '指定从 formatter 里转换回数字的方式，和 formatter 搭配使用',
        setters: 'FunctionSetter'
      },
      {
        name: 'precision',
        label: 'precision',
        title: '数值精度',
        setters: 'NumberSetter'
      },
      {
        name: 'size',
        label: 'size',
        title: '输入框大小',
        setters: 'SelectSetter',
        options: ['large', '', 'small']
      },
      {
        name: 'status',
        label: 'status',
        title: '设置校验状态',
        setters: 'SelectSetter',
        options: ['error', 'warning']
      },
      {
        name: 'step',
        label: 'step',
        title: '每次改变步数，可以为小数',
        setters: ['StringSetter', 'NumberSetter'],
        defaultValue: 1
      },
      {
        name: 'stringMode',
        label: 'stringMode',
        title:
          '字符值模式，开启后支持高精度小数。同时 change 事件将返回 string 类型',
        setters: 'BooleanSetter',
        defaultValue: 1
      },
      {
        name: 'value',
        label: 'value',
        title: '当前值',
        setters: 'NumberSetter'
      }
    ],
    events: ['change', 'pressEnter', 'step', 'update:value'],
    slots: [
      'default',
      'addonAfter',
      'addonBefore',
      'prefix',
      'upIcon',
      'downIcon'
    ]
  }
];
export default components;
