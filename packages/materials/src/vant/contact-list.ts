import type { MaterialDescription } from '@vtj/core';

const ContactList: MaterialDescription = {
  name: 'VanContactList',
  alias: 'ContactList',
  label: '联系人列表',
  categoryId: 'business',
  doc: 'https://vant-ui.github.io/vant/#/zh-CN/contact-list',
  props: [
    {
      name: 'modelValue',
      title: '当前选中联系人的 id',
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'list',
      title: '联系人列表',
      defaultValue: [],
      setters: 'ArraySetter'
    },
    {
      name: 'add-text',
      title: '新建按钮文案',
      defaultValue: '新建联系人',
      setters: 'StringSetter'
    },
    {
      name: 'default-tag-text',
      title: '默认联系人标签文案',
      setters: 'StringSetter'
    }
  ],
  events: [
    { name: 'add' },
    { name: 'edit', params: ['contact', 'index'] },
    { name: 'select', params: ['contact', 'index'] },
    { name: 'update:modelValue' }
  ],
  snippet: {
    props: {
      modelValue: '1',
      list: [
        {
          id: '1',
          name: '张三',
          tel: '13000000000',
          isDefault: true
        },
        {
          id: '2',
          name: '李四',
          tel: '1310000000'
        }
      ],
      'default-tag-text': '默认'
    }
  }
};

export default ContactList;
