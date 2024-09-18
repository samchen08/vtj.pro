<template>
  <component
    ref="elRef"
    class="x-container"
    :is="props.tag"
    :class="className"
    :style="style">
    <slot></slot>
  </component>
</template>

<script lang="ts" setup>
  import {
    ref,
    computed,
    getCurrentInstance,
    useAttrs,
    type ComputedRef
  } from 'vue';
  import { containerProps, type ContainerInstance } from './types';
  import { getSizeValue } from '../../utils';

  defineOptions({
    name: 'XContainer'
  });

  const props = defineProps(containerProps);
  const attrs = useAttrs();
  const instance = getCurrentInstance();

  const elRef = ref();
  const $vtjEl = computed(() => elRef.value?.$el);

  const parentFlex: ComputedRef<boolean> = computed(() => {
    const parent = instance?.parent;
    if (!parent) return false;
    const proxy = parent.proxy as ContainerInstance;
    return proxy.$options.name === 'XContainer' || !!proxy.flex;
  });

  const className = computed(() => {
    return {
      'is-fit': props.fit,
      'is-flex': props.flex && !props.inline,
      'is-inline-flex': props.flex && props.inline,
      [`is-direction-${props.direction}`]:
        props.flex && props.direction !== 'row',
      [`is-wrap-${props.wrap}`]: props.flex && props.wrap !== 'nowrap',
      [`is-justify-${props.justify}`]:
        props.flex && props.justify !== 'flex-start',
      [`is-align-${props.align}`]: props.flex && props.align !== 'flex-start',
      [`is-align-content-${props.alignContent}`]:
        props.flex && props.alignContent !== 'stretch',
      'is-grow': props.grow ?? parentFlex.value,
      'is-shrink': props.shrink,
      [`is-align-self-${props.alignSelf}`]:
        parentFlex.value && props.alignSelf !== 'auto',
      [`is-overflow-${props.overflow}`]: !!props.overflow,
      'is-padding': !!props.padding,
      'is-pointer': props.autoPointer && !!attrs.onClick,
      'is-gap': !!props.gap
    };
  });

  const style = computed(() => {
    const { width, height, fit } = props;
    if (fit) return null;
    return {
      width: !!width ? getSizeValue(width) : undefined,
      height: !!height ? getSizeValue(height) : undefined
    };
  });

  defineExpose({
    $vtjEl
  });
</script>
