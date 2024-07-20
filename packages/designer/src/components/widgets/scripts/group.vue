<template>
  <Panel
    :title="props.title"
    class="v-sub-panel"
    size="small"
    :fit="false"
    plus
    @plus="onPlus">
    <Item
      v-for="item of list"
      :title="props.itemTitle(item)"
      border
      :actions="['edit', 'remove']"
      @action="onItemAction(item, $event)"
      @click="onItemClick(item)"></Item>
    <ElEmpty v-if="!list.length" :image-size="40"></ElEmpty>
    <Binder
      v-model="visible"
      :title="title"
      :submit-method="submit"
      :model="model"
      :block="current"
      :context="context"
      @pick="onPick">
      <slot name="fields" v-bind="{ model, isEdit, nameLabel, valueLabel }">
        <XField
          name="name"
          :label="nameLabel"
          required
          :disabled="isEdit"></XField>
        <XField
          class="v-binder__editor"
          ref="codeFieldRef"
          name="value"
          :label="valueLabel"
          required>
          <template #editor>
            <Editor
              ref="editorRef"
              dark
              height="100%"
              v-model="model.value"
              @blur="onEditorBlur"></Editor>
          </template>
        </XField>
      </slot>
    </Binder>
  </Panel>
</template>
<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { XField } from '@vtj/ui';
  import { BlockModel } from '@vtj/core';
  import { type Context } from '@vtj/renderer';
  import { ElEmpty } from 'element-plus';
  import { Panel, Item, Binder } from '../../shared';
  import Editor from '../../editor';

  export interface Props {
    context: Context | null;
    current: BlockModel | null;
    title: string;
    nameLabel: string;
    valueLabel: string;
    createEmpty: () => any;
    list: any[];
    remove: (name: string) => void;
    submit: (data: any, edit: boolean) => Promise<boolean>;
    itemTitle?: (data: any) => string;
  }

  const props = withDefaults(defineProps<Props>(), {
    itemTitle: (data: any) => data.name as string
  });

  const editorRef = ref();
  const codeFieldRef = ref();
  const visible = ref(false);
  const model = ref<any>(props.createEmpty());
  const isEdit = ref(false);
  const title = computed(() =>
    isEdit.value ? `编辑${props.title}` : `新增${props.title}`
  );

  const onPlus = () => {
    isEdit.value = false;
    model.value = props.createEmpty();
    visible.value = true;
  };

  const onItemAction = (data: any, action: any) => {
    switch (action.name) {
      case 'edit':
        onItemClick(data);
        break;
      case 'remove':
        props.remove(data);
        break;
    }
  };

  const onPick = (name: string) => {
    model.value.value = name;
  };

  const onItemClick = (data: any) => {
    isEdit.value = true;
    model.value = {
      ...data
    };
    visible.value = true;
  };

  const submit = async (form: any) => {
    return props.submit(form, isEdit.value);
  };

  const onEditorBlur = () => {
    codeFieldRef.value?.itemRef.validate();
  };
</script>
