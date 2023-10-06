<template>
  <ElButton
    v-for="(item, index) in state.list"
    type="primary"
    @click="click_handler_9ym6xupvca($event, {item, index})">
    {{ item }}
  </ElButton>
  <ElDivider> 分割线 </ElDivider>
  <ElButton type="default" @click="click_handler_lvays33zk"> 按钮 </ElButton>
</template>
<script lang="ts">
  import { defineComponent, reactive } from 'vue';
  import { ElButton, ElDivider } from 'element-plus';
  import { useProvider } from '@vtj/runtime';
  export default defineComponent({
    name: 'TestApi',

    components: { ElButton, ElDivider },

    setup(props) {
      const provider = useProvider();
      const state = reactive({ list: [] });
      return {
        state,
        props,
        provider
      };
    },

    methods: {
      async mockApi(...args: any[]) {
        return await this.provider.apis.mockApi
          .call(this, ...args)
          .then((res) => res);
      },
      async mockJsonp(...args: any[]) {
        return await this.provider.apis.mockJsonp
          .call(this, ...args)
          .then((res) => res);
      },
      click_handler_9ym6xupvca($event, { item, index }) {
        return (() => {
          this.$message.info({
            message: item.title
          });
        })();
      },
      async click_handler_lvays33zk() {
        const res = await this.mockJsonp({ id: 'abc' });
        this.$message.info({
          message: JSON.stringify(res)
        });

        this.sayHello('hello!');
      },
      sayHello(text) {
        this.$message.info({
          message: text
        });
      }
    },
    async mounted() {
      this.state.list = await this.mockApi();
    }
  });
</script>
<style lang="scss" scoped></style>
