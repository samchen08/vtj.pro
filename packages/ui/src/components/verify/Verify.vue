<template>
  <ElInput
    v-model="modelValue"
    :placeholder="props.placeholder"
    :maxlength="props.maxlength"
    class="x-verify">
    <template #suffix>
      <ElDivider direction="vertical"></ElDivider>
      <span v-if="waiting">
        重新获取 <strong>{{ currentCount }}</strong> 秒
      </span>

      <ElLink v-else type="primary" :underline="false" @click.stop="send">
        获取验证码
      </ElLink>
    </template>
  </ElInput>
</template>
<script lang="ts" setup>
  import { ref, onUnmounted } from 'vue';
  import { ElInput, ElLink, ElDivider } from 'element-plus';
  import type { VerifyProps } from './types';

  defineOptions({
    name: 'XVerify'
  });

  const props = withDefaults(defineProps<VerifyProps>(), {
    seconds: 60,
    maxlength: 6,
    placeholder: '请输入验证码'
  });

  const modelValue = defineModel({ type: String });
  const waiting = ref(false);
  const currentCount = ref(0);
  let _timer: any = null;
  const send = async () => {
    if (props.api) {
      const ret = await props.api().catch(() => false);
      if (ret) {
        waiting.value = true;
        currentCount.value = props.seconds;
        tick();
      }
    }
  };

  const tick = () => {
    --currentCount.value;
    if (currentCount.value <= 0) {
      waiting.value = false;
    } else {
      _timer = setTimeout(tick, 1000);
    }
  };

  onUnmounted(() => {
    if (_timer) {
      clearTimeout(_timer);
    }
  });

  defineExpose({
    send
  });
</script>
