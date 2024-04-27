<template>
  <ElInput
    v-model="inputValue"
    class="x-image-code-input"
    :maxlength="maxlength"
    :placeholder="props.placeholder">
    <!-- 图片 -->
    <template #prepend>
      <img
        class="x-image-code-input__image"
        :class="imgClass"
        @click="handleRefreshImage"
        :src="imageValue" />
    </template>
    <!-- 状态图标 -->
    <template #suffix>
      <XIcon
        class="x-image-code-input__iconSuccess"
        v-if="status === 'success'"
        :icon="SuccessFilled"
        :size="IconSize">
      </XIcon>
      <XIcon
        v-if="status === 'error'"
        class="x-image-code-input__iconError"
        :icon="CircleCloseFilled"
        :size="IconSize">
      </XIcon>
    </template>
  </ElInput>
</template>

<script lang="ts" setup>
  import { ref, useAttrs, computed, watch } from 'vue';
  import { ElInput } from 'element-plus';
  import { SuccessFilled, CircleCloseFilled } from '@vtj/icons';
  import { XIcon } from '../icon';
  import { imageCodeInputProps } from './types';

  defineOptions({
    name: 'XImageCodeInput'
  });

  const props = defineProps(imageCodeInputProps);
  const attrs = useAttrs();

  // 状态 icon
  const status = ref<string>();
  const imageValue = ref();

  const runImgFn = async () => {
    if (typeof props.image === 'function') {
      imageValue.value = await props.image();
    }
  };
  runImgFn();

  // 验证码图片大小
  const IconSize = ref<number>();
  const imgClass = computed(() => {
    const size: string = (attrs.size as string) || 'default';
    const map: Record<string, number> = {
      small: 22,
      default: 30,
      large: 38
    };
    IconSize.value = map[size];
    console.log(IconSize.value);

    return {
      [`is-${size}`]: !!size
    };
  });

  const inputValue = ref('');
  const maxlength = ref<number>(props.maxLength);
  let validate: Function;
  if (typeof props.validate === 'function') {
    validate = props.validate;
  }

  const handleRefreshImage = () => {
    runImgFn();
    inputValue.value = '';
  };

  // watch 值的长度 变化
  watch(
    inputValue,
    async () => {
      if (inputValue.value.length === maxlength.value) {
        const res: boolean = await validate(inputValue.value);
        res ? (status.value = 'success') : (status.value = 'error');
      } else {
        status.value = '';
      }
    },
    { immediate: true }
  );
</script>

<!--* 
  用户 ==> 传入 图片Fn  传入 检验方法
  组件调用  图片Fn  

  用户 ==>  输入 值   
  组件 ==>  判断输入值长度是否等于maxLength
          是 ==> 调用传入的校验方法


  组件 图片被点击
  调用 图片Fn

 -->
