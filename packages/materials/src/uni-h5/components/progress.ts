import type { MaterialDescription } from '@vtj/core';

const desc: MaterialDescription = {
  name: 'Progress',
  label: '进度条',
  categoryId: 'basic',
  props: [
    { name: 'percent', title: '百分比0~100', setters: 'NumberSetter' },
    {
      name: 'show-info',
      title: '在进度条右侧显示百分比',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'border-radius',
      title: '圆角大小',
      defaultValue: 0,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'font-size',
      title: '右侧百分比字体大小',
      defaultValue: 16,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'stroke-width',
      title: '进度条线的宽度，单位px',
      defaultValue: 6,
      setters: 'NumberSetter'
    },
    {
      name: 'activeColor',
      title: '已选择的进度条的颜色',
      defaultValue: '#09BB07',
      setters: 'ColorSetter'
    },
    {
      name: 'backgroundColor',
      title: '未选择的进度条的颜色',
      defaultValue: '#EBEBEB',
      setters: 'ColorSetter'
    },
    {
      name: 'active',
      title: '进度条从左往右的动画',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'active-mode',
      title: 'backwards: 动画从头播；forwards：动画从上次结束点接着播',
      defaultValue: 'backwards',
      setters: 'SelectSetter',
      options: ['backwards', 'forwards']
    },
    {
      name: 'duration',
      title: '进度增加1%所需毫秒数',
      defaultValue: 30,
      setters: 'NumberSetter'
    }
  ],
  events: ['activeend'],
  snippet: {
    props: { percent: 10, 'show-info': true, 'stroke-width': '3' }
  }
};

export default desc;
