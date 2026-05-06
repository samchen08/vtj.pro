export const test_27 = `
<template>
  <div class="main-layout">
    <div class="page-content">
      <RouterView />
    </div>
    <div class="tab-bar">
      <div class="tab-item" v-for="(tab, idx) in state.tabs" :key="idx" :class="{ active: state.activeTab === tab.path }" @click="state.switchTab(tab.path)">
        <VanIcon :name="tab.icon" :size="22" :color="state.activeTab === tab.path ? '#667eea' : '#999'"></VanIcon>
        <span class="tab-label" :class="{ active: state.activeTab === tab.path }">{{ tab.title }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, reactive } from 'vue';
import { useProvider } from '@vtj/renderer';
import { Icon } from 'vant';
export default defineComponent({
  name: 'MainLayout',
  components: { VanIcon: Icon },
  setup(props) {
    const provider = useProvider({ id: 'vj6w05mm', version: '' });
    const state = reactive({
      switchTab(path) {
        state.activeTab = path;
        this.$router.push(path);
      }
    });
    return { state, props, provider };
  },
  created() {
    this.state.activeTab = this.$route.path;
  }
});
</script>
<style lang="css" scoped>

</style>
`;
