import { Ref, computed } from 'vue';
import { Block, Node } from '../models';
import { useDesigner } from '../hooks';

export interface IBinderOption {
  title: string;
  items: string[];
}

export function useBinder(block: Ref<Block | null>, keyword: Ref<string>) {
  const { selected } = useDesigner();
  const node = computed(() => selected.value?.node as Node);

  const options = computed(() => {
    const opts: IBinderOption[] = [];
    if (!block.value) return opts;

    // 上下文
    const rootContext = block.value.runtimeContext;

    // 运行时上下文
    const nodeContext = rootContext?.__context_refs[node.value?.id];

    // console.log({ rootContext, nodeContext, nodeId: node.value?.id });

    const isEqualRoot = block.value.runtimeContext === nodeContext;
    const context = isEqualRoot
      ? []
      : Object.keys(nodeContext?.context || {})
          .filter((n) => !['context', 'ref'].includes(n))
          .map((n) => `this.context.${n}`);
    if (context.length) {
      opts.push({ title: '上下文', items: context });
    }

    // 注入
    const inject = block.value.inject.map((n) => `this.${n.name}`);
    if (inject.length) {
      opts.push({ title: '注入', items: inject });
    }

    // 组件props
    const props = block.value.props.map((n) =>
      typeof n === 'string' ? `this.$props.${n}` : `this.$props.${n.name}`
    );
    if (props.length) {
      opts.push({ title: '属性', items: props });
    }

    // 状态数据
    const state = Object.keys(block.value.state).map((n) => `this.state.${n}`);
    if (state.length) {
      opts.push({ title: '状态', items: state });
    }

    // 计算属性
    const computed = Object.keys(block.value.computed).map(
      (n) => `this.${n}.value`
    );
    if (computed.length) {
      opts.push({ title: '计算属性', items: computed });
    }

    // 组件方法
    const methods = Object.keys(block.value.methods).map((n) => `this.${n}`);
    if (methods.length) {
      opts.push({ title: '方法', items: methods });
    }

    const dataSources = Object.keys(block.value.dataSources).map(
      (n) => `this.${n}`
    );
    if (dataSources.length) {
      opts.push({ title: '数据源', items: dataSources });
    }

    // refs
    const refs = Object.keys(rootContext?.$refs || {}).map(
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
    const result: IBinderOption[] = [];
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
    options,
    searchResult
  };
}
