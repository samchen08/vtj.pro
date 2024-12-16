import type { PropType } from 'vue';
import type { ComponentPropsType } from '../shared';
import type {
  IconParam,
  ActionBarItems,
  ActionBarProps,
  ActionProps,
  ActionMenuItem
} from '../';
export const dataItemProps = {
  direction: {
    type: String as PropType<'row' | 'column'>,
    default: 'column'
  },
  imageSrc: {
    type: String
  },
  imageWidth: {
    type: [Number, String]
  },
  imageHeight: {
    type: [Number, String]
  },
  icon: {
    type: [String, Object] as PropType<IconParam>
  },
  title: {
    type: String
  },
  description: {
    type: String
  },
  actions: {
    type: Array as PropType<ActionBarItems>
  },
  actionBarProps: {
    type: Object as PropType<ActionBarProps>
  },
  split: {
    type: Boolean
  },
  onImageClick: {
    type: Function
  },
  onTitleClick: {
    type: Function
  },
  active: {
    type: Boolean
  },
  hover: {
    type: Boolean
  },
  padding: {
    type: Boolean
  }
};

export type DataItemProps = ComponentPropsType<typeof dataItemProps>;

export type DataItemEmits = {
  imageClick: [];
  titleClick: [];
  actionClick: [action: ActionProps];
  actionCommand: [action: ActionProps, menu: ActionMenuItem];
};
