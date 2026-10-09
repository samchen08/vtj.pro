<template>
  <XDialog
    class="v-add-component"
    title="添加组件"
    role="dialog"
    aria-modal="true"
    aria-label="添加组件"
    maximizable
    resizable
    cancel
    width="800px"
    @keydown.esc.stop="close"
    @close="close">
    <div class="v-add-component__content">
      <div class="v-add-component__destination">
        <div class="v-add-component__target">
          <span class="v-add-component__label">目标组件</span>
          <div class="v-add-component__identity">
            <strong>{{ target.name }}</strong>
            <span class="v-add-component__id">{{ target.id }}</span>
          </div>
        </div>
        <div
          v-if="
            !isBlock(target) && (slots.length || slotsLoading || slotsError)
          "
          class="v-add-component__slots">
          <label class="v-add-component__label" for="vtj-add-slot">
            组件插槽
          </label>
          <ElSelect
            v-if="slots.length || slotsLoading"
            id="vtj-add-slot"
            v-model="slotName"
            aria-label="组件插槽"
            placeholder="请选择组件插槽"
            :loading="slotsLoading"
            :disabled="pending || slotsLoading">
            <ElOption
              v-for="slot in slots"
              :key="slot.name"
              :label="`#${slot.name}`"
              :value="slot.name" />
          </ElSelect>
          <div v-if="slotsError" class="v-add-component__error">
            <span role="alert">{{ slotsError }}</span>
            <ElButton link type="primary" @click="loadSlots">重试</ElButton>
          </div>
        </div>
      </div>
      <ElInput
        v-model="searchKey"
        placeholder="搜索组件"
        aria-label="搜索组件"
        clearable>
        <template #prefix><VtjIconSearch /></template>
      </ElInput>
      <div v-if="searchKey" class="v-add-component__results">
        <div class="v-add-component__grid">
          <Box
            v-for="desc in searchResult"
            :key="desc.name"
            class="v-add-component__option"
            :name="desc.name"
            :title="desc.label || desc.name"
            :icon="desc.icon"
            :active="selected === desc"
            @click="selectComponent(desc)" />
        </div>
        <ElEmpty v-if="!searchResult.length" description="未找到匹配组件" />
      </div>
      <XTabs v-else :items="tabs" v-model="currentTab">
        <ElCollapse v-if="currentGroup" v-model="model[currentTab]">
          <ElCollapseItem
            v-for="group in currentGroup.children"
            :key="group.name"
            :name="group.name"
            :title="`${group.label} (${group.count})`">
            <div class="v-add-component__grid">
              <Box
                v-for="desc in group.components"
                :key="desc.name"
                class="v-add-component__option"
                :name="desc.name"
                :title="desc.label || desc.name"
                :icon="desc.icon"
                :active="selected === desc"
                @click="selectComponent(desc)" />
            </div>
          </ElCollapseItem>
        </ElCollapse>
        <ElEmpty v-else description="暂无可用组件" />
      </XTabs>
    </div>
    <template #handle>
      <ElButton
        type="primary"
        :disabled="!canSubmit"
        :loading="pending"
        @click="submit">
        插入
      </ElButton>
    </template>
  </XDialog>
