import { defineComponent, ref, h } from 'vue';
import { toArray, logger } from '@vtj/utils';
import { useEngine, RegionType } from '../framework';
import { Skeleton } from '../components';
import { widgetManager } from '../managers';
import { type RegionWrapperInstance } from './region';
import { type WidgetWrapperInstance } from './widget';

export const SkeletonWrapper = defineComponent({
  name: 'SkeletonWrapper',
  setup() {
    const skeletonRef = ref();
    const engine = useEngine();
    const widgets = ref<Record<string, WidgetWrapperInstance>>({});
    if (!engine?.remote) {
      widgetManager.removeRemoteWidgets();
    }
    if (engine.options.noMask) {
      widgetManager.unregister('ProjectConfig');
    }
    return {
      skeletonRef,
      engine,
      widgets
    };
  },
  mounted() {
    this.engine.skeleton = this as any;
  },
  render() {
    const { $props = {}, $attrs = {} } = this as any;
    return h(Skeleton, { ...$props, ...$attrs, ref: 'skeletonRef' });
  },
  methods: {
    /**
     * 获取区域wrapper组件实例
     * @param region
     * @returns
     */
    getRegion(region: keyof typeof RegionType): RegionWrapperInstance {
      return this.skeletonRef[region.toLowerCase()] as RegionWrapperInstance;
    },
    /**
     * 切换应用区域折叠或展开
     */
    toggleCollapse(value?: boolean) {
      if (this.skeletonRef) {
        const collapsed = this.skeletonRef.collapsed;
        this.skeletonRef.collapsed = value ?? !collapsed;
      }
    },
    /**
     * 控制设置区域隐藏或显示
     * @param val
     */
    settable(val: boolean) {
      if (this.skeletonRef) {
        this.skeletonRef.settable = val;
      }
    },

    /**
     * 获取区域内的 widget wrapper 实例数组
     * @param region
     * @returns
     */
    getWidgets(region: keyof typeof RegionType): WidgetWrapperInstance[] {
      const regionWrapper = this.getRegion(region);
      return regionWrapper
        ? (toArray(
            regionWrapper.regionRef?.widgetsRef || []
          ) as WidgetWrapperInstance[])
        : [];
    },
    /**
     * 根据widget 名称获取 widget wrapper 实例
     * @param name
     * @returns
     */
    getWidget(name: string): WidgetWrapperInstance | undefined {
      const widget = widgetManager.get(name);
      if (!widget) {
        logger.warn(`widget [ ${name} ] is not exsit`);
        return;
      }
      const wrappers = this.getWidgets(widget.region);
      return wrappers.find((n) => n.widget.name === name);
    },
    openPreview(_id: string) {
      if (this.skeletonRef) {
        this.skeletonRef.isPreview = true;
      }
    },
    closePreview() {
      if (this.skeletonRef) {
        this.skeletonRef.isPreview = false;
      }
    }
  }
});

export type SkeletonWrapperInstance = InstanceType<typeof SkeletonWrapper>;
