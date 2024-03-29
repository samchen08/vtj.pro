import type { MaterialDescription } from '@vtj/core';

const components: MaterialDescription[] = [
  {
    name: 'AMentions',
    alias: 'Mentions',
    label: '提及',
    categoryId: 'input',
    doc: 'https://www.antdv.com/components/mentions-cn',
    props: [
      {
        name: 'autofocus',
        label: 'autofocus',
        title: '自动获得焦点',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'defaultValue',
        label: 'defaultValue',
        title: '默认值',
        setters: 'StringSetter'
      },
      {
        name: 'filterOption',
        label: 'filterOption',
        title: '自定义过滤逻辑',
        setters: ['BooleanSetter', 'FunctionSetter']
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
        setters: 'StringSetter',
        defaultValue: 'Not Found'
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
        setters: ['StringSetter', 'ArraySetter'],
        defaultValue: '@'
      },
      {
        name: 'split',
        label: 'split',
        title: '设置选中项前后分隔符',
        setters: 'StringSetter',
        defaultValue: ' '
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
        title: '自定义触发验证逻辑',
        setters: 'FunctionSetter' //?? (text: string, props: MentionsProps) => void
      },
      {
        name: 'value',
        label: 'value',
        title: '设置值',
        setters: 'StringSetter'
      },
      {
        name: 'options',
        label: 'options',
        title: '选项配置',
        setters: 'ObjectSetter', //?? Options
        defaultValue: []
      },
      {
        name: 'option',
        label: 'option',
        title: '通过 option 插槽，自定义节点'
      }
    ],
    events: ['blur', 'change', 'focus', 'search', 'select', 'update:value'],
    slots: [
      { name: 'notFoundContent' },
      { name: 'option', params: ['object'] }
    ],
    snippet: {
      props: {
        value: '@afc163',
        options: [
          {
            value: 'afc163',
            label: 'afc163'
          },
          {
            value: 'zombieJ',
            label: 'zombieJ'
          },
          {
            value: 'yesmeck',
            label: 'yesmeck'
          }
        ]
      }
    }
  }
  // {
  //   name: 'AMentionOption',
  //   alias: 'Option',
  //   parent: 'Mention',
  //   label: '提及项',
  //   categoryId: 'input',
  //   doc: 'https://www.antdv.com/components/mentions-cn',
  //   props: [
  //     {
  //       name: 'value',
  //       label: 'value',
  //       title: '选择时填充的值',
  //       setters: 'StringSetter',
  //       defaultValue: 'number'
  //     },
  //     {
  //       name: 'label',
  //       label: 'label',
  //       title: '选项的标题',
  //       setters: 'FunctionSetter'
  //     },
  //     {
  //       name: 'disabled',
  //       label: 'disabled',
  //       title: '是否可选',
  //       setters: 'BooleanSetter'
  //     },
  //     {
  //       name: 'class',
  //       label: 'class',
  //       title: 'css 类名',
  //       setters: 'StringSetter'
  //     },
  //     {
  //       name: 'style',
  //       label: 'style',
  //       title: '选项样式',
  //       setters: 'ObjectSetter'
  //     },
  //     {
  //       name: 'payload',
  //       label: 'payload',
  //       title: '其它数据',
  //       setters: 'ObjectSetter'
  //     }
  //   ],
  //   slots: ['label']
  // }
];
export default components;
