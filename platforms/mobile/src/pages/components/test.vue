<template>
  <view ref="containerRef" class="container" @touchmove="onTouchMove">
    <view
      class="el"
      ref="elRef"
      @touchstart="onTouchStart"
      @touchend="onTouchEnd"
      :style="styles"></view>
  </view>
</template>
<script lang="ts" setup>
  import { ref, computed } from 'vue';
  const elRef = ref();
  const containerRef = ref();
  const moving = ref<any>(null);
  const position = ref({ x: 0, y: 0 });

  const styles = computed(() => {
    const { x, y } = position.value;
    return {
      left: `${x}px`,
      top: `${y}px`
    };
  });

  const onTouchStart = (e: any) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      const { clientX, clientY } = touch;
      const elRect = elRef.value?.$el.getBoundingClientRect();
      const containerRect = containerRef.value?.$el.getBoundingClientRect();
      const info = uni.getSystemInfoSync();
      moving.value = {
        containerRect,
        elRect,
        diffX: clientX - elRect.left,
        diffY: clientY - elRect.top + info.windowTop
      };
    }
  };

  const onTouchMove = (e: any) => {
    if (!moving.value) return;
    const touch = e.touches[0];
    if (touch) {
      const { diffX, diffY, containerRect, elRect } = moving.value;
      const x = Math.min(
        Math.max(touch.clientX - diffX, 0),
        containerRect.width - elRect.width
      );
      const y = Math.min(
        Math.max(touch.clientY - diffY, 0),
        containerRect.height - elRect.height
      );
      position.value = {
        x,
        y
      };
    }
  };

  const onTouchEnd = (_e: any) => {
    moving.value = null;
  };
</script>

<style lang="scss" scoped>
  .container {
    position: fixed;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 0;
  }
  .el {
    width: 100px;
    height: 100px;
    background-color: red;
    position: absolute;
  }
</style>
