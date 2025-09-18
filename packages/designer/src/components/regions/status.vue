<template>
  <div class="v-status-region">
    <div class="v-status-region__left">
      <WidgetWrapper
        v-for="widget in leftWidgets"
        ref="widgetsRef"
        :region="region"
        :widget="widget"></WidgetWrapper>
    </div>
    <div class="v-status-region__right">
      <WidgetWrapper
        v-for="widget in rightWidget"
        ref="widgetsRef"
        :region="region"
        :widget="widget"></WidgetWrapper>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';
  import { WidgetWrapper } from '../../wrappers';
  import { RegionType, WidgetGroup } from '../../framework';
  import { useRegion } from '../hooks';

  export interface Props {
    region: RegionType;
  }

  const props = defineProps<Props>();
  const { widgets, widgetsRef } = useRegion(props.region);

  const leftWidgets = computed(() => {
    return widgets.value.filter((n) => n.group === WidgetGroup.Left);
  });

  const rightWidget = computed(() => {
    return widgets.value.filter((n) => n.group === WidgetGroup.Right);
  });

  defineOptions({
    name: 'StatusRegion',
    inheritAttrs: false
  });

  defineExpose({
    widgets,
    widgetsRef
  });
</script>
