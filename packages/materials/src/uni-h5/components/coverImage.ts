import type { MaterialDescription } from '@vtj/core';

const desc: MaterialDescription = {
  name: 'CoverImage',
  label: '图片视图',
  categoryId: 'container',
  props: [
    {
      name: 'src',
      title: '图标路径。支持本地路径、网络路径。不支持 base64 格式。',
      setters: 'StringSetter'
    }
  ],
  events: ['load', 'error', 'click'],
  snippet: {}
};

export default desc;
