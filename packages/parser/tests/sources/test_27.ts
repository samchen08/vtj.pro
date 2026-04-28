export const test_27 = `
<template>

    <button v-if="disabled">aaaa</button>
    <button v-else>bbbb</button>
   
</template>
<script>
  import { defineComponent, reactive } from 'vue';
import { XIcon } from '@vtj/ui';
import { List } from '@vtj/icons';
import { useProvider } from '@vtj/renderer';
export default defineComponent({
  name: 'Scl90ProgressBar',
  components: { XIcon },
  props: {
    current: {
      type: Number,
      required: false,
      default: 0
    }
  },
  setup(props) {
    const provider = useProvider({ id: '3j60fz3e', version: '' });
    const state = reactive({
      dots: [],
      percent: 0,
      hintText: ''
    });
    return { state, props, provider, List };
  },

  computed: {
    disabled() {
    return !!this.state.value
    }
  },

    watch: {
    current: {
      handler(v) {
        console.log(v)
      },
      immediate: true
    }
  }
});
</script>
<style lang="css" scoped>

</style>
`;
