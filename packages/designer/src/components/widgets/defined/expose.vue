<template>
  <div>
    <ElSelect size="small" v-model="value" multiple clearable>
      <template #header>
        <ElCheckbox
          v-model="checkAll"
          :indeterminate="indeterminate"
          @change="handleCheckAll">
          全选
        </ElCheckbox>
      </template>
      <ElOptionGroup
        v-for="[group, items] in entries"
        :key="group"
        :label="group">
        <ElOption
          v-for="item in items"
          :key="item"
          :label="item"
          :value="item"></ElOption>
      </ElOptionGroup>
    </ElSelect>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, watch } from 'vue';
  import {
    ElSelect,
    ElCheckbox,
    ElOption,
    ElOptionGroup,
    type CheckboxValueType
  } from 'element-plus';

  export interface Props {
    options: Record<string, string[]>;
    modelValue: string[];
  }

  const props = withDefaults(defineProps<Props>(), {
    options: () => [] as any,
    modelValue: () => []
  });

  const emit = defineEmits<{
    change: [value: string[]];
  }>();

  const checkAll = ref(false);
  const indeterminate = ref(false);
  const value = ref<string[]>(props.modelValue || []);

  const entries = computed(() => Object.entries(props.options));
  const values = computed(() => {
    return entries.value.map((n) => n[1]).flat();
  });
  watch(value, (val) => {
    if (val.length === 0) {
      checkAll.value = false;
      indeterminate.value = false;
    } else if (val.length === values.value.length) {
      checkAll.value = true;
      indeterminate.value = false;
    } else {
      indeterminate.value = true;
    }
    emit('change', [...val]);
  });

  const handleCheckAll = (val: CheckboxValueType) => {
    indeterminate.value = false;
    if (val) {
      value.value = values.value;
    } else {
      value.value = [];
    }
  };
</script>
