<template>
  <div class="v-icon-setter">
    <ElInput
      :size="props.size"
      readonly
      placeholder="请选择图标"
      :model-value="props.modelValue"
      :suffix-icon="ArrowDown"
      @focus="onFocus">
      <template #prepend>
        <XIcon :icon="currentIcon"></XIcon>
      </template>
    </ElInput>
    <XDialog
      title="图标选择器"
      width="1000px"
      height="600px"
      cancel
      submit
      clear
      v-if="dialogVisible"
      v-model="dialogVisible"
      @submit="onSubmit">
      <div class="v-icon-setter__content">
        <ElInput
          :size="props.size"
          :prefix-icon="Search"
          clearable
          v-model="keyword"
          placeholder="请输入查询关键字"></ElInput>
        <div class="v-icon-setter__list">
          <XIcon
            v-for="item in iconList"
            :icon="item[1]"
            @click="onClick(item[0])"
            :class="{ 'is-active': current === item[0] }"></XIcon>

          <ElEmpty v-if="iconList.length === 0"></ElEmpty>
        </div>
      </div>

      <template #extra>
        <ElButton size="default" type="warning" @click="onClear">
          清除绑定
        </ElButton>
      </template>
    </XDialog>
  </div>
</template>
<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { ElInput, ElEmpty, ElButton } from 'element-plus';
  import { icons, ArrowDown, Search } from '@vtj/icons';
  import { XIcon, XDialog } from '@vtj/ui';

  export interface Props {
    modelValue?: string;
    size?: 'small' | 'large' | 'default' | '';
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: '',
    size: 'small'
  });

  const emit = defineEmits(['change', 'update:modelValue']);
  const dialogVisible = ref<boolean>(false);
  const current = ref<string>(props.modelValue);
  const keyword = ref('');
  const currentIcon = computed<any>(
    () => (icons as any)[props.modelValue] || props.modelValue
  );

  const iconList = computed(() => {
    const list = Object.entries(icons);
    if (keyword.value) {
      return list.filter((n) => {
        const name = n[0].toLowerCase();
        return name.includes(keyword.value);
      });
    }
    return list;
  });

  const onClick = (name: string) => {
    current.value = name;
  };

  const onSubmit = () => {
    emit('change', current.value);
    emit('update:modelValue', current.value);
    dialogVisible.value = false;
  };

  const onClear = () => {
    current.value = '';
    emit('change', '');
    emit('update:modelValue', '');
    dialogVisible.value = false;
  };

  const onFocus = () => {
    dialogVisible.value = true;
  };

  defineOptions({
    name: 'IconSetter'
  });
</script>
