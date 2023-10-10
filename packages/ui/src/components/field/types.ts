import { PropType, DefineComponent } from 'vue';
import { IconParam } from '../icon';
import { ComponentPropsType, BaseSize } from '../shared';
import { ElInput, ElTooltipProps } from 'element-plus';
import SelectEditor from './editors/SelectEditor.vue';

export const BuiltinEditors: Record<string, FieldEditor> = {
  text: {
    name: ElInput,
    props: {
      clearable: true
    }
  },
  textarea: {
    name: ElInput,
    props: {
      type: 'textarea',
      rows: 2,
      autosize: {
        minRows: 2,
        maxRows: 5
      }
    }
  },
  select: {
    name: SelectEditor,
    props: {
      clearable: true
    }
  }
};

export interface FieldEditor {
  name: string | object;
  props?: Record<string, any>;
}

export interface FieldOption {
  label: string;
  value: any;
  disabled?: boolean;
  children?: FieldOption[];
}

export type FieldOptionsLoader = () => FieldOption[] | Promise<FieldOption[]>;

export const fieldProps = {
  label: {
    type: String
  },
  editor: {
    type: [String, Object] as PropType<string | FieldEditor>,
    default: 'text'
  },
  modelValue: {
    type: [String, Number, Boolean, Object, Array] as PropType<any>,
    default: ''
  },
  size: {
    type: String as PropType<BaseSize>
  },
  // 是否在tooltip显示校验信息
  tooltipMessage: {
    type: [Boolean, Object] as PropType<boolean | Partial<ElTooltipProps>>,
    default: true
  },
  // tooltip信息显示相对输入框的位置
  tooltipPosition: {
    type: [String, Number] as PropType<'inner' | 'outer' | number>,
    default: 'outer'
  },
  // null 不显示 placeholder
  placeholder: {
    type: String as PropType<string | null>
  },
  disabled: {
    type: Boolean as PropType<boolean>
  },
  options: {
    type: [Array, Function] as PropType<FieldOption[] | FieldOptionsLoader>
  }
};

export type FieldProps = ComponentPropsType<typeof fieldProps>;

export type FieldEmits = {
  'update:modelValue': [value: any];
  change: [value: any];
};
