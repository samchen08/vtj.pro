import type { MaterialDescription } from '@vtj/core';

const desc: MaterialDescription = {
  name: 'RichText',
  label: '文本',
  categoryId: 'basic',
  props: [
    {
      name: 'nodes',
      title: '节点列表 / HTML String',
      defaultValue: [],
      setters: 'ArraySetter'
    },
    {
      name: 'space',
      title: '显示连续空格',
      setters: 'StringSetter'
    },
    {
      name: 'selectable',
      title: '富文本是否可以长按选中，可用于复制，粘贴等场景',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'image-menu-prevent',
      title: '阻止长按图片时弹起默认菜单',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'preview',
      title: '富文本中的图片是否可点击预览',
      setters: 'BooleanSetter'
    }
  ],
  events: [
    'click',
    'touchstart',
    'touchmove',
    'touchcancel',
    'touchend',
    'longpress',
    'itemclick'
  ],
  snippet: {
    props: {
      nodes: [
        {
          name: 'div',
          attrs: {
            class: 'div-class',
            style: 'line-height: 60px; color: red; text-align:center;'
          },
          children: [
            {
              type: 'text',
              text: 'Hello&nbsp;uni-app!'
            }
          ]
        }
      ]
    }
  }
};

export default desc;
