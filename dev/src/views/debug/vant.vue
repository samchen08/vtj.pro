<template>
  <!-- <van-popover :show="false" :actions="actions">
    <template #reference>
      <van-button type="primary">浅色风格</van-button>
    </template>
  </van-popover> -->

  <hr />
  <component :is="renderer"></component>
</template>
<script lang="ts" setup>
  import { Popover as VanPopover, Button as VanButton } from 'vant';
  import { createRenderer, type BlockSchema } from '@vtj/pro';

  const actions = [{ text: '选项一' }, { text: '选项二' }, { text: '选项三' }];

  const components = {
    VanButton,
    VanPopover
  };

  const dsl: BlockSchema = {
    name: 'Aaaaaa',
    locked: false,
    inject: [],
    state: {},
    lifeCycles: {},
    methods: {},
    computed: {},
    watch: [],
    css: '',
    props: [],
    emits: [],
    slots: [],
    dataSources: {},
    __VTJ_BLOCK__: true,
    __VERSION__: '1749177158967',
    id: '167ixsk2',
    nodes: [
      {
        id: '267iyfa8',
        name: 'VanPopover',
        from: 'vant',
        invisible: false,
        locked: false,
        children: [
          {
            id: '367iyfa8',
            name: 'VanButton',
            from: 'vant',
            invisible: false,
            locked: false,
            slot: {
              name: 'reference',
              params: []
            },
            children: '浅色风格',
            props: {
              type: 'primary'
            },
            directives: [],
            events: {}
          }
        ],
        props: {
          show: true,
          actions: [
            {
              text: '选项一'
            },
            {
              text: '选项二'
            },
            {
              text: '选项三'
            }
          ]
        },
        directives: [],
        events: {
          select: {
            name: 'select',
            handler: {
              type: 'JSFunction',
              value:
                '(action) => {\r\n    this.$libs.vant.showToast(action.text)\r\n}'
            },
            modifiers: {}
          }
        }
      }
    ]
  };

  const { renderer } = createRenderer({ dsl, components });
</script>
