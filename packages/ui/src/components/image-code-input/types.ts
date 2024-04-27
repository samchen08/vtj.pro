import type { PropType } from 'vue';
import type { ComponentPropsType } from '../shared';

export const imageCodeInputProps = {
  /**
   * image
   */
  image: {
    type: Function as PropType<() => Promise<string>>
  },
  /**
   * maxLength
   */
  maxLength: {
    type: Number,
    default: 4
  },
  /**
   * placeholder
   */
  placeholder: {
    type: String,
    default: '请输入图形验证码'
  },
  /**
   * validate  校验
   */
  validate: {
    type: Function as PropType<(value: string) => Promise<boolean>>
  }
};

export type ImageCodeInputProps = ComponentPropsType<
  typeof imageCodeInputProps
>;
