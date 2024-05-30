<template>
  <XContainer
    v-if="current && context"
    class="v-defined-widget"
    direction="column"
    fit>
    <Panel
      class="v-sub-panel"
      title="定义属性"
      size="small"
      plus
      :fit="false"
      @plus="onPropsPlug">
      <Item
        v-for="item in blockProps"
        :model-value="item"
        :title="item.name"
        border
        :actions="['edit', 'remove']"
        @click="onPropsEdit(item)"
        @action="onPropsAction"></Item>
      <ElEmpty v-if="!blockProps.length" :image-size="50"></ElEmpty>
      <DefinedPropsDialog
        v-if="visibleProps"
        :current="current"
        :context="context"
        v-model="visibleProps"
        :item="currentPropItem"></DefinedPropsDialog>
    </Panel>
    <Panel
      class="v-sub-panel"
      title="定义事件"
      size="small"
      plus
      :fit="false"
      @plus="onEventsPlus">
      <Item
        v-for="item in blockEvents"
        :model-value="item"
        :title="item.name"
        border
        :actions="['remove']"
        @click="onEventsEdit(item)"
        @action="onEventsAction"></Item>
      <ElEmpty v-if="!blockEvents.length" :image-size="50"></ElEmpty>
      <DefinedEventsDialog
        v-if="visibleEvents"
        v-model="visibleEvents"
        :current="current"
        :context="context"
        :item="currentEventItem"></DefinedEventsDialog>
    </Panel>
    <Panel
      class="v-sub-panel"
      title="定义插槽"
      size="small"
      plus
      :fit="false"
      @plus="onSlotsPlus">
      <Item
        v-for="item in blockSlots"
        :model-value="item"
        :title="item.name"
        border
        :actions="['remove']"
        @click="onSlotsEdit(item)"
        @action="onSlotsAction"></Item>
      <ElEmpty v-if="!blockSlots.length" :image-size="50"></ElEmpty>
      <DefinedSlotsDialog
        v-if="visibleSlots"
        v-model="visibleSlots"
        :current="current"
        :context="context"
        :item="currentSlotItem"></DefinedSlotsDialog>
    </Panel>
    <Panel
      class="v-sub-panel"
      title="注入"
      size="small"
      plus
      :fit="false"
      grow
      @plus="onInjectsPlus">
      <Item
        v-for="item in blockInjects"
        :model-value="item"
        :title="item.name"
        border
        :actions="['remove']"
        @click="onInjectsEdit(item)"
        @action="onInjectsAction"></Item>
      <ElEmpty v-if="!blockInjects.length" :image-size="50"></ElEmpty>
      <DefinedInjectsDialog
        v-if="visibleInjects"
        v-model="visibleInjects"
        :current="current"
        :context="context"
        :item="currentInjectItem"></DefinedInjectsDialog>
    </Panel>
  </XContainer>
</template>
<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { XContainer } from '@vtj/ui';
  import { ElEmpty } from 'element-plus';
  import {
    type BlockProp,
    type BlockInject,
    type BlockSlot,
    type BlockEmit
  } from '@vtj/core';
  import { Panel, Item } from '../../shared';
  import { useCurrent } from '../../hooks';
  import DefinedPropsDialog from './props.vue';
  import DefinedEventsDialog from './events.vue';
  import DefinedSlotsDialog from './slots.vue';
  import DefinedInjectsDialog from './injects.vue';

  defineOptions({
    name: 'DefinedWidget'
  });

  const { current, context } = useCurrent();

  const blockProps = computed(() => {
    return (current.value?.props || []).map((item) => {
      return typeof item === 'string' ? { name: item } : item;
    });
  });

  const blockEvents = computed<BlockEmit[]>(() => {
    return (current.value?.emits || []).map((n) => {
      return typeof n === 'string' ? { name: n, params: [] } : n;
    });
  });

  const blockSlots = computed<BlockSlot[]>(() => {
    return (current.value?.slots || []).map((n) => {
      return typeof n === 'string' ? { name: n, params: [] } : n;
    });
  });

  const blockInjects = computed(() => {
    return current.value?.inject || [];
  });

  const visibleProps = ref(false);
  const currentPropItem = ref<BlockProp>();
  const visibleEvents = ref(false);
  const currentEventItem = ref<BlockEmit>();
  const visibleSlots = ref(false);
  const currentSlotItem = ref<BlockSlot>();
  const visibleInjects = ref(false);
  const currentInjectItem = ref<BlockInject>();

  const onPropsPlug = () => {
    currentPropItem.value = undefined;
    visibleProps.value = true;
  };

  const onPropsAction = (action: any) => {
    const { name, modelValue } = action;
    if (name === 'edit') {
      onPropsEdit(modelValue);
    }
    if (name === 'remove') {
      current.value?.removeProp(modelValue);
    }
  };

  const onPropsEdit = (item: any) => {
    currentPropItem.value = item;
    visibleProps.value = true;
  };

  const onEventsPlus = () => {
    currentEventItem.value = undefined;
    visibleEvents.value = true;
  };

  const onEventsEdit = (item: any) => {
    currentEventItem.value = { ...item };
    visibleEvents.value = true;
  };

  const onEventsAction = (action: any) => {
    const { name, modelValue } = action;
    if (name === 'edit') {
      onEventsEdit(modelValue);
    }
    if (name === 'remove') {
      current.value?.removeEmit(modelValue.name);
    }
  };

  const onSlotsPlus = () => {
    currentSlotItem.value = undefined;
    visibleSlots.value = true;
  };

  const onSlotsEdit = (item: any) => {
    currentSlotItem.value = { ...item };
    visibleSlots.value = true;
  };

  const onSlotsAction = (action: any) => {
    const { name, modelValue } = action;
    if (name === 'edit') {
      onSlotsEdit(modelValue);
    }
    if (name === 'remove') {
      current.value?.removeSlot(modelValue.name);
    }
  };

  const onInjectsPlus = () => {
    currentInjectItem.value = undefined;
    visibleInjects.value = true;
  };

  const onInjectsEdit = (item: any) => {
    currentInjectItem.value = item;
    visibleInjects.value = true;
  };

  const onInjectsAction = (action: any) => {
    const { name, modelValue } = action;
    if (name === 'edit') {
      onInjectsEdit(modelValue);
    }
    if (name === 'remove') {
      current.value?.removeInject(modelValue);
    }
  };
</script>
