import type { MaterialDescription } from '@vtj/core';

const Highlight: MaterialDescription = {
  name: 'VanHighlight',
  alias: 'Highlight',
  label: '高亮文本',
  categoryId: 'view',
  doc: 'https://vant-ui.github.io/vant/#/zh-CN/highlight',
  props: [
    {
      name: 'auto-escape',
      title: '是否自动转义',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'case-sensitive',
      title: '是否区分大小写',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'highlight-class',
      title: '高亮元素的类名',
      setters: 'StringSetter'
    },
    {
      name: 'highlight-tag',
      title: '高亮元素对应的 HTML 标签名',
      defaultValue: 'span',
      setters: 'StringSetter'
    },
    {
      name: 'keywords',
      title: '期望高亮的文本',
      setters: ['StringSetter', 'ArraySetter']
    },
    {
      name: 'source-string',
      title: '源文本',
      setters: 'StringSetter'
    },
    {
      name: 'tag',
      title: '根节点对应的 HTML 标签名',
      defaultValue: 'div',
      setters: 'StringSetter'
    },
    {
      name: 'unhighlight-class',
      title: '非高亮元素的类名',
      setters: 'StringSetter'
    },
    {
      name: 'unhighlight-tag',
      title: '非高亮元素对应的 HTML 标签名',
      defaultValue: 'span',
      setters: 'StringSetter'
    }
  ],
  snippet: {
    props: {
      'source-string':
        '慢慢来，不要急，生活给你出了难题，可也终有一天会给出答案。',
      keywords: '难题'
    }
  }
};

export default Highlight;
