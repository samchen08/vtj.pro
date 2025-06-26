import type { MaterialDescription } from '@vtj/core';
const components: MaterialDescription[] = [
  {
    name: 'ADrawer',
    alias: 'Drawer',
    label: '抽屉',
    categoryId: 'feedback',
    doc: 'https://www.antdv.com/components/drawer-cn',
    props: [
      {
        name: 'autofocus',
        label: 'autofocus',
        title: '抽屉展开后是否将焦点切换至其 Dom 节点',
        setters: 'BooleanSetter',
        defaultValue: true
      },
      {
        name: 'bodyStyle',
        label: 'bodyStyle',
        title: '可用于设置 Drawer 内容部分的样式',
        setters: 'ObjectSetter' //?? CSSProperties
      },
      {
        name: 'class',
        label: 'class',
        title:
          'Drawer 容器外层 className 设置，如果需要设置最外层，请使用 rootClassName',
        setters: 'StringSetter'
      },
      {
        name: 'closable',
        label: 'closable',
        title: '是否显示左上角的关闭按钮',
        setters: 'BooleanSetter',
        defaultValue: true
      },
      {
        name: 'contentWrapperStyle',
        label: 'contentWrapperStyle',
        title: '可用于设置 Drawer 包裹内容部分的样式',
        setters: 'ObjectSetter' //?? 	CSSProperties
      },
      {
        name: 'destroyOnClose',
        label: 'destroyOnClose',
        title: '关闭时销毁 Drawer 里的子元素',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'footerStyle',
        label: 'footerStyle',
        title: '抽屉页脚部件的样式',
        setters: 'ObjectSetter'
      },
      {
        name: 'forceRender',
        label: 'forceRender',
        title: '预渲染 Drawer 内元素',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'getContainer',
        label: 'getContainer',
        title:
          '指定 Drawer 挂载的节点，并在容器内展现 | () => HTMLElement | Selectors',
        setters: 'StringSetter', //?? 'body'
        defaultValue: 'body'
      },
      {
        name: 'headerStyle',
        label: 'headerStyle',
        title: '用于设置 Drawer 头部的样式',
        setters: 'ObjectSetter'
      },
      {
        name: 'height',
        label: 'height',
        title: '高度, 在 placement 为 top 或 bottom 时使用',
        setters: ['StringSetter', 'NumberSetter'],
        defaultValue: 378
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
        setters: 'ObjectSetter', //?? CSSProperties
        defaultValue: {}
      },
      {
        name: 'placement',
        label: 'placement',
        title: '抽屉的方向',
        setters: 'SelectSetter',
        options: ['top', 'right', 'bottom', 'left'],
        defaultValue: 'right'
      },
      {
        name: 'push',
        label: 'push',
        title: '用于设置多层 Drawer 的推动行为',
        setters: ['BooleanSetter', 'ObjectSetter'], //?? 	boolean | {distance: string | number}
        defaultValue: { distance: 180 }
      },
      {
        name: 'rootClassName',
        label: 'rootClassName',
        title: '对话框外层容器的类名',
        setters: 'StringSetter'
      },
      {
        name: 'rootStyle',
        label: 'rootStyle',
        title:
          '可用于设置 Drawer 最外层容器的样式，和 style 的区别是作用节点包括 mask',
        setters: 'ObjectSetter' //?? CSSProperties
      },
      {
        name: 'size',
        label: 'size',
        title: '预设抽屉宽度（或高度），default 378px 和 large 736px',
        setters: 'SelectSetter',
        options: ['default', 'large'],
        defaultValue: 'default'
      },
      {
        name: 'style',
        label: 'style',
        title: '设计 Drawer 容器样式，如果你只需要设置内容部分请使用 bodyStyle',
        setters: 'ObjectSetter' //?? CSSProperties
      },
      {
        name: 'title',
        label: 'title',
        title: '标题',
        setters: 'StringSetter' //?? string | slot
      },
      {
        name: 'open',
        label: 'open',
        title: 'Drawer 是否可见',
        setters: 'BooleanSetter'
      },
      {
        name: 'width',
        label: 'width',
        title: '宽度',
        setters: ['StringSetter', 'NumberSetter'],
        defaultValue: 378
      },
      {
        name: 'zIndex',
        label: 'zIndex',
        title: '设置 Drawer 的 z-index',
        setters: 'NumberSetter',
        defaultValue: 1000
      }
    ],
    events: ['afterOpenChange', 'close', 'update:open'],
    slots: ['default', 'closeIcon', 'extra', 'footer', 'title'],
    snippet: {
      props: {
        open: true,
        style: {
          color: 'red'
        },
        title: 'Basic Drawer',
        placement: 'right'
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
