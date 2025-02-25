import type { MaterialDescription } from '@vtj/core';

const desc: MaterialDescription = {
  name: 'CoverView',
  label: '文本视图',
  categoryId: 'container',
  props: [
    {
      name: 'scroll-top',
      title:
        '设置顶部滚动偏移量，仅在设置了 overflow-y: scroll 成为滚动元素后生效',
      setters: ['NumberSetter', 'StringSetter']
    }
  ],
  events: ['click'],
  snippet: {}
};

export default desc;
