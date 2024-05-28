import type { MaterialDescription } from '@vtj/core';
import form from './form';
import { omitPropItem } from '../shared';
const desc: MaterialDescription = {
  name: 'XQueryForm',
  label: '查询表单',
  categoryId: 'form',
  props: [
    {
      name: 'collapsible',
      setters: 'BooleanSetter'
    },
    {
      name: 'items',
      setters: 'ArraySetter'
    },
    ...omitPropItem(form.props, [])
  ],
  events: [...(form.events || []), 'collapsed'],
  slots: [
    {
      name: 'default'
    }
  ],
  snippet: {
    children: [
      {
        name: 'XField',
        props: {
          label: '条件名称'
        }
      }
    ]
  }
};

export default desc;
