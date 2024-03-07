<template>
  <view v-if="props.modelValue" class="x-image-viewer">
    <view class="x-image-viewer__mask"></view>
    <movable-area
      class="x-image-viewer__container"
      :scale-area="true"
      @click="onClickMask">
      <movable-view
        class="x-image-viewer__content"
        direction="all"
        :style="viewStyle"
        :disabled="!props.movable"
        :scale="props.scalable"
        :x="position.x"
        :y="position.y"
        @change="onChange"
        @scale="onScale">
        <image
          class="x-image-viewer__image"
          :src="props.src"
          mode="aspectFit"
          :draggable="false"
          @click.stop="onClickImage" />
      </movable-view>
    </movable-area>
  </view>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';
  import { imageViewerProps } from './props';

  import { useRect } from '../../hooks';

  const props = defineProps(imageViewerProps);
  const emit = defineEmits<{
    click: [];
    'update:modelValue': [boolean];
    change: [unknown];
    scale: [unknown];
  }>();
  const imageRect = useRect('.x-image-viewer__image', this);
  const containerRect = useRect('.x-image-viewer__container', this);

  const position = computed(() => {
    if (containerRect.value && imageRect.value) {
      const { width: W = 0, height: H = 0 } = containerRect.value;
      const { width: w = 0, height: h = 0 } = imageRect.value;
      return {
        y: (H - h) / 2,
        x: (W - w) / 2
      };
    }
    return {
      x: 0,
      y: 0
    };
  });

  const viewStyle = computed(() => {
    return {
      width: `${imageRect.value?.width}px`,
      height: `${imageRect.value?.height}px`
    };
  });

  const onChange = (e: any) => {
    emit('change', e);
  };

  const onScale = (e: any) => {
    emit('scale', e);
  };

  const onClickImage = () => {
    emit('click');
  };

  const onClickMask = () => {
    emit('update:modelValue', false);
  };
</script>
<style lang="scss" scoped>
  .x-image-viewer {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
  }

  .x-image-viewer__mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.4);
  }
  .x-image-viewer__container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
