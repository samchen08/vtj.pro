<template>
  <XPanel class="v-tabs" :border="false" fit :radius="false">
    <template #header>
      <div class="v-tabs__header">
        <XTabs
          class="v-tabs__tabs"
          :items="props.items"
          type="card"
          v-model="currentTab"
          @tab-remove="handelTabRemove"
          @action-click="onTabActionClick"
          :stretch="props.stretch"></XTabs>
        <div v-if="props.menus && props.menus.length" class="v-tabs__actions">
          <XAction
            v-if="props.menus && props.menus.length"
            mode="icon"
            size="small"
            :icon="MoreFilled"
            background="hover"
            :dropdown="{
              size: 'small',
              placement: 'bottom-end'
            }"
            :menus="props.menus"
            @command="handleCommand">
            <template #item="{ item }">
              <span>
                <VtjIconCheck
                  :class="{
                    'v-tabs__checked': true,
                    'is-checked': item.checked
                  }"
                  v-if="props.checkable"></VtjIconCheck>
                {{ item.label }}
              </span>
            </template>
          </XAction>
        </div>
      </div>
    </template>
    <slot></slot>
  </XPanel>
</template>
<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import {
    XPanel,
    XTabs,
    XAction,
    type TabsItem,
    type ActionMenuItem
  } from '@vtj/ui';
  import { MoreFilled, VtjIconCheck } from '@vtj/icons';

  export interface Props {
    items?: TabsItem[];
    menus?: ActionMenuItem[];
    modelValue?: string;
    stretch?: boolean;
    checkable?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    items: () => []
  });

  const emit = defineEmits([
    'update:modelValue',
    'command',
    'remove',
    'action-click'
  ]);

  const currentTab = ref<string | number>(
    (props.modelValue || props.items[0]?.name) ?? ''
  );

  watch(currentTab, () => {
    emit('update:modelValue', currentTab.value);
  });

  watch(
    () => props.modelValue,
    (name) => {
      currentTab.value = name as string;
    }
  );

  const handleCommand = (command: any) => {
    emit('command', command);
  };
  const handelTabRemove = (name: any) => {
    emit('remove', name);
  };

  const onTabActionClick = (e: any) => {
    emit('action-click', e);
  };
</script>
