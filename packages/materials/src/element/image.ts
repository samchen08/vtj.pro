import type { MaterialDescription } from '@vtj/core';
const Image: MaterialDescription = {
  name: 'ElImage',
  label: '图片',

  categoryId: 'data',
  doc: 'https://element-plus.org/zh-CN/component/image.html',
  package: 'element-plus',
  props: [
    {
      name: 'src',
      title: '图片源地址，同原生属性一致',
      defaultValue: '',
      setters: ['InputSetter', 'FileSetter']
    },
    {
      name: 'fit',
      title: '确定图片如何适应容器框，同原生 object-fit',
      defaultValue: '',
      options: ['', 'fill', 'contain', 'cover', 'none', 'scale-down'],
      setters: 'SelectSetter'
    },
    {
      name: 'hideOnClickModal',
      title: '当开启 preview 功能时，是否可以通过点击遮罩层关闭 preview',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'loading',
      title: '浏览器加载图像的策略，和 浏览器原生能力一致',
      defaultValue: '',
      options: ['eager', 'lazy'],
      setters: 'SelectSetter'
    },
    {
      name: 'lazy',
      title: '是否使用懒加载',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'scrollContainer',
      title: '开启懒加载功能后，监听 scroll 事件的容器 默认情况下，开启懒加载功能后，监听 scroll 事件的容器',
      defaultValue: '',
      setters: ['InputSetter', 'ObjectSetter']
    },
    {
      name: 'alt',
      title: '原生属性 alt',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'referrerPolicy',
      title: '原生属性 referrerPolicy',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'crossorigin',
      label: 'crossorigin',
      title: '原生属性 crossorigin',
      setters: 'SelectSetter',
      options: ['', 'anonymous', 'use-credentials']
    },
    {
      name: 'previewSrcList',
      title: '开启图片预览功能',
      defaultValue: '',
      setters: ['ArraySetter', 'JSONSetter']
    },
    {
      name: 'zIndex',
      title: '设置图片预览的 z-index',
      defaultValue: '',
      setters: 'NumberSetter'
    },
    {
      name: 'initialIndex',
      title: '初始预览图像索引，小于 url-list 的长度',
      defaultValue: 0,
      setters: 'NumberSetter'
    },
    {
      name: 'close-on-press-escape',
      label: 'close-on-press-escape',
      defaultValue: true,
      title: '是否可以通过按下 ESC 关闭 Image Viewer',
      setters: 'BooleanSetter'
    },
    {
      name: 'previewTeleported',
      title: 'image-viewer 是否插入至 body 元素上。 嵌套的父元素属性会发生修改时应该将此属性设置为 true',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'infinite',
      defaultValue: true,
      setters: 'BooleanSetter',
      title: '是否可以无限循环预览'
    },
    {
      name: 'zoomRate',
      defaultValue: 1.2,
      setters: {
        name: 'NumberSetter',
        props: {
          precision: 1
        }
      },
      title: '图像查看器缩放事件的缩放速率'
    },
    {
      name: 'scale',
      defaultValue: 1,
      title: '预览图像缩放',
      setters: 'NumberSetter'
    },
    {
      name: 'minScale',
      defaultValue: 0.2,
      setters: {
        name: 'NumberSetter',
        props: {
          precision: 1
        }
      },
      title: '图像查看器缩放事件的最小缩放比例'
    },
    {
      name: 'maxScale',
      defaultValue: 7,
      setters: {
        name: 'NumberSetter',
        props: {
          precision: 1
        }
      },
      title: '图像查看器缩放事件的最大缩放比例'
    },
    {
      name: 'showProgress',
      title: '是否在预览图片时显示进度条',
      defaultValue: true,
      setters: 'BooleanSetter',
    },
  ],
  events: ['load', 'error', 'switch', 'close', 'show'],
  slots: ['placeholder', 'error', 'viewer'],
  snippet: {
    props: {
      style: {
        width: '100px',
        height: '100px'
      },
      src: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
      previewSrcList: [
        'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
        'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
        'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
        'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
        'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
        'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
        'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
      ]
    }
  }
};

export default Image;
