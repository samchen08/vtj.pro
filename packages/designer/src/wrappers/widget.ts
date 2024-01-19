import { ref, defineComponent, h, type PropType } from 'vue';
import { type Widget, RegionType } from '../framework';

export const WidgetWrapper = defineComponent({
  name: 'WidgetWrapper',
  props: {
    region: {
      type: String as PropType<RegionType>,
      required: true
    },
    widget: {
      type: Object as PropType<Widget>,
      required: true
    }
  },
  setup() {
    const widgetRef = ref();
    return {
      widgetRef
    };
  },
  render() {
    return h(this.widget.component, {
      ...this.widget.props,
      ...this.$props,
      ...this.$attrs,
      ref: 'widgetRef'
    });
  }
});

export type WidgetWrapperInstance = InstanceType<typeof WidgetWrapper>;
