import type { MaterialDescription } from '@vtj/core';

const desc: MaterialDescription = {
  name: 'VExample',
  label: '示例组件',
  categoryId: 'base',
  props: [
    {
      name: 'title',
      setters: 'StringSetter'
    }
  ]
};

export default desc;
