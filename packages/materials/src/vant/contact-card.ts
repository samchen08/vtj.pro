import type { MaterialDescription } from '@vtj/core';

const ContactCard: MaterialDescription = {
  name: 'VantContactCard',
  alias: 'ContactCard',
  label: '联系人卡片',
  categoryId: 'business',
  doc: 'https://vant-ui.github.io/vant/#/zh-CN/contact-card',
  props: [
    {
      name: 'type',
      title: '卡片类型',
      defaultValue: 'add',
      setters: 'SelectSetter',
      options: ['add', 'edit']
    },
    {
      name: 'name',
      title: '联系人姓名',
      setters: 'StringSetter'
    },
    {
      name: 'tel',
      title: '联系人手机号',
      setters: 'StringSetter'
    },
    {
      name: 'add-text',
      title: '添加时的文案提示',
      defaultValue: '添加联系人',
      setters: 'StringSetter'
    },
    {
      name: 'editable',
      title: '是否可以编辑联系人',
      defaultValue: true,
      setters: 'BooleanSetter'
    }
  ],
  events: [{ name: 'click', params: ['event'] }],
  snippet: {}
};

export default ContactCard;
