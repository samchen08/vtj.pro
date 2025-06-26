import type { MaterialDescription } from '@vtj/core';

const components: MaterialDescription[] = [
  {
    name: 'AMenu',
    alias: 'Menu',
    label: '导航菜单',
    categoryId: 'nav',
    doc: 'https://www.antdv.com/components/menu-cn',
    props: [
      {
        name: 'forceSubMenuRender',
        label: 'forceSubMenuRender',
        title: '在子菜单展示之前就渲染进 DOM',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'inlineCollapsed',
        label: 'inlineCollapsed',
        title: 'inline 时菜单是否收起状态',
        setters: 'BooleanSetter'
      },
      {
        name: 'inlineIndent',
        label: 'inlineIndent',
        title: 'inline 模式的菜单缩进宽度',
        setters: 'NumberSetter',
        defaultValue: 24
      },
      {
        name: 'items',
        label: 'items',
        title: '菜单内容',
        setters: 'ArraySetter'
      },
      {
        name: 'mode',
        label: 'mode',
        title: '菜单类型，现在支持垂直、水平、和内嵌模式三种',
        setters: 'SelectSetter',
        options: ['vertical', 'horizontal', 'inline'],
        defaultValue: 'vertical'
      },
      {
        name: 'multiple',
        label: 'multiple',
        title: '是否允许多选',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'openKeys',
        label: 'openKeys',
        title: '当前展开的 SubMenu 菜单项 key 数组',
        setters: 'ArraySetter'
      },
      {
        name: 'overflowedIndicator',
        label: 'overflowedIndicator',
        title: '用于自定义 Menu 水平空间不足时的省略收缩的图标',
        setters: 'IconSetter'
      },
      {
        name: 'selectable',
        label: 'selectable',
        title: '是否允许选中',
        setters: 'BooleanSetter',
        defaultValue: true
      },
      {
        name: 'selectedKeys',
        label: 'selectedKeys',
        title: '当前选中的菜单项 key 数组',
        setters: 'ArraySetter'
      },
      {
        name: 'subMenuCloseDelay',
        label: 'subMenuCloseDelay',
        title: '用户鼠标离开子菜单后关闭延时，单位：秒',
        setters: 'NumberSetter',
        defaultValue: 0.1
      },
      {
        name: 'subMenuOpenDelay',
        label: 'subMenuOpenDelay',
        title: '用户鼠标进入子菜单后开启延时，单位：秒',
        setters: 'NumberSetter',
        defaultValue: 0
      },
      {
        name: 'theme',
        label: 'theme',
        title: '主题颜色',
        setters: 'SelectSetter',
        options: ['light', 'dark'],
        defaultValue: 'light'
      },
      {
        name: 'triggerSubMenuAction',
        label: 'triggerSubMenuAction',
        title: '修改 Menu 子菜单的触发方式',
        setters: 'SelectSetter',
        options: ['click', 'hover'],
        defaultValue: 'hover'
      }
    ],
    events: [
      'click',
      'deselect',
      'openChange',
      'select',
      'update:openKeys',
      'update:selectedKeys'
    ],
    slots: ['default', 'overflowedIndicator'],
    snippet: {
      props: {
        selectedKeys: ['mail'],
        mode: 'horizontal',
        items: [
          {
            key: 'mail',
            label: 'Navigation One',
            title: 'Navigation One'
          },
          {
            key: 'app',
            label: 'Navigation Two',
            title: 'Navigation Two'
          },
          {
            key: 'sub1',
            label: 'Navigation Three - Submenu',
            title: 'Navigation Three - Submenu',
            children: [
              {
                type: 'group',
                label: 'Item 1',
                children: [
                  {
                    label: 'Option 1',
                    key: 'setting:1'
                  },
                  {
                    label: 'Option 2',
                    key: 'setting:2'
                  }
                ]
              },
              {
                type: 'group',
                label: 'Item 2',
                children: [
                  {
                    label: 'Option 3',
                    key: 'setting:3'
                  },
                  {
                    label: 'Option 4',
                    key: 'setting:4'
                  }
                ]
              }
            ]
          },
          {
            key: 'alipay',
            label: 'Navigation Four - Link',
            title: 'Navigation Four - Link'
          }
        ]
      }
    }
  },
  {
    name: 'AMenuItem',
    alias: 'Item',
    parent: 'Menu',
    label: '导航菜单项',
    categoryId: 'nav',
    doc: 'https://www.antdv.com/components/menu-cn',
    props: [
      {
        name: 'disabled',
        label: 'disabled',
        title: '是否禁用',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'key',
        label: 'key',
        title: 'item 的唯一标志',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'title',
        label: 'title',
        title: '设置收缩时展示的悬浮标题',
        setters: 'StringSetter'
      }
    ],
    slots: ['default', 'icon', 'title'],
    snippet: {
      children: '菜单项',
      props: {
        key: 'key',
        title: 'Navigation One'
      }
    }
  },
  {
    name: 'AMenuSubMenu',
    alias: 'SubMenu',
    childIncludes: ['AMenuItem', 'AMenuSubMenu'],
    parent: 'Menu',
    label: '导航子菜单',
    categoryId: 'nav',
    doc: 'https://www.antdv.com/components/menu-cn',
    props: [
      {
        name: 'disabled',
        label: 'disabled',
        title: '是否禁用',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'key',
        label: 'key',
        title: '唯一标志, 必填',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'popupClassName',
        label: 'popupClassName',
        title: '子菜单样式',
        setters: 'StringSetter'
      },
      {
        name: 'popupOffset',
        label: 'popupOffset',
        title: '子菜单偏移量，mode="inline" 时无效',
        setters: 'ArraySetter'
      },
      {
        name: 'title',
        label: 'title',
        title: '子菜单项值',
        setters: 'StringSetter'
      }
    ],
    events: ['titleClick'],
    slots: ['default', 'expandIcon', 'icon', 'title'],
    snippet: {
      //Menu.SubMenu 的子元素必须是 MenuItem 或者 SubMenu.
      //SubMenu 必须传递 key，如不传递，该 SubMenu 下子元素将提前渲染，而且部分场景无法进行有效高亮。
      children: [
        {
          name: 'AMenuItem',
          children: '菜单项',
          props: {
            key: 'key',
            title: 'Navigation One -- AMenuItem'
          }
        }
      ]
    }
  },
  {
    name: 'AMenuItemGroup',
    alias: 'ItemGroup',
    childIncludes: ['AMenuItem'],
    parent: 'Menu',
    label: '导航菜单项组',
    categoryId: 'nav',
    doc: 'https://www.antdv.com/components/menu-cn',
    props: [
      {
        name: 'title',
        label: 'title',
        title: '分组标题',
        setters: 'StringSetter'
      }
    ],
    slots: ['default', 'title'],
    snippet: {
      //? children 只能为 AMenuItem
      children: [
        {
          name: 'AMenuItem',
          children: '菜单项',
          props: {
            key: 'key',
            title: 'Navigation One -- AMenuItem'
          }
        }
      ]
    }
  },
  {
    name: 'AMenuDivider',
    alias: 'Divider',
    parent: 'Menu',
    label: '菜单项分割线',
    categoryId: 'nav',
    doc: 'https://www.antdv.com/components/menu-cn',
    props: [
      {
        name: 'dashed',
        label: 'dashed',
        title: '是否虚线',
        setters: 'BooleanSetter',
        defaultValue: false
      }
    ]
  }
];
export default components;
