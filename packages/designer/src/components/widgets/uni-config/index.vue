<template>
  <Panel class="v-uni-config-widget" title="UniApp 配置">
    <ElDivider content-position="center" border-style="dotted">
      全局配置
    </ElDivider>
    <ElForm size="small" label-position="top">
      <ElFormItem label="manifest.json" @keydown.enter.native.prevent>
        <JsonSetter
          :model-value="getValue('manifestJson')"
          @change="onChange('manifestJson', $event)"></JsonSetter>
      </ElFormItem>
      <ElFormItem label="pages.json" @keydown.enter.native.prevent>
        <JsonSetter
          :model-value="getValue('pagesJson')"
          @change="onChange('pagesJson', $event)"></JsonSetter>
      </ElFormItem>
      <ElFormItem label="CSS" @keydown.enter.native.prevent>
        <CssSetter
          :model-value="getValue('css')"
          @change="onChange('css', $event)"></CssSetter>
      </ElFormItem>
    </ElForm>

    <ElDivider content-position="center" border-style="dotted">
      应用生命周期
    </ElDivider>
    <ElForm size="small" label-position="top">
      <ElFormItem
        @keydown.enter.native.prevent
        v-for="name in lifeCycle"
        :label="name"
        :key="name">
        <FunctionSetter
          :model-value="getValue(name)"
          @change="onChange(name, $event)"></FunctionSetter>
      </ElFormItem>
    </ElForm>
  </Panel>
</template>
<script setup lang="ts">
  import type { UniConfig } from '@vtj/core';
  import { APP_LIFE_CYCLE } from '@vtj/uni';
  import { Panel } from '../../shared';
  import { ElDivider, ElForm, ElFormItem } from 'element-plus';
  import JsonSetter from '../../setters/json.vue';
  import FunctionSetter from '../../setters/function.vue';
  import CssSetter from '../../setters/css.vue';
  import { useProject } from '../../hooks';

  const lifeCycle = APP_LIFE_CYCLE;

  defineOptions({
    name: 'UniConfigWidget'
  });

  const { project } = useProject();

  const getValue = (name: string) => {
    const uniConfig: UniConfig = project.value?.uniConfig || {};
    return uniConfig[name as keyof UniConfig] as any;
  };

  const onChange = (name: string, value: any) => {
    console.log('change', project.value, name, value);
    project.value?.setUniConfig(name as keyof UniConfig, value);
  };
</script>
