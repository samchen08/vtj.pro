<template>
  <XHeader
    content="标题文本内容"
    subtitle="子标题描述文字"
    icon="DataBoard"
    :border="true"
    :more="true"
    size="large">
    <template #actions="scope">
      <XAction label="操作" size="default" icon="EditPen" mode="icon">
      </XAction>
      <XAction label="操作" size="default" icon="EditPen" mode="icon">
      </XAction>
      <XAction label="操作" size="default" icon="EditPen" mode="icon">
      </XAction>
    </template>
  </XHeader>
</template>
<script lang="ts">
  import { defineComponent, reactive } from 'vue';
  import { XHeader, XAction } from '@vtj/ui';
  import { useProvider } from '@vtj/runtime';
  export default defineComponent({
    name: 'Header',

    components: { XHeader, XAction },

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
