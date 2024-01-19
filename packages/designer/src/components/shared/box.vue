<template>
  <div
    class="v-box"
    :class="classes"
    :draggable="draggable"
    @dragstart="onDragStart"
    @dragend="onDragEnd">
    <XContainer direction="column" justify="center" align="center">
      <span class="v-box__name">{{ props.name }}</span>
      <span class="v-box__label">{{ props.title }}</span>
    </XContainer>
    <XContainer
      v-if="props.editable"
      class="v-box__footer"
      justify="flex-end"
      align="center">
      <XIcon :icon="VtjIconEdit" @click="onEdit"></XIcon>
      <XIcon :icon="VtjIconRemove" @click="onRemove"></XIcon>
    </XContainer>
  </div>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';
  import { XContainer, XIcon } from '@vtj/ui';
  import { VtjIconEdit, VtjIconRemove } from '@vtj/icons';
  import { ElMessageBox } from 'element-plus';

  export interface Props {
    name: string;
    title: string;
    editable?: boolean;
    active?: boolean;
    draggable?: boolean;
  }

  const props = defineProps<Props>();
  const emits = defineEmits(['edit', 'remove', 'dragstart', 'dragend']);
  const onEdit = () => {
    emits('edit');
  };

  const onRemove = async () => {
    const ret = await ElMessageBox.confirm('确认删除？', '提示', {
      type: 'warning'
    }).catch(() => false);
    if (ret) {
      emits('remove');
    }
  };

  const classes = computed(() => {
    return {
      'is-active': props.active,
      'is-draggable': props.draggable
    };
  });

  const onDragStart = () => {
    emits('dragstart', props);
  };

  const onDragEnd = () => {
    emits('dragend', props);
  };

  defineOptions({
    name: 'VBox'
  });
</script>
