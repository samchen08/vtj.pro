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
 * 顺序：imports → props/emits → provider → globalApiDeclares →
 *      injects → composables → state(reactive) → refs → reactives →
 *      computed → methods → watch → provide → created/setup → lifeCycles → expose
 */
const scriptSetupTemplate = `
// @ts-nocheck
<%= imports %>
import { <%= rendererImports %> } from '<%= renderer %>';
<% if(componentDeclarations) { %><%= componentDeclarations %><% } %>
<% if(props) { %>const __props = defineProps({ <%= props %> });<% } else if(needsProps) { %>const __props = defineProps();<% } %>
<% if(emits) { %>const __emit = defineEmits([<%= emits %>]);<% } else if(needsEmit) { %>const __emit = defineEmits();<% } %>
const __provider = useProvider({ id: '<%= id %>', version: '<%= version %>' });
<%= urlSchemas %>
<%= blockPlugins %>
<%= globalApiDeclares %>
<%= injects %>
<%= composables %>
<%= createdStatements %>
<%= setupStatements %>
<%= state %>
<%= refs %>
<%= reactives %>
<%= computed %>
<%= methods %>
<%= dataSources %>
<%= watch %>
<%= provide %>
<%= lifeCycles %>
<% if(expose) { %>defineExpose(<%= expose %>);<% } %>
`;

export const scriptCompiled = template(scriptTemplate);
export const scriptSetupCompiled = template(scriptSetupTemplate);
export const vueCompiled = template(vueTemplate);
