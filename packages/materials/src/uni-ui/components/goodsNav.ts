import type { MaterialDescription } from '@vtj/core';

const desc: MaterialDescription = {
  name: 'UniGoodsNav',
  label: '商品导航',
  categoryId: 'ext',
  props: [
    {
      name: 'options',
      title: '组件参数',
      defaultValue: '',
      setters: 'ArraySetter'
    },
    {
      name: 'buttonGroup',
      title: '组件按钮组参数',
      defaultValue: '',
      setters: 'ArraySetter'
    },
    {
      name: 'fill',
      title: '按钮是否平铺',
      defaultValue: false,
      setters: 'BooleanSetter'
    }
  ],
  events: ['click', 'buttonClick'],
  snippet: {}
};

export default desc;
