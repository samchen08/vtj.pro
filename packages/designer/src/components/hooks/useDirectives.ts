import { type ComputedRef, computed } from 'vue';
import {
  isBlock,
  DirectiveModel,
  type JSExpression,
  type MaterialDescription,
  type NodeDirectiveIterator,
  NodeModel
} from '@vtj/core';
import { type DesignHelper, useEngine } from '../../framework';
import { confirm } from '../../utils';
import { BUILT_IN_DIRECTIVES } from '@vtj/renderer';

export const createEmptyDirective = (
  name: string,
  iterator?: NodeDirectiveIterator
): DirectiveModel => {
  return new DirectiveModel({
    name,
    value: undefined,
    iterator
  });
};

export const createModelDirective = (prop: string = 'modelValue') => {
  return new DirectiveModel({
    name: 'vModel',
    value: undefined,
    arg: prop
  });
};

function findModelProps(desc: MaterialDescription) {
  if (!desc) return [];
  const { props = [], events = [] } = desc;
  if (props.length && events.length) {
    const updated = events
      .filter((n) => {
        const name = typeof n === 'string' ? n : n.name;
        return name.startsWith('update:');
      })
      .map((n) => (n = typeof n === 'string' ? n : n.name));

    if (!updated.length) return [];
    return props.filter((n) => {
      return updated.some((e) => e.endsWith(':' + n.name));
    });
  }
  return [];
}

export function useDirectives(
  selected: ComputedRef<DesignHelper | null | undefined>
) {
  const engine = useEngine();

  const node = computed(() => {
    const model = selected.value?.model || null;
    return isBlock(model) ? null : model;
  });

  const branchVisiable = computed(() => {
    const parent: any = node.value?.parent || engine.current.value;
    const brothers: NodeModel[] = parent.nodes || parent?.children || [];
    if (brothers.length) {
      const index = brothers.findIndex((n) => n.id === node.value?.id);
      const prevNode = brothers[index - 1];
      if (prevNode) {
        return prevNode.directives.some(
          (n) => n.name === 'vIf' || n.name === 'vElseIf'
        );
      } else {
        return false;
      }
    }
    return false;
  });

  const getDirctive = (name: string) => {
    return computed(() => {
      if (!node.value) return createEmptyDirective(name);
      return (
        (node.value.directives || []).find((n) => n.name === name) ||
        createEmptyDirective(name)
      );
    });
  };

  const getVModels = () => {
    return computed(() => {
      if (!node.value) return [];
      const desc = engine.assets.componentMap.get(node.value.name || '');
      const modelProps = desc ? findModelProps(desc) : [];
      return modelProps.map((p) => {
        return (
          (node.value?.directives || []).find(
            (n) => n.name === 'vModel' && n.arg == p.name
          ) || createModelDirective(p.name)
        );
      });
    });
  };

  const getCustomDirectives = () => {
    return computed(() => {
      if (!node.value) return [];
      return (node.value.directives || []).filter(
        (n) => !BUILT_IN_DIRECTIVES.includes(n.name as string)
      );
    });
  };

  const vIf = getDirctive('vIf');
  const vElseIf = getDirctive('vElseIf');
  const vElse = getDirctive('vElse');
  const vShow = getDirctive('vShow');
  const vBind = getDirctive('vBind');
  const vFor = getDirctive('vFor');
  const vHtml = getDirctive('vHtml');
  const vModels = getVModels();
  const customDirectives = getCustomDirectives();

  const directives = {
    vIf,
    vElseIf,
    vElse,
    vShow,
    vBind,
    vFor,
    vHtml
  };

  const onValueChange = (
    name: keyof typeof directives,
    value: JSExpression
  ) => {
    const dir = directives[name];
    if (!node.value) return;
    if (value) {
      dir.value.value = value;
      node.value.setDirective(dir.value);
    } else {
      dir.value.value = undefined;
      node.value.removeDirective(dir.value);
    }
  };

  const onForChange = (name: string, value: any) => {
    if (!node.value) return;
    if (name === 'value') {
      if (value) {
        vFor.value.value = value;
        node.value.setDirective(vFor.value);
      } else {
        node.value.removeDirective(vFor.value);
      }
      return;
    }
    if (name === 'item' || name === 'index') {
      vFor.value.iterator = {
        ...vFor.value.iterator,
        [name]: value || undefined
      } as NodeDirectiveIterator;

      node.value.setDirective(vFor.value);
    }
  };

  const onModelChange = (index: string, value: any) => {
    if (!node.value) return;
    const i = parseInt(index);
    const dir = vModels.value[i];
    if (!dir) return;
    if (value) {
      dir.value = value;
      node.value.setDirective(dir);
    } else {
      dir.value = undefined;
      node.value.removeDirective(dir);
    }
  };

  const onAddCustom = () => {
    const cd = createEmptyDirective('');
    node.value?.setDirective(cd);
  };

  const onRemoveCustom = async (model: DirectiveModel) => {
    const ret = await confirm('确定删除指令？');
    if (ret) {
      node.value?.removeDirective(model);
    }
  };

  const onCustomChange = (model: DirectiveModel) => {
    return (name: string, value: any) => {
      model.update({ [name]: value });
      node.value?.setDirective(model);
    };
  };

  return {
    engine,
    node,
    vIf,
    vElseIf,
    vElse,
    vShow,
    vBind,
    vFor,
    vHtml,
    vModels,
    customDirectives,
    onValueChange,
    onForChange,
    onModelChange,
    onAddCustom,
    onRemoveCustom,
    onCustomChange,
    branchVisiable
  };
}
