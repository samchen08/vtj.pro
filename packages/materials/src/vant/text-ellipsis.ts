import type { MaterialDescription } from '@vtj/core';

const TextEllipsis: MaterialDescription = {
  name: 'VanTextEllipsis',
  alias: 'TextEllipsis',
  label: '文本省略',
  categoryId: 'view',
  doc: 'https://vant-ui.github.io/vant/#/zh-CN/text-ellipsis',
  props: [
    {
      name: 'rows',
      title: '展示的行数',
      defaultValue: 1,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'content',
      title: '需要展示的文本',
      setters: 'StringSetter'
    },
    {
      name: 'expand-text',
      title: '展开操作的文案',
      setters: 'StringSetter'
    },
    {
      name: 'collapse-text',
      title: '收起操作的文案',
      setters: 'StringSetter'
    },
    {
      name: 'dots',
      title: '省略号的文本内容',
      defaultValue: '...',
      setters: 'StringSetter'
    },
    {
      name: 'position',
      title: '省略位置',
      defaultValue: 'end',
      setters: 'SelectSetter',
      options: ['start', 'middle', 'end']
    }
  ],
  events: [{ name: 'lickAction', params: ['event'] }],
  slots: ['action'],
  snippet: {
    props: {
      content: '慢慢来，不要急，生活给你出了难题，可也终有一天会给出答案。'
    }
  }
};

export default TextEllipsis;
