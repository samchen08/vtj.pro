<template>
  <ElInput
    class="x-captcha"
    :placeholder="props.placeholder"
    :maxlength="props.maxlength"
    v-model="modelValue"
    clearable>
    <template #prepend>
      <img :src="image" @click="updateImage" />
    </template>
    <template #suffix>
      <XIcon
        v-if="status === true"
        class="x-captcha--success"
        :icon="SuccessFilled"
        color="green"></XIcon>
      <XIcon
        v-if="status === false"
        class="x-captcha--error"
        :icon="CircleCloseFilled"></XIcon>
    </template>
  </ElInput>
</template>
<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import { ElInput } from 'element-plus';
  import { XIcon } from '../icon';
  import { SuccessFilled, CircleCloseFilled } from '@vtj/icons';
  import type { CaptchaProps } from './types';

  defineOptions({
    name: 'XCaptcha'
  });

  const props = withDefaults(defineProps<CaptchaProps>(), {
    maxlength: 4,
    placeholder: '请输入图形验证码'
  });

  const modelValue = defineModel({ type: String });
  const image = ref<string>('');
  const status = ref<boolean>();

  const updateImage = async () => {
    image.value = props.src ? await props.src() : '';
    status.value = undefined;
  };

  watch(() => props.src, updateImage, { immediate: true });

  watch(modelValue, async (v: string = '') => {
    // 触发校验
    if (v.length === props.maxlength) {
      if (props.validate) {
        status.value = await props.validate(v);
      }
    } else {
      status.value = undefined;
    }
  });
</script>
