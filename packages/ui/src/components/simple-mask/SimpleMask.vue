<template>
  <ElContainer class="x-simple-mask">
    <ElHeader class="x-simple-mask__header">
      <div class="x-simple-mask__brand">
        <span class="x-simple-mask__logo" @click="goHome">
          <slot name="logo">{{ props.project.name }}</slot>
        </span>
      </div>
      <div class="x-simple-mask__aciton">
        <slot name="action"></slot>
      </div>
    </ElHeader>
    <ElContainer>
      <ElAside class="x-simple-mask__aside">
        <XMenu
          v-bind="props.menu"
          :default-active="defaultActive"
          @select="onMenuSelect"></XMenu>
      </ElAside>
      <ElMain class="x-simple-mask__main">
        <slot>
          <RouterView></RouterView>
        </slot>
      </ElMain>
    </ElContainer>
    <ElFooter v-if="$slots.footer" class="x-simple-mask__footer" height="40px">
      <slot name="footer"></slot>
    </ElFooter>
  </ElContainer>
</template>
<script lang="ts" setup>
import { ElContainer, ElHeader, ElMain, ElAside, ElFooter } from 'element-plus';
import { RouterView, useRouter, useRoute } from 'vue-router';
import { XMenu, MenuDataItem, BaseMaskProps } from '../';
import { computed } from 'vue';

const props = withDefaults(defineProps<BaseMaskProps>(), {
  project: () => ({
    name: 'Logo',
    home: '/'
  })
});

const router = useRouter();
const route = useRoute();

const defaultActive = computed(() => {
  return route.params.id as string;
});

const goHome = () => {
  const home = props.project.home;
  if (home) {
    router.push(home);
  }
};

const onMenuSelect = (item: MenuDataItem) => {
  const id = item?.id;
  if (id) {
    const basePath = props.preview ? '/preview' : props.project.page;
    const path = `${basePath}/${id}`;
    router.push(path);
  }
};

defineOptions({
  name: 'XSimpleMask'
});

defineExpose({
  goHome
});
</script>
