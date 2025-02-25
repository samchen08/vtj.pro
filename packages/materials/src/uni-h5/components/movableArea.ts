import type { MaterialDescription } from '@vtj/core';

const desc: MaterialDescription = {
  name: 'MovableArea',
  label: '可拖动区域',
  categoryId: 'container',
  props: [
    {
      name: 'scale-area',
      title:
        '当里面的 movable-view 设置为支持双指缩放时，设置此值可将缩放手势生效区域修改为整个 movable-area',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'width',
      title: '宽度 *',
      defaultValue: '10px',
      setters: 'StringSetter'
    },
    {
      name: 'height',
      title: '高度 *',
      defaultValue: '10px',
      setters: 'StringSetter'
    }
  ],
  snippet: {}
};

export default desc;
