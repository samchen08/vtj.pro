import { type MaybeRef, toValue, ref, computed } from 'vue';
import { BlockModel } from '@vtj/core';
import { type Context } from '@vtj/renderer';
import { useSelected } from './useSelected';

export interface BinderOption {
  title: string;
  items: string[];
}

export function useBinder(
  currentRef: MaybeRef<BlockModel | null>,
  contextRef: MaybeRef<Context | null>
) {
  const keyword = ref('');
  const { selected, isSelectBlock } = useSelected();
  const id = computed(() => selected.value?.model.id);

  const options = computed(() => {
    const current = toValue(currentRef);
    const context = toValue(contextRef);
    const opts: BinderOption[] = [];
    if (!current) return opts;

    const nodeContext = context?.__contextRefs[id.value || ''];
    const isEqualRoot = context === nodeContext || isSelectBlock.value;
    // 运行时上下文
    const _context = isEqualRoot
      ? []
      : Object.keys(nodeContext?.context || {})
          .filter((n) => !['context', 'ref'].includes(n))
          .map((n) => `this.context.${n}`);

    if (_context.length) {
      opts.push({ title: '上下文', items: _context });
    }

    // 注入
    const inject = current.inject.map((n) => `this.${n.name}`);
    if (inject.length) {
      opts.push({ title: '注入', items: inject });
    }

    // 组件props
    const props = current.props.map((n) =>
      typeof n === 'string' ? `this.props.${n}` : `this.props.${n.name}`
    );
    if (props.length) {
      opts.push({ title: '属性', items: props });
    }

    // 状态数据
    const state = Object.keys(current.state).map((n) => `this.state.${n}`);
    if (state.length) {
      opts.push({ title: '状态', items: state });
    }

    // 计算属性
    const computed = Object.keys(current.computed).map(
      (n) => `this.${n}.value`
    );
    if (computed.length) {
      opts.push({ title: '计算属性', items: computed });
    }

    // 组件方法
    const methods = Object.keys(current.methods).map((n) => `this.${n}`);
    if (methods.length) {
      opts.push({ title: '方法', items: methods });
    }

    // 数据源
    const dataSources = Object.keys(current.dataSources).map(
      (n) => `this.${n}`
    );
    if (dataSources.length) {
      opts.push({ title: '数据源', items: dataSources });
    }

    // refs
    const refs = Object.keys(context?.$refs || {}).map(
      (n) => `this.$refs.${n}`
    );
    if (refs.length) {
      opts.push({ title: 'refs', items: refs });
    }

    return opts;
  });

  const searchResult = computed(() => {
    if (!keyword.value) return options.value;
    const lowerKeyword = keyword.value.toLowerCase();
    const result: BinderOption[] = [];
    options.value.forEach((group) => {
      const items = group.items.filter((name) =>
        name.toLowerCase().includes(lowerKeyword)
      );
      if (items.length) {
        result.push({
          title: group.title,
          items
        });
      }
    });
    return result;
  });

  return {
    keyword,
    options,
    searchResult
  };
}
