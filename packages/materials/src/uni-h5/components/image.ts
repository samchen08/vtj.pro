import type { MaterialDescription } from '@vtj/core';

const desc: MaterialDescription = {
  name: 'Image',
  label: '图片',
  categoryId: 'media',
  props: [
    {
      name: 'src',
      title: '图片资源地址',
      setters: 'StringSetter'
    },
    {
      name: 'mode',
      title: '图片裁剪、缩放的模式',
      defaultValue: 'scaleToFill',
      setters: 'SelectSetter',
      options: [
        'scaleToFill',
        'aspectFit',
        'aspectFill',
        'widthFix',
        'heightFix',
        'top',
        'bottom',
        'center',
        'left',
        'right',
        'top left',
        'top right',
        'bottom left',
        'bottom right'
      ]
    },
    {
      name: 'lazy-load',
      title: '图片懒加载',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'fade-show',
      title: '图片显示动画效果',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'webp',
      title:
        '在系统不支持webp的情况下是否单独启用webp。默认false，只支持网络资源',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'show-menu-by-longpress',
      title: '开启长按图片显示识别小程序码菜单',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'draggable',
      title: '是否能拖动图片',
      defaultValue: true,
      setters: 'BooleanSetter'
    }
  ],
  events: ['error', 'load'],
  snippet: {
    props: {
      src: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg',
      style: {
        width: '200px',
        height: '200px',
        backgroundColor: '#eeeeee'
      }
    }
  }
};

export default desc;