</template>
<script lang="ts" setup>
  import { computed, onUnmounted, ref, shallowRef, watch } from 'vue';
  import {
    ElButton,
    ElCollapse,
    ElCollapseItem,
    ElEmpty,
    ElInput,
    ElMessage,
    ElOption,
    ElSelect
  } from 'element-plus';
  import {
    isBlock,
    type BlockModel,
    type MaterialDescription,
    type MaterialSlot,
    type NodeModel
  } from '@vtj/core';
  import { XDialog, XTabs } from '@vtj/ui';
  import { VtjIconSearch } from '@vtj/icons';
  import { useAssets, useSelected } from '../hooks';
  import Box from './box.vue';

  const props = defineProps<{ target: NodeModel | BlockModel }>();
  const emit = defineEmits<{ close: [] }>();
  const { engine, designer } = useSelected();
  const { tabs, currentTab, currentGroup, model, searchKey, searchResult } =
    useAssets();
  const selected = shallowRef<MaterialDescription>();
  const pending = ref(false);
  const slots = shallowRef<MaterialSlot[]>([]);
  const slotName = ref<string>('default');
  const slotsLoading = ref(false);
  const slotsError = ref('');
  const selectedSlot = computed(() =>
    slots.value.find((slot) => slot.name === slotName.value)
  );
  const canSubmit = computed(
    () =>
      !!selected.value &&
      !pending.value &&
      !slotsLoading.value &&
      !slotsError.value &&
      (!slots.value.length || !!selectedSlot.value)
  );
  let active = true;
  let slotsRequest = 0;

  const selectComponent = (desc: MaterialDescription) => {
    if (active && !pending.value) selected.value = desc;
  };

  const loadSlots = async () => {
    const request = ++slotsRequest;
    slots.value = [];
    slotName.value = 'default';
    slotsError.value = '';
    slotsLoading.value = false;
    if (isBlock(props.target)) return;
    if (!designer.value) {
      slotsError.value = '设计器尚未就绪，请稍后重试';
      return;
    }
    slotsLoading.value = true;
    try {
      const result = await designer.value.getAvailableSlots(props.target);
      if (!active || request !== slotsRequest) return;
      slots.value = result;
      if (result.length === 1) slotName.value = result[0].name;
    } catch (error) {
      if (active && request === slotsRequest) {
        slotsError.value =
          error instanceof Error ? error.message : '读取组件插槽失败，请重试';
      }
    } finally {
      if (request === slotsRequest) slotsLoading.value = false;
    }
  };

  watch([() => props.target, designer], loadSlots, {
    immediate: true
  });

  const close = () => {
    active = false;
    emit('close');
  };

  onUnmounted(() => {
    active = false;
  });
  watch(engine.current, close);

  const submit = async () => {
    if (!selected.value || !canSubmit.value) return;
    if (!designer.value) {
      ElMessage.warning('设计器尚未就绪，请稍后重试');
      return;
    }
    pending.value = true;
    try {
      const node = await designer.value.addComponent(
        selected.value,
        props.target,
        { isActive: () => active, slot: selectedSlot.value }
      );
      if (node && active) close();
    } catch (error) {
      if (active) {
        ElMessage.warning(
          error instanceof Error ? error.message : '插入失败，请重试'
        );
      }
    } finally {
      pending.value = false;
    }
  };
</script>
<style lang="scss" scoped>
  .v-add-component {
    &__content {
      display: flex;
      flex-direction: column;
      gap: 12px;
      height: 100%;
      min-height: 0;
    }

    &__destination {
      display: flex;
      align-items: flex-start;
      flex-wrap: wrap;
      gap: 16px 24px;
      padding: 12px 16px;
      border: 1px solid var(--el-border-color-lighter);
      border-radius: var(--el-border-radius-base);
      background: var(--el-fill-color-light);
    }

    &__target {
      flex: 1 1 200px;
      min-width: 0;
    }

    &__label {
      display: block;
      margin-bottom: 6px;
      color: var(--el-text-color-regular);
      font-size: var(--el-font-size-extra-small);
      line-height: 18px;
    }

    &__identity {
      display: flex;
      align-items: baseline;
      flex-wrap: wrap;
      gap: 4px 8px;
      min-height: 32px;
      padding: 5px 0;
      box-sizing: border-box;
      overflow-wrap: anywhere;
      line-height: 22px;

      strong {
        color: var(--el-text-color-primary);
        font-weight: 600;
      }
    }

    &__id {
      color: var(--el-text-color-secondary);
      font-size: var(--el-font-size-extra-small);
      font-family: var(--el-font-family-monospace, monospace);
    }

    &__results {
      flex: 1;
      min-height: 0;
      overflow: auto;
    }

    &__slots {
      flex: 0 1 240px;
      min-width: 0;
      max-width: 100%;

      .el-select {
        width: 100%;
      }
    }

    &__error {
      display: flex;
      align-items: baseline;
      gap: 8px;
      color: var(--el-color-danger);
      overflow-wrap: anywhere;
    }

    &__grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(min(140px, 100%), 1fr));
      gap: 8px;
    }

    &__option {
      min-width: 0;
      margin: 0;
      cursor: pointer;

      &:focus-visible {
        outline: 2px solid var(--el-color-primary);
        outline-offset: 2px;
      }

      &[aria-disabled='true'] {
        cursor: not-allowed;
        opacity: 0.5;
      }
    }

    :deep(.x-tabs) {
      flex: 1;
      min-height: 0;
      overflow: hidden;
      margin-bottom: 0;
    }

    :deep(.el-tabs__content) {
      overflow: auto;
    }
  }
</style>
