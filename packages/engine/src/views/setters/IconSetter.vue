<template>
  <div class="vtj-icon-setter">
    <ElInput
      size="small"
      readonly
      placeholder="请选择图标"
      :model-value="props.modelValue"
      :suffix-icon="ArrowDown"
      @focus="onFocus">
      <template #prepend>
        <XIcon :icon="currentIcon"></XIcon>
      </template>
    </ElInput>
    <Dialog
      title="图标选择器"
      width="1000px"
      height="600px"
      cancel
      submit
      clear
      v-if="dialogVisible"
      v-model="dialogVisible"
      @submit="onSubmit"
      @clear="onClear">
      <div class="vtj-icon-setter__content">
        <ElInput
          size="small"
          :prefix-icon="Search"
          clearable
          v-model="keyword"
          placeholder="请输入查询关键字"></ElInput>
        <div class="vtj-icon-setter__list">
          <XIcon
            v-for="item in iconList"
            :icon="item[1]"
            @click="onClick(item[0])"
            :class="{ 'is-active': current === item[0] }"></XIcon>

          <ElEmpty v-if="iconList.length === 0"></ElEmpty>
        </div>
      </div>
    </Dialog>
  </div>
</template>
<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { ElInput, ElEmpty } from 'element-plus';
  import { ArrowDown, Search } from '@element-plus/icons-vue';
  import { components } from '@vtj/icons';
  import { XIcon } from '@vtj/ui';
  import { Dialog } from '../shared';

  export interface Props {
    modelValue?: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: ''
  });

  const emit = defineEmits(['change', 'update:modelValue']);
  const dialogVisible = ref<boolean>(false);
  const current = ref<string>(props.modelValue);
  const keyword = ref('');
  const currentIcon = computed<any>(
    () => (components as any)[props.modelValue] || props.modelValue
  );

  const iconList = computed(() => {
    const list = Object.entries(components);
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
</script>
<style lang="scss">
  @use '../../style//vars' as *;

  .vtj-icon-setter .el-input-group__prepend {
    background-color: var(--el-fill-color-blank);
  }
  .vtj-icon-setter__list {
    display: inline-block;
    flex-grow: 1;
    height: 1px;
    overflow: auto;
    position: relative;
    padding: 10px 0;

    .x-icon {
      width: 48px;
      height: 48px;
      margin: 5px;
      font-size: 20px;
      border: 1px dashed $vtj-border-color;
      border-radius: 4px;
      text-align: center;
      line-height: 48px;
      &:hover {
        border: 1px solid #409eff;
        cursor: pointer;
      }
      &.is-active {
        background-color: #409eff;
        color: #fff;
        border: none;
      }
    }
  }

  .vtj-icon-setter__content {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
</style>
