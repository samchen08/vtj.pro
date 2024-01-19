import type { ComponentPropsType } from '../shared';

export const testProps = {
  stringProp: {
    type: String
  },
  booleanProp: {
    type: Boolean
  },
  numberProp: {
    type: Number
  },
  selectProp: {
    type: String
  },
  objectProp: {
    type: Object
  },
  arrayProp: {
    type: Array
  },
  iconProp: {
    type: String
  },
  colorProp: {
    type: String
  },
  modelValue: {
    type: String
  },
  syncProp: {
    type: String
  }
};

export type TestProps = ComponentPropsType<typeof testProps>;

export type TestEmits = {
  click: [props: TestProps];
  submit: [props: TestProps];
  change: [data: any];
  'update:modelValue': [value?: string];
  'update:syncProp': [value?: string];
};
