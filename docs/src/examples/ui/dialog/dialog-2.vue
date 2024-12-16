<template>
  <div>
    <ElButton type="primary" @click="open1">open vNode</ElButton>
    <ElButton type="primary" @click="open3">open component</ElButton>
    <ElButton type="primary" @click="open2">open src</ElButton>
    <XDialog
      ref="dialog"
      key="dialog1"
      v-model="visible1"
      title="弹窗标题"
      subtitle="我是副标题内容"
      :modal="false"
      submit
      cancel
      :resizable="true"
      @open="onOpen"
      :content="vNode()">
    </XDialog>

    <XDialog
      ref="dialog"
      key="dialog1"
      v-model="visible3"
      title="弹窗标题"
      subtitle="展示的是基础元件中XQrCode组件的基础用法"
      :modal="false"
      submit
      cancel
      :resizable="true"
      @open="onOpen"
      :content="XQrCode">
    </XDialog>

    <XDialog
      key="dialog2"
      title="弹窗标题"
      subtitle="我是副标题内容"
      v-model="visible2"
      :icon="VtjIconBug"
      modal
      src="/#/ui/startup"
      width="800px"
      height="400px"
      submit
      cancel
      resizable
      @open="onOpen">
    </XDialog>
  </div>
</template>

<script setup>
  import { ref, h } from 'vue';
  import { XDialog } from '@vtj/ui';
  import { VtjIconBug } from '@vtj/icons';
  import { ElButton } from 'element-plus';
  import XQrCode from '../qrcode/qrcode-1.vue';

  const visible1 = ref(false);
  const visible2 = ref(false);
  const visible3 = ref(false);
  const open1 = () => {
    visible1.value = true;
  };
  const open2 = () => {
    visible2.value = true;
  };
  const open3 = () => {
    visible3.value = true;
  };

  const onOpen = () => {
    console.log('open');
  };

  const foo = 'aa';
  const bool = false;

  const items = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    text: `标题${i}`
  }));

  const vNode = () => {
    return h(
      'div',
      {
        class: 'foo',
        style: { color: 'seagreen' },
        onClick: () => {}
      },
      [
        h('p', { class: 'bg-sky-800, text-3xl' }, 'hello-这是自定义内容'),
        h(
          'h1',
          {
            style: {
              fontSize: '22px'
            }
          },
          'VTJ 一款基于 Vue3 + Typescript 的低代码开发工具，内置低代码引擎、设计器、渲染器和代码生成器。'
        ),
        h(
          'span',
          {
            '^width': '200px',
            '^background': 'salmon',
            style: { color: '#000' }
          },
          '诚邀对该项目感兴趣的同学参与测试体验。'
        ),
        h('div', { class: [foo, { bar: bool }], style: { color: 'red' } }, [
          '如果需要二开或贡献代码，',
          h('span', { style: { color: '#000' } }, '可以拉取仓库master分支')
        ]),
        h(
          'ul',
          {
            class: 'cursor-pointer, text-sky-200',
            onClick: (e) => {}
          },
          [
            items.map(({ id, text }, idx) => {
              return h(
                'li',
                {
                  class: [
                    'hover:text-slate-700, hover:text-xl, w-full, bg-sky-800'
                  ],
                  key: id,
                  onClick: () => {}
                },
                text
              );
            })
          ]
        )
      ]
    );
  };
</script>

<style scoped></style>
