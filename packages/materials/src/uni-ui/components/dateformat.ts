import type { MaterialDescription } from '@vtj/core';

const desc: MaterialDescription = {
  name: 'UniDateformat',
  label: '日期格式化',
  categoryId: 'ext',
  props: [
    {
      name: 'date',
      title: '要格式化的日期对象/日期字符串/时间戳',
      defaultValue: Date.now(),
      setters: ['ObjectSetter', 'StringSetter', 'NumberSetter']
    },
    {
      name: 'threshold',
      title: '转化类型阈值',
      defaultValue: [0, 0],
      setters: 'ArraySetter'
    },
    {
      name: 'format',
      title: '格式字符串',
      defaultValue: 'yyyy/MM/dd hh:mm:ss',
      setters: 'StringSetter'
    },
    {
      name: 'locale',
      title: '格式化使用的语言',
      defaultValue: 'zh',
      setters: 'SelectSetter',
      options: ['zh', 'en']
    }
  ],
  events: ['change', 'update:modelValue'],
  snippet: {
    props: {
      date: '2020/10/20 20:20:20'
    }
  }
};

export default desc;
