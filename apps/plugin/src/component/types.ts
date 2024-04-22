import type { ExtractPropTypes } from 'vue';
export type ComponentPropsType<T> = Readonly<Partial<ExtractPropTypes<T>>>;
export const exampleProps = {
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

export type ExamplePropsProps = ComponentPropsType<typeof exampleProps>;

export type ExampleEmits = {
  click: [props: ExamplePropsProps];
  submit: [props: ExamplePropsProps];
  change: [data: any];
  'update:modelValue': [value?: string];
  'update:syncProp': [value?: string];
};
