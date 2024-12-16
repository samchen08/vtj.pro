<template>
  <div class="page">
    <XTabs :items="items" v-model="currentValue">
      <template #default="{ name }">
        <MyComp :name="name"></MyComp>
        <!-- <div>{{ Date.now() }} {{ console.log('tab', name) }}</div> -->
      </template>
    </XTabs>
  </div>
</template>

<script setup lang="ts">
  import { ref, defineComponent, h } from 'vue';
  import { XTabs, type TabsItem } from '@vtj/ui';
  import { Setting, DeleteFilled } from '@vtj/icons';

  const currentValue = ref(1);

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
</script>

<style scoped>
  .page {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
</style>
