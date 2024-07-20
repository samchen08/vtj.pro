<template>
  <XDialog
    :model-value="props.modelValue"
    class="v-binder"
    :title="title"
    width="1000px"
    height="600px"
    :body-padding="false"
    :resizable="false"
    :maximizable="true"
    :minimizable="false"
    @close="onClose">
    <XContainer fit direction="row" overflow="hidden">
      <XContainer width="30%" height="100%">
        <Tabs class="v-binder__tabs" :items="tabs" v-model="currentTab">
          <XContainer class="v-binder__tab-content" fit padding :flex="false">
            <div v-show="currentTab === 'normal'">
              <ElInput
                v-model="keyword"
                size="small"
                clearable
                :prefix-icon="Search"
                placeholder="筛选可用项"></ElInput>
              <div v-for="group in searchResult">
                <ElDivider border-style="dotted">{{ group.title }}</ElDivider>
                <Item
                  v-for="item in group.items"
                  :title="item"
                  background
                  :actions="['copy']"
                  small
                  @click="onPicker(item)"
                  @action="onCopy(item)"></Item>
              </div>
              <ElEmpty v-if="!searchResult.length"></ElEmpty>
            </div>
            <Viewer
              v-show="currentTab === 'viewer'"
              :context="props.context"
              @copy="onCopy"
              @pick="onPicker"></Viewer>
          </XContainer>
        </Tabs>
      </XContainer>
      <XPanel grow :header="null" :border="false">
        <XForm
          ref="formRef"
          class="v-binder__form"
          :footer="false"
          label-position="top"
          :tooltip-message="false"
          :model="props.model"
          :rules="props.rules"
          :submit-method="handleSubmit">
          <slot></slot>
        </XForm>
        <template #footer>
          <XContainer justify="space-between">
            <XContainer>
              <ElButton
                v-if="unbindEnabled"
                type="warning"
                size="default"
                @click="onUnbind">
                移除绑定
              </ElButton>
            </XContainer>
            <XContainer>
              <ElButton type="default" size="default" @click="onCancel">
                取消
              </ElButton>
              <ElButton type="primary" size="default" @click="onSubmit">
                确定
              </ElButton>
            </XContainer>
          </XContainer>
        </template>
      </XPanel>
    </XContainer>
  </XDialog>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { XDialog, XContainer, XForm, XPanel } from '@vtj/ui';
  import { Search } from '@vtj/icons';
  import { type Context } from '@vtj/renderer';
  import { BlockModel } from '@vtj/core';
  import {
    ElInput,
    ElDivider,
    ElButton,
    ElMessage,
    ElEmpty
  } from 'element-plus';
  import { useClipboard } from '@vueuse/core';
  import { useBinder } from '../hooks';
  import Tabs from './tabs.vue';
  import Item from './item.vue';
  import Viewer from './viewer.vue';
  export interface Props {
    title: string;
    context: Context | null;
    block: BlockModel | null;
    model?: Record<string, any>;
    rules?: Record<string, any>;
    modelValue?: boolean;
    submitMethod?: (model: Record<string, any>) => Promise<boolean>;
    unbindEnabled?: boolean;
  }

  const props = defineProps<Props>();
  const emits = defineEmits([
    'unbind',
    'submit',
    'cancel',
    'pick',
    'update:modelValue',
    'close'
  ]);

  const { searchResult, keyword } = useBinder(props.block, props.context);
  const { copy } = useClipboard({});

  const tabs = [
    {
      name: 'normal',
      label: '常用'
    },
    {
      name: 'viewer',
      label: '高级'
    }
  ];
  const currentTab = ref('normal');
  const formRef = ref();

  const handleSubmit = async (model: any) => {
    emits('submit', model);
    if (props.submitMethod) {
      const ret = await props.submitMethod(model);
      if (ret) {
        onClose();
      }
    } else {
      onClose();
    }
  };

  const onClose = () => {
    emits('update:modelValue', false);
    emits('close');
  };
  const onUnbind = () => {
    emits('unbind');
  };
  const onCancel = () => {
    onClose();
  };

  const onSubmit = async () => {
    formRef.value?.submit();
  };
  const onPicker = (val: string) => {
    emits('pick', val);
  };
  const onCopy = (name: string) => {
    copy(name);
    ElMessage.success({
      message: '已经复制到粘贴板'
    });
  };
</script>
