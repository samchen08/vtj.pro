import type { MaterialDescription } from '@vtj/core';

const components: MaterialDescription[] = [
  {
    name: 'ADropdown',
    alias: 'Dropdown',
    label: '下拉菜单',
    categoryId: 'nav',
    doc: 'https://www.antdv.com/components/button-cn',
    props: [
      {
        name: 'align',
        label: 'align',
        title: '该值将合并到 placement 的配置中',
        setters: 'ObjectSetter'
      },
      {
        name: 'arrow',
        label: 'arrow',
        title: '下拉框箭头是否显示',
        setters: ['BooleanSetter', 'ObjectSetter'],
        defaultValue: false
      },
      {
        name: 'destroyPopupOnHide',
        label: 'destroyPopupOnHide',
        title: '关闭后是否销毁 Dropdown',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'disabled',
        label: 'disabled',
        title: '菜单是否禁用',
        defaultValue: false
      },
      {
        name: 'getPopupContainer',
        label: 'getPopupContainer',
        title:
          '菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位',
        setters: 'FunctionSetter',
        defaultValue: {
          type: 'Function',
          value: '() => document.body'
        }
      },
      {
        name: 'overlayClassName',
        label: 'overlayClassName',
        title: '下拉根元素的类名称',
        setters: 'StringSetter'
      },
      {
        name: 'overlayStyle',
        label: 'overlayStyle',
        title: '下拉根元素的样式',
        setters: 'ObjectSetter'
      },
      {
        name: 'placement',
        label: 'placement',
        title: '菜单弹出位置',
        setters: 'SelectSetter',
        options: [
          'bottomLeft',
          'bottom',
          'bottomRight',
          'topLeft',
          'top',
          'topRight'
        ],
        defaultValue: 'bottomLeft	'
      },
      {
        name: 'trigger',
        label: 'trigger',
        title: '触发下拉的行为, 移动端不支持 hover',
        setters: 'ArraySetter', // ?? Array<click|hover|contextmenu>
        defaultValue: ['hover']
      },
      {
        name: 'open',
        label: 'open',
        title: '菜单是否显示',
        setters: 'BooleanSetter'
      }
    ],
    events: ['openChange', 'update:open'],
    slots: ['default', 'overlay'],
    snippet: {
      name: 'ADropdownButton',
      children: [
        {
          name: 'AButton',
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
          name: 'AMenu',
          slot: 'overlay',
          children: [
            {
              name: 'AMenuItem',
              children: 'Action 1'
            },
            {
              name: 'AMenuItem',
              children: 'Action 2'
            },
            {
              name: 'AMenuItem',
              children: 'Action 3'
            }
          ]
        }
      ]
    }
  },
  {
    name: 'ADropdownButton',
    alias: 'Button',
    parent: 'Dropdown',
    label: '下拉菜单按钮',
    categoryId: 'nav',
    doc: 'https://www.antdv.com/components/button-cn',
    props: [
      {
        name: 'disabled',
        label: 'disabled',
        title: '菜单是否禁用',
        setters: 'BooleanSetter'
      },
      {
        name: 'loading',
        label: 'loading',
        title: '设置按钮载入状态',
        setters: ['BooleanSetter', 'ObjectSetter'],
        defaultValue: false
      },
      {
        name: 'placement',
        label: 'placement',
        title: '菜单弹出位置',
        setters: 'SelectSetter',
        options: [
          'bottomLeft',
          'bottom',
          'bottomRight',
          'topLeft',
          'top',
          'topRight'
        ],
        defaultValue: 'bottomLeft'
      },
      {
        name: 'size',
        label: 'size',
        title: '按钮大小，和 Button 一致',
        setters: 'StringSetter',
        defaultValue: 'default'
      },
      {
        name: 'trigger',
        label: 'trigger',
        title: '触发下拉的行为',
        setters: 'ArraySetter',
        defaultValue: ['hover']
      },
      {
        name: 'type',
        label: 'type',
        title: '按钮类型，和 Button 一致',
        setters: 'StringSetter',
        defaultValue: 'default'
      },
      {
        name: 'open',
        label: 'open',
        title: '菜单是否显示',
        setters: ['BooleanSetter']
      }
    ],
    events: ['click', 'openChange', 'update:open'],
    slots: ['default', 'icon', 'overlay'],
    snippet: {
      name: 'button',
      children: [
        { name: 'a', children: 'Dropdown' },
        {
          name: 'AMenu',
          slot: 'overlay',
          props: {
            mode: 'vertical'
          },
          children: [
            { name: 'AMenuItem', children: '1st menu item' },
            { name: 'AMenuItem', children: '2nd menu item' },
            { name: 'AMenuItem', children: '3rd menu item' }
          ]
        }
      ]
    }
  }
];
export default components;
