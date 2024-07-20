import type { MaterialDescription } from '@vtj/core';
import { size } from '../shared';

const desc: MaterialDescription = {
  name: 'XAttachment',
  label: '附件',
  categoryId: 'data',
  props: [
    {
      name: 'modelValue',
      label: 'modelValue',
      title: '列表显示的文件',
      setters: 'ArraySetter'
    },
    {
      name: 'selectValue',
      label: 'selectValue',
      title: '选中值，开启 selectable 有效',
      setters: 'ArraySetter'
    },
    {
      name: 'uploader',
      label: 'uploader',
      title: '文件上传方法',
      setters: 'FunctionsSetter'
    },
    {
      name: 'multiple',
      label: 'multiple',
      title: '支持多文件上传, 同时在selectable时控制多选',
      setters: 'BooleanSetter'
    },
    {
      name: 'limit',
      label: 'limit',
      title: '允许上传文件的最大数量',
      setters: 'NumberSetter'
    },
    {
      name: 'accept',
      label: 'accept',
      title: ' 接受上传的文件类型, 如：image/png, image/jpeg, .pptx',
      setters: 'StringSetter'
    },
    {
      name: 'disabled',
      label: 'disabled',
      title: '禁止更改文件，不能上传和删除',
      setters: 'BooleanSetter'
    },
    size(),
    {
      name: 'thumbnail',
      label: 'thumbnail',
      title: '缩略图生成方法',
      setters: 'FunctionSetter'
    },
    {
      name: 'addable',
      label: 'addable',
      title: '可增加',
      setters: 'BooleanSetter',
      defaultValue: true
    },
    {
      name: 'removable',
      label: 'removable',
      title: '可删除',
      setters: 'BooleanSetter',
      defaultValue: true
    },
    {
      name: 'downloadable',
      label: 'downloadable',
      title: '可下载',
      setters: 'BooleanSetter',
      defaultValue: true
    },
    {
      name: 'previewable',
      label: 'previewable',
      title: '可预览',
      setters: 'BooleanSetter',
      defaultValue: true
    },
    {
      name: 'selectable',
      label: 'selectable',
      title: '可选择',
      setters: 'BooleanSetter',
      defaultValue: false
    },
    {
      name: 'clickable',
      label: 'clickable',
      title: '可点击',
      setters: 'BooleanSetter',
      defaultValue: false
    },
    {
      name: 'listType',
      label: 'listType',
      title: '列表类型',
      setters: 'SelectSetter',
      options: ['card', 'list'],
      defaultValue: 'card'
    }
  ],
  events: [
    'click',
    'preview',
    'remove',
    'download',
    'select',
    'change',
    'update:modelValue',
    'update:selectValue'
  ],
  slots: ['tip'],
  snippet: {
    props: {}
  }
};

export default desc;
