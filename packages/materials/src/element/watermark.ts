import type { MaterialDescription } from '@vtj/core';

const components: MaterialDescription = {
  name: 'ElWatermark',
  label: '水印',

  categoryId: 'other',
  doc: 'https://element-plus.org/zh-CN/component/watermark.html',
  package: 'element-plus',
  props: [
    {
      name: 'width',
      label: 'width',
      title: '水印的宽度， content 的默认值是它自己的宽度',
      setters: 'NumberSetter',
      defaultValue: 120
    },
    {
      name: 'height',
      label: 'height',
      title: '水印的高度， content 的默认值是它自己的高度',
      setters: 'NumberSetter',
      defaultValue: 64
    },
    {
      name: 'rotate',
      label: 'rotate',
      title: '水印的旋转角度, 单位 °',
      setters: 'NumberSetter',
      defaultValue: -22
    },
    {
      name: 'zIndex',
      label: 'zIndex',
      title: '水印元素的z-index值',
      setters: 'NumberSetter',
      defaultValue: 9
    },
    {
      name: 'image',
      label: 'image',
      title: '水印图片，建议使用 2x 或 3x 图像',
      setters: 'StringSetter'
    },
    {
      name: 'content',
      label: 'content',
      title: '水印文本内容',
      setters: ['StringSetter', 'ArraySetter']
    },
    {
      name: 'font',
      label: 'font',
      title: '文字样式',
      setters: 'ObjectSetter',
      defaultValue: {
        color: 'rgba(0,0,0,.15)',
        fontSize: 16,
        fontWeight: 'normal',
        fontFamily: 'sans-serif',
        fontStyle: 'normal',
        textAlign: 'center',
        textBaseline: 'top'
      }
    },
    {
      name: 'gap',
      label: 'gap',
      title: '水印之间的间距',
      setters: 'ArraySetter',
      defaultValue: [100, 100]
    },
    {
      name: 'offset',
      label: 'offset',
      title: '水印从容器左上角的偏移 默认值为 gap/2',
      setters: 'ArraySetter',
      defaultValue: [50, 50]
    }
  ],
  slots: ['default'],
  snippet: {
    props: {
      font: {
        color: 'rgba(0, 0, 0, .15)'
      }
    },
    children: [{ name: 'div', props: { style: { height: '500px' } } }]
  }
};

export default components;
