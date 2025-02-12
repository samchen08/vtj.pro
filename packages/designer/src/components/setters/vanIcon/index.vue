<template>
  <div class='van-icon-setter'>
    <ElInput
      :size="props.size"
      readonly
      placeholder="请选择图标"
      :model-value="props.modelValue"
      :suffix-icon="ArrowDown"
      @focus="onFocus">
      <template #prepend>
        <i :class="[`van-icon-${currentIcon}`, 'van-icon']"></i>
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
      @submit="onSubmit"
      class='van-icon-setter__dialog'
    >
      <div class='van-icon-setter__body'>
        <ElInput
          :size="props.size"
          :prefix-icon="Search"
          clearable
          v-model="keyword"
          placeholder="请输入查询关键字"
          class='van-icon-setter__input'
        ></ElInput>
        <div class="van-icon-setter__content">
          <div class="van-icon-setter__list">
            <i
              v-for="item in iconList"
              @click="onClick(item)"
              :class="[
                current === item ? 'is-active' : '',
                `van-icon-${item}`,
                'van-icon',
                'van-icon-setter__item'
              ]"
            ></i>
            <ElEmpty v-if="iconList.length === 0" class='empty-wrapper'></ElEmpty>
          </div>
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

<script setup lang='ts'>
  import { ElInput, ElEmpty, ElButton } from 'element-plus';
  import { XDialog } from '@vtj/ui';
  import { computed, ref } from 'vue';
  import { ArrowDown, Search } from '@vtj/icons';
  import iconName from './iconName';

  export interface Props {
    modelValue?: string;
    size?: 'small' | 'large' | 'default' | '';
  }
  const emit = defineEmits(['change', 'update:modelValue']);
  const props = withDefaults(defineProps<Props>(), {
    modelValue: '',
    size: 'small'
  });
  const dialogVisible = ref<boolean>(false);
  const current = ref<string>(props.modelValue);
  const keyword = ref('');
  const currentIcon = computed<any>(
    () => (iconName as any)[props.modelValue] || props.modelValue
  );

  const iconList = computed(() => {
    const list = iconName;
    if (keyword.value) {
      return list.filter((n) => {
        const name = n.toLowerCase();
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
    name: 'VanIconSetter'
  });
</script>

<style lang='scss' scoped>
  .van-icon-setter__body {
    overflow: hidden;
    height: 100%;
    display: flex;
    flex-direction: column;
    .van-icon-setter__input {
      margin-bottom: 10px;
    }
    .van-icon-setter__content {
      overflow-y: scroll;
      flex-grow: 1;
    }
  }

  .van-icon-setter__list {
    display: flex;
    flex-wrap: wrap;
    overflow-y: scroll;
    .van-icon-setter__item {
      width: 50px;
      height: 50px;
      margin: 5px;
      font-size: 20px;
      border: 1px dashed var(--vxe-input-disabled-color);
      border-radius: 4px;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      &:hover {
        border: 1px solid var(--vxe-ui-font-primary-color);
        cursor: pointer;
      }
    }
  }
  .is-active {
    background-color: var(--vxe-ui-font-primary-color);
    color: var(--vxe-icon-background-color);
    border: none;
  }
  .empty-wrapper {
    text-align: center;
    width: 100%;
  }
</style>

