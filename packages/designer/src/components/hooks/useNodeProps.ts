import { type ComputedRef, computed, ref, watch } from 'vue';
import {
  isBlock,
  type MaterialSetter,
  type MaterialProp,
  type MaterialDescription
} from '@vtj/core';
import { type DesignHelper, useEngine } from '../../framework';

const defaultSetters: MaterialSetter[] = [
  {
    name: 'StringSetter',
    label: '文本'
  },
  {
    name: 'ExpressionSetter',
    label: '表达式'
  }
];

export function useNodeProps(
  selected: ComputedRef<DesignHelper | null | undefined>
) {
  const engine = useEngine();

  const node = computed(() => {
    const model = selected.value?.model || null;
    return isBlock(model) ? null : model;
  });

  const blockMaterial = ref<MaterialDescription>();

  watch(
    node,
    async (v) => {
      if (v?.from) {
        blockMaterial.value =
          (await engine.assets.getBlockMaterial(v.from)) || undefined;
      } else {
        blockMaterial.value = undefined;
      }
    },
    { immediate: true }
  );

  const commonProps = computed<MaterialSetter[]>(() => {
    if (!node.value) return [];
    return [
      {
        name: 'key',
        setters: defaultSetters,
        value: node.value.getPropValue('key')
      },
      {
        name: 'ref',
        setters: defaultSetters,
        value: node.value.getPropValue('ref')
      },
      {
        name: 'class',
        label: 'class',
        setters: defaultSetters,
        value: node.value.getPropValue('class')
      },
      {
        name: 'style',
        label: 'style',
        setters: [
          {
            name: 'JSONSetter',
            label: 'JSON'
          },
          {
            name: 'ExpressionSetter',
            label: '表达式'
          }
        ],
        value: node.value.getPropValue('style')
      },
      {
        name: 'children',
        label: '文本',
        title: '如设置组件文本，将清空子组件',
        setters: defaultSetters,
        value: Array.isArray(node.value.children) ? '' : node.value.children
      }
    ];
  });

  const componentProps = computed<MaterialProp[]>(() => {
    if (!node.value) return [];

    const desc =
      blockMaterial.value || engine.assets.componentMap.get(node.value.name);
    if (!desc) return [];
    const props = desc.props || [];
    return props.map((n) => {
      return {
        ...n,
        value: node.value?.getPropValue(n.name) ?? n.defaultValue
      };
    });
  });

  const isExist = (name: string) => {
    return (
      commonProps.value.some((n) => n.name === name) ||
      componentProps.value.some((n) => n.name === name) ||
      name === 'style'
    );
  };

  const customProps: ComputedRef<MaterialProp[]> = computed(() => {
    if (!node.value) return [];

    return Object.keys(node.value.props)
      .filter((key) => !isExist(key))
      .map((name) => {
        return {
          name,
          setters: 'InputSetter',
          value: node.value?.getPropValue(name)
        };
      });
  });

  const change = (name: string, value: any) => {
    if (!node.value) return;
    if (name === 'children') {
      node.value.setChildren(value);
    } else {
      node.value.setProp(name, value);
    }
  };

  const addCustom = (name: string) => {
    if (name) {
      node.value?.setProp(name, '');
    }
  };

  const removeCustom = (name: string) => {
    node.value?.removeProp(name);
  };

  return {
    commonProps,
    componentProps,
    customProps,
    node,
    change,
    addCustom,
    removeCustom,
    isExist
  };
}
