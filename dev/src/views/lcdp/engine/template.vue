<!-- 
  # coder by VTJ
  --------------------------
  id:    32342343
  name:  myPage
  date:  2023-12-12 00:00:00
  info:  http://vtj.pro
-->

<template>
  <ElContainer
    :style="{ width: '100%', height: '100%' }"
    key="key1"
    ref="ref1"
    class="class1"
    direction="vertical"
    custom="a"
    @click.stop.prevent="click_handler_1hhdftkv9f4">
    <ElButton v-for="(item, index) in 5" type="primary">
      {{ `按钮${item}` }}
    </ElButton>
  </ElContainer>
</template>
<script lang="ts">
import {
  defineComponent,
  reactive,
  getCurrentInstance,
  ComponentPublicInstance
} from 'vue';
import { ElContainer, ElButton } from 'element-plus';

export default defineComponent({
  name: 'MyPage',
  inject: {
    admin: {
      from: 'admin',
      default: null
    }
  },
  components: {
    ElContainer,
    ElButton
  },
  props: {
    title: {
      type: [String, Number],
      required: true,
      default: '默认标题'
    }
  },
  emits: ['change'],
  expose: ['vtj'],
  setup(props) {
    const instance = getCurrentInstance();
    const state = reactive({ state1: null, state2: 'ABC' });
    return {
      state,
      props,
      vtj: instance?.proxy as ComponentPublicInstance
    };
  },
  computed: {
    cname() {
      return this.state.state1;
    },
    watcher_2izwlmltybo() {
      return this.state.state2;
    }
  },
  watch: {
    watcher_2izwlmltybo: {
      deep: true,
      immediate: true,
      handler(v) {
        console.log('watch change', v);
      }
    }
  },
  methods: {
    click_handler_1hhdftkv9f4() {
      console.log(this.$props.title);
    },
    say() {
      console.log(this.state.state1, this.cname);
    }
  },
  mounted() {
    this.say();
  }
});
</script>
<style lang="scss" scoped>
body {
  background-color: #ccc;
}
</style>
