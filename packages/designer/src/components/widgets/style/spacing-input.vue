<template>
  <div class="v-spacing-input">
    <div class="v-spacing-input__modal"></div>
    <div class="v-spacing-input__content">
      <XContainer
        class="v-spacing-input__body"
        ref="bodyRef"
        direction="column">
        <XContainer>
          <XInputUnit
            v-model="currentValue"
            size="small"
            :with-unit="!!unit"
            :unit="unit"
            :format="unit ? '0' : undefined"
            @change="onValueChange"></XInputUnit>
        </XContainer>
        <XContainer>
          <XContainer v-if="isMargin" class="v-spacing-input__auto" width="20%">
            <span @click="setValue('auto')">auto</span>
          </XContainer>
          <XContainer
            grow
            class="v-spacing-input__values"
            align="center"
            wrap="wrap">
            <span v-for="n in values" @click="setValue(n)">{{ n }}</span>
          </XContainer>
        </XContainer>
        <XContainer>
          <ElButton
            size="small"
            type="primary"
            round
            style="width: 100%"
            @click="onSubmit">
            确定
          </ElButton>
          <ElButton size="small" round style="width: 100%" @click="onReset">
            重置
          </ElButton>
        </XContainer>
      </XContainer>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { XContainer, XInputUnit } from '@vtj/ui';
  import { onClickOutside } from '@vueuse/core';
  import { ElButton } from 'element-plus';
  import { notify } from '../../../utils';

  export interface Props {
    name: string;
    modelValue?: string;
    auto?: boolean;
  }
  const values: number[] = [0, 10, 20, 40, 60, 100, 140, 220];
  const props = defineProps<Props>();
  const emit = defineEmits(['close', 'update:modelValue', 'submit']);
  const isMargin = computed(() => props.auto || props.name.includes('margin'));
  const bodyRef = ref();
  const currentValue = ref<string | undefined>(props.modelValue);

  const unit = ref<string | undefined>('px');

  onClickOutside(bodyRef, () => {
    emit('close');
  });

  const setValue = (value: number | 'auto') => {
    currentValue.value = typeof value === 'number' ? `${value}px` : 'auto';
    onValueChange(currentValue.value);
  };

  const onValueChange = (v?: string | number) => {
    unit.value = v === 'auto' ? undefined : 'px';
  };

  const onSubmit = () => {
    if (currentValue.value) {
      emit('update:modelValue', currentValue.value);
      emit('submit', props.name, currentValue.value);
      emit('close');
    } else {
      notify('请输入有效值', '提示');
    }
  };

  const onReset = () => {
    currentValue.value = undefined;
    emit('update:modelValue', currentValue.value);
    emit('submit', props.name, undefined);
    emit('close');
  };
</script>
