<template>
  <Panel
    class="v-history-widget"
    title="历史记录"
    :subtitle="subtitle"
    :remove="!!total"
    @remove="onRemove">
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
        :actions="['remove']"
        @action="onAction"
        @click="load(item.id)"></Item>
    </template>
  </Panel>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';
  import { ElEmpty } from 'element-plus';
  import { Panel, Item } from '../../shared';
  import { useHistory } from '../../hooks';
  import { confirm } from '../../../utils';

  defineOptions({
    name: 'HistoryWidget'
  });

  const { history, load, total } = useHistory();

  const subtitle = computed(() => {
    return `(共 ${total.value} 条)`;
  });

  const onAction = (action: any) => {
    if (action.name === 'remove') {
      history.value?.remove(action.modelValue.id);
    }
  };

  const onRemove = async () => {
    const ret = await confirm('确定要清空历史记录吗？');
    if (ret) {
      history.value?.clear();
    }
  };
</script>
