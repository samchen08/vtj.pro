<template>
  <view class="view" @longpress.native="onLongPress">
    <text>长按触发</text>
    <XContextMenu
      v-model="visible"
      :position="position"
      :items="items"
      @click="onClick"></XContextMenu>
    <VtjIconTeam></VtjIconTeam>
  </view>
</template>
<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import { XContextMenu, VtjIconTeam } from '@/mui';

  const visible = ref(false);
  const position = ref();
  const onLongPress = (e: any) => {
    visible.value = true;
    const touch = e.touches[0];
    if (touch) {
      position.value = {
        x: touch.clientX,
        y: touch.clientY
      };

      // console.log(touch);
    }
  };

  const items = reactive([
    {
      title: '置顶'
    },
    {
      title: '静音'
    },
    {
      title: '标为已读'
    }
  ]);

  const onClick = (item: any) => {
    console.log(item);
    if ((item.title = '置顶')) {
      item.title = '取消置顶';
    }
  };
</script>

<style lang="scss" scoped>
  .view {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
</style>
