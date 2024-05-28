<template>
  <div class="x-grid__filter">
    <ElInput
      size="small"
      placeholder="输入关键字回车筛选"
      clearable
      v-bind="mergeProps"
      v-model="state.option.value"
      @input="onChange"
      @keyup.enter="onKeyup"></ElInput>
  </div>
</template>
<script lang="ts" setup>
  import { reactive, computed } from 'vue';
  import { ElInput } from 'element-plus';
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
    name: 'InputFilter'
  });
</script>
