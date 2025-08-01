<template>
  <Panel class="v-globals-widget" title="应用设置">
    <div>内容</div>
  </Panel>
</template>
<script setup lang="ts">
  import { Panel } from '../../shared';

  import { useProject } from '../../hooks';

  defineOptions({
    name: 'ProjectConfigWidget'
  });

  const { project } = useProject();

  console.log(project);
</script>
