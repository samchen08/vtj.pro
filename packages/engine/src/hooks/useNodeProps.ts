import { ComputedRef, ref, computed, reactive, watch } from 'vue';
import { Node } from '../models';
import {
  Assets,
  ComponentProp,
  ComponentDescription,
  FromSchema
} from '../core';
import { isNode } from '../utils';

export function useNodeProps(node: ComputedRef<Node>, assets: Assets) {
  const defaultSetters = [
    {
      name: 'InputSetter',
      label: '文本'
    },
    {
      name: 'ExpressionSetter',
      label: '表达式'
    }
  ];

  const blockDescription = ref<ComponentDescription>();

  watch(
    node,
    async (v) => {
      if (v) {
        blockDescription.value =
          (await assets.getBlockDescription(v.from)) || undefined;
      } else {
        blockDescription.value = undefined;
      }
    },
    { immediate: true }
  );

  const commonProps = computed<ComponentProp[]>(() => {
    if (!node.value || !isNode(node.value)) return [];
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
        label: '样式',
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

  const componentProps = computed<ComponentProp[]>(() => {
    if (!node.value || !isNode(node.value)) return [];
    const desc =
      blockDescription.value ||
      assets.componentMap[node.value.name] ||
      assets.elementsMap[node.value.name];
    if (!desc) return [];
    const props = desc.props || [];
    return props.map((n) => {
      return {
        ...n,
        value: node.value.getPropValue(n.name) ?? n.defaultValue
      };
    });
  });

  const isExist = (name: string) => {
    return (
      commonProps.value.some((n) => n.name === name) ||
      componentProps.value.some((n) => n.name === name)
    );
  };

  const customProps: ComputedRef<ComponentProp[]> = computed(() => {
    if (!node.value || !isNode(node.value)) return [] as ComponentProp[];
    return Object.keys(node.value.props)
      .filter((key) => !isExist(key))
      .map((name) => {
        return {
          name,
          setters: 'InputSetter',
          value: node.value.getPropValue(name)
        };
      });
  });

  const onChange = (name: string, value: any) => {
    if (name === 'children') {
      node.value.setChildren(value);
    } else {
      node.value.setProp(name, value);
    }
  };

  const addCustom = (name: string) => {
    if (name) {
      node.value.setProp(name, '');
    }
  };

  const removeProp = (name: string) => {
    node.value.removeProp(name);
  };

  return {
    commonProps,
    componentProps,
    onChange,
    customProps,
    addCustom,
    isExist,
    removeProp,
    blockDescription
  };
}
