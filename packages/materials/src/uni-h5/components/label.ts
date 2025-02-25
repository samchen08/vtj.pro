import type { MaterialDescription } from '@vtj/core';

const desc: MaterialDescription = {
  name: 'Label',
  label: '标签',
  categoryId: 'form',
  props: [
    {
      name: 'for',
      title: '绑定控件的 id',
      setters: 'StringSetter'
    }
  ],
  snippet: {}
};

export default desc;
