import type { MaterialDescription } from '@vtj/core';

const desc: MaterialDescription = {
  name: 'Form',
  label: '表单',
  categoryId: 'form',
  props: [
    {
      name: 'report-submit',
      title: '是否返回 formId 用于发送模板消息',
      setters: 'BooleanSetter'
    },
    {
      name: 'report-submit-timeout',
      title: '等待一段时间（毫秒数）以确认 formId 是否生效',
      setters: 'NumberSetter'
    }
  ],
  events: ['submit', 'reset'],
  snippet: {
    children: [
      {
        name: 'Label',
        children: [
          { name: 'View', children: '用户名' },
          {
            name: 'Input',
            props: {
              style: { height: '40px', backgroundColor: '#f0f0f0' },
              placeholder: '请输入用户名'
            }
          }
        ]
      },
      {
        name: 'Label',
        children: [
          { name: 'View', children: '密码' },
          {
            name: 'Input',
            props: {
              style: { height: '40px', backgroundColor: '#f0f0f0' },
              placeholder: '请输入密码'
            }
          }
        ]
      },
      { name: 'Button', children: '提交' }
    ]
  }
};

export default desc;
