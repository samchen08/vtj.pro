<template>
  <XContainer
    class="x-data-item"
    :direction="props.direction"
    :class="classComputed">
    <XContainer
      v-if="props.imageSrc || $slots.image"
      class="x-data-item__img"
      :onClick="props.onImageClick ? onImageClick : undefined">
      <slot name="image">
        <ElImage
          v-if="props.imageSrc"
          :style="imageStyle"
          :src="props.imageSrc"></ElImage>
      </slot>
    </XContainer>
    <XContainer class="x-data-item__content" direction="column" grow shrink>
      <XContainer
        class="x-data-item__section x-data-item__wrapper"
        align="center"
        v-if="props.title || $slots.title"
        :onClick="props.onTitleClick ? onTitleClick : undefined">
        <component
          class="x-data-item__icon"
          v-if="props.icon"
          :is="useIcon(props.icon)"></component>
        <span class="x-data-item__title">
          <slot name="title">
            {{ props.title }}
          </slot>
        </span>
      </XContainer>
      <div
        class="x-data-item__section x-data-item__desc"
        v-if="props.description || $slots.description">
        <slot name="description">
          {{ props.description }}
        </slot>
      </div>
      <div
        v-if="$slots.default"
        class="x-data-item__section x-data-item__extra">
        <slot></slot>
      </div>
      <div
        v-if="props.actions || props.actionBarProps || $slots.actions"
        class="x-data-item__section x-data-item__actions">
        <slot name="actions">
          <XActionBar
            v-bind="actionBar"
            @click="onActionClick"
            @command="onActionCommand"></XActionBar>
        </slot>
      </div>
    </XContainer>
  </XContainer>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';
  import { ElImage } from 'element-plus';
  import { dataItemProps, DataItemEmits } from './types';
  import { getSizeValue } from '../../utils';
  import { useIcon } from '../../hooks';
  import {
    XContainer,
    XActionBar,
    ActionBarProps,
    ActionProps,
    ActionMenuItem
  } from '../';

  const props = defineProps(dataItemProps);
  const emit = defineEmits<DataItemEmits>();
  defineOptions({
    name: 'XDataItem'
  });

  const imageStyle = computed(() => {
    const { imageWidth, imageHeight } = props;
    return {
      width: imageWidth ? getSizeValue(imageWidth) : undefined,
      height: imageHeight ? getSizeValue(imageHeight) : undefined
    };
  });

  const classComputed = computed(() => {
    return {
      [`is-image-${props.direction}`]: !!props.direction,
      'is-split': !!props.split
    };
  });

  const actionBar = computed<ActionBarProps>(() => {
    return {
      size: 'small',
      mode: 'text',
      justify: 'flex-end',
      type: 'info',
      items: props.actions,
      ...props.actionBarProps
    };
  });

  const onImageClick = () => emit('imageClick');
  const onTitleClick = () => emit('titleClick');
  const onActionClick = (action: ActionProps) => emit('actionClick', action);
  const onActionCommand = (action: ActionProps, menu: ActionMenuItem) =>
    emit('actionCommand', action, menu);
</script>
