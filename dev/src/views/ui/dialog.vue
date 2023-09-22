<template>
  <div>
    <button @click="open">open</button>
    <button @click="show">show</button>
    <XPanel ref="panelRef" header="Title" card>Body</XPanel>
    <XDialog
      ref="dialog"
      key="dialog1"
      v-model="visible"
      title="弹窗标题"
      subtitle="我是副标题内容"
      :icon="VtjIconBug"
      :modal="false"
      submit
      cancel
      :resizable="true"
      @open="onOpen">
      <div>
        <div v-for="n in 50">{{ n }}</div>
      </div>
    </XDialog>

    <XDialog
      v-if="false"
      key="dialog2"
      title="弹窗标题"
      subtitle="我是副标题内容"
      :icon="VtjIconBug"
      :modal="false"
      src="/#/ui/startup"
      width="500px"
      height="400px"
      submit
      cancel
      resizable
      @open="onOpen">
    </XDialog>
  </div>
</template>
<script lang="ts" setup>
  import { ref, createVNode } from 'vue';
  import { XDialog, createDialog, XPanel } from '@vtj/ui';
  import {
    VtjIconBug,
    VtjIconApi,
    VtjIconPlus,
    VtjIconSetting
  } from '@vtj/icons';

  const panelRef = ref();
  const dialog = ref();
  const visible = ref(false);

  // setTimeout(() => {
  //   console.log(panelRef.value?.$);
  // }, 1000);

  const open = () => {
    visible.value = true;
  };
  const onOpen = () => {
    console.log('open');
  };

  const show = () => {
    dialog.value.show();
  };

  // const vnode = createVNode('div', {}, 'HelloWorld');

  // setTimeout(() => {
  //   const node = createDialog({
  //     title: '动态2',
  //     icon: VtjIconBug,
  //     size: 'default',
  //     width: 500,
  //     height: 400,
  //     content: vnode,
  //     componentInstance: panelRef.value,
  //     submit: true,
  //     resizable: true,
  //     primary: true
  //   });
  // }, 1000);

  // console.log(node);
</script>
