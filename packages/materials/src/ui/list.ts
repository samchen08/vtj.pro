import type { MaterialDescription } from '@vtj/core';
const desc: MaterialDescription = {
  name: 'XList',
  label: '列表',
  categoryId: 'data',
  props: [
    {
      name: 'data',
      setters: ['ObjectSetter', 'FunctionSetter']
    },
    {
      name: 'itemHeight',
      title: '设置 itemHeight 即自动开启虚拟滚动',
      setters: ['StringSetter', 'NumberSetter']
    },
    {
      name: 'width',
      setters: ['StringSetter', 'NumberSetter']
    },
    {
      name: 'height',
      setters: ['StringSetter', 'NumberSetter']
    },
    {
      name: 'pager',
      setters: ['BooleanSetter', 'ObjectSetter']
    },
    {
      name: 'page',
      setters: 'NumberSetter',
      defaultValue: 1
    },
    {
      name: 'pageSize',
      setters: 'NumberSetter',
      defaultValue: 10
    },
    {
      name: 'dataKey',
      title: '数据主键属性名称',
      setters: 'StringSetter'
    },
    {
      name: 'infiniteScroll',
      setters: ['BooleanSetter', 'ObjectSetter']
    }
  ],
  events: [
    {
      name: 'load',
      params: ['state']
    }
  ],
  slots: [
    {
      name: 'empty'
    },
    {
      name: 'default',
      params: ['item', 'index']
    },
    {
      name: 'loading'
    },
    {
      name: 'nomore'
    }
  ],
  snippet: {
    props: {
      data: {
        list: ['列表项内容一', '列表项内容二'],
        total: 2
      }
    }
  }
};

export default desc;
