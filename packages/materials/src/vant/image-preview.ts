import type { MaterialDescription } from '@vtj/core';

const ImagePreview: MaterialDescription = {
  name: 'VanImagePreview',
  alias: 'ImagePreview',
  label: '图片预览',
  categoryId: 'view',
  doc: 'https://vant-ui.github.io/vant/#/zh-CN/image-preview',
  props: [
    {
      name: 'show',
      title: '是否展示图片预览',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'images',
      title: '需要预览的图片 URL 数组',
      defaultValue: [],
      setters: 'ArraySetter'
    },
    {
      name: 'start-position',
      title: '图片预览起始位置索引',
      defaultValue: 0,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'swipe-duration',
      title: '动画时长，单位为 ms',
      defaultValue: 300,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'show-index',
      title: '是否显示页码',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'show-indicators',
      title: '是否显示轮播指示器',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'loop',
      title: '是否开启循环播放',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'double-scale',
      title: '是否启用双击缩放手势，禁用后，点击时会立即关闭图片预览',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'before-close',
      title: '关闭前的回调函数，返回 false 可阻止关闭，支持返回 Promise',
      setters: 'FunctionSetter'
    },
    {
      name: 'close-on-popstate',
      title: '是否在页面回退时自动关闭',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'close-on-click-image',
      title: '是否在点击图片后关闭图片预览',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'close-on-click-overlay',
      title: '是否在点击遮罩层后关闭图片预览',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'vertical',
      title: '是否开启纵向手势滑动',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'class-name',
      title: '自定义类名',
      setters: ['StringSetter', 'ArraySetter', 'ObjectSetter']
    },
    {
      name: 'max-zoom',
      title: '手势缩放时，最大缩放比例',
      defaultValue: 3,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'min-zoom',
      title: '手势缩放时，最小缩放比例',
      defaultValue: 1 / 3,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'closeable',
      title: '是否显示关闭图标',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'close-icon',
      title: '关闭图标名称或图片链接',
      defaultValue: 'clear',
      setters: 'StringSetter'
    },
    {
      name: 'close-icon-position',
      title: '关闭图标位置',
      defaultValue: 'top-right',
      setters: 'SelectSetter',
      options: ['top-left', 'top-right', 'bottom-left', 'bottom-right']
    },
    {
      name: 'transition',
      title: '动画类名，等价于 transition 的 name 属性',
      defaultValue: 'van-fade',
      setters: 'StringSetter'
    },
    {
      name: 'overlay-class',
      title: '自定义遮罩层类名',
      setters: ['StringSetter', 'ArraySetter', 'ObjectSetter']
    },
    {
      name: 'overlay-style',
      title: '自定义遮罩层样式',
      setters: 'ObjectSetter'
    },
    {
      name: 'teleport',
      title: '指定挂载的节点，等同于 Teleport 组件的 to 属性',
      setters: ['StringSetter', 'ExpressionSetter']
    }
  ],
  events: [
    { name: 'update:show' },
    { name: 'close', params: ['data'] },
    { name: 'closed' },
    { name: 'change', params: ['index'] },
    { name: 'scale', params: ['data'] },
    { name: 'longPress', params: ['data'] }
  ],
  slots: ['index', 'cover', 'image'],
  snippet: {
    props: {
      show: true,
      images: [
        'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
        'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg'
      ]
    },
    children: [{ name: 'template', slot: 'index' }]
  }
};

export default ImagePreview;
