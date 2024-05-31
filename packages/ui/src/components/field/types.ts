import type { PropType, VNode } from 'vue';
import type { ComponentPropsType, BaseSize, UnReadOnly } from '../shared';
import type { ElTooltipProps, FormItemProps } from 'element-plus';
import {
  type BuiltinFieldEditor,
  type BuiltinFieldEditorType,
  builtinFieldEditors
} from './builtin';

import type { FormModel } from '../../';

export {
  type BuiltinFieldEditor,
  type BuiltinFieldEditorType,
  builtinFieldEditors
};

export interface FieldEditorProps {
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  options?: FieldOption[];
  modelValue?: any;
  onFocus?: () => void;
  onBlur?: () => void;
  onChange?: (v: any) => void;
  'onUpdate:modelValue'?: (v: any) => void;
  [key: string]: any;
}

export interface FieldOption {
  label: string;
  value: any;
  disabled?: boolean;
  children?: FieldOption[];
}

export type FieldOptionsLoader = (
  model?: FormModel
) => FieldOption[] | Promise<FieldOption[]>;

export type FieldVisibleCondition =
  | boolean
  | Record<string, any>
  | ((model: FormModel) => boolean);

export const fieldProps = {
  /**
   * 字段名称
   */
  name: {
    type: String
  },
  /**
   * 字段标题文本
   */
  label: {
    type: String
  },
  /**
   * 编辑器组件
   */
  editor: {
    type: [String, Object] as PropType<
      BuiltinFieldEditorType | VNode | Record<string, any>
    >,
    default: 'text'
  },
  /**
   * 编辑器组件参数
   */
  props: {
    type: Object as PropType<Record<string, any>>
  },
  /**
   * 字段值
   */
  modelValue: {
    type: [String, Number, Boolean, Object, Array] as PropType<any>,
    default(context: any) {
      const editor =
        builtinFieldEditors[context.editor as BuiltinFieldEditorType];
      return editor?.defaultValue;
    }
  },
  /**
   * 输入框尺寸
   */
  size: {
    type: String as PropType<BaseSize>
  },

  width: {
    type: [String, Number] as PropType<string | number>
  },
  /**
   * 是否在tooltip显示校验信息
   */
  tooltipMessage: {
    type: [Boolean, Object] as PropType<boolean | Partial<ElTooltipProps>>,
    default: true
  },
  /**
   * tooltip信息显示相对输入框的位置
   */
  tooltipPosition: {
    type: [String, Number] as PropType<'inner' | 'outer' | number>,
    default: 'outer'
  },

  /**
   * null 不显示 placeholder
   */
  placeholder: {
    type: String as PropType<string | null>
  },
  /**
   * 禁用
   */
  disabled: {
    type: Boolean as PropType<boolean>
  },
  /**
   * 只读
   */
  readonly: {
    type: Boolean as PropType<boolean>
  },
  /**
   * 选项数据
   */
  options: {
    type: [Array, Function] as PropType<FieldOption[] | FieldOptionsLoader>
  },
  /**
   * 是否显示控制
   */
  visible: {
    type: [Boolean, Object, Function],
    default: true
  },
  /**
   * 级联字段，根据字段值变化刷新options
   */
  cascader: {
    type: [String, Array] as PropType<string | string[]>
  },

  /**
   * 校验错误信息
   */
  error: {
    type: String
  },

  /**
   * 提示文本
   */
  tip: {
    type: String
  },

  /**
   * 表单项内容采用inline布局
   */
  inline: {
    type: Boolean
  }
};

export type FieldProps = ComponentPropsType<typeof fieldProps> &
  Partial<UnReadOnly<FormItemProps>>;

export type FieldEmits = {
  'update:modelValue': [value: any];
  change: [value: any];
  focus: [];
  blur: [];
};
