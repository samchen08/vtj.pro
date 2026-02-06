import type { MaterialDescription } from '@vtj/core';
const components: MaterialDescription = {
  name: 'ElDialog',
  label: '对话框',

  categoryId: 'other',
  doc: 'https://element-plus.org/zh-CN/component/dialog.html',
  package: 'element-plus',
  props: [
    {
      name: 'modelValue',
      title: '是否显示 Dialog',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'title',
      title: 'Dialog 对话框 Dialog 的标题',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'width',
      title: '对话框的宽度',
      defaultValue: '',
      setters: ['InputSetter', 'NumberSetter']
    },
    {
      name: 'fullscreen',
      title: '是否为全屏 Dialog',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'top',
      title: 'dialog CSS 中的 margin-top 值',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'modal',
      title: '是否需要遮罩层',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'modalPenetrable',
      title: '是否允许穿透遮罩层',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'modalClass',
      label: 'modalClass',
      title: '遮罩的自定义类名',
      setters: 'StringSetter'
    },
    {
      name: 'headerClass',
      label: 'headerClass',
      title: 'header 部分的自定义 class 名',
      setters: 'StringSetter'
    },
    {
      name: 'bodyClass',
      label: 'bodyClass',
      title: 'body 部分的自定义 class 名',
      setters: 'StringSetter'
    },
    {
      name: 'footerClass',
      label: 'footerClass',
      title: 'footer 部分的自定义 class 名',
      setters: 'StringSetter'
    },
    {
      name: 'appendToBody',
      title: 'Dialog 自身是否插入至 body 元素上',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'appendTo',
      label: 'appendTo',
      title: 'Dialog 挂载到哪个 DOM 元素 将覆盖 append-to-body',
      setters: 'StringSetter',
      defaultValue: 'body'
    },
    {
      name: 'lockScroll',
      title: '是否在 Dialog 出现时将 body 滚动锁定',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'openDelay',
      title: 'dialog 打开的延时时间，单位毫秒',
      defaultValue: 0,
      setters: 'NumberSetter'
    },
    {
      name: 'closeDelay',
      title: 'dialog 关闭的延时时间，单位毫秒',
      defaultValue: 0,
      setters: 'NumberSetter'
    },
    {
      name: 'closeOnClickModal',
      title: '是否可以通过点击 modal 关闭 Dialog',
      label: '点击关闭',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'closeOnPressEscape',
      label: 'ESC键关闭',
      title: '是否可以通过按下 ESC 关闭 Dialog',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'showClose',
      title: '是否显示关闭按钮',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'beforeClose',
      title: '关闭前的回调，会暂停 Dialog 的关闭. 回调函数内执行 done 参数方法的时候才是真正关闭对话框的时候',
      defaultValue: '',
      setters: 'FunctionSetter'
    },
    {
      name: 'draggable',
      title: '为 Dialog 启用可拖拽功能',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'overflow',
      label: 'overflow',
      title: '拖动范围可以超出可视区',
      setters: 'BooleanSetter',
      defaultValue: false
    },
    {
      name: 'center',
      title: '是否让 Dialog 的 header 和 footer 部分居中排列',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'alignCenter',
      title: '是否水平垂直对齐对话框',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'destroyOnClose',
      title: '当关闭 Dialog 时，销毁其中的元素',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'closeIcon',
      label: 'closeIcon',
      title: '自定义关闭图标',
      setters: ['StringSetter', 'IconSetter']
    },
    {
      name: 'z-index',
      label: 'z-index',
      title: '和原生的 CSS 的 z-index 相同，改变 z 轴的顺序',
      setters: 'NumberSetter'
    },
    {
      name: 'headerAriaLevel',
      label: 'headerAriaLevel',
      title: 'header 的 aria-level 属性',
      setters: 'StringSetter',
      defaultValue: 2
    },
    {
      name: 'transition',
      title: '对话框动画的自定义过渡配置',
      setters: ['StringSetter', 'ObjectSetter']
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
    name: 'ElDialog',
    children: '对话框弹窗内容',
    props: {
      title: '标题',
      modelValue: true
    }
  }
};

export default components;
