import type { MaterialDescription } from '@vtj/core';
const components: MaterialDescription[] = [
  {
    name: 'AStatistic',
    alias: 'Statistic',
    label: '统计数值',
    categoryId: 'data',
    doc: 'https://www.antdv.com/components/button-cn',
    props: [
      {
        name: 'decimalSeparator',
        label: 'decimalSeparator',
        title: '设置小数点',
        setters: 'StringSetter',
        defaultValue: '.'
      },
      {
        name: 'formatter',
        label: 'formatter',
        title: '自定义数值展示',
        setters: 'FunctionSetter'
      },
      {
        name: 'groupSeparator',
        label: 'groupSeparator',
        title: '设置千分位标识符',
        setters: 'StringSetter',
        defaultValue: ','
      },
      {
        name: 'precision',
        label: 'precision',
        title: '数值精度',
        setters: 'NumberSetter'
      },
      {
        name: 'prefix',
        label: 'prefix',
        title: '设置数值的前缀',
        setters: 'StringSetter'
      },
      {
        name: 'suffix',
        label: 'suffix',
        title: '设置数值的后缀',
        setters: 'StringSetter'
      },
      {
        name: 'title',
        label: 'title',
        title: '数值的标题',
        setters: 'StringSetter'
      },
      {
        name: 'value',
        label: 'value',
        title: '数值内容',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'valueStyle',
        label: 'valueStyle',
        title: '设置数值的样式',
        setters: 'ObjectSetter'
      }
    ],
    slots: ['default', 'formatter', 'prefix', 'suffix', 'title'],
    snippet: {
      props: {
        title: 'Active Users',
        value: '112893'
      }
    }
  },
  {
    name: 'AStatisticCountdown',
    alias: 'Countdown',
    parent: 'Statistic',
    label: '统计倒计数值',
    categoryId: 'data',
    doc: 'https://www.antdv.com/components/button-cn',
    props: [
      {
        name: 'format',
        label: 'format',
        title: '格式化倒计时展示，参考 dayjs',
        setters: 'StringSetter',
        defaultValue: 'HH:mm:ss'
      },
      {
        name: 'prefix',
        label: 'prefix',
        title: '设置数值的前缀',
        setters: 'StringSetter'
      },
      {
        name: 'suffix',
        label: 'suffix',
        title: '设置数值的后缀',
        setters: 'StringSetter'
      },
      {
        name: 'title',
        label: 'title',
        title: '数值的标题',
        setters: 'StringSetter'
      },
      {
        name: 'value',
        label: 'value',
        title: '数值内容',
        setters: ['NumberSetter', 'FunctionSetter']
      },
      {
        name: 'valueStyle',
        label: 'valueStyle',
        title: '设置数值的样式',
        setters: 'ObjectSetter'
      }
    ],
    events: ['finish'],
    slots: ['default', 'prefix', 'suffix', 'title'],
    snippet: {
      props: {
        title: 'countDown',
        value: 1791998311585
      }
    }
  }
];
export default components;
