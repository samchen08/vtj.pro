<template>
  <Panel class="v-deps-widget" title="依赖管理" plus @plus="onAdd">
    <Item
      v-for="dep in dependencies"
      :key="dep.package"
      :title="dep.package"
      :subtitle="dep.version"
      :actions="getActions(dep)"
      background
      :switch="isSwitchable(dep)"
      v-model="dep.enabled"
      @switch="onSwitch(dep)"
      @click="onView(dep)"
      @action="onAction(dep, $event)"></Item>
    <XDialogForm
      v-model="visible"
      width="600px"
      height="500px"
      :title="title"
      :model="model"
      :submitMethod="submitMethod"
      :formProps="{
        disabled: readonly,
        tooltipMessage: false
      }">
      <XField name="package" label="包名" required :disabled="!!model"></XField>
      <XField name="version" label="版本" required></XField>
      <XField name="library" label="导出名称" required></XField>
      <XField
        name="urls"
        label="资源文件"
        editor="textarea"
        :props="{ rows: 3 }"
        tip="多个资源可以换行输入"
        required>
      </XField>

      <XField name="assetsUrl" label="物料URL"></XField>
      <XField name="assetsLibrary" label="物料名称"></XField>
    </XDialogForm>
  </Panel>
</template>
<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import type { Dependencie } from '@vtj/core';
  import { XDialogForm, XField } from '@vtj/ui';
  import { Panel, Item } from '../../shared';
  import { useDeps } from '../../hooks';

  const { dependencies, engine } = useDeps();

  // 显示弹窗
  const visible = ref(false);

  // 能否更改表单
  const readonly = ref(false);

  // 编辑表单数据
  const model = ref<any>({});

  // 弹窗标题
  const title = computed(() => {
    return readonly.value ? '查看依赖' : model.value ? '编辑依赖' : '新增依赖';
  });

  const getActions = (dep: Dependencie): any[] => {
    return dep.required || dep.official ? [] : ['edit', 'remove'];
  };

  const isSwitchable = (dep: Dependencie) => {
    return dep.official && !dep.required;
  };

  const submitMethod = async (data: any) => {
    data.urls = data.urls.split('\n');
    engine.project.value?.setDeps(data);
    return true;
  };

  const onSwitch = (dep: Dependencie) => {
    engine.project.value?.setDeps(dep);
  };

  const onAdd = () => {
    readonly.value = false;
    visible.value = true;
    model.value = null;
  };

  const onView = (dep: Dependencie) => {
    readonly.value = true;
    model.value = {
      ...dep,
      urls: dep.urls.join('\n')
    };
    visible.value = true;
  };

  const onAction = (dep: Dependencie, e: any) => {
    if (e.name === 'edit') {
      model.value = {
        ...dep,
        urls: dep.urls.join('\n')
      };
      readonly.value = false;
      visible.value = true;
    }

    if (e.name === 'remove') {
      engine.project.value?.removeDeps(dep);
    }
  };

  defineOptions({
    name: 'DepsWidget'
  });
</script>
