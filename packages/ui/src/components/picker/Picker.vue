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
    :suffix-icon="VtjIconCheck"
    @keydown.capture.enter.stop.prevent="onEnter"
    v-model="current"
    v-bind="attrs">
    <ElOption v-for="n in options" :label="n.label" :value="n.value"></ElOption>
    <template #prefix>
      <div class="x-picker__tigger" @click="onClick">
        <MoreFilled></MoreFilled>
      </div>
    </template>
  </ElSelect>
  <Dialog
    v-if="dialogVisible && props.loader"
    ref="dialogRef"
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
  import {
    ref,
    useAttrs,
    computed,
    nextTick,
    watch,
    onMounted,
    onUnmounted
  } from 'vue';
  import { ElSelect, ElOption } from 'element-plus';
  import { MoreFilled, VtjIconCheck } from '@vtj/icons';
  import Dialog from './Dialog.vue';
  import { pickerProps } from './props';
  import type { PickerEmits, PickerLoader, PickerState } from './types';
  import { useOptions, useGridColumns, useModel } from './hooks';

  const props = defineProps(pickerProps);
  const emit = defineEmits<PickerEmits>();
  const attrs = useAttrs();
  const dialogVisible = ref(false);
  const selectRef = ref();
  const dialogRef = ref();

  const { options, setOptions, current } = useOptions(props, emit);
  const { formModel } = useModel(props);
  const columns = useGridColumns(props);

  const disabled = computed(() => {
    return dialogVisible.value ? true : !!props.disabled;
  });

  const dataLoader: PickerLoader = (params: PickerState) => {
    if (props.loader) {
      params.form = formModel.value;
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
    if (props.disabled) return;
    const inputValue = e.target.value;
    if (props.queryKey) {
      formModel.value[props.queryKey] = inputValue;
    }
    focus();
    if (props.beforeInit) {
      await props.beforeInit();
    }
    if (props.preload) {
      const res = await dataLoader({});
      // 有且只有一条数据，自动返回，不打开弹窗
      if (res?.list && res.list.length === 1) {
        blur();
        onPick(res.list[0]);
      } else {
        dialogVisible.value = true;
      }
    } else {
      blur();
      dialogVisible.value = true;
    }
  };
  const onClick = async () => {
    if (props.disabled) return;
    blur();
    if (props.beforeInit) {
      await props.beforeInit();
    }
    dialogVisible.value = true;
  };

  const onPick = async (rows: any) => {
    setOptions(rows, props.multiple && props.append);
    dialogVisible.value = false;
    emit('picked', rows, props.data);
    await nextTick();
    focus();
  };

  watch(
    () => props.queryKey,
    (newKey, oldKey) => {
      if (newKey && oldKey) {
        const lastValue = formModel.value[oldKey];
        if (typeof lastValue !== 'undefined') {
          formModel.value[newKey] = lastValue;
          delete formModel.value[oldKey];
        }
      }
    }
  );

  watch(dialogVisible, (v) => {
    if (!v) {
      formModel.value = {};
    }
  });

  onMounted(() => {
    if (selectRef.value?.wrapperRef) {
      selectRef.value.wrapperRef.appendChild(selectRef.value.prefixRef);
    }
  });

  onUnmounted(() => {
    if (selectRef.value?.wrapperRef) {
      selectRef.value.wrapperRef.appendChild(selectRef.value.prefixRef);
    }
  });

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
    current,
    visible: dialogVisible,
    dialogRef,
    formModel
  });
</script>
