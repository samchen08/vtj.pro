import type { MaterialDescription } from '@vtj/core';
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
        defaultValue: '',
        options: ['primary', 'warning', 'success', 'danger', 'info'],
        setters: 'SelectSetter'
      },
      {
        name: 'size',
        defaultValue: 'default',
        setters: 'SelectSetter',
        options: ['large', 'default', 'small']
      },
      {
        name: 'maxHeight',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'splitButton',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'disabled',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'placement',
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
      {
        name: 'trigger',
        defaultValue: 'hover',
        setters: 'SelectSetter',
        options: ['hover', 'click', 'contextmenu']
      },
      {
        name: 'hideOnClick',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'showTimeout',
        defaultValue: 250,
        setters: 'NumberSetter'
      },
      {
        name: 'hideTimeout',
        defaultValue: 150,
        setters: 'NumberSetter'
      },
      {
        name: 'role',
        defaultValue: 'menu',
        setters: 'InputSetter'
      },
      {
        name: 'tabindex',
        defaultValue: 0,
        setters: 'NumberSetter'
      },
      {
        name: 'popperClass',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'popperOptions',
        defaultValue: undefined,
        setters: 'JSONSetter'
      },
      {
        name: 'teleported',
        label: 'teleported',
        title: '是否将下拉列表插入至 body 元素',
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
    package: 'element-plus'
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
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter', 'JSONSetter']
      },
      {
        name: 'disabled',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'divided',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'icon',
        defaultValue: '',
        setters: ['InputSetter']
      }
    ],
    slots: ['default'],
    snippet: {
      name: 'ElDropdownItem',
      children: '下拉选项'
    }
  }
];
export default Dropdown;
