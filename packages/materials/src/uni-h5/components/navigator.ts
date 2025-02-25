import type { MaterialDescription } from '@vtj/core';

const desc: MaterialDescription = {
  name: 'Navigator',
  label: '页面跳转',
  categoryId: 'nav',
  props: [
    {
      name: 'url',
      title: '应用内的跳转链接，值为相对路径或绝对路径',
      setters: 'StringSetter'
    },
    {
      name: 'open-type',
      title: '跳转方式',
      defaultValue: 'navigate',
      setters: 'SelectSetter',
      options: [
        'navigate',
        'redirect',
        'switchTab',
        'reLaunch',
        'navigateBack',
        'exit'
      ]
    },
    {
      name: 'delta',
      title: '当 open-type 为 "navigateBack" 时有效，表示回退的层数',
      setters: 'NumberSetter'
    },
    {
      name: 'animation-type',
      title:
        '当 open-type 为 navigate、navigateBack 时有效，窗口的显示/关闭动画效果',
      defaultValue: 'pop-in/out',
      setters: 'StringSetter'
    },
    {
      name: 'animation-duration',
      title:
        '当 open-type 为 navigate、navigateBack 时有效，窗口显示/关闭动画的持续时间',
      defaultValue: 300,
      setters: 'NumberSetter'
    },
    {
      name: 'render-link',
      title: '是否给 navigator 组件加一层 a 标签控制 ssr 渲染',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'hover-class',
      title: '指定点击时的样式类，当hover-class="none"时，没有点击态效果',
      defaultValue: 'navigator-hover',
      setters: 'StringSetter'
    },
    {
      name: 'hover-stop-propagation',
      title: '指定是否阻止本节点的祖先节点出现点击态',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'hover-start-time',
      title: '按住后多久出现点击态，单位毫秒',
      defaultValue: 50,
      setters: 'NumberSetter'
    },
    {
      name: 'hover-stay-time',
      title: '手指松开后点击态保留时间，单位毫秒',
      defaultValue: 600,
      setters: 'NumberSetter'
    },
    {
      name: 'target',
      title: '在哪个小程序目标上发生跳转，默认当前小程序，值域self/miniProgram',
      defaultValue: 'self',
      setters: 'StringSetter'
    }
  ],
  snippet: {
    children: [
      { name: 'Button', props: { type: 'default' }, children: '跳转到新页面' }
    ]
  }
};

export default desc;
