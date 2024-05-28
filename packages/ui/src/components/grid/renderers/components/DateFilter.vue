<template>
  <div class="x-grid__filter x-grid__DateFilter">
    <ElDatePicker
      size="small"
      placeholder="选择日期筛选"
      value-format="YYYY-MM-DD"
      clearable
      v-bind="mergeProps"
      v-model="state.option.value"
      @change="onChange"
      @keyup.enter="onKeyup"></ElDatePicker>
  </div>
</template>
<script lang="ts" setup>
  import { reactive, computed } from 'vue';
  import { ElDatePicker } from 'element-plus';
  import type { VxeGlobalRendererHandles } from '../../types';

  export interface Props {
    params: VxeGlobalRendererHandles.RenderFilterParams;
    renderOpts: VxeGlobalRendererHandles.RenderFilterOptions;
  }

  const props = defineProps<Props>();

  const mergeProps = computed(() => {
    return {
      ...props.renderOpts.props,
      ...props.renderOpts.events
    };
  });

  const state = reactive({
    option: null as any
  });

  const load = () => {
    const { params } = props;
    if (params) {
      const { column } = params;
      const option = column.filters[0];
      state.option = option;
    }
  };

  const onChange = () => {
    const { params } = props;
    const { option } = state;
    if (params && option) {
      const { $panel } = params;
      const checked = !!option.value;
      $panel.changeOption(null, checked, option);
    }
  };

  const onKeyup = (e: any) => {
    const { params } = props;
    if (params) {
      const { $panel } = params;
      $panel.confirmFilter(e);
    }
  };

  load();

  defineOptions({
    name: 'DateFilter'
  });
</script>
