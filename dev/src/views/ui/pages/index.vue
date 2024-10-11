<template>
  <div>
    <h3>ID: {{ route.query.id }}</h3>
    <h4>tab: {{ tab?.url }}</h4>
    <div>
      <ElInput v-model="inputValue"></ElInput>
      <ElButton @click="onClick">Button</ElButton>
      <ElButton @click="onNewPage">New Page</ElButton>
      <ElButton @click="closeCurrentTab">closeCurrentTab</ElButton>
      <ElButton @click="closeSelf">close</ElButton>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref, onActivated, onDeactivated } from 'vue';
  import { ElInput, ElButton } from 'element-plus';
  import { useRoute, useRouter } from 'vue-router';
  import { defineTab } from '@vtj/ui';
  const route = useRoute();
  const router = useRouter();
  const inputValue = ref('');
  const onClick = () => {
    router.push('/ui/mask/subpage');
  };

  defineOptions({
    name: 'InnerPage'
  });

  const { tab, mask } = defineTab();

  const onNewPage = () => {
    router.push('/ui/pages/index?t=' + Date.now());
  };

  onActivated(() => {
    console.log('onActivated', tab.value?.url);
  });

  onDeactivated(() => {
    console.log('onDeactivated', tab.value?.url);
  });

  const closeCurrentTab = () => {
    mask.closeCurrnetTab('/ui/mask/page?id=3203422');
  };

  const closeSelf = async () => {
    console.log('close', tab.value);
    await mask.close(tab);
    router.push('/ui/mask/page?id=3203422');
  };

  // console.log('page tab', tab);

  // defineExpose({
  //   defineTab
  // });
</script>
