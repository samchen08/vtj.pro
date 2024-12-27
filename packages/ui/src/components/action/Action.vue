<template>
  <div
    class="x-action"
    :class="classes"
    :draggable="draggable"
    @dragstart="onDragStart"
    @dragend="onDragEnd">
    <component :is="action"></component>
  </div>
</template>

<script lang="ts" setup>
  import { computed, markRaw, h, type VNode, toRef, toRaw } from 'vue';
  import {
    ElBadge,
    ElTooltip,
    ElDropdown,
    ElDropdownMenu,
    ElDropdownItem
  } from 'element-plus';
  import { actionProps, type ActionEmits } from './types';
  import { useTooltip, useBadge, useDropdown } from './hooks';
  import Trigger from './Trigger.vue';
  import { useDisabled } from '../../hooks';

  defineOptions({
    name: 'XAction'
  });

  const props = defineProps(actionProps);
  const slots = defineSlots();
  const emit = defineEmits<ActionEmits>();

  const tooltip = useTooltip(props);
  const badge = useBadge(props);
  const dropdown = useDropdown(props);
  const disabled = useDisabled(toRef(props, 'disabled'));
  const draggable = computed(() => !!props.draggable && !disabled.value);

  const classes = computed(() => {
    return {
      [`x-action--${props.mode}`]: !!props.mode
    };
  });

  const onClick = () => {
    if (disabled.value) return;
    emit('click', toRaw(props));
  };

  const onCommand = (command: any) => {
    if (disabled.value) return;
    const item = props.menus?.find((n) => n.command === command);
    if (item) {
      emit('command', toRaw(item));
    }
  };

  const onDragStart = (e: any) => {
    if (!draggable) return;
    emit('dragstart', toRaw(props), e);
  };

  const onDragEnd = (e: any) => {
    if (!draggable) return;
    emit('dragend', toRaw(props), e);
  };

  const wrapBadge = (node: VNode | VNode[]) => {
    return h(ElBadge, badge.value, () => ([] as VNode[]).concat(node));
  };

  // todo: waring
  // invoked outside of the render function: this will not track dependencies used in the slot.
  // Invoke the slot function inside the render function
  const wrapDropdown = (node: VNode) => {
    return h(
      ElDropdown,
      { ...dropdown.value, disabled: disabled.value, onCommand },
      {
        default: () => [node],
        dropdown: () => [
          h(ElDropdownMenu, () =>
            (props.menus || []).map((item, index) => {
              return h(ElDropdownItem, item, () =>
                slots.item ? slots.item({ item, index }) : item.label
              );
            })
          )
        ]
      }
    );
  };

  const wrapTooltip = (node: VNode) => {
    return h(ElTooltip, { ...tooltip.value, disabled: disabled.value }, () => [
      node
    ]);
  };

  const action = computed(() => {
    let vnode: VNode = h(markRaw(Trigger), { ...props, onClick });
    const children = slots.default?.();
    if (children && children.length) {
      vnode = children[0];
    }

    if (badge.value) {
      vnode = wrapBadge(vnode);
    }
    if (dropdown.value) {
      vnode = wrapDropdown(vnode);
    }
    if (tooltip.value) {
      vnode = wrapTooltip(vnode);
    }

    return vnode;
  });
</script>
