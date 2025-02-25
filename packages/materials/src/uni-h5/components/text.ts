import type { MaterialDescription } from '@vtj/core';

const desc: MaterialDescription = {
  name: 'Text',
  label: '文本',
  categoryId: 'basic',
  props: [
    {
      name: 'selectable',
      title: '文本是否可选',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'user-select',
      title: '文本是否可选',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'space',
      title: '显示连续空格',
      setters: ['SelectSetter', 'StringSetter'],
      options: ['ensp', 'emsp', 'nbsp']
    },
    {
      name: 'decode',
      title: '是否解码',
      defaultValue: false,
      setters: 'BooleanSetter'
    }
  ],
  snippet: {
    children: 'VTJ'
  }
};

export default desc;
