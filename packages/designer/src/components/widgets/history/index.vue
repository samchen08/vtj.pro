<template>
  <Panel
    class="v-history-widget"
    title="历史记录"
    plus
    :subtitle="subtitle"
    :remove="!!total"
    @remove="onRemove"
    @plus="onAdd">
    <template #pre-actions>
      <ElSwitch
        size="small"
        inline-prompt
        active-text="自动"
        inactive-text="自动"
        v-model="engine.state.autoHistory"></ElSwitch>
      <ElDivider direction="vertical"></ElDivider>
      <XAction
        mode="icon"
        :icon="VtjIconDiff"
        title="版本对比"
        @click="showDiff"></XAction>
    </template>
    <template #actions>
      <ElDivider direction="vertical"></ElDivider>
      <ElCheckbox
        size="small"
        class="v-history-widget__checker"
        v-model="checkedAll"></ElCheckbox>
    </template>
    <ElEmpty v-if="total === 0" :image-size="50"></ElEmpty>
    <template v-if="history">
      <Item
        v-for="(item, index) in history.items"
        :index="index + 1"
        :title="item.label"
        :model-value="item"
        :active="index == history.index"
        small
        background
        @click="load(item.id)">
        <template #status>
          <XAction
            class="v-history-widget__flag"
            :type="!!item.remark ? 'primary' : 'info'"
            mode="icon"
            :icon="Flag"
            size="small"
            background="none"
            :tooltip="item.remark"
            @click="onEdit(item)"></XAction>
          <ElDivider
            direction="vertical"
            class="v-history-widget__split"></ElDivider>
          <ElCheckbox
            class="v-history-widget__checker"
            :key="item.id"
            size="small"
            v-model="(item as any).checked"></ElCheckbox>
        </template>
      </Item>
    </template>
    <Diff v-if="diffVisible" v-bind="compareData" v-model="diffVisible"></Diff>
    <XDialogForm
      v-if="formVisible"
      v-model="formVisible"
      :title="formTitle"
      width="400px"
      height="200px"
      :model="formModel"
      :submit-method="onSubmit">
      <XField
        name="remark"
        label="备注"
        label-width="60px"
        editor="textarea"
        :props="{
          rows: 4,
          autosize: { minRows: 4, maxRows: 4 },
          resize: false
        }"
        required></XField>
      <template #extra>
        <ElButton type="warning" @click="onClearFlag">移除标记</ElButton>
      </template>
    </XDialogForm>
  </Panel>
</template>
<script lang="ts" setup>
  import { computed, ref, shallowRef, watch } from 'vue';
  import {
    ElEmpty,
    ElDivider,
    ElCheckbox,
    ElButton,
    ElSwitch
  } from 'element-plus';
  import { XAction, XDialogForm, XField } from '@vtj/ui';
  import { VtjIconDiff, Flag } from '@vtj/icons';
  import type { HistoryItem } from '@vtj/core';
  import Diff from './diff.vue';
  import { Panel, Item } from '../../shared';
  import { useHistory } from '../../hooks';
  import { confirm, message } from '../../../utils';

  defineOptions({
    name: 'HistoryWidget'
  });

  const { history, load, total, getHistoryDsl, engine } = useHistory();

  const diffVisible = ref(false);
  const compareData = shallowRef();
  const formModel = ref();
  const formVisible = ref(false);
  const checkedAll = ref(false);

  const subtitle = computed(() => {
    return `(共 ${total.value} 条)`;
  });

  const formTitle = computed(() =>
    formModel.value ? '更新记录标记' : '新建历史记录'
  );

  const onRemove = async () => {
    const checkedIds = history.value?.items
      .filter((n) => !!(n as any).checked)
      .map((n) => n.id);
    if (checkedIds?.length === 0) {
      message('请选择历史记录项', 'warning');
      return;
    }
    const ret = await confirm('确定要删除历史记录吗？');
    if (ret) {
      history.value?.remove(checkedIds as string[]);
    }
    checkedAll.value = false;
  };

  const showDiff = async () => {
    const checkedItems = history.value?.items.filter(
      (n) => !!(n as any).checked
    );
    if (!checkedItems) return;
    if (!checkedItems.length) {
      message('请选择历史记录项', 'warning');
      return;
    }
    if (checkedItems.length > 2) {
      message('最多只能选择两条记录对比', 'warning');
      return;
    }

    const oldItem =
      checkedItems.length === 2
        ? {
            label: checkedItems[1].label,
            dsl: await getHistoryDsl(checkedItems[1].id)
          }
        : {
            label: checkedItems[0].label,
            dsl: await getHistoryDsl(checkedItems[0].id)
          };
    const newItem =
      checkedItems.length === 2
        ? {
            label: checkedItems[0].label,
            dsl: await getHistoryDsl(checkedItems[0].id)
          }
        : { label: '当前文件', dsl: engine.current.value?.toDsl() };
    if (newItem.dsl) {
      delete newItem.dsl.__VERSION__;
    }
    if (oldItem.dsl) {
      delete oldItem.dsl.__VERSION__;
    }
    compareData.value = {
      filename: oldItem.label,
      newFilename: newItem.label,
      oldString: JSON.stringify(oldItem.dsl || {}, null, 2),
      newString: JSON.stringify(newItem.dsl || {}, null, 2)
    };
    diffVisible.value = true;
  };

  const onAdd = () => {
    formModel.value = null;
    formVisible.value = true;
  };

  const onEdit = (item: HistoryItem) => {
    formModel.value = { ...item };
    formVisible.value = true;
  };

  const onSubmit = async (data: any) => {
    const dsl = engine.current.value?.toDsl();
    if (!dsl) return false;
    if (formModel.value) {
      delete data.checked;
      data.dsl = await getHistoryDsl(formModel.value.id);
      history.value?.update(data as HistoryItem);
    } else {
      history.value?.add(dsl, data.remark);
    }

    return true;
  };

  const onClearFlag = async () => {
    if (formModel.value) {
      const data = { ...formModel.value, remark: '' };
      delete data.checked;
      data.dsl = await getHistoryDsl(formModel.value.id);
      history.value?.update(data as HistoryItem);
      formVisible.value = false;
    }
  };

  watch(checkedAll, (v) => {
    const items = history.value?.items || [];
    for (const item of items) {
      (item as any).checked = v;
    }
  });
</script>

<style lang="scss" scoped>
  .v-history-widget__flag {
    :deep(.is-info) {
      opacity: 0.65;
    }
  }
  .v-history-widget__checker {
    padding: 0 5px;
  }
  .v-history-widget__split {
    margin: 0 4px;
  }
</style>
