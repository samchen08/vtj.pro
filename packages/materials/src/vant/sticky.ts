import type { MaterialDescription } from '@vtj/core';

const Sticky: MaterialDescription = {
  name: 'VantSticky',
  alias: 'Sticky',
  label: '粘性布局',
  categoryId: 'view',
  doc: 'https://vant-ui.github.io/vant/#/zh-CN/sticky',
  props: [
    {
      name: 'position',
      title: '吸附位置',
      defaultValue: 'top',
      setters: 'SelectSetter',
      options: ['top', 'bottom']
    },
    {
      name: 'offset-top',
      title: '吸顶时与顶部的距离，支持 px vw vh rem 单位，默认 px',
      defaultValue: 0,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'offset-bottom',
      title: '吸底时与底部的距离，支持 px vw vh rem 单位，默认 px',
      defaultValue: 0,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'z-index',
      title: '吸顶时的 z-index',
      defaultValue: 99,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'container',
      title: '容器对应的 HTML 节点',
      setters: 'ExpressionSetter'
    }
  ],
  events: [
    { name: 'change', params: ['isFixed'] },
    { name: 'scroll', params: ['data'] } // { scrollTop: number, isFixed: boolean }
  ],
  snippet: {
    children: [
      { name: 'VantButton', props: { type: 'primary' }, children: '基础用法' }
    ]
  }
};

export default Sticky;
