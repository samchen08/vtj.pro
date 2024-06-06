<template>
  <ElSelect
    ref="selectRef"
    class="x-picker"
    :teleported="false"
    placeholder="输入关键字回车查询"
    :disabled="disabled"
    filterable
    clearable
    :multiple="props.multiple"
    collapse-tags
    collapse-tags-tooltip
    :reserve-keyword="false"
    :suffix-icon="MoreFilled"
    @keydown.capture.enter="onEnter"
    @click="onClick"
    v-model="current"
    v-bind="attrs">
    <ElOption v-for="n in options" :label="n.label" :value="n.value"></ElOption>
  </ElSelect>
  <Dialog
    v-if="dialogVisible"
    v-model="dialogVisible"
    :grid-props="props.gridProps"
    :form-props="props.formProps"
    :form-model="formModel"
    :columns="columns"
    :fields="props.fields"
    :loader="dataLoader"
    :multiple="props.multiple"
    :onPick="onPick"
    v-bind="props.dialogProps"></Dialog>
</template>
<script lang="ts" setup>
  import { ref, useAttrs, computed, nextTick } from 'vue';
  import { ElSelect, ElOption } from 'element-plus';
  import { MoreFilled } from '@vtj/icons';
  import Dialog from './Dialog.vue';
  import { pickerProps } from './props';
  import type { PickerEmits, PickerLoader } from './types';
  import { useOptions, useGridColumns } from './hooks';

  const props = defineProps(pickerProps);
  const emit = defineEmits<PickerEmits>();
  const attrs = useAttrs();
  const dialogVisible = ref(false);
  const selectRef = ref();
  const formModel = ref<Record<string, any>>({});
  const { options, setOptions, current } = useOptions(props, emit);
  const columns = useGridColumns(props);

  const disabled = computed(() => {
    return dialogVisible.value ? true : !!props.disabled;
  });

  const setDefaultQuery = async () => {
    if (props.defaultQuery) {
      const query = await props.defaultQuery();
      Object.assign(formModel.value, query || {});
    }
  };

  const dataLoader: PickerLoader = (params: any) => {
    params.form = formModel.value;
    if (props.loader) {
      return props.loader(params);
    }
    return {
      list: [],
      total: 0
    };
  };

  const focus = () => {
    selectRef.value?.focus();
  };

  const blur = () => {
    selectRef.value?.blur();
  };

  const onEnter = async (e: any) => {
    const inputValue = e.target.value;
    focus();
    await setDefaultQuery();
    if (props.queryKey) {
      formModel.value[props.queryKey] = inputValue;
    }
    if (!props.multiple && props.preload) {
      const res = await dataLoader({});
      // 有且只有一条数据，自动返回，不打开弹窗
      if (res?.list && res.list.length === 1) {
        onPick(res.list[0]);
      } else {
        dialogVisible.value = true;
      }
    } else {
      dialogVisible.value = true;
    }
  };
  const onClick = async (e: any) => {
    if (props.disabled) return;
    const tags = ['I', 'SVG', 'PATH'];
    if (tags.includes(e.target.nodeName.toUpperCase())) {
      blur();
      await setDefaultQuery();
      dialogVisible.value = true;
    }
  };

  const onPick = async (rows: any) => {
    setOptions(rows, props.multiple && props.append);
    dialogVisible.value = false;
    emit('picked', rows);
    await nextTick();
    focus();
  };

  defineOptions({
    name: 'XPicker',
    inheritAttrs: false
  });

  defineExpose({
    focus,
    blur,
    disabled,
    options,
    setOptions,
    current
  });
</script>
