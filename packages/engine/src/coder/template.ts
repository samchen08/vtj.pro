import { template } from '@vtj/utils';

const blockTsContent = `
<%= imports %>
import { useProvider } from '@vtj/runtime';
export default defineComponent({
  name: '<%= name %>', 
  <% if(inject) { %> inject: { <%= inject %>}, <% } %>
  <% if(components) { %> components: { <%= components %> }, <% } %>
  <% if(props) { %> props: { <%= props %> }, <% } %>
  <% if(emits) {%> emits: [<%= emits %>], <% } %> 
  setup(props) {
    const provider = useProvider();
    const state = reactive({ <%= state %> });
    return {
      state,
      props,
      provider
    };
  },
  <% if(computed) { %> computed: { <%= computed %> }, <% } %>
  <% if(methods) { %> methods: { <%= methods %> }, <% } %>
  <% if(watch) { %> watch: { <%= watch %> }, <% } %> <%= lifeCycles %>
});
`;

export const compiled = template(blockTsContent);
