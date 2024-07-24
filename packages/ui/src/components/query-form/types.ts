import type { ComponentPropsType } from '../shared';
import { queryFormProps } from './props';
import type { FieldProps } from '../';

export type QueryFormItem = string | FieldProps;

export type QueryFormItems = QueryFormItem[];

export type QueryFormProps = ComponentPropsType<typeof queryFormProps>;

export type QueryFormEmits = {
  collapsed: [Collapsed: boolean];
};
