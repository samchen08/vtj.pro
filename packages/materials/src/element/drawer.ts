import type { MaterialDescription } from '@vtj/core';
const components: MaterialDescription = {
  name: 'ElDrawer',
  label: '抽屉',

  categoryId: 'other',
  doc: 'https://element-plus.org/zh-CN/component/drawer.html',
  package: 'element-plus',
  props: [
    {
      name: 'modelValue',
      title: '是否显示 Drawer',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'appendToBody',
      title: 'Drawer 自身是否插入至 body 元素上。嵌套的 Drawer 必须指定该属性并赋值为 true',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'appendTo',
      title: '挂载到哪个 DOM 元素 将覆盖 append-to-body',
      defaultValue: 'body',
      setters: 'StringSetter'
    },
    {
      name: 'lockScroll',
      title: '是否在 Drawer 出现时将 body 滚动锁定',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'beforeClose',
      title: '关闭前的回调，会暂停 Drawer 的关闭',
      defaultValue: '',
      setters: 'FunctionSetter'
    },
    {
      name: 'closeOnClickModal',
      title: '是否可以通过点击 modal 关闭 Drawer',
      label: '点击蒙层关闭',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'closOonPressEscape',
      label: 'ESC键关闭',
      title: '是否可以通过按下 ESC 关闭 Drawer',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'openDelay',
      title: 'Drawer 打开的延时时间，单位毫秒',
      defaultValue: 0,
      setters: 'NumberSetter'
    },
    {
      name: 'closeDelay',
      title: 'Drawer 关闭的延时时间，单位毫秒',
      defaultValue: 0,
      setters: 'NumberSetter'
    },
    {
      name: 'destroyOnClose',
      title: '控制是否在关闭 Drawer 之后将子元素全部销毁',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'modal',
      title: '是否需要遮罩层',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'modalPenetrable',
      title: '是否允许穿透遮罩层。 modal 属性必须为 false',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'direction',
      title: 'Drawer 打开的方向',
      defaultValue: 'rtl',
      setters: 'SelectSetter',
      options: ['rtl', 'ltr', 'ttb', 'btt']
    },
    {
      name: 'resizable',
      title: '为抽屉启用可调整大小的功能',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'showClose',
      title: '是否显示关闭按钮',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'size',
      defaultValue: '30%',
      title:
        'Drawer 窗体的大小, 当使用 number 类型时, 以像素为单位, 当使用 string 类型时, 请传入 x%, 否则便会以 number 类型解释',
      setters: ['InputSetter', 'NumberSetter']
    },
    {
      name: 'title',
      title: 'Drawer 的标题',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'withHeader',
      title: '控制是否显示 header 栏, 默认为 true, 当此项为 false 时, title attribute 和 title slot 均不生效',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'modalClass',
      title: '遮罩层的自定义类名',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'headerClass',
      title: 'header 部分的自定义 class 名',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'bodyClass',
      title: 'body 部分的自定义 class 名',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'footerClass',
      title: 'footer 部分的自定义 class 名',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'zIndex',
      title: '设置 z-index',
      defaultValue: 0,
      setters: 'NumberSetter'
    },
    {
      name: 'headerAriaLevel',
      label: 'headerAriaLevel',
      title: 'header 的 aria-level 属性',
      setters: 'StringSetter',
      defaultValue: 2
    },
    // {
    //   name: 'customClass',
    //   defaultValue: '',
    //   setters: 'InputSetter'
    // }
  ],
  events: [
    {
      name: 'open'
    },
    {
      name: 'opened'
    },
    {
      name: 'close'
    },
    {
      name: 'closed'
    },
    {
      name: 'open-auto-focus'
    },
    {
      name: 'close-auto-focus'
    },
    {
      name: 'resize-start'
    },
    {
      name: 'resize'
    },
    {
      name: 'resize-end'
    },
    {
      name: 'update:modelValue'
    }
  ],
  slots: [
    {
      name: 'default'
    },
    {
      name: 'header'
    },
    {
      name: 'footer'
    },
    {
      name: 'title'
    }
  ],
  snippet: {
    name: 'ElDrawer',
    children: '抽屉内容',
    props: {
      title: '标题',
      modelValue: true
    }
  }
};

export default components;
