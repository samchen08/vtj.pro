import type { MaterialDescription } from '@vtj/core';

const components: MaterialDescription[] = [
  {
    name: 'AImage',
    alias: 'Image',
    label: '图片',
    categoryId: 'data',
    doc: 'https://www.antdv.com/components/image-cn',
    props: [
      {
        name: 'alt',
        label: 'alt',
        title: '图像描述',
        setters: 'StringSetter'
      },
      {
        name: 'fallback',
        label: 'fallback',
        title: '加载失败容错地址',
        setters: 'StringSetter'
      },
      {
        name: 'height',
        label: 'height',
        title: '图像高度',
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'placeholder',
        label: 'placeholder',
        title: '加载占位, 为 true 时使用默认占位',
        setters: 'BooleanSetter'
      },
      {
        name: 'preview',
        label: 'preview',
        title: '预览参数，为 false 时禁用',
        setters: ['BooleanSetter', 'ObjectSetter'],
        defaultValue: true
      },
      {
        name: 'src',
        label: 'src',
        title: '图片地址',
        setters: 'StringSetter'
      },
      {
        name: 'previewMask',
        label: 'previewMask',
        title: '自定义 mask',
        setters: ['StringSetter', 'FunctionSetter']
      },
      {
        name: 'width',
        label: 'width',
        title: '图像宽度',
        setters: ['NumberSetter', 'StringSetter']
      }
    ],
    events: ['error'],
    slots: ['default', 'placeholder', 'previewMask'],
    snippet: {
      props: {
        width: '200px',
        src: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
      }
    }
  },
  {
    name: 'AImagePreviewGroup',
    alias: 'ImagePreviewGroup',
    label: '预览图片组',
    categoryId: 'data',
    doc: 'https://www.antdv.com/components/image-cn',
    props: [
      {
        name: 'preview',
        label: 'preview',
        title: '预览参数，为 false 时禁用',
        setters: ['BooleanSetter', 'ObjectSetter'],
        defaultValue: true
      }
    ],
    snippet: {
      children: [
        {
          name: 'AImage',
          props: {
            src: 'https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp'
          }
        },
        {
          name: 'AImage',
          props: {
            src: 'https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp'
          }
        },
        {
          name: 'AImage',
          props: {
            src: 'https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp'
          }
        }
      ]
    }
  }
];
export default components;
