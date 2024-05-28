import type { ComponentPropsType } from '../shared';
import { queryFormProps } from './props';
import type { FieldProps } from '../';

export type QueryFormItems = FieldProps[];

export type QueryFormProps = ComponentPropsType<typeof queryFormProps>;

export type QueryFormEmits = {
  collapsed: [Collapsed: boolean];
};
