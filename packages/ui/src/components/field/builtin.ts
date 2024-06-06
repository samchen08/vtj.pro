import {
  ElInput,
  ElInputNumber,
  ElDatePicker,
  ElTimePicker,
  ElSwitch,
  ElSlider,
  ElRate,
  ElCascader
} from 'element-plus';
import { SelectEditor, CheckboxEditor, RadioEditor } from './editors';
import { XPicker } from '../picker';

export interface BuiltinFieldEditor {
  component: any;
  props?: Record<string, any>;
  defaultValue?: any;
}

export type BuiltinFieldEditorType =
  | 'none'
  | 'text'
  | 'textarea'
  | 'select'
  | 'checkbox'
  | 'radio'
  | 'number'
  | 'date'
  | 'time'
  | 'datetime'
  | 'switch'
  | 'slider'
  | 'rate'
  | 'cascader'
  | 'picker';

export const builtinFieldEditors: Record<
  BuiltinFieldEditorType,
  BuiltinFieldEditor
> = {
  none: {
    component: 'div',
    props: {
      class: 'x-field-none'
    }
  },
  text: {
    component: ElInput,
    props: {
      clearable: true
    },
    defaultValue: ''
  },
  textarea: {
    component: ElInput,
    props: {
      type: 'textarea',
      rows: 2
    },
    defaultValue: ''
  },
  select: {
    component: SelectEditor,
    props: {
      clearable: true
    }
  },
  checkbox: {
    component: CheckboxEditor,
    props: {},
    defaultValue: []
  },
  radio: {
    component: RadioEditor,
    props: {}
  },
  number: {
    component: ElInputNumber,
    props: {}
  },
  date: {
    component: ElDatePicker,
    props: {}
  },
  time: {
    component: ElTimePicker,
    props: {}
  },
  datetime: {
    component: ElDatePicker,
    props: {
      type: 'datetime'
    }
  },
  switch: {
    component: ElSwitch,
    props: {}
  },
  rate: {
    component: ElRate,
    props: {}
  },
  slider: {
    component: ElSlider,
    props: {}
  },
  cascader: {
    component: ElCascader,
    props: {}
  },
  picker: {
    component: XPicker,
    props: {}
  }
};

export function registerFieldEditors(
  editors: Record<string, BuiltinFieldEditor>
) {
  Object.assign(builtinFieldEditors, editors);
}
