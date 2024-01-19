<template>
  <XDialog
    class="v-slots-picker"
    title="选择插槽"
    width="600px"
    :height="height"
    submit
    cancel
    @submit="submit"
    v-bind="$attrs">
    <ElAlert
      title="该组件支持多个插槽，请选择放置到其中一个"
      type="warning"
      :closable="false"></ElAlert>
    <XContainer
      class="v-slots-picker__content"
      justify="space-around"
      alignContent="flex-start"
      gap
      wrap="wrap">
      <XContainer
        v-for="(slot, index) in props.slots"
        class="v-slots-picker__item"
        :class="{ 'is-active': slot.name === active?.name }"
        grow
        :flex="false"
        @click="onClick(slot)">
        <span class="v-slots-picker__sn">#{{ index + 1 }}</span> {{ slot.name }}
      </XContainer>
    </XContainer>
  </XDialog>
</template>
<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { ElAlert } from 'element-plus';
  import { XDialog, XContainer } from '@vtj/ui';
  import { type MaterialSlot } from '@vtj/core';
  import { notify } from '../../utils';

  export interface Props {
    slots?: MaterialSlot[];
  }

  const props = withDefaults(defineProps<Props>(), {
    slots: () => []
  });
  const emit = defineEmits(['submit', 'update:modelValue']);
  const active = ref<MaterialSlot>();
  const height = computed(() => {
    const rows = Math.ceil(props.slots.length / 4);
    return `${50 * rows + 180}px`;
  });

  const onClick = (slot: MaterialSlot) => {
    active.value = slot;
  };

  const submit = () => {
    if (active.value) {
      emit('submit', active.value);
      emit('update:modelValue', false);
    } else {
      notify('请选择插槽');
    }
  };
</script>
