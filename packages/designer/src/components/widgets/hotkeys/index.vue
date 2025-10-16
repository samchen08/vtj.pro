<template>
  <XAction
    label="⌘ 快捷键"
    mode="text"
    size="small"
    :menus="menus"
    :dropdown="{ placement: 'top-end' }"
    @command="onCommand">
    <template #item="{ item }">
      <div class="v-hotkeys-item">
        <span>{{ item.label }}</span>
        <span class="v-hotkeys-item__value">{{ item.value }}</span>
      </div>
    </template>
  </XAction>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';
  import { XAction, type ActionMenuItem } from '@vtj/ui';
  import { hotkeysOptions, hotkeysTrigger } from '../../hooks';
  import { useEngine } from '../../../framework';

  defineOptions({
    name: 'HotkeysWidget',
    inheritAttrs: false
  });

  const engine = useEngine();

  const isSelected = computed(() => {
    return !!engine.simulator.designer.value?.selected.value;
  });

  const menus = computed(() => {
    const index = hotkeysOptions.findIndex((n) => !!n.divided);
    return hotkeysOptions.map((n: ActionMenuItem, i) => {
      if (isSelected.value) {
        n.disabled = false;
      } else {
        if (i >= index) {
          n.disabled = true;
        }
      }
      return n;
    });
  });

  const onCommand = (item: ActionMenuItem) => {
    const key = (item.command as string).split(',')[0];
    if (key) {
      hotkeysTrigger(key);
    }
  };
</script>
