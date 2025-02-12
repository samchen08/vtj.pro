import type { MaterialDescription } from '@vtj/core';

const ActionBar: MaterialDescription[] = [
  {
    name: 'VanActionBar',
    alias: 'ActionBar',
    label: '动作栏',
    categoryId: 'nav',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/action-bar',
    props: [
      {
        name: 'safe-area-inset-bottom',
        title: '是否开启底部安全区适配',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'placeholder',
        title: '是否在标签位置生成一个等高的占位元素',
        defaultValue: false,
        setters: 'BooleanSetter'
      }
    ],
    snippet: {
      children: [
        {
          name: 'VanActionBarIcon',
          props: {
            icon: 'chat-o',
            text: '客服'
          }
        },
        {
          name: 'VanActionBarIcon',
          props: {
            icon: 'cart-o',
            text: '购物车'
          }
        },
        {
          name: 'VanActionBarIcon',
          props: {
            icon: 'shop-o',
            text: '店铺'
          }
        },
        {
          name: 'VanActionBarButton',
          props: {
            type: 'danger',
            text: '立即购买'
          }
        }
      ]
    }
  },
  {
    name: 'VanActionBarIcon',
    alias: 'ActionBarIcon',
    label: '动作栏图标',
    categoryId: 'nav',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/action-bar',
    props: [
      {
        name: 'text',
        title: '按钮文字',
        setters: 'StringSetter'
      },
      {
        name: 'icon',
        title: '图标',
        setters: ['VanIconSetter', 'StringSetter']
      },
      {
        name: 'color',
        title: '图标颜色',
        defaultValue: '#323233',
        setters: 'StringSetter'
      },
      {
        name: 'icon-class',
        title: '图标额外类名',
        setters: ['StringSetter', 'ArraySetter', 'ObjectSetter']
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
    slots: ['default', 'icon'],
    snippet: {
      props: {
        icon: 'chat-o',
        text: '客服'
      }
    }
  },
  {
    name: 'VanActionBarButton',
    alias: 'ActionBarButton',
    label: '动作栏按钮',
    categoryId: 'nav',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/action-bar',
    props: [
      {
        name: 'text',
        title: '按钮文字',
        setters: 'StringSetter'
      },
      {
        name: 'type',
        title: '按钮类型',
        defaultValue: 'default',
        setters: 'SelectSetter',
        options: ['default', 'primary', 'success', 'warning', 'danger']
      },
      {
        name: 'color',
        title: '按钮颜色，支持传入 linear-gradient 渐变色',
        setters: 'StringSetter'
      },
      {
        name: 'icon',
        title: '左侧图标名称或图片链接，等同于 Icon 组件的 name 属性',
        setters: ['VanIconSetter', 'StringSetter']
      },
      {
        name: 'disabled',
        title: '是否禁用按钮',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'loading',
        title: '是否显示为加载状态',
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
    snippet: {
      props: {
        type: 'danger',
        text: '立即购买'
      }
    }
  }
];

export default ActionBar;
