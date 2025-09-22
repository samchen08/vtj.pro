import { template } from '@vtj/base';

const scriptTemplate = `
// @ts-nocheck

<%= imports %>
import { useProvider } from '<%= renderer %>';
export default defineComponent({
  name: '<%= name %>', 
  <% if(inject) { %> inject: { <%= inject %>}, <% } %>
  <% if(components) { %> components: { <%= components %> }, <% } %>
  <% if(directives) { %> directives: { <%= directives %> }, <% } %>
  <% if(props) { %> props: { <%= props %> }, <% } %>
  <% if(emits) {%> emits: [<%= emits %>], <% } %>
  <% if(expose) {%> expose: <%= expose %>, <% } %>  
  setup(props) {
    const provider = useProvider({
      id: '<%= id %>',
      version: '<%= version %>'
    });
    const state = reactive({ <%= state %> });
    <%= urlSchemas %>
    <%= blockPlugins %>
    return {
      state,
      props,
      provider
      <% if(asyncComponents) { %>, <%= asyncComponents %> <% }%>
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
<script lang="<%= scriptLang %>">
<%= script %>
</script>
<style lang="<%= styleLang %>" scoped>
<%= css %>
<%= style %>
</style>
`;

export const scriptCompiled = template(scriptTemplate);
export const vueCompiled = template(vueTemplate);
