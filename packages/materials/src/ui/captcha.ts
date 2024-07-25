import type { MaterialDescription } from '@vtj/core';
import elInput from '../element/input';
import { omitPropItem } from '../shared';

const desc: MaterialDescription = {
  name: 'XCaptcha',
  label: '图形验证码',
  categoryId: 'form',
  props: [
    {
      name: 'src',
      setters: 'FunctionSetter',
      title: '() => MaybePromise<string>'
    },
    {
      name: 'maxlength',
      title: '验证码长度',
      setters: 'NumberSetter',
      defaultValue: 4
    },
    {
      name: 'placeholder',
      setters: 'StringSetter',
      defaultValue: '请输入图形验证码'
    },
    {
      name: 'validate',
      setters: 'FunctionSetter',
      title: '校验函数：(value: string) => MaybePromise<boolean>'
    },
    ...omitPropItem(elInput.props, ['maxlength', 'placeholder'])
  ],
  events: [...(elInput.events || [])],
  snippet: {
    props: {
      src: {
        type: 'JSFunction',
        value: "() => 'https://dummyimage.com/300x120'"
      }
    }
  }
};

export default desc;
