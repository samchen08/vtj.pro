import type { MaterialDescription } from '@vtj/core';
const Menu: MaterialDescription[] = [
  {
    name: 'ElMenu',
    label: '导航菜单',

    doc: 'https://element-plus.org/zh-CN/component/menu.html',
    categoryId: 'nav',
    package: 'element-plus',
    props: [
      {
        name: 'mode',
        defaultValue: 'vertical',
        setters: 'SelectSetter',
        options: ['horizontal', 'vertical']
      },
      {
        name: 'collapse',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'ellipsis',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'ellipsisIcon',
        label: 'ellipsisIcon',
        title: '自定义省略图标 (仅在水平模式下可用)',
        setters: 'StringSetter'
      },
      {
        name: 'popperOffset',
        label: 'popperOffset',
        title: '弹出层的偏移量(对所有子菜单有效)',
        setters: 'NumberSetter',
        defaultValue: 6
      },
      {
        name: 'defaultActive',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'defaultOpeneds',
        defaultValue: [],
        setters: 'ArraySetter'
      },
      {
        name: 'uniqueOpened',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'menuTrigger',
        defaultValue: 'hover',
        setters: 'SelectSetter',
        options: ['hover', 'click']
      },
      {
        name: 'router',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'collapseTransition',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'popperEffect',
        label: 'popperEffect',
        title: 'Tooltip 主题，内置了 dark / light 两种主题',
        setters: 'SelectSetter',
        options: ['dark', 'light'],
        defaultValue: 'dark'
      },
      {
        name: 'closeOnClickOutside',
        label: 'closeOnClickOutside',
        title: '可选，单击外部时是否折叠菜单',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'popperClass',
        label: 'popperClass',
        title: '为 popper 添加类名',
        setters: 'StringSetter'
      },
      {
        name: 'showTimeout',
        label: 'showTimeout',
        title: '菜单出现前的延迟',
        setters: 'NumberSetter',
        defaultValue: 300
      },
      {
        name: 'hideTimeout',
        label: 'hideTimeout',
        title: '菜单消失前的延迟',
        setters: 'NumberSetter',
        defaultValue: 300
      },
      {
        name: 'backgroundColor',
        defaultValue: '#ffffff',
        setters: 'ColorSetter'
      },
      {
        name: 'textColor',
        defaultValue: '#303133',
        setters: 'ColorSetter'
      },
      {
        name: 'activeTextColor',
        defaultValue: '#409EFF',
        setters: 'ColorSetter'
      }
    ],
    events: [
      {
        name: 'select'
      },
      {
        name: 'open'
      },
      {
        name: 'close'
      }
    ],
    slots: ['default', 'ellipsis-icon'],
    snippet: {
      props: {
        mode: 'horizontal'
      },
      children: [
        {
          name: 'ElMenuItem',
          children: '菜单项一',
          props: {
            index: '1'
          }
        },
        {
          name: 'ElSubMenu',
          props: {
            index: '2'
          },
          children: [
            {
              name: 'component',
              slot: 'title',
              props: {
                is: 'div'
              },
              children: '子菜单'
            },
            {
              name: 'ElMenuItem',
              children: '子菜单项一',
              props: {
                index: '2-1'
              }
            },
            {
              name: 'ElMenuItem',
              children: '子菜单项二',
              props: {
                index: '2-2'
              }
            }
          ]
        },
        {
          name: 'ElMenuItem',
          children: '菜单项三',
          props: {
            index: '3'
          }
        }
      ]
    }
  },
  {
    name: 'ElSubMenu',
    label: '导航子菜单',

    categoryId: 'nav',
    package: 'element-plus',
    props: [
      {
        name: 'index',
        label: 'index *',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'popperClass',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'showTimeout',
        setters: 'NumberSetter'
      },
      {
        name: 'hideTimeout',
        setters: 'NumberSetter'
      },
      {
        name: 'disabled',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'teleported',
        defaultValue: undefined,
        setters: 'BooleanSetter'
      },
      {
        name: 'popperOffset',
        defaultValue: 6,
        setters: 'NumberSetter'
      },
      {
        name: 'expandCloseIcon',
        defaultValue: '',
        setters: ['InputSetter']
      },
      {
        name: 'expandOpenIcon',
        defaultValue: '',
        setters: ['InputSetter']
      },
      {
        name: 'collapseCloseIcon',
        defaultValue: '',
        setters: ['InputSetter']
      },
      {
        name: 'collapseOpenIcon',
        defaultValue: '',
        setters: ['InputSetter']
      }
    ],
    slots: [
      {
        name: 'default'
      },
      {
        name: 'title'
      }
    ],
    snippet: {
      children: [
        {
          name: 'component',
          slot: 'title',
          props: {
            is: 'div'
          },
          children: '子菜单'
        },
        {
          name: 'ElMenuItem',
          children: '子菜单项一'
        }
      ]
    }
  },
  {
    name: 'ElMenuItem',
    label: '导航菜单项',

    categoryId: 'nav',
    package: 'element-plus',
    props: [
      {
        name: 'index',
        defaultValue: null,
        setters: 'InputSetter'
      },
      {
        name: 'route',
        defaultValue: '',
        setters: ['StringSetter', 'JSONSetter']
      },
      {
        name: 'disabled',
        defaultValue: false,
        setters: 'BooleanSetter'
      }
    ],
    events: [
      {
        name: 'click'
      }
    ],
    slots: [
      {
        name: 'default'
      },
      {
        name: 'title'
      }
    ],
    snippet: {
      children: '菜单项'
    }
  },
  {
    name: 'ElMenuItemGroup',
    label: '导航菜单组',

    categoryId: 'nav',
    package: 'element-plus',
    props: [
      {
        name: 'title',
        defaultValue: '',
        setters: 'InputSetter'
      }
    ],
    slots: [
      {
        name: 'default'
      },
      {
        name: 'title'
      }
    ],
    snippet: {
      props: {
        title: '分组一'
      },
      children: [
        {
          name: 'ElMenuItem',
          children: '子菜单项一'
        },
        {
          name: 'ElMenuItem',
          children: '子菜单项一'
        }
      ]
    }
  }
];

export default Menu;
