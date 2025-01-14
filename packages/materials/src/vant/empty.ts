import type { MaterialDescription } from '@vtj/core';

const Empty: MaterialDescription = {
  name: 'VanEmpty',
  alias: 'Empty',
  label: '空状态',
  categoryId: 'view',
  doc: 'https://vant-ui.github.io/vant/#/zh-CN/empty',
  props: [
    {
      name: 'image',
      title: '图片类型, 支持传入图片 URL',
      defaultValue: 'default',
      setters: 'SelectSetter',
      options: ['error', 'network', 'search', 'default']
    },
    {
      name: 'image-size',
      title: '图片大小，默认单位为 px',
      setters: ['NumberSetter', 'StringSetter', 'ArraySetter']
    },
    {
      name: 'description',
      title: '图片下方的描述文字',
      setters: 'StringSetter'
    }
  ],
  slots: ['default', 'image', 'description'],
  snippet: {
    props: {
      description: '描述文字'
    }
  }
};

export default Empty;
