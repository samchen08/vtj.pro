<template>
  <div class="vtj-startup__wrapper">
    <div class="vtj-startup">
      <h1 class="vtj-startup__name">
        <span class="span">{{ props.name }}</span>
      </h1>
      <div class="vtj-startup__tagline">{{ props.tagline }}</div>
      <div class="vtj-startup__actions">
        <span class="span">设置项目主页后，将替换此页面显示</span>
        <span class="button" @click="onClick">{{ props.actionText }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  export interface Props {
    name?: string;
    tagline?: string;
    actionText?: string;
    link?: string | (() => void);
  }

  const props = withDefaults(defineProps<Props>(), {
    name: 'VTJ.PRO',
    tagline: '基于 Vue3 + TypeScript 快速打造高生产力的低代码研发平台',
    actionText: '开始设计'
  });

  const onClick = () => {
    if (typeof window !== 'undefined') {
      if (props.link) {
        if (typeof props.link === 'function') {
          props.link();
        } else {
          window.location.href = props.link;
        }
        return;
      }
      const options = (window as any).__VTJ_LINK__ || {};
      let path = options.href || window.location.pathname + '__vtj__/#/';
      window.location.href = path;
    }
  };
</script>

<style lang="scss" scoped bundle>
  .vtj-startup {
    padding: 20px;
    border-radius: 4px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    grid-row: 1;
    width: 100%;
    max-width: 800px;
    margin: 0 10px;

    &__wrapper {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
    }

    &__name {
      margin: 0;
      padding: 0;
      max-width: 576px;
      line-height: 56px;
      font-size: 48px;
      font-weight: 700;
      white-space: pre-wrap;

      .span {
        background: -webkit-linear-gradient(120deg, #bd34fe 30%, #41d1ff);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }

    &__tagline {
      padding-top: 20px;
      line-height: 32px;
      font-size: 20px;
      font-weight: 500;
      white-space: pre-wrap;
      color: rgba(60, 60, 67, 0.78);
    }

    &__actions {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid rgba(60, 60, 67, 0.08);
      padding: 20px 0 0 0;
      margin-top: 20px;

      .span {
        color: #e6a23c;
        @media (max-width: 768px) {
          display: block;
          text-align: center;
          width: 100%;
        }
      }

      .button {
        height: 40px;
        padding: 0 20px;
        border-radius: 20px;
        background-color: #409eff;
        border: 1px solid transparent;
        color: #fff;
        font-weight: 600;
        cursor: pointer;
        display: inline-block;
        line-height: 40px;
        text-align: center;

        @media (max-width: 768px) {
          width: 100%;
          margin-top: 20px;
        }

        &:hover {
          opacity: 0.7;
        }
      }
    }
  }
</style>
