import type { MaterialDescription } from '@vtj/core';

const Watermark: MaterialDescription = {
  name: 'VantWatermark',
  alias: 'Watermark',
  label: '水印',
  categoryId: 'view',
  doc: 'https://vant-ui.github.io/vant/#/zh-CN/watermark',
  props: [
    {
      name: 'width',
      title: '水印宽度',
      defaultValue: 100,
      setters: 'NumberSetter'
    },
    {
      name: 'height',
      title: '水印高度',
      defaultValue: 100,
      setters: 'NumberSetter'
    },
    {
      name: 'z-index',
      title: '水印的 z-index',
      defaultValue: 100,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'content',
      title: '文字水印的内容',
      setters: 'StringSetter'
    },
    {
      name: 'image',
      title: '图片水印的内容，如果与 content 同时传入，优先使用图片水印',
      setters: 'StringSetter'
    },
    {
      name: 'rotate',
      title: '水印的旋转角度',
      defaultValue: -22,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'full-page',
      title: '水印是否全屏显示',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'gap-x',
      title: '水印之间的水平间隔',
      defaultValue: 0,
      setters: 'NumberSetter'
    },
    {
      name: 'gap-y',
      title: '水印之间的垂直间隔',
      defaultValue: 0,
      setters: 'NumberSetter'
    },
    {
      name: 'text-color',
      title: '文字水印的颜色',
      defaultValue: '#dcdee0',
      setters: 'StringSetter'
    },
    {
      name: 'opacity',
      title: '水印的透明度',
      setters: ['NumberSetter', 'StringSetter']
    }
  ],
  slots: ['content'],
  snippet: {
    props: {
      content: 'VTJ'
    }
  }
};

export default Watermark;
