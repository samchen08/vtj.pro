import type { MaterialDescription } from '@vtj/core';

const Statistic: MaterialDescription = {
  name: 'ElStatistic',
  label: '统计组件',

  doc: 'https://element-plus.org/zh-CN/component/statistic.html',
  categoryId: 'data',
  package: 'element-plus',
  props: [
    {
      name: 'value',
      label: 'value',
      title: '数字内容',
      setters: 'NumberSetter',
      defaultValue: 0
    },
    {
      name: 'decimalSeparator',
      label: 'decimalSeparator',
      title: '设置小数点符号',
      setters: 'StringSetter',
      defaultValue: '.'
    },
    {
      name: 'formatter',
      label: 'formatter',
      title: '自定义数字格式化',
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
      title: '数字精度',
      setters: 'NumberSetter',
      defaultValue: 0
    },
    {
      name: 'prefix',
      label: 'prefix',
      title: '设置数字的前缀',
      setters: 'StringSetter'
    },
    {
      name: 'suffix',
      label: 'suffix',
      title: '设置数字的后缀',
      setters: 'StringSetter'
    },
    {
      name: 'title',
      label: 'title',
      title: '数字标题',
      setters: 'StringSetter'
    },
    {
      name: 'valueStyle',
      label: 'valueStyle',
      title: '数字样式',
      setters: ['StringSetter', 'ObjectSetter', 'ArraySetter']
    }
  ],
  slots: ['prefix', 'suffix', 'title', 'default'],
  snippet: {
    props: {
      title: 'Daily active users',
      value: '268500'
    }
  }
};

const Countdown: MaterialDescription = {
  name: 'ElCountdown',
  label: '倒计时',

  doc: 'https://element-plus.org/zh-CN/component/statistic.html',
  categoryId: 'data',
  package: 'element-plus',
  props: [
    {
      name: 'value',
      label: 'value',
      title: '目标时间',
      setters: ['NumberSetter'] //?? dayjs
    },
    {
      name: 'format',
      label: 'format',
      title: '格式化倒计时',
      setters: 'StringSetter',
      defaultValue: 'HH:mm:ss'
    },
    {
      name: 'prefix',
      label: 'prefix',
      title: '设置倒计时前缀',
      setters: 'StringSetter'
    },
    {
      name: 'suffix',
      label: 'suffix',
      title: '设置倒计时的后缀',
      setters: 'StringSetter'
    },
    {
      name: 'title',
      label: 'title',
      title: '倒计时标题',
      setters: 'StringSetter'
    },
    {
      name: 'valueStyle',
      label: 'valueStyle',
      title: '倒计时值的样式',
      setters: ['StringSetter', 'ObjectSetter', 'ArraySetter']
    }
  ],
  events: ['change', 'finish'],
  slots: ['prefix', 'suffix', 'title'],
  snippet: {
    props: {
      title: 'Start to grab',
      value: 1792134444342
    }
  }
};

export default [Statistic, Countdown];
