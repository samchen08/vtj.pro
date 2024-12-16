<template>
  <Panel
    class="v-market-widget"
    size="small"
    fit
    :body="{ padding: false }"
    :header="false"
    ref="panel">
    <iframe ref="frame" src="//localhost:9527/#/"></iframe>
  </Panel>
</template>
<script lang="ts" setup>
  import { Panel } from '../../shared';
  import { useEngine } from '../../../framework';

  const engine = useEngine();

  const openDesigner = () => {
    const region = engine.skeleton?.getRegion('Workspace');
    if (region) {
      region.regionRef.openTab('Designer');
    }
    // console.log(region);
  };

  defineOptions({
    name: 'MarketWidget'
  });

  defineExpose({
    openDesigner
  });
</script>
