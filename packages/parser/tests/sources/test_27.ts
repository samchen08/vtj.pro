export const test_27 = `
<template>
  <div>
    <ElButton type="primary"> {{ state.text }}</ElButton>
    <ElLink v-if="state.link" href="https://"> 链接文本</ElLink>
  </div>
</template>
<script lang="ts">
  // @ts-nocheck
  import { defineComponent, reactive } from 'vue';
  import { ElButton, ElLink } from 'element-plus';
  import { useProvider } from '@vtj/renderer';
  export default defineComponent({
    name: 'Bbb',
    components: { ElButton, ElLink },
    setup(props) {
      const provider = useProvider({ id: '17rbz707', version: '1752572608783' });
      const state = reactive({ text: 'Button', link: 'https://www.baidu.com' });
      return { state, props, provider };
    },
    computed: {
      watcher_37ror7zk() {
        return this.state.text;
      }
    },
    watch: {
      watcher_37ror7zk: {
        deep: false,
        immediate: false,
        handler() {
          console.log('change');
        }
      }
    }
  })
</script>
<style lang="scss" scoped></style>


`;

export const dsl_27 = {
  name: 'Abc',
  locked: false,
  inject: [],
  state: {
    data: {
      type: 'JSExpression',
      value: 'null'
    }
  },
  lifeCycles: {
    created: {
      type: 'JSFunction',
      value: 'async () => {\n  this.state.data = await this.getData()\n}'
    }
  },
  methods: {},
  computed: {},
  watch: [],
  css: '',
  props: [],
  emits: [],
  slots: [],
  dataSources: {
    getData: {
      type: 'mock',
      ref: '',
      name: 'getData',
      label: '测试模拟数据',
      test: {
        type: 'JSFunction',
        value: "() => this.runApi({\n    name: 'abc'\n})"
      },
      mockTemplate: {
        type: 'JSFunction',
        value:
          "(params) => {\n    return {\n        code: 0,\n        data: {\n            id: '@guid',\n            params\n        }\n    };\n}"
      }
    }
  },
  __VTJ_BLOCK__: true,
  __VERSION__: '1752203178862',
  id: '107h4fa7z',
  nodes: []
};
