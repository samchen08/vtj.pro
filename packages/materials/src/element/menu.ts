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
        title: '菜单展示模式',
        defaultValue: 'vertical',
        setters: 'SelectSetter',
        options: ['horizontal', 'vertical']
      },
      {
        name: 'collapse',
        title: '是否水平折叠收起菜单（仅在 mode 为 vertical 时可用）',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'ellipsis',
        title: '是否省略多余的子项（仅在横向模式生效）',
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
        title: '页面加载时默认激活菜单的 index',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'defaultOpeneds',
        title: '默认打开的 sub-menu 的 index 的数组',
        defaultValue: [],
        setters: 'ArraySetter'
      },
      {
        name: 'uniqueOpened',
        title: '是否只保持一个子菜单的展开',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'menuTrigger',
        title: '子菜单打开的触发方式，只在 mode 为 horizontal 时有效',
        defaultValue: 'hover',
        setters: 'SelectSetter',
        options: ['hover', 'click']
      },
      {
        name: 'router',
        title: '是否启用 vue-router 模式。 启用该模式会在激活导航时以 index 作为 path 进行路由跳转 使用 default-active 来设置加载时的激活项',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'collapseTransition',
        title: '是否开启折叠动画',
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
        name: 'popperStyle',
        title: '用于所有弹出菜单和标题提示的自定义样式',
        setters: ['StringSetter', 'ObjectSetter'],
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
      },
      {
        name: 'persistent',
        title: '当菜单处于非活动状态且 persistent 为 false 时，下拉菜单将被销毁',
        setters: 'BooleanSetter',
        defaultValue: true
      },
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
        title: '唯一标志',
        label: 'index *',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'popperClass',
        title: '为 popper 添加类名',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'popperStyle',
        title: '为 popper 添加自定义样式',
        defaultValue: '',
        setters: ['InputSetter', 'ObjectSetter'],
      },
      {
        name: 'showTimeout',
        title: '子菜单出现之前的延迟，(继承 menu 的 show-timeout 配置)',
        setters: 'NumberSetter'
      },
      {
        name: 'hideTimeout',
        title: '子菜单消失之前的延迟，(继承 menu 的 hide-timeout 配置)',
        setters: 'NumberSetter'
      },
      {
        name: 'disabled',
        title: '是否禁用',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'teleported',
        title: '是否将弹出菜单挂载到 body 上，第一级SubMenu默认值为 true，其他SubMenus 的值为 false',
        defaultValue: undefined,
        setters: 'BooleanSetter'
      },
      {
        name: 'popperOffset',
        title: '弹出窗口的偏移量 (覆盖 popper的菜单)',
        defaultValue: 6,
        setters: 'NumberSetter'
      },
      {
        name: 'expandCloseIcon',
        title: '父菜单展开且子菜单关闭时的图标， expand-close-icon 和 expand-open-icon 需要一起配置才能生效',
        defaultValue: '',
        setters: ['InputSetter']
      },
      {
        name: 'expandOpenIcon',
        title: '父菜单展开且子菜单打开时的图标， expand-open-icon 和 expand-close-icon 需要一起配置才能生效',
        defaultValue: '',
        setters: ['InputSetter']
      },
      {
        name: 'collapseCloseIcon',
        title: '父菜单收起且子菜单关闭时的图标， collapse-close-icon 和 collapse-open-icon 需要一起配置才能生效',
        defaultValue: '',
        setters: ['InputSetter']
      },
      {
        name: 'collapseOpenIcon',
        title: '父菜单收起且子菜单打开时的图标， collapse-open-icon 和 collapse-close-icon 需要一起配置才能生效',
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
        title: '唯一标志',
        defaultValue: null,
        setters: 'InputSetter'
      },
      {
        name: 'route',
        title: 'Vue Route 路由位置参数',
        defaultValue: '',
        setters: ['StringSetter', 'JSONSetter']
      },
      {
        name: 'disabled',
        title: '是否禁用',
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
        title: '组标题',
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
