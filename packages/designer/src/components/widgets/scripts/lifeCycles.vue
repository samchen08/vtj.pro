<template>
  <Group
    title="生命周期"
    :current="props.current"
    :context="props.context"
    :list="list"
    nameLabel="名称"
    valueLabel="函数 [ JSFunction ]"
    :createEmpty="createEmpty"
    :remove="remove"
    :submit="submit">
    <template #fields="{ model, nameLabel, isEdit, valueLabel }">
      <XField
        name="name"
        :label="nameLabel"
        editor="select"
        :options="options"
        required
        :disabled="isEdit"></XField>
      <XField
        class="v-binder__editor"
        name="value"
        :label="valueLabel"
        required>
        <template #editor>
          <Editor
            ref="editorRef"
            dark
            height="100%"
            v-model="model.value"></Editor>
        </template>
      </XField>
    </template>
  </Group>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';
  import { BlockModel, type JSFunction } from '@vtj/core';
  import {
    type Context,
    LIFE_CYCLES_LIST,
    COMPOSITION_HOOKS_LIST,
    JSCodeToString
  } from '@vtj/renderer';
  import { XField } from '@vtj/ui';
  import {
    PAGE_LIFE_CYCLES_LIST,
    COMPONENT_LIFE_CYCLES_LIST,
    UNI_PAGE_HOOKS_LIST,
    UNI_COMPOSITION_HOOKS_LIST
  } from '@vtj/uni';
  import Group from './group.vue';
  import { notify, expressionValidate } from '../../../utils';
  import { useEngine } from '../../../framework';
  import Editor from '../../editor';

  export interface Props {
    context: Context | null;
    current: BlockModel | null;
  }
  const engine = useEngine();
  const props = defineProps<Props>();

  const isComposition = computed(
    () => engine.current.value?.apiMode === 'composition'
  );

  const hooks = computed(() =>
    isComposition.value
      ? ['setup', ...COMPOSITION_HOOKS_LIST]
      : LIFE_CYCLES_LIST
  );

  const uniHooks = computed(() => {
    const { currentFile } = engine.project.value || {};
    const isPage = currentFile?.type === 'page';
    if (isPage) {
      return isComposition.value
        ? ['setup', ...UNI_PAGE_HOOKS_LIST]
        : PAGE_LIFE_CYCLES_LIST;
    } else {
      return isComposition.value
        ? ['setup', ...UNI_COMPOSITION_HOOKS_LIST]
        : COMPONENT_LIFE_CYCLES_LIST;
    }
  });

  const options = computed(() => {
    const { platform = 'web' } = engine.project.value || {};
    const list = platform === 'uniapp' ? uniHooks.value : hooks.value;
    return list.map((name) => {
      return {
        label: name,
        value: name
      };
    });
  });

  const list = computed(() => {
    const entries = Object.entries(props.current?.lifeCycles || {});
    if (props.current?.setup) {
      entries.unshift(['setup', props.current?.setup]);
    }
    return entries.map(([name, value]) => {
      return { name, value: JSCodeToString(value) };
    });
  });

  const createEmpty = () => {
    return {
      name: '',
      value: '() => { }'
    };
  };

  const remove = (data: any) => {
    if (!props.current) return false;
    if (data.name === 'setup') {
      props.current.setSetup(undefined);
      return true;
    } else {
      return props.current.removeFunction('lifeCycles', data.name);
    }
  };

  const submit = async (form: any, edit: boolean) => {
    if (!props.current) return false;
    const { name, value } = form;
    if (!edit && !!props.current.lifeCycles[name]) {
      notify(`名称 ${name} 已存在，请更换！`);
      return false;
    }

    const code: JSFunction = {
      type: 'JSFunction',
      value
    };
    const valid = expressionValidate(code, props.context, true);
    if (!valid) return false;
    if (name === 'setup') {
      props.current.setSetup(code);
    } else {
      props.current.setFunction('lifeCycles', name, code);
    }
    return true;
  };
</script>
