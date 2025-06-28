import type { MaterialDescription } from '@vtj/core';

const components: MaterialDescription[] = [
  {
    name: 'AProgress',
    alias: 'Progress',
    label: '进度条',
    categoryId: 'feedback',
    doc: 'https://www.antdv.com/components/progress-cn',
    props: [
      {
        name: 'format',
        label: 'format',
        title: '内容的模板函数',
        setters: 'FunctionSetter'
      },
      {
        name: 'percent',
        label: 'percent',
        title: '百分比',
        setters: 'NumberSetter',
        defaultValue: 0
      },
      {
        name: 'showInfo',
        label: 'showInfo',
        title: '是否显示进度数值或状态图标',
        setters: 'BooleanSetter',
        defaultValue: true
      },
      {
        name: 'status',
        label: 'status',
        title: '状态',
        setters: 'ArraySetter',
        options: ['success', 'exception', 'normal', 'active']
      },
      {
        name: 'strokeColor',
        label: 'strokeColor',
        title: '进度条的色彩',
        setters: 'StringSetter'
      },
      {
        name: 'strokeLinecap',
        label: 'strokeLinecap',
        title: '进度条的样式',
        setters: 'SelectSetter',
        options: ['round', 'butt', 'square'],
        defaultValue: 'round'
      },
      {
        name: 'success',
        label: 'success',
        title: '成功进度条相关配置',
        setters: 'ObjectSetter'
      },
      {
        name: 'title',
        label: 'title',
        title: 'html 标签 title',
        setters: 'StringSetter'
      },
      {
        name: 'trailColor',
        label: 'trailColor',
        title: '未完成的分段的颜色',
        setters: 'StringSetter'
      },
      {
        name: 'type',
        label: 'type',
        title: '类型，可选 line circle dashboard',
        setters: 'SelectSetter',
        options: ['line', 'circle', 'dashboard'],
        defaultValue: 'line'
      },
      {
        name: 'size',
        label: 'size',
        title: '进度条的尺寸',
        setters: ['NumberSetter', 'ArraySetter', 'small', 'default'],
        defaultValue: 'default'
      },
      {
        name: 'steps',
        label: 'steps',
        title: '进度条总共步数',
        setters: 'NumberSetter'
      },
      {
        name: 'strokeColor',
        label: 'strokeColor',
        title:
          '进度条的色彩，传入 object 时为渐变。当有 steps 时支持传入一个数组',
        setters: ['StringSetter', 'ArraySetter', 'ObjectSetter']
      },
      {
        name: 'strokeWidth',
        label: 'strokeWidth',
        title: '圆形进度条线的宽度，单位是进度条画布宽度的百分比',
        setters: 'NumberSetter',
        defaultValue: 6
      },
      {
        name: 'gapDegree',
        label: 'gapDegree',
        title: '仪表盘进度条缺口角度，可取值 0 ~ 295',
        setters: 'NumberSetter',
        defaultValue: 75
      },
      {
        name: 'gapPosition',
        label: 'gapPosition',
        title: '仪表盘进度条缺口位置',
        setters: 'SelectSetter',
        options: ['top', 'bottom', 'left', 'right'],
        defaultValue: 'bottom'
      }
    ],
    snippet: {
      props: {
        percent: 40
      }
    }
  }
];
export default components;
