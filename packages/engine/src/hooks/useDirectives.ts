import { Directive, Node, DirectiveIterator } from '../models';
import { JSExpression, ComponentDescription } from '../core';
import { computed, ref, ComputedRef } from 'vue';

export const createEmptyDirective = (
  name: string,
  iterator?: DirectiveIterator
): Directive => {
  return new Directive({
    name,
    value: undefined,
    iterator
  });
};

export const createModelDirective = (prop: string = 'modelValue') => {
  return new Directive({
    name: 'vModel',
    value: undefined,
    arg: prop
  });
};

function findModelProps(desc: ComponentDescription) {
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
      return updated.some((e) => e.includes(n.name));
    });
  }
  return [];
}

export function useDirectives(
  node: ComputedRef<Node>,
  desc: ComputedRef<ComponentDescription>
) {
  const getDirctive = (name: string) => {
    return computed(() => {
      if (!node.value) return createEmptyDirective(name);
      return (
        (node.value.directives || []).find((n) => n.name === name) ||
        createEmptyDirective(name)
      );
    });
  };

  const modelProps = computed(() => findModelProps(desc.value));

  const getVModels = () => {
    return computed(() => {
      return modelProps.value.map((p) => {
        return (
          (node.value.directives || []).find(
            (n) => n.name === 'vModel' && n.arg == p.name
          ) || createModelDirective(p.name)
        );
      });
    });
  };

  const vIf = getDirctive('vIf');
  const vShow = getDirctive('vShow');
  const vBind = getDirctive('vBind');
  const vFor = getDirctive('vFor');
  const vModels = getVModels();

  const directives = {
    vIf,
    vShow,
    vBind,
    vFor
  };

  const onValueChange = (
    name: keyof typeof directives,
    value: JSExpression
  ) => {
    const dir = directives[name];
    if (value) {
      dir.value.value = value;
      node.value.setDirective(dir.value);
    } else {
      dir.value.value = undefined;
      node.value.removeDirective(dir.value);
    }
  };

  const onForChange = (name: string, value: any) => {
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
      } as DirectiveIterator;

      node.value.setDirective(vFor.value);
    }
  };

  const onModelChange = (index: string, value: any) => {
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

  return {
    directives,
    vIf,
    vShow,
    vBind,
    vFor,
    vModels,
    onValueChange,
    onForChange,
    onModelChange
  };
}
