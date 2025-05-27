import type { MaterialDescription } from '@vtj/core';

const components: MaterialDescription[] = [
  {
    name: 'AAvatar',
    alias: 'Avatar',
    label: '头像',
    categoryId: 'data',
    doc: 'https://www.antdv.com/components/avatar-cn',
    props: [
      {
        name: 'alt',
        label: 'alt',
        title: '图像无法显示时的替代文本',
        setters: 'StringSetter'
      },
      {
        name: 'crossOrigin',
        label: 'crossOrigin',
        title: 'cors 属性设置',
        setters: 'SelectSetter',
        options: ['anonymous', 'use-credentials', '']
      },
      {
        name: 'draggable',
        label: 'draggable',
        title: '图片是否允许拖动',
        setters: ['BooleanSetter', 'SelectSetter'],
        options: ['true', 'false']
      },
      {
        name: 'gap',
        label: 'gap',
        title: '字符类型距离左右两侧边界单位像素',
        setters: 'NumberSetter',
        defaultValue: 4
      },
      {
        name: 'loadError',
        label: 'loadError',
        title: '图片加载失败的事件，返回 false 会关闭组件默认的 fallback 行为',
        setters: 'FunctionSetter'
      },
      {
        name: 'shape',
        label: 'shape',
        title: '指定头像的形状',
        setters: 'SelectSetter',
        options: ['circle', 'square'],
        defaultValue: 'circle'
      },
      {
        name: 'size',
        label: 'size',
        title: '设置头像的大小',
        setters: ['NumberSetter', 'SelectSetter', 'ObjectSetter'],
        options: ['large', 'small', 'default'],
        defaultValue: 'default'
      },
      {
        name: 'src',
        label: 'src',
        title: '图片类头像的资源地址',
        setters: 'StringSetter'
      },
      {
        name: 'srcset',
        label: 'srcset',
        title: '设置图片类头像响应式资源地址',
        setters: 'StringSetter'
      }
    ],
    slots: ['default', 'icon'],
    snippet: {
      props: {
        size: '64'
      },
      children: [
        { name: 'Template', slot: 'icon', children: [{ name: 'UserOutlined' }] }
      ]
    }
  },
  {
    name: 'AAvatarGroup',
    alias: 'Group',
    parent: 'Avatar',
    label: '头像组',
    categoryId: 'data',
    doc: 'https://www.antdv.com/components/avatar-cn',
    props: [
      {
        name: 'maxCount',
        label: 'maxCount',
        title: '显示的最大头像个数',
        setters: 'NumberSetter'
      },
      {
        name: 'maxPopoverPlacement',
        label: 'maxPopoverPlacement',
        title: '多余头像气泡弹出位置',
        setters: 'SelectSetter',
        options: ['top', 'bottom'],
        defaultValue: 'top'
      },
      {
        name: 'maxPopoverTrigger',
        label: 'maxPopoverTrigger',
        title: '设置多余头像 Popover 的触发方式',
        setters: 'SelectSetter',
        options: ['hover', 'focus', 'click'],
        defaultValue: 'hover'
      },
      {
        name: 'maxStyle',
        label: 'maxStyle',
        title: '多余头像样式',
        setters: 'ObjectSetter'
      },
      {
        name: 'size',
        label: 'size',
        title: '设置头像的大小',
        setters: ['NumberSetter', 'SelectSetter', 'ObjectSetter'],
        options: ['large', 'small', 'default'],
        defaultValue: 'default'
      },
      {
        name: 'shape',
        label: 'shape',
        title: '设置头像的形状',
        setters: 'SelectSetter',
        options: ['circle', 'square'],
        defaultValue: 'circle'
      }
    ],
    snippet: {
      children: [
        {
          name: 'AAvatar',
          props: {
            size: 64,
            src: 'https://xsgames.co/randomusers/avatar.php?g=pixel&key=1'
          }
        },
        {
          name: 'AAvatar',
          children: 'CC',
          props: {
            size: 64
          }
        },
        {
          name: 'ATooltip',
          props: {
            title: 'Ant User',
            placement: 'top',
            children: [
              {
                name: 'AAvatar',
                props: {
                  style: { backgroundColor: '#87d068' },
                  src: 'https://xsgames.co/randomusers/avatar.php?g=pixel&key=1'
                }
              }
            ]
          }
        }
      ]
    }
  }
];
export default components;
