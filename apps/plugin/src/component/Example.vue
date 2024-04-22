<template>
  <XPanel class="vtj-block-example" header="VTJ远程组件测试" border>
    <ElDivider>内部数据</ElDivider>
    <XContainer>{{ data }}</XContainer>
    <ElDivider>属性</ElDivider>
    <ElDescriptions :column="3" border>
      <ElDescriptionsItem v-for="[name, value] of propsArray" :label="name">
        <pre>{{ JSON.stringify(value, null, 2) }}</pre>
      </ElDescriptionsItem>
    </ElDescriptions>
    <ElDivider>插槽</ElDivider>
    <XContainer justify="space-around" flex gap>
      <XPanel header="default" grow card>
        <div class="vtj-block-example__slot">
          <slot :props="props" :data="data">
            <pre>{{ JSON.stringify({ props, data }, null, 2) }}</pre>
          </slot>
        </div>
      </XPanel>
      <XPanel header="extra" grow card>
        <div class="vtj-block-example__slot">
          <slot name="extra" :props="props" :data="data">
            <pre>{{ JSON.stringify({ props, data }, null, 2) }}</pre>
          </slot>
        </div>
      </XPanel>
    </XContainer>
    <ElDivider>双向绑定</ElDivider>
    <XContainer>
      <ElDescriptions :column="2" border>
        <ElDescriptionsItem label="modelValue">
          <ElInput v-model="currentModelValue" />
        </ElDescriptionsItem>
        <ElDescriptionsItem label="syncProp">
          <ElInput v-model="currentSyncProp" />
        </ElDescriptionsItem>
      </ElDescriptions>
    </XContainer>
    <ElDivider>事件和方法</ElDivider>
    <XContainer>
      <ElButton @click="click">click</ElButton>
      <ElButton @click="submit">submit</ElButton>
      <ElButton @click="onChange">change</ElButton>
    </XContainer>
  </XPanel>
</template>
<script lang="ts" setup>
  import { computed, ref } from 'vue';
  import {
    ElDivider,
    ElDescriptions,
    ElDescriptionsItem,
    ElButton,
    ElMessage,
    ElInput
  } from 'element-plus';
  import { XPanel, XContainer } from '@vtj/ui';

  import { exampleProps, type ExampleEmits } from './types';

  defineOptions({
    name: 'VtjBlockExample'
  });

  const props = defineProps(exampleProps);
  const emit = defineEmits<ExampleEmits>();
  const propsArray = computed(() => Object.entries(props));

  const currentModelValue = computed({
    get() {
      return props.modelValue;
    },
    set(value) {
      emit('update:modelValue', value);
    }
  });

  const currentSyncProp = computed({
    get() {
      return props.syncProp;
    },
    set(value) {
      emit('update:syncProp', value);
    }
  });

  const data = ref<any>('default inner data');

  const click = () => {
    ElMessage.info({
      message: '触发click事件'
    });
    emit('click', props);
  };

  const submit = () => {
    ElMessage.info({
      message: '触发submit事件'
    });
    emit('submit', props);
  };

  const change = (params: any) => {
    data.value = params;
    emit('change', data.value);
  };

  const onChange = () => {
    change('user click change:' + Date.now());
  };

  defineExpose({
    click,
    submit,
    data,
    change
  });
</script>
