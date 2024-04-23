<template>
  <div>
    <XAction
      :icon="VtjIconBug"
      label="操作按钮"
      tooltip="提示信息"
      :disabled="disabled"
      @click="onClick">
    </XAction>
    <XAction
      :icon="icon"
      :badge="value"
      label="操作按钮"
      type="primary"
      :menus="menus"
      @command="onCommand">
    </XAction>

    <XAction
      :icon="icon"
      :badge="value"
      label="操作按钮"
      size="large"
      :menus="menus"></XAction>

    <XAction
      :icon="icon"
      :badge="value"
      label="操作按钮"
      size="small"
      :menus="menus"></XAction>
    <hr />
    <XAction
      mode="text"
      :icon="VtjIconBug"
      label="操作按钮"
      size="large"></XAction>
    <XAction
      mode="text"
      :icon="VtjIconBug"
      label="操作按钮"
      size="default"></XAction>
    <XAction
      mode="text"
      :icon="VtjIconBug"
      label="操作按钮"
      size="small"></XAction>
    <XAction
      mode="text"
      :icon="VtjIconBug"
      label="操作按钮"
      type="primary"></XAction>

    <XAction
      mode="text"
      :icon="VtjIconBug"
      label="操作按钮"
      type="warning"></XAction>
    <XAction
      mode="text"
      :icon="VtjIconBug"
      label="操作按钮"
      type="success"></XAction>
    <XAction
      mode="text"
      :icon="VtjIconBug"
      label="操作按钮"
      type="danger"></XAction>
    <XAction
      mode="text"
      :icon="VtjIconBug"
      label="操作按钮"
      type="info"></XAction>

    <hr />
    <XAction mode="icon" :icon="VtjIconBug" size="large"></XAction>
    <XAction mode="icon" :icon="VtjIconBug" size="default"></XAction>
    <XAction mode="icon" :icon="VtjIconBug" size="small"></XAction>
    <XAction mode="icon" :icon="VtjIconBug" type="primary"></XAction>
    <XAction
      mode="icon"
      :icon="VtjIconBug"
      type="success"
      label="操作"></XAction>
    <XAction
      mode="icon"
      :icon="VtjIconBug"
      type="warning"
      label="操作"></XAction>
    <XAction
      mode="icon"
      :icon="VtjIconBug"
      type="danger"
      label="操作"></XAction>
    <XAction mode="icon" :icon="VtjIconBug" type="info" label="操作"></XAction>
    <XAction
      mode="icon"
      :icon="VtjIconBug"
      type="info"
      label="操作"
      background="hover"></XAction>
    <XAction mode="icon" :icon="VtjIconBug" type="info" circle></XAction>
    <hr />
    <XAction mode="icon" :icon="VtjIconPlus" size="large"></XAction>
    <hr />
    <XAction tooltip="提示">
      <h1>Custom</h1>
    </XAction>

    <XAction
      mode="icon"
      :icon="Rank"
      draggable
      @dragstart="onDragStart"></XAction>

    <div
      style="height: 400px; background-color: #ccc"
      @dragover="onDragOver"></div>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { XAction } from '@vtj/web';
  import { VtjIconBug, VtjIconApi, VtjIconPlus, Rank } from '@vtj/web';

  const menus = [
    {
      command: 'a',
      label: '菜单 一'
    },
    {
      command: 'a1',
      label: '菜单 二'
    },
    {
      command: 'b',
      label: '菜单 三',
      divided: true,
      icon: VtjIconBug
    }
  ];

  const value = ref(1);
  const icon = ref(VtjIconBug);
  setTimeout(() => {
    value.value = 100;
    icon.value = VtjIconApi;
  }, 3000);

  const onClick = (action: any) => {
    console.log('click action', action);
  };
  const onCommand = (item: any) => {
    console.log('command item', item);
  };

  const disabled = () => true;

  const onDragStart = (e: any) => {
    console.log('onDragStart', e);
  };

  const onDragOver = (e: any) => {
    console.log('onDragOver', e);
    e.preventDefault();
  };
</script>
