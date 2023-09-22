<template>
  <XContainer class="x-mask-switch-bar" justify="space-between" align="center">
    <XContainer v-if="!props.collasped" class="x-mask-switch-bar__left" grow>
      <ElSwitch
        v-if="!search"
        v-model="favorite"
        class="x-mask-switch-bar__switch"
        :active-icon="StarFilled"
        :inactive-icon="Menu"
        @change="onTypeChange"></ElSwitch>
      <ElInput
        v-if="search"
        v-model="keyword"
        class="x-mask-switch-bar__input"
        size="small"
        placeholder="请输入查询关键字"
        @input="onInput"
        :prefix-icon="Search">
        <template #suffix>
          <XIcon :icon="Close" @click="onCloseSearch"></XIcon>
        </template>
      </ElInput>
    </XContainer>
    <XContainer
      class="x-mask-switch-bar__right"
      flex
      align="center"
      justify="center"
      :class="{ 'is-collasped': props.collasped }">
      <XAction
        v-if="!search && !props.collasped"
        :icon="Search"
        mode="icon"
        background="hover"
        size="default"
        circle
        @click="onClickSearch"></XAction>
      <XAction
        v-if="props.collasped"
        :icon="Expand"
        mode="icon"
        size="default"
        background="hover"
        @click="onToggleCollaspe"
        circle></XAction>
      <XAction
        v-if="!props.collasped"
        :icon="Fold"
        mode="icon"
        size="default"
        background="hover"
        circle
        @click="onToggleCollaspe"></XAction>
    </XContainer>
  </XContainer>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { ElSwitch, ElInput } from 'element-plus';
  import {
    Search,
    Expand,
    Fold,
    Menu,
    StarFilled,
    Close
  } from '@element-plus/icons-vue';
  import { XContainer, XAction, XIcon } from '../../';

  export interface Props {
    collasped?: boolean;
    favorite?: boolean;
    keyword?: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    collasped: false,
    favorite: false
  });

  const emit = defineEmits([
    'update:collasped',
    'update:keyword',
    'update:favorite'
  ]);

  const search = ref(false);
  const keyword = ref('');
  const favorite = ref(false);

  const onClickSearch = () => {
    search.value = true;
  };

  const onCloseSearch = () => {
    keyword.value = '';
    search.value = false;
    emit('update:keyword', keyword.value);
  };

  const onToggleCollaspe = () => {
    emit('update:collasped', !props.collasped);
  };

  const onInput = () => {
    emit('update:keyword', keyword.value);
  };

  const onTypeChange = () => {
    emit('update:favorite', favorite.value);
  };
</script>
