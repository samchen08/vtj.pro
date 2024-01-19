import type { PropType } from 'vue';
import type { ComponentPropsType, BaseSize } from '../shared';
import type { FormRules } from 'element-plus';

export const dialogFormProps = {
  modelValue: {
    type: Boolean,
    default: true
  },
  size: {
    type: String as PropType<BaseSize>
  },
  formProps: {
    type: Object as PropType<Record<string, any>>
  },
  submit: {
    type: [Boolean, String],
    default: '确定'
  },
  cancel: {
    type: [Boolean, String],
    default: '取消'
  },
  /**
   * 表单模型
   */
  model: {
    type: Object as PropType<Record<string, any>>,
    default() {
      return Object.create(null);
    }
  },
  rules: {
    type: Object as PropType<FormRules>
  },
  /**
   * 表单提交处理方法, return true 关闭弹窗
   */
  submitMethod: {
    type: Function as PropType<(model: Record<string, any>) => Promise<boolean>>
  }
};

export type DialogFormEmits = {
  'update:modelValue': [value: boolean];
  submit: [model: Record<string, any>];
  close: [];
};

export type DialogFormProps = ComponentPropsType<typeof dialogFormProps>;
