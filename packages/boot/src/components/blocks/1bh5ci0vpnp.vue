<template>
  <XPanel :header="$props.title" :footer='{"flex": true}'>
    <ElCarousel height="300px" :style='{"width": "100%"}'>
      <ElCarouselItem v-for="(item, index) in 3" :style='{"width": "100%"}'>
        <component
          is="img"
          :style='{"width": "100%", "height": "300px"}'
          src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg">
        </component>
      </ElCarouselItem>
    </ElCarousel>
    <template #footer="scope">
      <ElInput
        v-model:modelValue="this.state.value"
        placeholder="请输入事件参数文本">
      </ElInput>
      <ElButton type="primary" @click="click_handler_ix6mw4vvx6">
        测试触发事件
      </ElButton>
    </template>
  </XPanel>
</template>
<script lang="ts">
  import { defineComponent, reactive } from 'vue';
  import { XPanel } from '@vtj/ui';
  import { ElCarousel, ElCarouselItem, ElInput, ElButton } from 'element-plus';
  import { useProvider } from '@vtj/runtime';
  export default defineComponent({
    name: 'MyBlock',

    components: { XPanel, ElCarousel, ElCarouselItem, ElInput, ElButton },
    props: {
      title: {
        type: [String],
        required: false,
        default: '默认参数标题文本'
      }
    },
    emits: ['submit'],
    setup(props) {
      const provider = useProvider();
      const state = reactive({ value: '' });
      return {
        state,
        props,
        provider
      };
    },

    methods: {
      click_handler_ix6mw4vvx6() {
        this.$emit('submit', this.state.value);
      }
    }
  });
</script>
<style lang="scss" scoped></style>
