<template>
  <div>
    <XTabs :items="items" v-model="currentValue"></XTabs>
    <XTabs
      :items="items"
      type="card"
      closable
      stretch
      v-model="currentValue"
      @action-click="onClick"></XTabs>

    <XPanel header="业务核心数据">
      <XTabs :items="items" v-model="currentValue"> </XTabs>
    </XPanel>

    <XTabs :items="items" v-model="currentValue">
      <template #default="{ name }">
        <MyComp :name="name"></MyComp>
        <!-- <div>{{ Date.now() }} {{ console.log('tab', name) }}</div> -->
      </template>
    </XTabs>
    <ElTabs model-value="a">
      <ElTabPane label="a" name="a">
        {{ console.log('ElTabPane', 'A') }}
      </ElTabPane>
    </ElTabs>
  </div>
</template>
<script lang="ts" setup>
  import { ref, onMounted, defineComponent, h } from 'vue';
  import {
    XTabs,
    XPanel,
    Setting,
    DeleteFilled,
    type TabsItem
  } from '@vtj/web';

  import { ElTabs, ElTabPane } from 'element-plus';

  const currentValue = ref(1);
  const isMounted = ref(false);

  const MyComp = defineComponent({
    props: {
      name: [String, Number, Array]
    },
    render() {
      console.log('render', this.name);
      return h('div', 'hello:' + this.name);
    },
    mounted() {
      console.log('mounted');
    },
    updated() {
      console.log('updated');
    }
  });

  const items: TabsItem[] = [
    {
      label: '选项面板一',
      name: 1,
      lazy: true,
      data: [1]
    },
    {
      label: '选项面板二',
      name: 2,
      lazy: true,
      data: [2]
    },
    {
      label: '选项面板三',
      name: 3,
      lazy: true,
      data: [3],
      actions: [
        {
          name: 'add',
          icon: Setting
        },
        {
          name: 'remove',
          icon: DeleteFilled
        }
      ]
    }
  ];

  const onClick = (e: any) => {
    console.log('click', e);
  };

  onMounted(() => {
    isMounted.value = true;
    console.log('tabs mounted');
  });
</script>
