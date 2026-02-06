import type { MaterialDescription } from '@vtj/core';

const Tabs: MaterialDescription[] = [
  {
    name: 'ElTabs',
    // childIncludes: ['ElTabPane'],
    label: '标签页',

    doc: 'https://element-plus.org/zh-CN/component/tabs.html',
    categoryId: 'nav',
    package: 'element-plus',
    props: [
      {
        name: 'modelValue',
        title: '绑定值',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'defaultValue',
        title: '在初始渲染时处于激活状态的标签的值',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'type',
        title: '风格类型',
        setters: [
          {
            name: 'SelectSetter',
            props: {
              closable: true
            }
          }
        ],
        defaultValue: '',
        options: ['', 'card', 'border-card']
      },
      {
        name: 'closable',
        title: '标签是否可关闭',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'addable',
        title: '标签是否可增加',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'editable',
        title: '标签是否同时可增加和关闭',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'tabPosition',
        title: '选项卡所在位置',
        defaultValue: 'top',
        setters: 'SelectSetter',
        options: ['top', 'right', 'bottom', 'left']
      },
      {
        name: 'stretch',
        title: '标签的宽度是否自撑开',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'beforeLeave',
        title: '切换标签之前的钩子函数， 若返回 false  或者返回被 reject 的 Promise，则阻止切换',
        defaultValue: '',
        setters: 'FunctionSetter'
      },
      {
        name: 'tabindex',
        title: 'tabs 的 tabindex',
        setters: ['StringSetter', 'NumberSetter']
      }
    ],
    events: [
      {
        name: 'tab-click'
      },
      {
        name: 'tab-change'
      },
      {
        name: 'tab-remove'
      },
      {
        name: 'tab-add'
      },
      {
        name: 'edit'
      },
      {
        name: 'update:modelValue'
      }
    ],
    slots: ['default', 'addIcon', 'add-icon'],
    snippet: {
      props: {
        modelValue: '1'
      },
      children: [
        {
          name: 'ElTabPane',
          children: '面板一内容',
          props: {
            label: '面板一',
            name: '1'
          }
        },
        {
          name: 'ElTabPane',
          children: '面板二内容',
          props: {
            label: '面板二',
            name: '2'
          }
        },
        {
          name: 'ElTabPane',
          children: '面板三内容',
          props: {
            label: '面板三',
            name: '3'
          }
        }
      ]
    }
  },
  {
    name: 'ElTabPane',
    label: '标签页面板',

    categoryId: 'nav',
    package: 'element-plus',
    props: [
      {
        name: 'label',
        title: '选项卡标题',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'disabled',
        title: '是否禁用',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'name',
        title: '与选项卡绑定值 value 对应的标识符，表示选项卡别名',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'closable',
        title: '标签是否可关闭',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'lazy',
        title: '标签是否延迟渲染',
        defaultValue: false,
        setters: 'BooleanSetter'
      }
    ],
    slots: [
      {
        name: 'default'
      },
      {
        name: 'label'
      }
    ],
    snippet: {
      props: {
        label: '面板标题'
      },
      children: '面板内容'
    }
  }
];

export default Tabs;
