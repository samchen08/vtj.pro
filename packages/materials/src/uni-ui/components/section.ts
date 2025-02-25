import type { MaterialDescription } from '@vtj/core';

const desc: MaterialDescription = {
  name: 'UniSection',
  label: '标题栏',
  categoryId: 'ext',
  props: [
    {
      name: 'type',
      title: '装饰类型',
      defaultValue: '',
      setters: 'SelectSetter',
      options: ['line', 'circle', 'square']
    },
    {
      name: 'title',
      title: '主标题',
      defaultValue: '',
      setters: 'StringSetter'
    },
    {
      name: 'titleFontSize',
      title: '主标题字体大小',
      defaultValue: '14px',
      setters: 'StringSetter'
    },
    {
      name: 'titleColor',
      title: '主标题字体颜色',
      defaultValue: '#333',
      setters: 'ColorSetter'
    },
    {
      name: 'subTitle',
      title: '副标题',
      defaultValue: '',
      setters: 'StringSetter'
    },
    {
      name: 'subTitleFontSize',
      title: '副标题字体大小',
      defaultValue: '12px',
      setters: 'StringSetter'
    },
    {
      name: 'subTitleColor',
      title: '副标题字体颜色',
      defaultValue: '#999',
      setters: 'ColorSetter'
    },
    {
      name: 'padding',
      title:
        '默认插槽容器的 padding 值，传入类型为 Boolean 时，设置为 10px 或 0',
      defaultValue: false,
      setters: ['BooleanSetter', 'StringSetter']
    }
  ],
  events: ['click'],
  snippet: {
    props: {
      title: '基础用法',
      subTitle: '副标题'
    }
  }
};

export default desc;
