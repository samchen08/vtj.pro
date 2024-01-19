import type { PropType, InjectionKey, ComponentInternalInstance } from 'vue';
import type { ElTooltipProps } from 'element-plus';
import type { ComponentPropsType } from '../shared';
import type Form from './Form.vue';
export const formProps = {
  /**
   * 表单模型
   */
  model: {
    type: Object as PropType<Record<string, any>>,
    default() {
      return Object.create(null);
    }
  },

  /**
   * inline模式
   */
  inline: {
    type: Boolean
  },
  /**
   * inline模式显示列数
   */
  inlineColumns: {
    type: Number
  },
  /**
   * 显示底部操作按钮
   */
  footer: {
    type: Boolean,
    default: true
  },
  /**
   * 提交按钮文本
   */
  submitText: {
    type: String,
    default: '提交'
  },
  /**
   * 重置按钮文本
   */
  resetText: {
    type: String,
    default: '重置'
  },
  /**
   * 表单提交处理方法
   */
  submitMethod: {
    type: Function as PropType<(model: FormModel) => Promise<any>>
  },

  /**
   * 是否在tooltip显示校验信息
   */
  tooltipMessage: {
    type: [Object, Boolean] as PropType<boolean | Partial<ElTooltipProps>>,
    default: undefined
  }
};

export type FormProps = ComponentPropsType<typeof formProps>;

export type FormEmits = {
  change: [model: Record<string, any>];
  submit: [model: Record<string, any>];
  reset: [];
};

export type FormInstance = InstanceType<typeof Form>;

export const formInstanceKey: InjectionKey<ComponentInternalInstance | null> =
  Symbol('formInstanceKey');

export type FormModel = Record<string, any>;

export const formModelKey: InjectionKey<FormModel | null> =
  Symbol('formModelKey');
