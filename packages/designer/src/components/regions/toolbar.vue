<template>
  <div class="v-toolbar-region">
    <WidgetWrapper
      v-for="widget in widgets"
      ref="widgetsRef"
      :region="region"
      :widget="widget"
      :preview="preview"></WidgetWrapper>
  </div>
</template>
<script lang="ts" setup>
  import { WidgetWrapper } from '../../wrappers';
  import { RegionType } from '../../framework';
  import { useRegion } from '../hooks';

  export interface Props {
    region: RegionType;
    preview?: boolean;
  }

  const props = defineProps<Props>();
  const { widgets, widgetsRef } = useRegion(props.region);

  defineOptions({
    name: 'ToolbarRegion'
  });

  defineExpose({
    widgets,
    widgetsRef
  });
</script>
