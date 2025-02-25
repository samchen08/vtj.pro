import type { MaterialDescription } from '@vtj/core';

const desc: MaterialDescription = {
  name: 'UniFilePicker',
  label: '文件选择上传',
  categoryId: 'ext',
  props: [
    {
      name: 'modelValue',
      title: '组件数据，通常用来回显',
      setters: ['ArraySetter', 'ObjectSetter']
    },
    {
      name: 'disabled',
      title: '组件禁用',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'readonly',
      title: '组件只读，不可选择，不显示进度，不显示删除按钮',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'return-type',
      title: '限制 value 格式，当为 object 时 ，组件只能单选，且会覆盖',
      defaultValue: 'array',
      setters: 'SelectSetter',
      options: ['array', 'object']
    },
    {
      name: 'disable-preview',
      title: '用图片预览，仅 mode:grid生效',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'del-icon',
      title: '是否显示删除按钮',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'auto-upload',
      title: '是否自动上传，值为false则只触发@select,可自行上传',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'limit',
      title: '最大选择个数 ，h5 会自动忽略多选的部分',
      defaultValue: 9,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'title	',
      title: '组件标题，右侧显示上传计数',
      defaultValue: '',
      setters: 'StringSetter'
    },
    {
      name: 'mode',
      title: '选择文件后的文件列表样式',
      defaultValue: 'list',
      setters: 'SelectSetter',
      options: ['list', 'grid']
    },
    {
      name: 'file-mediatype',
      title: '选择文件类型,all 只支持 H5 和微信小程序平台',
      defaultValue: 'image',
      setters: 'SelectSetter',
      options: ['image', 'video', 'all']
    },
    {
      name: 'file-extname',
      title: '选择文件后缀，字符串的情况下需要用逗号分隔',
      defaultValue: '',
      setters: ['ArraySetter', 'StringSetter']
    },
    {
      name: 'list-styles',
      title: 'mode:list 时的样式',
      defaultValue: '',
      setters: 'ObjectSetter'
    },
    {
      name: 'image-styles',
      title: 'mode:grid 时的样式',
      defaultValue: '',
      setters: 'ObjectSetter'
    },
    {
      name: 'sizeType',
      title: 'original 原图，compressed 压缩图，默认二者都有',
      defaultValue: ['original', 'compressed'],
      setters: 'SelectSetter',
      options: [
        { label: 'default', value: ['original', 'compressed'] },
        { label: 'original', value: 'original' },
        { label: 'compressed', value: 'compressed' }
      ]
    },
    {
      name: 'sourceType',
      title: 'album 从相册选图，camera 使用相机，默认二者都有',
      defaultValue: ['album', 'camera'],
      setters: 'SelectSetter',
      options: [
        { label: 'default', value: ['album', 'camera'] },
        { label: 'album', value: 'album' },
        { label: 'camera', value: 'camera' }
      ]
    }
  ],
  events: ['select', 'progress', 'success', 'fail', 'delete'],
  slots: ['default'],
  snippet: {
    props: {
      limit: '9',
      title: '最多选择9张图片'
    }
  }
};

export default desc;
