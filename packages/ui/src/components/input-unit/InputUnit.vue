<template>
  <ElInput
    v-model.trim="currentValue"
    class="x-input-unit"
    @change="onValueChange">
    <template v-if="unitOptions.length" #append>
      <ElSelect
        class="x-input-unit__unit"
        v-model="currentUnit"
        :size="($attrs as any).size"
        :style="{ width: `${props.appendWidth}px` }"
        v-bind="$props.selectProps"
        @change="onUnitChange">
        <ElOption
          v-for="option in unitOptions"
          :key="option.value"
          :label="option.label"
          :value="option.value"></ElOption>
      </ElSelect>
    </template>
    <template v-else #suffix>
      <div v-if="currentUnit" class="x-input-unit__unit">
        <span>{{ currentUnit }}</span>
      </div>
    </template>
  </ElInput>
</template>
<script lang="ts" setup>
  import { computed, ref, watch } from 'vue';
  import { ElInput, ElSelect, ElOption } from 'element-plus';
  import { toArray, numberFormat, dedupArray } from '@vtj/utils';
  import { inputUnitProps, type InputUnitEmits } from './types';

  const props = defineProps(inputUnitProps);
  const emit = defineEmits<InputUnitEmits>();

  const unitOptions = computed(() => {
    const array = toArray(props.units);
    return array.map((name) => {
      return typeof name === 'string' ? { label: name, value: name } : name;
    });
  });

  const units = computed(() => {
    const values: string[] = unitOptions.value.map((n) => n.value);
    if (props.unit) {
      values.push(props.unit);
    }

    return dedupArray(values);
  });

  const currentUnit = ref<string | undefined>();
  const currentValue = ref<string | number | undefined>();

  const formatValue = (value?: string | number) => {
    if (props.format && value) {
      return numberFormat(Number(value) || 0, props.format);
    }
    return value;
  };

  const parser = (value?: string | number) => {
    if (!props.withUnit || typeof value !== 'string')
      return { value: formatValue(value), unit: props.unit };
    for (const n of units.value) {
      const regex = new RegExp(`${n}$`);
      if (regex.test(value)) {
        return {
          value: formatValue(value.toString().replace(regex, '')),
          unit: n
        };
      }
    }
    return { value: formatValue(value), unit: props.unit };
  };

  const getValue = () => {
    const value = formatValue(currentValue.value);
    const unit = currentUnit.value;
    return props.withUnit && value && unit ? `${value}${unit}` : value;
  };

  watch(
    () => props.modelValue,
    (v) => {
      const { value, unit } = parser(v);
      currentUnit.value = unit;
      currentValue.value = value;
    },
    {
      immediate: true
    }
  );

  watch(currentValue, (v) => {
    emit('change', v);
  });

  const onValueChange = async () => {
    const { value, unit } = parser(getValue());
    currentValue.value = value;
    currentUnit.value = unit;
    emit('update:modelValue', getValue());
  };

  const onUnitChange = () => {
    emit('unit-change', currentUnit.value);
    onValueChange();
  };

  defineOptions({
    name: 'XInputUnit'
  });

  defineExpose({
    parser,
    formatValue
  });
</script>
