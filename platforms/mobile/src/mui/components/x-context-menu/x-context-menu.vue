<template>
  <view
    v-if="props.modelValue"
    ref="elRef"
    class="x-context-menu"
    @tap.stop="onMaskTap"
    @longpress.stop="onMaskTap">
    <uni-list
      class="x-context-menu__list"
      :class="{ 'has-icon': hasIcon }"
      :style="styles">
      <uni-list-item
        class="x-context-menu__item"
        v-for="item in props.items"
        :key="item.title"
        :title="item.title"
        :disabled="item.disabled"
        @tap="onClick(item)"
        @longpress.stop
        clickable>
        <template v-if="hasIcon" #header>
          <uni-icons
            class="x-context-menu__icon"
            v-bind="getIcon(item.icon)"
            size="20" />
        </template>
      </uni-list-item>
    </uni-list>
  </view>
</template>
<script lang="ts" setup>
  import { nextTick, reactive, watch, computed, ref } from 'vue';
  import type { ContextMenuItem, ContextMenuIcon } from './types';
  import { contextMenuProps } from './props';
  import { getBoundingClientRect } from '../../utils/node';

  const props = defineProps(contextMenuProps);

  const emit = defineEmits<{
    'update:modelValue': [boolean];
    click: [ContextMenuItem];
    show: [];
    hide: [];
  }>();

  const state = reactive({
    width: 0,
    height: 0,
    windowHeight: 0,
    windowTop: 0,
    windowWidth: 0
  });

  const elRef = ref();

  const initState = async () => {
    const rect = await getBoundingClientRect('.x-context-menu__list');
    const { width = 0, height = 0 } = rect || {};
    Object.assign(state, {
      width: width || 0,
      height: height || 0
    });
    const info = uni.getSystemInfoSync();
    const { windowHeight, windowTop, windowWidth } = info;
    Object.assign(state, {
      windowHeight,
      windowTop,
      windowWidth
    });
  };

  const getDisplayPosition = () => {
    const { width, height, windowTop, windowWidth, windowHeight } = state;
    const { x, y } = props.position;
    let left = x - width / 2;
    if (x < width / 2) {
      left = x;
    }
    if (x + width > windowWidth) {
      left = x - width;
    }
    let top = y + windowTop;
    if (y + height + windowTop > windowHeight) {
      top = y - height + windowTop;
    }
    return { left, top };
  };

  const styles = computed(() => {
    const { left, top } = getDisplayPosition();
    return {
      left: `${left}px`,
      top: `${top}px`
    };
  });

  const hasIcon = computed(() => {
    return props.items.some((item) => !!item.icon);
  });

  const getIcon = (
    icon: string | ContextMenuIcon = { type: 'none' }
  ): Record<string, any> => {
    return typeof icon === 'string'
      ? {
          type: icon
        }
      : icon;
  };

  watch(
    () => props.modelValue,
    async (v) => {
      if (v) {
        await nextTick();
        initState();
      }
      v ? emit('show') : emit('hide');
    }
  );

  const onClick = (item: ContextMenuItem) => {
    if (item.disabled) return;
    if (item.click) {
      item.click();
    }
    emit('click', item);
    emit('update:modelValue', false);
  };

  const onMaskTap = () => {
    emit('update:modelValue', false);
  };
</script>
<style lang="scss" scoped>
  .x-context-menu {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 9999;
  }
  .x-context-menu__list {
    position: absolute;
    box-shadow: 0 0 10px $uni-bg-color-mask;
  }
  .x-context-menu__icon {
    width: 20px;
    margin-right: 10px;
  }
</style>
