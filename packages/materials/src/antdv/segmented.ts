import type { MaterialDescription } from '@vtj/core';

const components: MaterialDescription[] = [
  {
    name: 'ASegmented',
    alias: 'Segmented',
    label: '分段控制器',
    categoryId: 'data',
    doc: 'https://www.antdv.com/components/segmented-cn',
    props: [
      {
        name: 'block',
        label: 'block',
        title: '将宽度调整为父元素宽度的选项',
        setters: 'BooleanSetter'
      },
      {
        name: 'disabled',
        label: 'disabled',
        title: '是否禁用',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'options',
        label: 'options',
        title: '数据化配置选项内容',
        setters: 'ArraySetter',
        defaultValue: []
      },
      {
        name: 'size',
        label: 'size',
        title: '控件尺寸',
        setters: 'SelectSetter',
        options: ['large', 'middle', 'small']
      },
      {
        name: 'value',
        label: 'value',
        title: '当前选中的值',
        setters: ['StringSetter', 'NumberSetter']
      }
    ],
    events: ['change', 'update:value'],
    slots: ['default', 'label'],
    snippet: {
      props: {
        value: 'Daily',
        options: ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']
      }
    }
  }
];
export default components;
