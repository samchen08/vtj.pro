import type { MaterialDescription } from '@vtj/core';

const desc: MaterialDescription = {
  name: 'View',
  label: '视图',
  categoryId: 'container',
  props: [
    {
      name: 'hover-class',
      defaultValue: 'none',
      title: '指定按下去的样式类。当 hover-class="none" 时，没有点击态效果',
      setters: 'InputSetter'
    },
    {
      name: 'hover-stop-propagation',
      defaultValue: false,
      title:
        '指定是否阻止本节点的祖先节点出现点击态，App、H5、支付宝小程序、百度小程序不支持（支付宝小程序、百度小程序文档中都有此属性，实测未支持）',
      setters: 'BooleanSetter'
    },
    {
      name: 'hover-start-time',
      defaultValue: 50,
      title: '按住后多久出现点击态，单位毫秒',
      setters: 'NumberSetter'
    },
    {
      name: 'hover-stay-time',
      defaultValue: 400,
      title: '手指松开后点击态保留时间，单位毫秒',
      setters: 'NumberSetter'
    }
  ],
  snippet: {
    children: '视图内容'
  }
};

export default desc;
