import { type PropType } from 'vue';
import type { ComponentPropsType } from '../shared';

export type CKEditorImageUploder = (file: File) => Promise<string>;

export const ckeditorProps = {
  /**
   * 内容
   */
  modelValue: {
    type: String,
    default: ''
  },
  /**
   * 禁用
   */
  disabled: {
    type: Boolean
  },
  /**
   * 可编辑状态
   */
  editable: {
    type: Boolean,
    default: true
  },
  /**
   * 显示边框, 当 editable=false 时有效
   */
  border: {
    type: Boolean,
    default: true
  },
  uploader: {
    type: Function as PropType<CKEditorImageUploder>
  }
};

export type CKEditorProps = ComponentPropsType<typeof ckeditorProps>;

export type CKEditorEmits = {
  'update:modelValue': [value?: string];
  change: [value?: string];
  blur: [value: string, e: any];
  focus: [e: any];
  ready: [editor: any];
};
