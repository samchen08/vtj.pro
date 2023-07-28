import { template } from '@vtj/utils';

const blockTsContent = `
<%= imports %>
import { useProvider } from '@vtj/runtime';
export default defineComponent({
  name: '<%= name %>',
  inject: {
    <%= inject %>
  },
  components: {
    <%= components %>
  },
  props: {
    <%= props %>
  },
  emits: [<%= emits %>],
  expose: [<%= expose %>],
  setup(props) {
    const instance = getCurrentInstance();
    const provider = useProvider();
    const state = reactive({ <%= state %> });
    return {
      state,
      props,
      provider,
      vtj: instance?.proxy as ComponentPublicInstance
    };
  },
  computed: {
    <%= computed %>
  },
  watch: {
    <%= watch %>
  },
  methods: {
    <%= methods %>
  }
  <%= lifeCycles %>
});
`;

export const compiled = template(blockTsContent);
