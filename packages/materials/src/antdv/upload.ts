import type { MaterialDescription } from '@vtj/core';

const components: MaterialDescription[] = [
  {
    name: 'AUpload',
    alias: 'Upload',
    label: '上传',
    categoryId: 'input',
    doc: 'https://www.antdv.com/components/upload-cn',
    props: [
      {
        name: 'accept',
        label: 'accept',
        title: '接受上传的文件类型',
        setters: 'StringSetter'
      },
      {
        name: 'action',
        label: 'action',
        title: '上传的地址',
        setters: ['StringSetter', 'FunctionSetter']
      },
      {
        name: 'beforeUpload',
        label: 'beforeUpload',
        title:
          '上传文件之前的钩子，参数为上传的文件，若返回 false 则停止上传。支持返回一个 Promise 对象，Promise 对象 reject 时则停止上传，resolve 时开始上传（ resolve 传入 File 或 Blob 对象则上传 resolve 传入对象）',
        setters: 'FunctionSetter'
      },
      {
        name: 'customRequest',
        label: 'customRequest',
        title: '通过覆盖默认的上传行为，可以自定义自己的上传实现',
        setters: 'FunctionSetter'
      },
      {
        name: 'data',
        label: 'data',
        title: '上传所需参数或返回上传参数的方法',
        setters: 'FunctionSetter'
      },
      {
        name: 'directory',
        label: 'directory',
        title: '支持上传文件夹',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'disabled',
        label: 'disabled',
        title: '是否禁用',
        setters: 'BooleanSetter'
      },
      {
        name: 'fileList',
        label: 'fileList',
        title: '已经上传的文件列表（受控）',
        setters: 'ArraySetter'
      },
      {
        name: 'headers',
        label: 'headers',
        title: '设置上传的请求头部',
        setters: 'ObjectSetter'
      },
      {
        name: 'isImageUrl',
        label: 'isImageUrl',
        title: '自定义缩略图是否使用 <img /> 标签进行显示',
        setters: 'FunctionSetter'
      },
      {
        name: 'listType',
        label: 'listType',
        title:
          '上传列表的内建样式，支持三种基本样式 text, picture 和 picture-card',
        setters: 'SelectSetter',
        options: ['text', 'picture', 'picture-card'],
        defaultValue: 'text'
      },
      {
        name: 'maxCount',
        label: 'maxCount',
        title: '限制上传数量。当为 1 时，始终用最新上传的文件代替当前文件',
        setters: 'NumberSetter'
      },
      {
        name: 'method',
        label: 'method',
        title: '上传请求的 http method',
        setters: 'StringSetter',
        defaultValue: 'post'
      },
      {
        name: 'multiple',
        label: 'multiple',
        title: '是否支持多选文件，ie10+ 支持。开启后按住 ctrl 可选择多个文件',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'name',
        label: 'name',
        title: '发到后台的文件参数名',
        setters: 'StringSetter',
        defaultValue: 'file'
      },
      {
        name: 'openFileDialogOnClick',
        label: 'openFileDialogOnClick',
        title: '点击打开文件对话框',
        setters: 'BooleanSetter',
        defaultValue: true
      },
      {
        name: 'previewFile',
        label: 'previewFile',
        title: '自定义文件预览逻辑',
        setters: 'FunctionSetter'
      },
      {
        name: 'progress',
        label: 'progress',
        title: '自定义进度条样式',
        setters: 'ObjectSetter',
        defaultValue: { strokeWidth: 2, showInfo: false }
      },
      {
        name: 'removeIcon',
        label: 'removeIcon',
        title: '自定义删除 icon',
        setters: 'v-slot:iconRender="{file: UploadFile}"'
      },
      {
        name: 'showUploadList',
        label: 'showUploadList',
        title:
          '是否展示 uploadList, 可设为一个对象，用于单独设定 showPreviewIcon, showRemoveIcon 和 showDownloadIcon',
        setters: ['BooleanSetter', 'ObjectSetter'],
        defaultValue: true
      },
      {
        name: 'supportServerRender',
        label: 'supportServerRender',
        title: '服务端渲染时需要打开这个',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'withCredentials',
        label: 'withCredentials',
        title: '上传请求时是否携带 cookie',
        setters: 'BooleanSetter',
        defaultValue: false
      }
    ],
    events: [
      'change',
      'download',
      'drop',
      'preview',
      'reject',
      'remove',
      'modelValue:fileList'
    ],
    slots: [
      { name: 'default' },
      { name: 'downloadIcon' },
      { name: 'iconRender' },
      { name: 'itemRender' },
      { name: 'previewIcon' },
      { name: 'removeIcon' }
    ],
    snippet: {
      props: {
        fileList: [],
        name: 'file',
        headers: { authorization: 'authorization-text' },
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76'
      },
      children: [
        {
          name: 'AButton',
          children: 'Click to Upload'
        }
      ]
    }
  }
];
export default components;
