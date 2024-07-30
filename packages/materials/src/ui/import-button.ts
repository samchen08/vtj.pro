import type { MaterialDescription } from '@vtj/core';
import button from '../element/button';
const desc: MaterialDescription = {
  name: 'XImportButton',
  label: '导入按钮',
  categoryId: 'base',
  props: [
    {
      name: 'uploader',
      title: '文件上传函数',
      setters: 'FunctionSetter'
    },
    {
      name: 'multiple',
      setters: 'BooleanSetter'
    },
    {
      name: 'accept',
      title: '接受上传的文件类型',
      setters: 'StringSetter'
    },
    {
      name: 'parser',
      setters: ['SelectSetter', 'FunctionSetter'],
      options: ['text', 'json', 'base64']
    },
    ...(button[0].props || [])
  ],
  events: ['success', 'fail'],
  slots: ['default'],
  snippet: {
    props: {}
  }
};

export default desc;
