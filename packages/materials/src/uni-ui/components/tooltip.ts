import type { MaterialDescription } from '@vtj/core';

const desc: MaterialDescription = {
  name: 'UniTooltip',
  label: '文字提示',
  categoryId: 'ext',
  props: [
    {
      name: 'content',
      title: '弹出层显示的内容',
      defaultValue: '',
      setters: 'StringSetter'
    },
    {
      name: 'placement',
      title: 'Tooltip 的出现位置',
      defaultValue: 'left',
      setters: 'SelectSetter',
      options: ['left', 'right', 'top', 'bottom']
    }
  ],
  slots: ['default', 'content'],
  snippet: {
    props: {
      content: '示例文字',
      placement: 'top'
    },
    children: [{ name: 'View', children: '上' }]
  }
};

export default desc;
