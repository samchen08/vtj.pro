export const test_21 = `
<template>
  <div class="wechat-container">

    <!-- 聊天显示区域 -->
    <div class="chat-display" v-if="state.activeChat !== null">


    </div>

    <!-- 空白状态 -->
    <div class="empty-state" v-else>

    </div>
  </div>
</template>

<script>
  import { defineComponent, reactive } from 'vue';
  import { useProvider } from '@vtj/renderer';
  export default defineComponent({
    name: 'WeChatApp',
    setup(props) {
      const provider = useProvider({ id: '14pfoadz', version: '' });
      const state = reactive({

      });
      return { state, props, provider };
    }
  });
</script>

<style lang="css" scoped>
  
</style>

`;
