import type { ComponentPropsType, UnReadOnly } from '../shared';
import type {
  GridColumns,
  QueryFormItems,
  DialogProps,
  GridProps,
  GridLoader,
  GridState
} from '../';
import { pickerProps } from './props';

export type PickerColumns = GridColumns;

export type PickerFields = QueryFormItems;

export type PickerLoader = GridLoader;

export type PickerState = GridState;

export type PickerDialogProps = UnReadOnly<Partial<DialogProps>>;

export type PickerGridProps = UnReadOnly<Partial<GridProps>>;

export type PickerProps = ComponentPropsType<typeof pickerProps>;

export type PickerEmits = {
  'update:modelValue': [value: any];
  change: [value: any];
  picked: [value: any];
};

export interface PickerOption {
  label: string;
  value: any;
}
