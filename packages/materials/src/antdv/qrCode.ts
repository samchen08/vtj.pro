import type { MaterialDescription } from '@vtj/core';

const components: MaterialDescription[] = [
  {
    name: 'AQRCode',
    alias: 'QRCode',
    label: '二维码',
    categoryId: 'data',
    doc: 'https://www.antdv.com/components/qrcode-cn',
    props: [
      {
        name: 'value',
        label: 'value',
        title: '扫描后的地址',
        setters: 'StringSetter'
      },
      {
        name: 'type',
        label: 'type',
        title: '渲染类型',
        setters: 'SelectSetter',
        options: ['canvas', 'svg'],
        defaultValue: 'canvas'
      },
      {
        name: 'icon',
        label: 'icon',
        title: '二维码中图片的地址（目前只支持图片地址）',
        setters: 'StringSetter'
      },
      {
        name: 'size',
        label: 'size',
        title: '二维码大小',
        setters: 'NumberSetter',
        defaultValue: 160
      },
      {
        name: 'iconSize',
        label: 'iconSize',
        title: '二维码中图片的大小',
        setters: 'NumberSetter',
        defaultValue: 40
      },
      {
        name: 'color',
        label: 'color',
        title: '二维码颜色',
        setters: 'StringSetter',
        defaultValue: '#000'
      },
      {
        name: 'bgColor',
        label: 'bgColor',
        title: '二维码背景颜色',
        setters: 'StringSetter',
        defaultValue: 'transparent'
      },
      {
        name: 'bordered',
        label: 'bordered',
        title: '是否有边框',
        setters: 'BooleanSetter',
        defaultValue: true
      },
      {
        name: 'errorLevel',
        label: 'errorLevel',
        title: '二维码纠错等级',
        setters: 'SelectSetter',
        options: ['L', 'M', 'Q', 'H'],
        defaultValue: 'M'
      },
      {
        name: 'status',
        label: 'status',
        title: '二维码状态',
        setters: 'SelectSetter',
        options: ['active', 'expired', 'loading', 'scanned'],
        defaultValue: 'active'
      }
    ],
    events: ['refresh'],
    snippet: {
      props: {
        value: '哈哈哈哈'
      }
    }
  }
];
export default components;
