import type { MaterialDescription } from '@vtj/core';

const desc: MaterialDescription = {
  name: 'UniLink',
  label: '超链接',
  categoryId: 'ext',
  props: [
    {
      name: 'href',
      title: '链接地址',
      defaultValue: '',
      setters: 'StringSetter'
    },
    {
      name: 'text',
      title: '显示文字',
      defaultValue: '',
      setters: 'StringSetter'
    },
    {
      name: 'download',
      title: 'H5平台下载文件名',
      defaultValue: '',
      setters: 'StringSetter'
    },
    {
      name: 'showUnderLine',
      title: '是否显示下划线',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'copyTips',
      title: '在小程序端复制链接时的提示语',
      defaultValue: '已自动复制网址，请在手机浏览器里粘贴该网址',
      setters: 'StringSetter'
    },
    {
      name: 'color',
      title: '链接文字颜色',
      defaultValue: '#999999',
      setters: 'ColorSetter'
    },
    {
      name: 'fontSize',
      title: '链接文字大小，单位px',
      defaultValue: '14',
      setters: 'StringSetter'
    }
  ],
  slots: ['default'],
  snippet: {
    props: {
      href: 'https://uniapp.dcloud.io/',
      text: 'https://uniapp.dcloud.io/'
    }
  }
};

export default desc;
