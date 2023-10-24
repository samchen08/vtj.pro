import { ComponentDescription } from '@vtj/engine';

const Tabs: ComponentDescription[] = [
  {
    name: 'ElTabs',
    childIncludes: ['ElTabPane'],
    title: '标签页',

    doc: 'https://element-plus.org/zh-CN/component/tabs.html',
    categoryId: 'nav',
    package: 'element-plus',
    props: [
      {
        name: 'modelValue',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'type',
        setters: [
          {
            name: 'SelectSetter',
            props: {
              clerable: true
            }
          }
        ],
        options: ['card', 'border-card']
      },
      {
        name: 'closable',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'addable',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'editable',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'tabPosition',
        defaultValue: 'top',
        setters: 'SelectSetter',
        options: ['top', 'right', 'bottom', 'left']
      },
      {
        name: 'stretch',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'beforeLeave',
        defaultValue: '',
        setters: 'FunctionSetter'
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
    slots: ['default', 'addIcon'],
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
    title: '标签页面板',

    categoryId: 'nav',
    package: 'element-plus',
    props: [
      {
        name: 'label',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'disabled',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'name',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'closable',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'lazy',
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
