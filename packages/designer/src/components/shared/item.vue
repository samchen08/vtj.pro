<template>
  <XContainer
    class="v-item"
    :class="classes"
    justify="space-between"
    align="center"
    @click="onClick">
    <XContainer class="v-item__title" align="center">
      <slot>
        <XIcon v-if="icon" :icon="icon"></XIcon>
        <ElTag
          v-if="props.tag"
          class="v-item__tag"
          size="small"
          :type="(props as any).tagType">
          {{ props.tag }}
        </ElTag>
        <span v-if="index !== undefined" class="v-item__index">
          # {{ index }}
        </span>
        <div class="v-item__title-wrapper">
          <span class="v-item__content">{{ title }}</span>
          <span
            v-if="subtitle"
            class="v-item__subtitle"
            :class="props.subtitleCls">
            {{ subtitle }}
          </span>
        </div>
        <div v-if="props.textTags" class="v-item__tags">
          <span v-for="item in props.textTags">{{ item }}</span>
        </div>
      </slot>
    </XContainer>
    <XContainer class="v-item__wrapper" @click.stop>
      <XContainer class="v-item__actions" @click.stop>
        <XAction
          v-for="action in currentActions"
          :name="action.name"
          :title="action.label"
          mode="icon"
          size="small"
          background="none"
          type="info"
          :icon="action.icon"
          @click="onAction(action.name)"></XAction>
        <ElSwitch
          v-if="props.switch"
          v-model="switchValue"
          class="v-item__switch"
          size="small"></ElSwitch>
        <slot name="status"></slot>
      </XContainer>
      <XAction
        v-if="props.actionInMore"
        :icon="MoreFilled"
        mode="icon"
        size="small"
        background="none"
        type="info"
        :menus="moreMenus"
        :dropdown="{ placement: 'bottom-end' }"
        @command="onMoreCommand">
      </XAction>
    </XContainer>
  </XContainer>
</template>
<script lang="ts" setup>
  import { computed, ref, watch } from 'vue';
  import { XContainer, XAction, XIcon } from '@vtj/ui';
  import {
    VtjIconEdit,
    VtjIconPlus,
    VtjIconRemove,
    VtjIconCopy,
    VtjIconLock,
    VtjIconUnlock,
    VtjIconInvisible,
    VtjIconVisible,
    VtjIconHome,
    MoreFilled,
    VtjIconShare,
    VtjIconComponents
  } from '@vtj/icons';
  import { ElSwitch, ElMessageBox, ElTag } from 'element-plus';

  const builtInActions = {
    add: {
      label: '创建',
      icon: VtjIconPlus
    },
    copy: {
      label: '复制',
      icon: VtjIconCopy
    },
    edit: {
      label: '编辑',
      icon: VtjIconEdit
    },
    remove: {
      label: '删除',
      icon: VtjIconRemove
    },
    lock: {
      label: '锁定',
      icon: VtjIconLock
    },
    unlock: {
      label: '解锁',
      icon: VtjIconUnlock
    },
    invisible: {
      label: '隐藏',
      icon: VtjIconInvisible
    },
    visible: {
      label: '显示',
      icon: VtjIconVisible
    },
    home: {
      label: '主页',
      icon: VtjIconHome
    },
    share: {
      label: '共享',
      icon: VtjIconShare
    },
    saveToBlock: {
      label: '存为区块',
      divided: true,
      icon: VtjIconComponents
    }
  };

  export interface Props {
    icon?: Record<string, any> | string;
    index?: number;
    tag?: string;
    tagType?: 'success' | 'info' | 'warning' | 'danger' | '';
    title?: string;
    subtitle?: string;
    subtitleCls?: string;
    actions?: Array<keyof typeof builtInActions>;
    background?: boolean;
    border?: boolean;
    switch?: boolean;
    modelValue?: any;
    active?: boolean;
    hover?: boolean;
    small?: boolean;
    actionInMore?: boolean;
    textTags?: string[];
  }

  const props = withDefaults(defineProps<Props>(), {
    actions: () => []
  });
  const emits = defineEmits(['click', 'action', 'update:modelValue', 'switch']);

  const switchValue = ref(!!props.modelValue);

  const currentActions = computed(() => {
    if (props.actionInMore) return [];
    return props.actions.map((name) => {
      const item = builtInActions[name as keyof typeof builtInActions];
      return {
        name,
        ...item
      };
    });
  });

  const moreMenus = computed(() => {
    if (!props.actionInMore) return [];
    return props.actions.map((name) => {
      const item = builtInActions[name as keyof typeof builtInActions];
      return {
        command: name,
        ...item
      };
    });
  });

  const classes = computed(() => {
    return {
      'is-background': props.background,
      'is-border': props.border,
      'is-active': props.active,
      'is-hover': props.hover,
      'is-small': props.small
    };
  });

  const onClick = () => {
    emits('click', props.modelValue);
  };

  const onAction = async (name: string) => {
    if (name === 'remove') {
      const ret = await ElMessageBox.confirm('确定删除吗？', '提示', {
        type: 'warning'
      }).catch(() => false);
      if (ret) {
        emits('action', {
          name,
          modelValue: props.modelValue
        });
      }
    } else {
      emits('action', {
        name,
        modelValue: props.modelValue
      });
    }
  };

  const onMoreCommand = (item: any) => {
    onAction(item.command);
  };

  watch(switchValue, (v) => {
    emits('update:modelValue', v);
    emits('switch', v);
  });

  watch(
    () => props.modelValue,
    (v) => {
      switchValue.value = !!v;
    }
  );

  defineOptions({
    name: 'VItem'
  });
</script>
