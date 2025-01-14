import type { MaterialDescription } from '@vtj/core';

const Tabbar: MaterialDescription[] = [
  {
    name: 'VanTabbar',
    alias: 'Tabbar',
    label: '标签栏',
    categoryId: 'nav',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/tabbar',
    props: [
      {
        name: 'modelValue',
        title: '当前选中标签的名称或索引值',
        defaultValue: 0,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'fixed',
        title: '是否固定在底部',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'border',
        title: '是否显示外边框',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'z-index',
        title: '元素 z-index',
        defaultValue: 1,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'active-color',
        title: '选中标签的颜色',
        defaultValue: '#1989fa',
        setters: 'StringSetter'
      },
      {
        name: 'inactive-color',
        title: '未选中标签的颜色',
        defaultValue: '#7d7e80',
        setters: 'StringSetter'
      },
      {
        name: 'route',
        title: '是否开启路由模式',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'placeholder',
        title: '固定在底部时，是否在标签位置生成一个等高的占位元素',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'safe-area-inset-bottom',
        title: '是否开启底部安全区适配，设置 fixed 时默认开启',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'before-change',
        title: '切换标签前的回调函数，返回 false 可阻止切换，支持返回 Promise',
        setters: 'FunctionSetter'
      }
    ],
    events: ['change'],
    snippet: {
      props: {
        modelValue: 0
      },
      children: [
        {
          name: 'VanTabbarItem',
          props: {
            icon: 'home-o'
          },
          children: 'home'
        },
        {
          name: 'VanTabbarItem',
          props: {
            icon: 'search'
          },
          children: 'search'
        },
        {
          name: 'VanTabbarItem',
          props: {
            icon: 'friends-o'
          },
          children: 'friends'
        },
        {
          name: 'VanTabbarItem',
          props: {
            icon: 'setting-o'
          },
          children: 'setting'
        }
      ]
    }
  },
  {
    name: 'VanTabbarItem',
    alias: 'TabbarItem',
    label: '标签栏项',
    categoryId: 'nav',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/tabbar',
    props: [
      {
        name: 'name',
        title: '标签名称，作为匹配的标识符',
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'icon',
        title: '图标名称或图片链接，等同于 Icon 组件的 name 属性',
        setters: 'StringSetter'
      },
      {
        name: 'icon-prefix',
        title: '图标类名前缀，等同于 Icon 组件的 class-prefix 属性',
        defaultValue: 'van-icon',
        setters: 'StringSetter'
      },
      {
        name: 'dot',
        title: '是否显示图标右上角小红点',
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
    slots: ['icon'],
    snippet: {
      props: {
        icon: 'home-o'
      },
      children: 'home'
    }
  }
];

export default Tabbar;
