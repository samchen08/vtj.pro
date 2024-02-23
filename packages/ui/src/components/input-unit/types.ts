import type { PropType } from 'vue';
import type { ComponentPropsType } from '../shared';

export interface InputUnitOption {
  label: string;
  value: string;
}

export const inputUnitProps = {
  units: {
    type: [String, Object, Array] as PropType<Array<string | InputUnitOption>>
  },
  unit: {
    type: String
  },
  appendWidth: {
    type: Number,
    default: 100
  },
  withUnit: {
    type: Boolean,
    default: true
  },
  format: {
    type: String
  },
  modelValue: {
    type: [String, Number]
  },
  selectProps: {
    type: Object as PropType<Record<string, any>>
  }
};

export type InputUnitProps = ComponentPropsType<typeof inputUnitProps>;

export type InputUnitEmits = {
  'update:modelValue': [string | number | undefined];
  'update:unit': [string | number | undefined];
  change: [string | number | undefined];
  'unit-change': [string | undefined];
};
