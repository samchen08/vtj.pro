import type { MaterialDescription } from '@vtj/core';
const Image: MaterialDescription = {
  name: 'ElImage',
  label: '图片',

  categoryId: 'data',
  doc: 'https://element-plus.org/zh-CN/component/image.html',
  childIncludes: false,
  package: 'element-plus',
  props: [
    {
      name: 'src',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'fit',
      defaultValue: '',
      options: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      setters: 'SelectSetter'
    },
    {
      name: 'hideOnClickModal',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'loading',
      defaultValue: '',
      options: ['eager', 'lazy'],
      setters: 'SelectSetter'
    },
    {
      name: 'lazy',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'scrollContainer',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'alt',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'referrerPolicy',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'previewSrcList',
      defaultValue: '',
      setters: 'JSONSetter'
    },
    {
      name: 'zIndex',
      defaultValue: '',
      setters: 'NumberSetter'
    },
    {
      name: 'initialIndex',
      defaultValue: 0,
      setters: 'NumberSetter'
    },
    {
      name: 'ESC键关闭',
      defaultValue: true,
      title: '是否可以通过按下 ESC 关闭 Image Viewer',
      setters: 'BooleanSetter'
    },
    {
      name: 'previewTeleported',
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
    }
  ],
  events: ['load', 'error', 'switch', 'close'],
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
