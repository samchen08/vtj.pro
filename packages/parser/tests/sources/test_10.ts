export const test_10 = `
<template>
  <XPanel header="系统配置" :fit="true" :card="true">
    <XForm
      labelWidth="200px"
      :model="state.model"
      :submitMethod="submit"
      resetText=""
      submitText="保存"
      :sticky="true"
      footerAlign="left"
      :enterSubmit="false">
      <XField
        label="运营模式"
        name="mode"
        editor="radio"
        :options="modeOptions"></XField>
      <XField label="免费体验次数" name="limit" editor="number"></XField>
      <XField
        label="Token上限(百万/月)"
        name="max"
        editor="number"
        :props="{ precision: 1 }"></XField>
      <XField label="订阅价格" name="price" editor="number"></XField>
      <XField
        label="提示词模版"
        name="promptTemplate"
        editor="textarea"
        :props="{ autosize: { minRows: 10 } }">
        <template #tip="scope_g3u3uxkb">
          <div>
            <span v-for="(item, index) in keywords" class="span_1046q01b4">
              {{ item }}</span
            >
          </div>
        </template></XField
      >
      <XField label="微信支付二维码" name="payQr" editor="none">
        <template #editor="{ editor }">
          <XAttachment
            v-bind="editor"
            :uploader="uploader"
            :multiple="false"
            :limit="1"></XAttachment> </template
      ></XField>
      <XField label="客服二维码" name="contactQr" editor="none">
        <template #editor="{ editor }">
          <XAttachment
            v-bind="editor"
            :uploader="uploader"
            :multiple="false"
            :limit="1"></XAttachment> </template></XField></XForm
  ></XPanel>
</template>
<script lang="ts">
  // @ts-nocheck
  import { defineComponent, reactive } from 'vue';
  import { XPanel, XForm, XField, XAttachment } from '@vtj/ui';
  import { useProvider } from '@vtj/renderer';
  export default defineComponent({
    name: 'Settings',
    components: { XPanel, XForm, XField, XAttachment },
    setup(props) {
      const provider = useProvider({ id: '123u1wxa3', version: '1745566650576' });
      const state = reactive({ model: null });
      return { state, props, provider };
    },
    computed: {
      modeOptions() {
        return [
          {
            label: '免费',
            value: 1
          },
          {
            label: '邀请',
            value: 2
          },
          {
            label: '订阅',
            value: 3
          }
        ];
      },
      keywords() {
        const words = [
          'fileId',
          'fileName',
          'dependencies',
          'platform',
          'appId',
          'projectId',
          'projectName',
          'source'
        ];
        return words.map((n) => {
          return n;
        });
      }
    },
    methods: {
      async saveSettings(...args: any[]) {
        return await this.provider.apis['183u7eu82']
          .apply(this, args)
          .then((res) => {
            return res;
          });
      },
      async getSettings(...args: any[]) {
        return await this.provider.apis['193u7g7yv']
          .apply(this, args)
          .then((res) => {
            return res;
          });
      },
      async upload(...args: any[]) {
        return await this.provider.apis['2p05ba1stnm']
          .apply(this, args)
          .then((res) => {
            return res;
          });
      },
      async submit(model) {
        if (model.payQr) {
          model.payQr = model.payQr[0].name;
        }
        if (model.contactQr) {
          model.contactQr = model.contactQr[0].name;
        }
        const ret = !!(await this.saveSettings(model));
        if (ret) {
          this.$message.success('保存成功');
          this.state.model = await this.getSettings();
        }
      },
      uploader(file) {
        return this.upload({
          file,
          type: 'image'
        });
      },
      getImage(path) {
        if (path) {
          return [
            {
              url: '/api/oss/file/'+path,
              name: path
            }
          ];
        }
        return undefined;
      }
    },
    async mounted() {
      const model = await this.getSettings();
      model.payQr = this.getImage(model.payQr);
      model.contactQr = this.getImage(model.contactQr);
      this.state.model = model;
    }
  })
</script>
<style lang="css" scoped>
  .span_1046q01b4 {
    margin-right: 20px;
  }
</style>

`;
