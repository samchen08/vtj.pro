<template>
  <XContainer class="x-action-bar" align="center">
    <template v-for="item in actions">
      <ElDivider
        v-if="item === '|'"
        direction="vertical"
        class="x-action-bar__divider"></ElDivider>
      <XAction
        v-else
        :mode="props.mode"
        :size="props.size"
        :type="props.type"
        :circle="props.circle"
        :background="props.background"
        :button="props.button"
        :dropdown="props.dropdown"
        :disabled="useDisabled(props.disabled, item).value"
        v-bind="item"
        @click="onClick"
        @command="onCommand(item, $event as ActionMenuItem)"></XAction>
    </template>
  </XContainer>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';
  import { XContainer, XAction, ActionProps, ActionMenuItem } from '../';
  import { useDisabled } from '../../hooks';
  import { actionBarProps, ActionBarEmits, ActionBarItems } from './types';
  import { ElDivider } from 'element-plus';
  defineOptions({
    name: 'XActionBar'
  });

  const props = defineProps(actionBarProps);
  const emit = defineEmits<ActionBarEmits>();
  const actions = computed<ActionBarItems>(() => {
    return (props.items || []).map((item) => {
      if (item === '|') return item;
      return {
        ...item,
        badge: item.badge
          ? {
              ...props.badge,
              ...(typeof item.badge === 'object'
                ? item.badge || {}
                : { value: item.badge })
            }
          : undefined,
        tooltip: item.tooltip
          ? {
              ...props.tooltip,
              ...(typeof item.tooltip === 'object'
                ? item.tooltip || {}
                : { content: item.tooltip })
            }
          : undefined
      };
    });
  });

  const onClick = (action: ActionProps) => {
    emit('click', action);
  };

  const onCommand = (action: ActionProps, item: ActionMenuItem) => {
    emit('command', action, item);
  };
</script>
