export const uni_16 = `
<template>
  <view 
        class="tab-item" 
        :class="{ active: state.activeTab === 'home' }" 
        @click="switchTab('home')"
      >
        <text>首页</text>
      </view>
</template>

<script>
import { defineComponent, reactive } from 'vue';
import { useProvider } from '@vtj/uni-app';

export default defineComponent({
  name: 'MainApp',
  setup(props) {
    const provider = useProvider({ id: '14pmiz59', version: '' });
    const state = reactive({
      activeTab: 'home'
     
    });
    return { state, props, provider };
  }

});
</script>

<style lang="css" scoped>

</style>
`;
