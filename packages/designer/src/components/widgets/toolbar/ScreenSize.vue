<template>
<div class="v-toolbar-widget__custom-size">
    <ElInput v-model="modelValue.width" size="small" class="size-input" ></ElInput>
    <div class="custom-size-space">X</div>
    <ElInput v-model="modelValue.height" size="small" class="size-input"></ElInput>
</div>
</template>

<script lang="ts" setup>
import { ElInput } from 'element-plus';
import {useVModel} from '@vueuse/core';
import type { PropType } from 'vue';

const props = defineProps({
  modelValue:{
    type: Object as PropType<{width: number, height: number}>,
    default: ()=>({
      width: 1920,
      height: 1080
    })
  }
})

const emit = defineEmits(['update:modelValue'])

const modelValue = useVModel(props,'modelValue',emit)

</script>


<style lang="scss" scoped>
  .v-toolbar-widget__custom-size {
    display: flex;
    align-items: center;
    margin-right: 10px;
    .custom-size-space {
      margin: 0 5px;
      color: #999;
    }

    .size-input {
      width: 50px;
    }
  }
      
</style>