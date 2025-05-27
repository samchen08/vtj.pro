import type { MaterialDescription } from '@vtj/core';

const components: MaterialDescription[] = [
  {
    name: 'AModal',
    alias: 'Modal',
    label: '对话框',
    categoryId: 'feedback',
    doc: 'https://www.antdv.com/components/modal-cn',
    props: [
      {
        name: 'afterClose',
        label: 'afterClose',
        title: 'Modal 完全关闭后的回调',
        setters: 'FunctionSetter'
      },
      {
        name: 'bodyStyle',
        label: 'bodyStyle',
        title: 'Modal body 样式',
        setters: 'ObjectSetter',
        defaultValue: {}
      },
      {
        name: 'cancelButtonProps',
        label: 'cancelButtonProps',
        title: 'cancel 按钮 props',
        setters: 'ArraySetter'
      },
      {
        name: 'cancelText',
        label: 'cancelText',
        title: '取消按钮文字',
        setters: 'StringSetter',
        defaultValue: '取消'
      },
      {
        name: 'centered',
        label: 'centered',
        title: '垂直居中展示 Modal',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'closable',
        label: 'closable',
        title: '是否显示右上角的关闭按钮',
        setters: 'BooleanSetter',
        defaultValue: true
      },
      {
        name: 'confirmLoading',
        label: 'confirmLoading',
        title: '确定按钮 loading',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'destroyOnClose',
        label: 'destroyOnClose',
        title: '关闭时销毁 Modal 里的子元素',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'footer',
        label: 'footer',
        title: '底部内容，当不需要默认底部按钮时，可以设为 :footer="null"',
        setters: 'StringSetter',
        defaultValue: '确定取消按钮'
      },
      {
        name: 'forceRender',
        label: 'forceRender',
        title: '强制渲染 Modal',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'getContainer',
        label: 'getContainer',
        title: '指定 Modal 挂载的 HTML 节点',
        setters: 'FunctionSetter'
      },
      {
        name: 'keyboard',
        label: 'keyboard',
        title: '是否支持键盘 esc 关闭',
        setters: 'BooleanSetter',
        defaultValue: true
      },
      {
        name: 'mask',
        label: 'mask',
        title: '是否展示遮罩',
        setters: 'BooleanSetter',
        defaultValue: true
      },
      {
        name: 'maskClosable',
        label: 'maskClosable',
        title: '点击蒙层是否允许关闭',
        setters: 'BooleanSetter',
        defaultValue: true
      },
      {
        name: 'maskStyle',
        label: 'maskStyle',
        title: '遮罩样式',
        setters: 'ObjectSetter',
        defaultValue: {}
      },
      {
        name: 'okButtonProps',
        label: 'okButtonProps',
        title: 'ok 按钮 props',
        setters: 'ArraySetter'
      },
      {
        name: 'okText',
        label: 'okText',
        title: '确认按钮文字',
        setters: 'StringSetter',
        defaultValue: '确认'
      },
      {
        name: 'okType',
        label: 'okType',
        title: '确认按钮类型',
        setters: 'StringSetter',
        defaultValue: 'primary'
      },
      {
        name: 'title',
        label: 'title',
        title: '标题',
        setters: 'StringSetter'
      },
      {
        name: 'open',
        label: 'open',
        title: '对话框是否可见',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'width',
        label: 'width',
        title: '宽度',
        setters: ['StringSetter', 'NumberSetter'],
        defaultValue: 520
      },
      {
        name: 'wrapClassName',
        label: 'wrapClassName',
        title: '对话框外层容器的类名',
        setters: 'StringSetter'
      },
      {
        name: 'zIndex',
        label: 'zIndex',
        title: '设置 Modal 的 z-index',
        setters: 'NumberSetter',
        defaultValue: 1000
      }
    ],
    events: ['cancel', 'ok', 'update:open'],
    slots: ['default', 'cancelText', 'closeIcon', 'footer', 'okText', 'title'],
    snippet: {
      props: {
        open: true,
        title: 'Basic Modal'
      },
      children: [
        { name: 'p', children: 'Some contents...' },
        { name: 'p', children: 'Some contents...' },
        { name: 'p', children: 'Some contents...' }
      ]
    }
  }
];
export default components;
