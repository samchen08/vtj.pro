import type { MaterialDescription } from '@vtj/core';

const Sidebar: MaterialDescription[] = [
  {
    name: 'VanSidebar',
    alias: 'Sidebar',
    label: '侧边导航',
    categoryId: 'nav',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/sidebar',
    props: [
      {
        name: 'modelValue',
        title: '当前导航项的索引',
        defaultValue: 0,
        setters: ['NumberSetter', 'StringSetter']
      }
    ],
    events: ['update:modelValue', 'change'],
    snippet: {
      props: {
        modelValue: 0
      },
      children: [
        { name: 'VanSidebarItem', props: { title: '标签名称' } },
        { name: 'VanSidebarItem', props: { title: '标签名称' } },
        { name: 'VanSidebarItem', props: { title: '标签名称' } }
      ]
    }
  },
  {
    name: 'VanSidebarItem',
    alias: 'SidebarItem',
    label: '侧边导航项',
    categoryId: 'nav',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/sidebar',
    props: [
      {
        name: 'title',
        title: '内容',
        defaultValue: '""',
        setters: 'StringSetter'
      },
      {
        name: 'dot',
        title: '是否显示右上角小红点',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'badge',
        title: '图标右上角徽标的内容',
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'badge-props',
        title: '自定义徽标的属性，传入的对象会被透传给 Badge 组件的 props',
        setters: 'ObjectSetter'
      },
      {
        name: 'disabled',
        title: '是否禁用该项',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'url',
        title: '点击后跳转的链接地址',
        setters: 'StringSetter'
      },
      {
        name: 'to',
        title: '点击后跳转的目标路由对象，等同于 Vue Router 的 to 属性',
        setters: ['StringSetter', 'ObjectSetter']
      },
      {
        name: 'replace',
        title: '是否在跳转时替换当前页面历史',
        defaultValue: false,
        setters: 'BooleanSetter'
      }
    ],
    events: ['click'],
    slots: ['title'],
    snippet: {
      props: {
        title: '标签名称'
      }
    }
  }
];

export default Sidebar;
