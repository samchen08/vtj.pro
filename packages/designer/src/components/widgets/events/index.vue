<template>
  <XContainer class="v-events-widget" direction="column" fit>
    <Panel title="组件事件" class="v-sub-panel" size="small" :fit="false">
      <ElEmpty
        v-if="!componentEventList.length"
        :image-size="50"
        description="该组件无自带事件"></ElEmpty>
      <Item
        v-for="item in componentEventList"
        :title="item.name"
        :model-value="item"
        border
        small
        :actions="item.event ? ['edit', 'remove'] : ['edit']"
        :active="!!item.event"
        @click="onEdit(item)"
        @action="onAction"></Item>
    </Panel>
    <Panel title="鼠标事件" class="v-sub-panel" size="small" :fit="false">
      <Item
        v-for="item in mouseEventList"
        :title="item.name"
        :model-value="item"
        border
        small
        :actions="item.event ? ['edit', 'remove'] : ['edit']"
        :active="!!item.event"
        @click="onEdit(item)"
        @action="onAction"></Item>
    </Panel>
    <Panel title="键盘事件" class="v-sub-panel" size="small" grow :fit="false">
      <Item
        v-for="item in keyboardEventList"
        :title="item.name"
        :model-value="item"
        border
        small
        :actions="item.event ? ['edit', 'remove'] : ['edit']"
        :active="!!item.event"
        @click="onEdit(item)"
        @action="onAction"></Item>
    </Panel>
    <EventBinder
      v-if="visible"
      v-model="visible"
      :context="context"
      :current="current"
      :name="currentItem.name"
      :event="currentItem.event"
      :submitMethod="onEventSubmit"
      @unbind="onEventRemove"></EventBinder>
  </XContainer>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { XContainer } from '@vtj/ui';
  import { ElEmpty } from 'element-plus';
  import { type NodeEvent, NodeModel } from '@vtj/core';
  import { cloneDeep } from '@vtj/utils';
  import { Panel, Item } from '../../shared';
  import { useCurrent, useSelected, useNodeEvents } from '../../hooks';
  import { EventBinder } from '../../binders';
  import { confirm, expressionValidate } from '../../../utils';

  export interface EventDataItem {
    name: string;
    event?: NodeEvent;
  }

  defineOptions({
    name: 'EventsWidget'
  });

  const { current, context } = useCurrent();
  const { selected } = useSelected();
  const { mouseEventList, keyboardEventList, componentEventList } =
    useNodeEvents(selected);

  const currentItem = ref<EventDataItem>({
    name: '',
    event: undefined
  });

  const visible = ref(false);

  const onEdit = (item: any) => {
    currentItem.value = cloneDeep(item);
    visible.value = true;
  };

  const onEventSubmit = async (data: any) => {
    const nodeEvent: NodeEvent = {
      ...data,
      modifiers: data.modifiers.reduce((prev: any, next: any) => {
        prev[next] = true;
        return prev;
      }, {})
    };
    if (!expressionValidate(nodeEvent.handler, context.value, true))
      return false;
    const node = selected.value?.model as NodeModel;
    node.setEvent(nodeEvent);
    return true;
  };

  const remove = async (item: EventDataItem) => {
    const node = selected.value?.model as NodeModel;
    if (item.name) {
      node.removeEvent(item.name);
      visible.value = false;
    }
  };

  const onEventRemove = async () => {
    if (currentItem.value.name) {
      const ret = await confirm('确定要删除该事件吗？');
      if (ret) {
        remove(currentItem.value);
      }
    }
  };

  const onAction = (action: any) => {
    const { name, modelValue } = action;
    if (name === 'edit') {
      onEdit(modelValue);
    }
    if (name === 'remove') {
      remove(modelValue);
    }
  };
</script>
