export const test_27 = `
<template></template>
<script lang="ts">
  // @ts-nocheck
  import { defineComponent, reactive } from 'vue';
  import { useProvider } from '@vtj/renderer';
  export default defineComponent({
    name: 'Abc',
    setup(props) {
      const provider = useProvider({ id: '107h4fa7z', version: '1752216444991' });
      const state = reactive({ data: null });
      return { state, props, provider };
    },
    methods: {
      async getData(...args) {
        // DataSource: eyJ0eXBlIjoibW9jayIsInJlZiI6IiIsIm5hbWUiOiJnZXREYXRhIiwibGFiZWwiOiLmtYvor5XmqKHmi5/mlbDmja4iLCJ0ZXN0Ijp7InR5cGUiOiJKU0Z1bmN0aW9uIiwidmFsdWUiOiIoKSA9PiB0aGlzLnJ1bkFwaSh7XG4gICAgbmFtZTogJ2FiYydcbn0pIn0sIm1vY2tUZW1wbGF0ZSI6eyJ0eXBlIjoiSlNGdW5jdGlvbiIsInZhbHVlIjoiKHBhcmFtcykgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIGNvZGU6IDAsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIGlkOiAnQGd1aWQnLFxuICAgICAgICAgICAgcGFyYW1zXG4gICAgICAgIH1cbiAgICB9O1xufSJ9fQ==
        const mock = this.provider.createMock((params) => {
          return {
            code: 0,
            data: {
              id: '@guid',
              params
            }
          };
        });
        return await mock.apply(this, args);
      }
    },
    async created() {
      this.state.data = await this.getData();
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
