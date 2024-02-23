import { template } from '@vtj/base';

const scriptTemplate = `
<%= imports %>
import { useProvider } from '@vtj/renderer';
export default defineComponent({
  name: '<%= name %>', 
  <% if(inject) { %> inject: { <%= inject %>}, <% } %>
  <% if(components) { %> components: { <%= components %> }, <% } %>
  <% if(props) { %> props: { <%= props %> }, <% } %>
  <% if(emits) {%> emits: [<%= emits %>], <% } %> 
  setup(props) {
    const provider = useProvider({
      id: '<%= id %>',
      version: '<%= version %>'
    });
    const state = reactive({ <%= state %> });
    return {
      state,
      props,
      provider
      <% if(returns) { %>, <%= returns %> <% } %>
    };
  },
  <% if(computed) { %> computed: { <%= computed %> }, <% } %>
  <% if(methods) { %> methods: { <%= methods %> }, <% } %>
  <% if(watch) { %> watch: { <%= watch %> }, <% } %> <%= lifeCycles %>
});
`.replace(/(\n|\r|\t)/g, '');

const vueTemplate = `
<template>
<%= template %>
</template>
<script lang="ts">
<%= script %>
</script>
<style lang="scss" scoped>
<%= css %>
<%= style %>
</style>
`;

export const scriptCompiled = template(scriptTemplate);
export const vueCompiled = template(vueTemplate);
