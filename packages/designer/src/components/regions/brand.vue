<template>
  <div class="v-brand-region">
    <WidgetWrapper
      v-for="widget in widgets"
      ref="widgetsRef"
      :region="region"
      :widget="widget"></WidgetWrapper>
  </div>
</template>
<script lang="ts" setup>
  import { WidgetWrapper } from '../../wrappers';
  import { RegionType } from '../../framework';
  import { useRegion } from '../hooks';

  export interface Props {
    region: RegionType;
  }

  const props = defineProps<Props>();
  const { widgets, widgetsRef } = useRegion(props.region);

  defineOptions({
    name: 'BrandRegion',
    inheritAttrs: false
  });

  defineExpose({
    widgets,
    widgetsRef
  });
</script>
