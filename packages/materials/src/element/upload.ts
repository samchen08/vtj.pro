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
      title: '设置上传的请求头部',
      defaultValue: '',
      setters: 'JSONSetter'
    },
    {
      name: 'method',
      title: '设置上传请求方法',
      defaultValue: 'post',
      setters: 'InputSetter'
    },
    {
      name: 'multiple',
      title: '是否支持多选文件',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'data',
      title: '上传时附带的额外参数',
      defaultValue: '',
      setters: ['ExpressionSetter', 'FunctionSetter'],
    },
    {
      name: 'name',
      title: '上传的文件字段名',
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
      title: '是否显示已上传文件列表',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'drag',
      title: '是否启用拖拽上传',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'accept',
      title: '接受上传的文件类型（thumbnail-mode 模式下此参数无效）',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'crossorigin',
      title: '原生属性 crossorigin',
      options: ['', 'anonymous', 'use-credentials'],
      setters: 'SelectSetter'
    },
    {
      name: 'onPreview',
      title: '点击文件列表中已上传的文件时的钩子',
      setters: 'FunctionSetter'
    },
    {
      name: 'onRemove',
      title: '文件列表移除文件时的钩子',
      setters: 'FunctionSetter'
    },
    {
      name: 'onSuccess',
      title: '文件上传成功时的钩子',
      setters: 'FunctionSetter'
    },
    {
      name: 'onError',
      title: '文件上传失败时的钩子',
      setters: ['FunctionSetter', 'ExpressionSetter']
    },
    {
      name: 'onProgress',
      title: '文件上传时的钩子',
      setters: ['FunctionSetter', 'ExpressionSetter']
    },
    {
      name: 'onChange',
      title: '文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用',
      setters: 'FunctionSetter'
    },
    {
      name: 'onExceed',
      title: '当超出限制时，执行的钩子函数',
      setters: 'FunctionSetter'
    },
    {
      name: 'beforeUpload',
      title: '上传文件之前的钩子，参数为上传的文件， 若返回false或者返回 Promise 且被 reject，则停止上传',
      setters: 'FunctionSetter'
    },
    {
      name: 'beforeRemove',
      title: '删除文件之前的钩子，参数为上传的文件和文件列表， 若返回 false 或者返回 Promise 且被 reject，则停止删除',
      setters: 'FunctionSetter'
    },
    {
      name: 'fileList',
      title: '默认上传文件',
      setters: ['ArraySetter', 'JSONSetter']
    },
    {
      name: 'listType',
      title: '文件列表的类型',
      defaultValue: 'text',
      options: ['text', 'picture', 'picture-card'],
      setters: 'SelectSetter'
    },
    {
      name: 'autoUpload',
      title: '是否自动上传文件',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'httpRequest',
      title: '覆盖默认的 Xhr 行为，允许自行实现上传文件的请求',
      setters: 'FunctionSetter'
    },
    {
      name: 'disabled',
      title: '是否禁用上传',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'limit',
      title: '允许上传文件的最大数量',
      defaultValue: '',
      setters: 'NumberSetter'
    },
    {
      name: 'directory',
      title: '是否支持上传文件夹。 启用后，只能选择文件夹；选择文件夹后，文件夹内的文件将被扁平化处理',
      defaultValue: false,
      setters: 'BooleanSetter'
    }
  ],
  slots: [
    { name: 'default' },
    { name: 'trigger' },
    { name: 'tip' },
    { name: 'file' }
  ],
  events: [{ name: 'update:fileList' }],
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
