import { PropType, DefineComponent } from 'vue';
import { IconParam } from '../icon';
import { ComponentPropsType, BaseSize } from '../shared';

export interface FieldEditor {
  name: string | DefineComponent<any, any, any, any>;
  props?: Record<string, any>;
}

export const fieldProps = {
  editor: {
    type: [String, Object]
  }
};

export type FieldProps = ComponentPropsType<typeof fieldProps>;

export type FieldEmits = {};
