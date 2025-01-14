import type { MaterialDescription } from '@vtj/core';

const RollingText: MaterialDescription = {
  name: 'VanRollingText',
  alias: 'RollingText',
  label: '翻滚文本动效',
  categoryId: 'view',
  doc: 'https://vant-ui.github.io/vant/#/zh-CN/rolling-text',
  props: [
    {
      name: 'start-num',
      title: '起始数值',
      defaultValue: 0,
      setters: 'NumberSetter'
    },
    {
      name: 'target-num',
      title: '目标数值',
      setters: 'NumberSetter'
    },
    {
      name: 'text-list',
      title: '内容数组，用于翻转非数字内容',
      defaultValue: [],
      setters: 'ArraySetter'
    },
    {
      name: 'duration',
      title: '动画时长，单位为秒',
      defaultValue: 2,
      setters: 'NumberSetter'
    },
    {
      name: 'direction',
      title: '文本翻滚方向，值为 down 和 up',
      defaultValue: 'down',
      setters: 'SelectSetter',
      options: ['up', 'down']
    },
    {
      name: 'auto-start',
      title: '是否自动开始动画',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'stop-order',
      title: '各个数位动画停止先后顺序，值为 ltr 和 rtl',
      defaultValue: 'ltr',
      setters: 'SelectSetter',
      options: ['ltr', 'rtl']
    },
    {
      name: 'height',
      title: '数字高度，单位为 px',
      defaultValue: 40,
      setters: 'NumberSetter'
    }
  ],
  snippet: {
    props: {
      'start-num': 0,
      'target-num': 123
    }
  }
};

export default RollingText;
