import type { MaterialDescription } from '@vtj/core';

const BackTop: MaterialDescription = {
  name: 'VantBackTop',
  alias: 'BackTop',
  label: '回到顶部',
  categoryId: 'nav',
  doc: 'https://vant-ui.github.io/vant/#/zh-CN/back-top',
  props: [
    {
      name: 'target',
      title:
        '触发滚动的目标对象，支持传入选择器或 DOM 元素，默认最近的父级滚动容器',
      setters: ['StringSetter', 'ExpressionSetter']
    },
    {
      name: 'right',
      title: '距离页面右侧的距离，默认单位为 px',
      defaultValue: 30,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'bottom',
      title: '距离页面底部的距离，默认单位为 px',
      defaultValue: 40,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'offset',
      title: '滚动高度达到此参数值时才显示组件',
      defaultValue: 200,
      setters: 'NumberSetter'
    },
    {
      name: 'teleport',
      title: '指定挂载的节点，等同于 Teleport 组件的 to 属性',
      defaultValue: 'body',
      setters: ['StringSetter', 'ExpressionSetter']
    },
    {
      name: 'immediate',
      title: '是否瞬间滚动到顶部',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'z-index',
      title: '设置组件的 z-index 层级',
      defaultValue: 100,
      setters: ['NumberSetter', 'StringSetter']
    }
  ],
  events: [{ name: 'click', params: ['event'] }],
  slots: ['default']
};

export default BackTop;
