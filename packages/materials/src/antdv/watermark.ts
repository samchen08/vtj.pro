import type { MaterialDescription } from '@vtj/core';

const components: MaterialDescription[] = [
  {
    name: 'AWatermark',
    alias: 'Watermark',
    label: '水印',
    categoryId: 'other',
    doc: 'https://www.antdv.com/components/watermark-cn',
    props: [
      {
        name: 'width',
        label: 'width',
        title: '水印的宽度，content 的默认值为自身的宽度',
        setters: 'NumberSetter',
        defaultValue: 120
      },
      {
        name: 'height',
        label: 'height',
        title: '水印的高度，content 的默认值为自身的高度',
        setters: 'NumberSetter',
        defaultValue: 64
      },
      {
        name: 'rotate',
        label: 'rotate',
        title: '水印绘制时，旋转的角度，单位 °',
        setters: 'NumberSetter',
        defaultValue: -22
      },
      {
        name: 'zIndex',
        label: 'zIndex',
        title: '追加的水印元素的 z-index',
        setters: 'NumberSetter',
        defaultValue: 9
      },
      {
        name: 'image',
        label: 'image',
        title: '图片源，建议导出 2 倍或 3 倍图，优先级高',
        setters: 'StringSetter'
      },
      {
        name: 'content',
        label: 'content',
        title: '水印文字内容',
        setters: ['StringSetter', 'ArraySetter']
      },
      {
        name: 'font',
        label: 'font',
        title: '文字样式',
        setters: 'ObjectSetter',
        defaultValue: 'ObjectSetter'
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
        title: '水印距离容器左上角的偏移量，默认为 gap/2',
        setters: 'ArraySetter',
        defaultValue: [50, 50]
      }
    ],
    snippet: {
      props: { content: 'VTJ' },
      children: [{ name: 'div', props: { style: { height: '500px' } } }]
    }
  }
];

export default components;
