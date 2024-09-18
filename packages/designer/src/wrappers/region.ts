import { ref, defineComponent, h, type PropType } from 'vue';
import { RegionType } from '../framework';
import { regions } from '../components';

export const RegionWrapper = defineComponent({
  name: 'RegionWrapper',
  props: {
    region: {
      type: String as PropType<keyof typeof RegionType>,
      required: true
    }
  },
  setup() {
    const regionRef = ref();
    return {
      regionRef
    };
  },
  render() {
    const { $props = {}, $attrs = {} } = this as any;
    const component = (regions as any)[this.region] || regions.EmptyRegion;
    return h(component, { ...$props, ...$attrs, ref: 'regionRef' });
  }
});

export type RegionWrapperInstance = InstanceType<typeof RegionWrapper>;
