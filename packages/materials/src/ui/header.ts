import type { MaterialDescription } from '@vtj/core';
import { size } from '../shared';
const desc: MaterialDescription = {
  name: 'XHeader',
  label: '标题头',
  categoryId: 'layout',
  props: [
    size(),
    {
      name: 'content',
      setters: 'StringSetter'
    },
    {
      name: 'subtitle',
      setters: 'StringSetter'
    },
    {
      name: 'icon',
      setters: 'IconSetter'
    },
    {
      name: 'border',
      setters: 'BooleanSetter'
    },
    {
      name: 'more',
      setters: 'BooleanSetter'
    }
  ],
  events: ['click', 'clickIcon'],
  slots: ['default', 'subtitle', 'actions'],
  snippet: {
    props: {
      content: '标题内容文本',
      subtitle: '这里是子标题内容示例'
    }
  }
};

export default desc;
