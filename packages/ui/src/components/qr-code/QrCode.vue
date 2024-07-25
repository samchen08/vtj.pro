<template>
  <div class="x-qr-code" :style="comptedStyle">
    <img v-if="image" class="x-qr-code__code" :src="image" />
    <div v-if="isExpired" class="x-qr-code__expired">
      <div class="x-qr-code__refresh">
        <XIcon :icon="Refresh" @click="refresh" :size="32"></XIcon>
        <!-- <Refresh @click="refresh" class="x-qr-code__refresh"></Refresh> -->
        刷新
      </div>

      <div class="x-qr-code__tip">
        <slot name="tip">{{ props.tip }}</slot>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref, computed, watch, onUnmounted } from 'vue';
  import { XIcon } from '../icon';
  import { Refresh } from '@vtj/icons';
  import qrcode from 'qrcode';
  import type { QrCodeProps, QrCodeEmits, QrCodeContentLoader } from './types';

  const props = withDefaults(defineProps<QrCodeProps>(), {
    size: 200,
    tip: '二维码已失效，请刷新重试'
  });

  const emit = defineEmits<QrCodeEmits>();

  const image = ref('');
  const isExpired = ref(false);
  let timer: any;
  const comptedStyle = computed(() => {
    const size = props.size + 'px';
    return {
      width: size,
      height: size
    };
  });

  const draw: any = async (content: string | QrCodeContentLoader) => {
    const value = typeof content === 'function' ? await content() : content;
    if (!value) {
      console.warn('QrCode content is empty');
      image.value = '';
      return;
    }
    qrcode.toDataURL(
      value,
      { margin: 0, scale: 10, ...props.options },
      (err, url) => {
        if (err) {
          console.warn('QrCode', err);
          return;
        }
        image.value = url;
        if (props.expired) {
          isExpired.value = false;
          setExpired();
        }
        emit('draw', url);
      }
    );
  };

  const setExpired = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      isExpired.value = true;
      emit('expired');
    }, props.expired);
  };

  const refresh = () => {
    if (props.content) {
      draw(props.content);
    }
  };

  watch(() => props.content, draw, { immediate: true });

  onUnmounted(() => {
    if (timer) {
      clearTimeout(timer);
    }
  });

  defineExpose({
    refresh
  });
</script>
