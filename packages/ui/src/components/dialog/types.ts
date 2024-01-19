import type {
  PropType,
  VNode,
  DefineComponent,
  ComponentInternalInstance
} from 'vue';
import type { Position } from '@vueuse/core';
import type { ComponentPropsType, BaseSize } from '../shared';
import type { IconParam } from '../';
import type {
  DraggableOptions,
  ResizableOptions,
  UseMouseInElementReturn
} from '../../directives';

export type DialogMode = 'normal' | 'maximized' | 'minimized';

export const dialogProps = {
  modelValue: {
    type: Boolean,
    default: true
  },
  title: {
    type: String
  },
  subtitle: {
    type: String
  },
  icon: {
    type: [String, Object] as PropType<IconParam>
  },
  size: {
    type: String as PropType<BaseSize>,
    default: 'default'
  },
  width: {
    type: [Number, String],
    default: '70%'
  },
  height: {
    type: [Number, String],
    default: '70%'
  },
  left: {
    type: [Number, String]
  },
  top: {
    type: [Number, String]
  },
  modal: {
    type: Boolean,
    default: true
  },
  draggable: {
    type: [Boolean, Object] as PropType<boolean | DraggableOptions>,
    default: true
  },
  resizable: {
    type: [Boolean, Object] as PropType<boolean | ResizableOptions>
  },
  closable: {
    type: Boolean,
    default: true
  },
  maximizable: {
    type: Boolean,
    default: false
  },
  minimizable: {
    type: Boolean,
    default: false
  },
  mode: {
    type: String as PropType<DialogMode>,
    default: 'normal'
  },
  content: {
    type: Object as PropType<
      VNode | DefineComponent<any, any, any, any> | Record<string, any>
    >
  },
  src: {
    type: String
  },
  componentInstance: {
    type: Object as PropType<Record<string, any> | null>
  },
  beforeClose: {
    type: Function as PropType<() => boolean | Promise<boolean>>
  },
  submit: {
    type: [Boolean, String]
  },
  cancel: {
    type: [Boolean, String]
  },
  bodyPadding: {
    type: Boolean,
    default: true
  },
  primary: {
    type: Boolean
  }
};

export type DialogProps = ComponentPropsType<typeof dialogProps>;

export type DialogEmits = {
  'update:modelValue': [value: boolean];
  open: [instance: ComponentInternalInstance];
  close: [];
  destroy: [];
  maximized: [];
  minimized: [];
  normal: [];
  modeChange: [mode: DialogMode];
  dragStart: [position: Position];
  dragging: [position: Position];
  dragEnd: [position: Position];
  resizeStart: [dir: string, mie: UseMouseInElementReturn];
  resizeEnd: [dir: string, mie: UseMouseInElementReturn];
  resizing: [dir: string, mie: UseMouseInElementReturn];
  submit: [];
  cancel: [];
};

export interface DialogState {
  mode: DialogMode;
  wrapperWidth: number;
  wrapperHeight: number;
  width: number;
  height: number;
  left: number;
  top: number;
  zIndex: number;
  dragging: boolean;
  resizing: boolean;
}
