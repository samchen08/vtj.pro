<template>
  <div>
    <XAction label="保存按钮" type="primary" @click="onSave"> </XAction>
    <XAction label="获取按钮" type="primary" @click="onGet"> </XAction>
    <XAction label="移除按钮" type="primary" @click="onRemove"> </XAction>
    <XAction label="移除所有按钮" type="primary" @click="onClear"> </XAction>
  </div>
</template>

<script setup lang="ts">
  import { XAction } from '@vtj/ui';

  import { Storage } from '@vtj/utils';

  const storage = new Storage({
    type: 'local', // session
    expired: 0,
    prefix: '__VTJ_'
  });

  const onSave = () => {
    storage.save('test', '测试保存');
  };

  const onGet = () => {
    console.log(storage.get('test'));
  };

  const onRemove = () => {
    storage.remove('test');
  };

  const onClear = () => {
    storage.clear();
  };
</script>

<style scoped></style>
