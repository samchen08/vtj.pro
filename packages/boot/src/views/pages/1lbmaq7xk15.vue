<template>
  <XForm>
    <XField name="title" label="标题"> </XField>
    <XField
      name="type"
      label="分类"
      editor="select"
      :options='[{"label":"类别一","value":1},{"label":"类别二","value":2},{"label":"类别三","value":3}]'>
    </XField>
  </XForm>
  <XDialog title="弹窗标题"> </XDialog>
</template>
<script lang="ts">
  import { defineComponent, reactive } from 'vue';
  import { XForm, XField, XDialog } from '@vtj/ui';
  import { useProvider } from '@vtj/runtime';
  export default defineComponent({
    name: 'FormFields',

    components: { XForm, XField, XDialog },

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
