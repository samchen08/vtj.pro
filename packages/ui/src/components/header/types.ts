import { PropType } from 'vue';
import { IconParam } from '../icon';
import { ComponentPropsType, BaseSize } from '../shared';

export const headerProps = {
  size: {
    type: String as PropType<BaseSize>,
    default: 'default'
  },
  content: {
    type: String,
    default: ''
  },
  subtitle: {
    type: String
  },
  icon: {
    type: [String, Object] as PropType<IconParam>
  },
  border: {
    type: Boolean
  },
  more: {
    type: Boolean
  }
};

export type HeaderProps = ComponentPropsType<typeof headerProps>;

export type HeaderEmits = {
  click: [];
};
