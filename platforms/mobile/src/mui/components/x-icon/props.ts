import { type PropType } from 'vue';

export const iconProps = {
  name: {
    type: [String, Object] as PropType<string | Record<string, any>>
  },
  size: {
    type: Number,
    default: 24
  },
  color: {
    type: String
  },
  src: String
};
