<template>
  <ElTabs class="x-tabs" :class="classComputed" v-bind="$attrs">
    <ElTabPane
      v-for="item of props.items"
      :key="item.value ?? item.name"
      v-bind="getTabPane(item)">
      <template #label>
        <slot name="label" v-bind="item">
          <component
            v-if="item.icon"
            class="x-tabs__icon"
            :is="useIcon(item.icon)"></component>
          <div class="x-tabs__label-inner">
            {{ item.label }}
            <div
              class="x-tabs__actions"
              v-if="
                item.actions &&
                [item.name, item.value].includes($attrs.modelValue as any)
              ">
              <XAction
                v-for="action of item.actions"
                mode="icon"
                type="primary"
                size="small"
                circle
                v-bind="action"
                @click="onActionClick"
                @command="onActionCommand"></XAction>
            </div>
          </div>
        </slot>
      </template>
      <slot v-bind="item">
        <component
          v-if="item.component"
          :is="item.component"
          v-bind="item.props"></component>
      </slot>
    </ElTabPane>
  </ElTabs>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';
  import { ElTabs, ElTabPane } from 'element-plus';
  import { XAction, type ActionProps, type ActionMenuItem } from '../';
  import { tabsProps, type TabsItem, type TabsEmits } from './types';
  import { useIcon } from '../../hooks';

  defineOptions({
    name: 'XTabs'
  });

  const props = defineProps(tabsProps);
  const emit = defineEmits<TabsEmits>();
  const getTabPane = (item: TabsItem) => {
    const { label, name, value, disabled, closable, lazy } = item;
    return {
      label,
      name: value ?? name,
      disabled,
      closable,
      lazy
    };
  };

  const classComputed = computed(() => {
    return {
      'is-no-border': !props.border
    };
  });

  const onActionClick = (e: ActionProps) => {
    emit('actionClick', e);
  };

  const onActionCommand = (e: ActionMenuItem) => {
    emit('actionCommand', e);
  };
</script>
