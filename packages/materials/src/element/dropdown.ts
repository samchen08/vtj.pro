import type { MaterialDescription } from '@vtj/core';
import { effect, size } from '../shared';
const Dropdown: MaterialDescription[] = [
  {
    name: 'ElDropdown',
    label: '下拉菜单',

    categoryId: 'nav',
    doc: 'https://element-plus.org/zh-CN/component/dropdown.html',
    package: 'element-plus',
    props: [
      {
        name: 'type',
        title: '菜单按钮类型',
        defaultValue: '',
        options: [
          '',
          'default',
          'primary',
          'success',
          'warning',
          'info',
          'danger',
          'text'
        ],
        setters: 'SelectSetter'
      },
      size('size'),
      {
        name: 'buttonProps',
        title: '按钮组件的 props',
        setters: 'ObjectSetter',
      },
      {
        name: 'maxHeight',
        title: '菜单最大高度',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'splitButton',
        title: '下拉触发元素呈现为按钮组',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'disabled',
        title: '是否禁用',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'placement',
        title: '菜单弹出位置',
        defaultValue: 'bottom',
        setters: 'SelectSetter',
        options: [
          'top',
          'top-start',
          'top-end',
          'bottom',
          'bottom-start',
          'bottom-end'
        ]
      },
      effect('effect'),
      {
        name: 'trigger',
        title: '触发下拉的行为',
        defaultValue: 'hover',
        setters: 'SelectSetter',
        options: ['hover', 'click', 'contextmenu']
      },
      {
        name: 'triggerKeys',
        title: '指定键盘上哪些按键可以触发操作',
        defaultValue: ['Enter', 'Space', 'ArrowDown', 'NumpadEnter'],
        setters: 'ArraySetter'
      },
      {
        name: 'virtualTriggering',
        title: '是否启用虚拟触发器',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'virtualRef',
        title: '指示下拉框所依附的参考元素',
        setters: 'FunctionSetter',
      },
      {
        name: 'hideOnClick',
        title: '是否在点击菜单项后隐藏菜单',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'showArrow',
        title: 'tooltip 的内容是否有箭头',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'showTimeout',
        title: '展开下拉菜单的延时，仅在 trigger 为 hover 时有效',
        defaultValue: 150,
        setters: 'NumberSetter'
      },
      {
        name: 'hideTimeout',
        title: '收起下拉菜单的延时（仅在 trigger 为 hover 时有效）',
        defaultValue: 150,
        setters: 'NumberSetter'
      },
      {
        name: 'role',
        title: '下拉菜单的 ARIA 属性',
        defaultValue: 'menu',
        setters: 'SelectSetter',
        options: ['dialog', 'grid', 'group', 'listbox', 'menu', 'navigation', 'tooltip', 'tree']
      },
      {
        name: 'tabindex',
        title: 'Dropdown 组件的 tabindex',
        defaultValue: 0,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'popperClass',
        title: '自定义浮层类名',
        defaultValue: '',
        setters: ['InputSetter', 'ObjectSetter']
      },
      {
        name: 'popperStyle',
        title: '自定义浮层类名',
        defaultValue: '',
        setters: ['InputSetter', 'ObjectSetter']
      },
      {
        name: 'popperOptions',
        title: 'popper.js 参数',
        defaultValue: {
          modifiers: [
            { name: 'computeStyles', options: { gpuAcceleration: false } }
          ]
        },
        setters: 'JSONSetter'
      },
      {
        name: 'teleported',
        label: 'teleported',
        title: '是否将下拉列表插入至 body 元素',
        setters: 'BooleanSetter',
        defaultValue: true
      },
      {
        name: 'append-to',
        title: 'dropdown 的内容将挂载到哪一个元素上',
        setters: 'FunctionSetter',
      },
      {
        name: 'persistent',
        title: '当下拉菜单处于非活动状态且 persistent 为 false 时，下拉菜单将被销毁',
        setters: 'BooleanSetter',
        defaultValue: true
      }
    ],
    slots: [
      {
        name: 'default'
      },
      {
        name: 'dropdown'
      }
    ],
    events: [
      {
        name: 'click'
      },
      {
        name: 'command'
      },
      {
        name: 'visible-change'
      }
    ],
    snippet: {
      name: 'ElDropdown',
      children: [
        {
          name: 'ElButton',
          children: [
            {
              name: 'component',
              props: {
                is: 'span'
              },
              children: '下拉菜单'
            },
            {
              name: 'component',
              props: {
                is: 'span'
              },
              children: ' V'
            }
          ]
        },
        {
          name: 'ElDropdownMenu',
          slot: 'dropdown',
          children: [
            {
              name: 'ElDropdownItem',
              children: 'Action 1'
            },
            {
              name: 'ElDropdownItem',
              children: 'Action 2'
            },
            {
              name: 'ElDropdownItem',
              children: 'Action 3'
            }
          ]
        }
      ]
    }
  },
  {
    name: 'ElDropdownMenu',
    label: '下拉菜单Menu',

    categoryId: 'nav',
    package: 'element-plus',
    slots: ['default']
  },
  {
    name: 'ElDropdownItem',
    childIncludes: true,
    label: '下拉菜单项',

    categoryId: 'nav',
    package: 'element-plus',
    props: [
      {
        name: 'command',
        title: '派发到command回调函数的指令参数',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter', 'JSONSetter']
      },
      {
        name: 'disabled',
        title: '是否禁用',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'divided',
        title: '是否显示分隔符',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'icon',
        title: '自定义图标',
        defaultValue: '',
        setters: ['InputSetter']
      }
    ],
    slots: ['default', 'icon'],
    snippet: {
      name: 'ElDropdownItem',
      children: '下拉选项'
    }
  }
];
export default Dropdown;
