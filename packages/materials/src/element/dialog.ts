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
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'title',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'width',
      defaultValue: '50%',
      setters: 'InputSetter'
    },
    {
      name: 'fullscreen',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'top',
      defaultValue: '15vh',
      setters: 'InputSetter'
    },
    {
      name: 'modal',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'modalClass',
      label: 'modalClass',
      title: '遮罩的自定义类名',
      setters: 'StringSetter'
    },
    {
      name: 'appendToBody',
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
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'customClass',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'openDelay',
      defaultValue: 0,
      setters: 'NumberSetter'
    },
    {
      name: 'closeDelay',
      defaultValue: 0,
      setters: 'NumberSetter'
    },
    {
      name: 'closeOnClickModal',
      label: '点击关闭',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'closOonPressEscape',
      label: 'ESC键关闭',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'showClose',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'beforeClose',
      defaultValue: '',
      setters: 'FunctionSetter'
    },
    {
      name: 'draggable',
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
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'alignCenter',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'destroyOnClose',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'closeIcon',
      label: 'closeIcon',
      title: '自定义关闭图标',
      setters: ['StringSetter', 'IconSetter'] //!  string / Component
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
    }
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
      name: 'title'
    },
    {
      name: 'footer'
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
