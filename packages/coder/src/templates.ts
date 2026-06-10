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
<script lang="<%= scriptLang %>"<% if(scriptSetup) { %> setup<% } %>>
<%= script %>
</script>
<style lang="<%= styleLang %>" scoped>
<%= css %>
<%= style %>
</style>
`;

/**
 * Composition API 出码模板（<script setup>）
 * 顺序：imports → props/emits/expose → provider → globalApiDeclares →
 *      injects → composables → state(reactive) → refs → reactives →
 *      computed → methods → watch → provide → created/setup → lifeCycles
 */
const scriptSetupTemplate = `
// @ts-nocheck
<%= imports %>
import { useProvider } from '<%= renderer %>';
<% if(props) { %>const props = defineProps({ <%= props %> });<% } %>
<% if(emits) { %>const emit = defineEmits([<%= emits %>]);<% } %>
<% if(expose) { %>defineExpose(<%= expose %>);<% } %>
const provider = useProvider({ id: '<%= id %>', version: '<%= version %>' });
<%= globalApiDeclares %>
<%= injects %>
<%= composables %>
<%= state %>
<%= refs %>
<%= reactives %>
<%= computed %>
<%= methods %>
<%= dataSources %>
<%= watch %>
<%= provide %>
<%= urlSchemas %>
<%= blockPlugins %>
<%= createdStatements %>
<%= setupStatements %>
<%= lifeCycles %>
`;

export const scriptCompiled = template(scriptTemplate);
export const scriptSetupCompiled = template(scriptSetupTemplate);
export const vueCompiled = template(vueTemplate);
