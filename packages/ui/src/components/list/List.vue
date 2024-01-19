<template>
  <div class="x-list" :style="styleComputed" :class="classComputed">
    <slot v-if="!data.total && !loading" name="empty">
      <ElEmpty></ElEmpty>
    </slot>

    <div class="x-list__content" v-bind="containerProps">
      <div
        v-if="props.itemHeight"
        v-infinite-scroll="load"
        class="x-list__wrapper"
        ref="wrapperRef"
        v-bind="{ ...wrapperProps, ...infiniteScrollProps }">
        <template v-for="(item, index) in list" :key="getKey(item.data)">
          <slot v-bind="{ item: item.data, index }">
            <div>{{ item }}</div>
          </slot>
        </template>
        <div v-if="loading" class="x-list__loading">
          <slot name="loading"> 正在加载数据... </slot>
        </div>
        <div v-if="nomore" class="x-list__nomore">
          <slot name="nomore"> 没有更多数据 </slot>
        </div>
      </div>
      <div
        v-else
        v-infinite-scroll="load"
        class="x-list__wrapper"
        v-bind="infiniteScrollProps">
        <template v-for="(item, index) in data.list" :key="getKey(item)">
          <slot v-bind="{ item, index }">
            <div>{{ item }}</div>
          </slot>
        </template>
        <div v-if="loading" class="x-list__loading">
          <slot name="loading"> 正在加载数据... </slot>
        </div>
        <div v-if="nomore" class="x-list__nomore">
          <slot name="nomore"> 没有更多数据 </slot>
        </div>
      </div>
    </div>

    <div v-if="props.pager" class="x-list__pager">
      <ElPagination
        small
        background
        layout="prev, pager, next"
        :total="data.total"
        :default-page-size="props.pageSize"
        :default-current-page="props.page"
        v-model:current-page="state.page"
        v-model:page-size="state.pageSize"
        v-bind="pagerProps"></ElPagination>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { computed, ref, reactive, watchEffect } from 'vue';
  import { useVirtualList } from '@vueuse/core';
  import {
    listProps,
    type ListData,
    type ListEmits,
    type ListState
  } from './types';
  import { getSizeValue, toObjectProps } from '../../utils';
  import { useLoader } from '../../hooks';
  import {
    ElEmpty,
    ElPagination,
    ElInfiniteScroll as vInfiniteScroll
  } from 'element-plus';

  defineOptions({
    name: 'XList'
  });
  const props = defineProps(listProps);
  const emit = defineEmits<ListEmits>();

  const state = reactive<ListState>({
    page: props.page,
    pageSize: props.pageSize
  });

  watchEffect(() => {
    const { page, pageSize } = props;
    Object.assign(state, { page, pageSize });
  });

  const { data, loading } = useLoader<ListData, ListState>(
    props.data,
    {
      list: [],
      total: 0
    },
    state
  );

  const pageCount = computed(() => {
    return Math.ceil((data.value.total || 0) / state.pageSize);
  });

  const nomore = ref(false);

  const wrapperRef = ref();

  const styleComputed = computed(() => {
    return {
      width: getSizeValue(props.width),
      height: getSizeValue(props.height)
    };
  });

  const classComputed = computed(() => {
    return {
      'is-virtual': !!props.itemHeight
    };
  });

  const infiniteScrollProps = computed(() => {
    const result: Record<string, any> = {};
    for (let [key, value] of Object.entries(
      toObjectProps(props.infiniteScroll)
    )) {
      result[`infinite-scroll-${key}`] = value;
    }
    if (loading.value || nomore.value) {
      result['infinite-scroll-disabled'] = true;
    }
    return result;
  });

  const pagerProps = computed(() => {
    return toObjectProps(props.pager, {});
  });

  const { list, containerProps, wrapperProps, scrollTo } = useVirtualList(
    computed(() => data.value.list),
    {
      itemHeight: props.itemHeight || 0
    }
  );

  const load = () => {
    if (!props.infiniteScroll || nomore.value) return;
    if (state.page < pageCount.value) {
      ++state.page;
      emit('load', state);
    } else {
      nomore.value = true;
    }
  };

  const getKey = (item: any) => {
    return props.dataKey ? item[props.dataKey] : undefined;
  };

  defineExpose({
    list,
    scrollTo,
    wrapperRef,
    loading,
    state,
    pageCount,
    nomore,
    data,
    getKey
  });
</script>
