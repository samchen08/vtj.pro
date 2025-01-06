import type { MaterialDescription } from '@vtj/core';
const Upload: MaterialDescription = {
  name: 'ElUpload',
  label: '上传',

  doc: 'https://element-plus.org/zh-CN/component/upload.html',
  categoryId: 'form',
  package: 'element-plus',
  props: [
    {
      name: 'action',
      defaultValue: '#',
      title: '请求 URL',
      setters: 'InputSetter'
    },
    {
      name: 'headers',
      defaultValue: '',
      setters: 'JSONSetter'
    },
    {
      name: 'method',
      defaultValue: 'post',
      setters: 'InputSetter'
    },
    {
      name: 'multiple',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'data',
      defaultValue: '',
      setters: 'ExpressionSetter'
    },
    {
      name: 'name',
      defaultValue: 'file',
      setters: 'ExpressionSetter'
    },
    {
      name: 'withCredentials',
      defaultValue: false,
      title: '支持发送 cookie 凭证信息',
      setters: 'BooleanSetter'
    },
    {
      name: 'showFileList',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'drag',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'accept',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'crossorigin',
      options: ['', 'anonymous', 'use-credentials'],
      setters: 'SelectSetter'
    },
    {
      name: 'onPreview',
      setters: 'FunctionSetter'
    },
    {
      name: 'onRemove',
      setters: 'FunctionSetter'
    },
    {
      name: 'onSuccess',
      setters: 'FunctionSetter'
    },
    {
      name: 'onError',
      setters: ['FunctionSetter', 'ExpressionSetter']
    },
    {
      name: 'onProgress',
      setters: ['FunctionSetter', 'ExpressionSetter']
    },
    {
      name: 'onChange',
      setters: 'FunctionSetter'
    },
    {
      name: 'onExceed',
      setters: 'FunctionSetter'
    },
    {
      name: 'beforeUpload',
      setters: 'FunctionSetter'
    },
    {
      name: 'beforeRemove',
      setters: 'FunctionSetter'
    },
    {
      name: 'fileList',
      setters: ['ArraySetter', 'JSONSetter']
    },
    {
      name: 'listType',
      defaultValue: 'text',
      options: ['text', 'picture', 'picture-card'],
      setters: 'SelectSetter'
    },
    {
      name: 'autoUpload',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'httpRequest',
      setters: 'FunctionSetter'
    },
    {
      name: 'disabled',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'limit',
      defaultValue: '',
      setters: 'NumberSetter'
    }
  ],
  slots: [
    { name: 'default' },
    { name: 'trigger' },
    { name: 'tip' },
    { name: 'file' }
  ],
  snippet: {
    props: {
      action: 'https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15',
      multiple: true,
      fileList: [
        {
          name: 'element-plus-logo.svg',
          url: 'https://element-plus.org/images/element-plus-logo.svg'
        }
      ]
    },
    children: [
      {
        name: 'ElButton',
        props: {
          type: 'primary'
        },
        children: '选择文件'
      }
    ]
  }
};

export default Upload;
