export const test_27 = `
<template>
 <VanIcon name="arrow"></VanIcon>
 <VanIcon dot name="arrow-double-left-2"></VanIcon>
 <VanIcon name="arrow-double-left-a" dot></VanIcon>
 <VanIcon name="arrow-double-left-b" :dot="true"></VanIcon>
 <VanIcon :dot="true" name="arrow-double-left-c"></VanIcon>
 <van-icon name="arrow-double-left-d"></van-icon>
 <van-icon dot name="arrow-double"></van-icon>
 <van-icon name="arrow-double-left" dot></van-icon>
 <van-icon name="arrow-double-left" :dot="true"></van-icon>
 <van-icon :dot="true" name="arrow-double-left"></van-icon>
  <XIcon :icon="VtjIconCar"  color="red"></XIcon>
 <XIcon :icon="Ddetat"  color="red"></XIcon>
  <XIcon :icon="AddLocation"  color="red"></XIcon>
</template>
<script lang="ts">
  // @ts-nocheck
  import { defineComponent, reactive } from 'vue';
  import { useProvider } from '@vtj/renderer';
  import {AddLocation, VtjIconChatRecord, VtjIconCar, Ddetat,ABC} from "@vtj/icons";
  import { XIcon } from '@vtj/ui';
  export default defineComponent({
    name: 'Abc',
    components: {
      XIcon
    },
    setup(props) {
      const provider = useProvider({ id: '107h4fa7z', version: '1752216444991' });
      const state = reactive({ data: {
      item:VtjIconCar
      },icons: [VtjIconCar,Ddetat,AddLocation,VtjIconChatRecord,ABC] });
      return { state, props, provider, AddLocation, VtjIconChatRecord, VtjIconCar,Ddetat };
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
      this.state.data = ABC;
    }
  })
</script>
<style lang="scss" scoped>
body {}
</style>


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
