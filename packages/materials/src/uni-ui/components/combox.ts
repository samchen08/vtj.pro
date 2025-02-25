import type { MaterialDescription } from '@vtj/core';

const desc: MaterialDescription = {
  name: 'UniCombox',
  label: '组合框',
  categoryId: 'ext',
  props: [
    {
      name: 'label',
      title: '标签文字',
      setters: 'StringSetter'
    },
    {
      name: 'modelValue',
      title: 'combox的值',
      setters: 'StringSetter'
    },
    {
      name: 'labelWidth',
      title: '标签宽度',
      defaultValue: 'auto',
      setters: 'StringSetter'
    },
    {
      name: 'placeholder',
      title: '输入框占位符',
      setters: 'StringSetter'
    },
    {
      name: 'candidates',
      title: '候选字段',
      defaultValue: [],
      setters: ['ArraySetter', 'StringSetter']
    },
    {
      name: 'emptyTips',
      title: '无匹配项时的提示语',
      defaultValue: '无匹配项',
      setters: 'StringSetter'
    }
  ],
  events: ['input', 'update:modelValue'],
  snippet: {
    props: {
      candidates: ['北京', '南京', '东京', '武汉', '天津', '上海', '海口'],
      placeholder: '请选择所在城市'
    }
  }
};

export default desc;
