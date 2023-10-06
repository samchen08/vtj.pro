<template>
  <XPanel
    :header='{"content": "标题文本", "icon": "Setting", "more": true}'
    :fit="false"
    :card="false"
    size="default"
    shadow="hover"
    :footer='{"flex": true, "justify": "flex-end"}'>
    <component is="div"> 组件文本内容示例 </component>
    <template #actions="scope_298zcpv5d8i">
      <XAction label="" mode="icon" icon="EditPen" :disabled="false"> </XAction>
      <XAction label="" mode="icon" icon="EditPen" :disabled="false"> </XAction>
      <XAction label="" mode="icon" icon="EditPen" :disabled="false"> </XAction>
    </template>
    <template #footer="scope_298zcpv5d8i">
      <ElButton type="primary"> 按钮 </ElButton>
      <ElButton type="default"> 按钮 </ElButton>
    </template>
  </XPanel>
  <XPanel
    header="面板标题"
    :fit="false"
    :card="true"
    size="default"
    shadow="hover"
    :footer='{"flex": true, "justify": "flex-end"}'>
    <component is="div"> 组件文本内容示例 </component>
    <template #actions="scope_2k9zlm5xws8">
      <XAction label="" mode="icon" icon="EditPen" :disabled="false"> </XAction>
      <XAction label="" mode="icon" icon="EditPen" :disabled="false"> </XAction>
      <XAction label="" mode="icon" icon="EditPen" :disabled="false"> </XAction>
    </template>
    <template #footer="scope_2k9zlm5xws8">
      <ElButton type="primary"> 按钮 </ElButton>
      <ElButton type="default"> 按钮 </ElButton>
    </template>
  </XPanel>
</template>
<script lang="ts">
  import { defineComponent, reactive } from 'vue';
  import { XPanel, XAction } from '@vtj/ui';
  import { ElButton } from 'element-plus';
  import { useProvider } from '@vtj/runtime';
  export default defineComponent({
    name: 'Panel',

    components: { XPanel, XAction, ElButton },

    setup(props) {
      const provider = useProvider();
      const state = reactive({});
      return {
        state,
        props,
        provider
      };
    }
  });
</script>
<style lang="scss" scoped></style>
