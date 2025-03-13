import type { MaterialDescription } from '@vtj/core';

const Uploader: MaterialDescription = {
  name: 'VanUploader',
  alias: 'Uploader',
  label: '文件上传',
  categoryId: 'form',
  doc: 'https://vant-ui.github.io/vant/#/zh-CN/uploader',
  props: [
    {
      name: 'modelValue',
      title: '已上传的文件列表',
      setters: 'ArraySetter'
    },
    {
      name: 'accept',
      title: '允许上传的文件类型',
      defaultValue: 'image/*',
      setters: 'StringSetter'
    },
    {
      name: 'name',
      title:
        '标识符，通常为一个唯一的字符串或数字，可以在回调函数的第二项参数中获取',
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'preview-size',
      title: '预览图和上传区域的尺寸，默认单位为 px',
      defaultValue: 80,
      setters: ['NumberSetter', 'StringSetter', 'ArraySetter']
    },
    {
      name: 'preview-image',
      title: '是否在上传完成后展示预览图',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'preview-full-image',
      title: '是否在点击预览图后展示全屏图片预览',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'preview-options',
      title: '全屏图片预览的配置项',
      setters: 'ObjectSetter'
    },
    {
      name: 'multiple',
      title: '是否开启图片多选，部分安卓机型不支持',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'disabled',
      title: '是否禁用文件上传',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'readonly',
      title: '是否将上传区域设置为只读状态',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'deletable',
      title: '是否展示删除按钮',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'reupload',
      title: '是否开启覆盖上传，开启后会关闭图片预览',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'show-upload',
      title: '是否展示上传区域',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'lazy-load',
      title: '是否开启图片懒加载，须配合 Lazyload 组件使用',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'capture',
      title: '图片选取模式，可选值为 camera (直接调起摄像头)',
      setters: 'StringSetter'
    },
    {
      name: 'after-read',
      title: '文件读取完成后的回调函数',
      setters: 'FunctionSetter'
    },
    {
      name: 'before-read',
      title:
        '文件读取前的回调函数，返回 false 可终止文件读取，支持返回 Promise',
      setters: 'FunctionSetter'
    },
    {
      name: 'before-delete',
      title:
        '文件删除前的回调函数，返回 false 可终止文件读取，支持返回 Promise',
      setters: 'FunctionSetter'
    },
    {
      name: 'max-size',
      title: '文件大小限制，单位为 byte',
      defaultValue: Infinity,
      setters: ['NumberSetter', 'StringSetter', 'FunctionSetter']
    },
    {
      name: 'max-count',
      title: '文件上传数量限制',
      defaultValue: Infinity,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'result-type',
      title: '文件读取结果类型，可选值为 file text',
      defaultValue: 'dataUrl',
      setters: 'SelectSetter',
      options: ['dataUrl', 'file', 'text']
    },
    {
      name: 'upload-text',
      title: '上传区域文字提示',
      setters: 'StringSetter'
    },
    {
      name: 'image-fit',
      title: '预览图裁剪模式',
      defaultValue: 'cover',
      setters: 'SelectSetter',
      options: ['contain', 'cover', 'fill', 'none', 'scale-down']
    },
    {
      name: 'upload-icon',
      title: '上传区域图标名称或图片链接，等同于 Icon 组件的 name 属性',
      defaultValue: 'photograph',
      setters: ['VanIconSetter', 'StringSetter']
    }
  ],
  events: [
    { name: 'oversize' },
    { name: 'clickUpload', params: ['event'] },
    { name: 'clickPreview' },
    { name: 'clickReupload' },
    { name: 'closePreview' },
    { name: 'delete' },
    { name: 'update:modelValue' }
  ],
  slots: ['default', 'preview-delete', 'preview-cover'],
  snippet: {}
};

export default Uploader;
