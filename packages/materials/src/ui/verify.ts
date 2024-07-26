import type { MaterialDescription } from '@vtj/core';
import elInput from '../element/input';
import { omitPropItem } from '../shared';

const desc: MaterialDescription = {
  name: 'XVerify',
  label: '短信验证码',
  categoryId: 'form',
  props: [
    {
      name: 'api',
      setters: 'FunctionSetter',
      title: '() => Promise<boolean>'
    },
    {
      name: 'maxlength',
      title: '验证码长度',
      setters: 'NumberSetter',
      defaultValue: 6
    },
    {
      name: 'placeholder',
      setters: 'StringSetter',
      defaultValue: '请输入图形验证码'
    },
    {
      name: 'seconds',
      setters: 'NumberSetter',
      title: '可重发秒数',
      defaultValue: 60
    },
    ...omitPropItem(elInput.props, ['maxlength', 'placeholder'])
  ],
  events: [...(elInput.events || [])],
  snippet: {
    props: {
      src: {
        type: 'JSFunction',
        value: 'async () => true'
      }
    }
  }
};

export default desc;
