import { defineComponent, h, markRaw, type PropType } from 'vue';
import { type MaterialSetter, type BlockPropDataType } from '@vtj/core';
import { type Context, isJSExpression, isJSFunction } from '@vtj/renderer';
import { BlockModel } from '@vtj/core';
import { type Setter } from '../framework';
import { setterManager } from '../managers';
import { SetterView } from '../components';

export const SetterWrapper = defineComponent({
  name: 'SetterWrapper',
  props: {
    context: {
      type: Object as PropType<Context | null>,
      default: null
    },
    current: {
      type: Object as PropType<BlockModel | null>,
      default: null
    },
    name: String,
    label: String,
    title: String,
    value: {
      type: [String, Object, Array, Number, Boolean],
      default: undefined
    },
    setters: {
      type: [String, Object, Array] as PropType<
        string | MaterialSetter | Array<string | MaterialSetter>
      >,
      required: true,
      default() {
        return [setterManager.defaultSetter];
      }
    },
    options: {
      type: Array,
      default() {
        return [];
      }
    },
    variable: {
      type: Boolean,
      default: true
    },
    removable: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    computedSetters() {
      const setters = Array.isArray(this.setters)
        ? this.setters
        : [this.setters];
      return setters.map((setter) => {
        let match;
        if (typeof setter === 'string') {
          match = this.getSetter(setter);
          return {
            component: markRaw(match.component),
            name: match.name,
            label: setter,
            props: match.props || {}
          };
        } else {
          const item: MaterialSetter = setter as MaterialSetter;
          match = this.getSetter(item.name);
          return {
            component: markRaw(item.component || match.component),
            name: item.name,
            label: item.label || item.name,
            props: Object.assign(match.props || {}, item.props)
          };
        }
      });
    },
    computedOptions() {
      const options = this.options || [];
      return options.map((option) => {
        if (typeof option === 'string') {
          return {
            label: option,
            value: option
          };
        }
        return option;
      });
    },
    defaultSetter() {
      const { value, computedSetters } = this;
      let type: string = typeof value;
      if (type === 'object') {
        if (Array.isArray(value)) {
          type = 'array';
        } else if (isJSExpression(value)) {
          type = 'object';
        } else if (isJSFunction(value)) {
          type = 'function';
        }
      }
      const setters = setterManager.getByType(type as BlockPropDataType) || [];
      if (setters.length) {
        return (
          computedSetters.find((setter) => setters.includes(setter.name)) ||
          computedSetters[0]
        )?.name;
      }
      return computedSetters[0]?.name;
    }
  },
  render() {
    const {
      context,
      current,
      name,
      label,
      title,
      value,
      computedSetters,
      computedOptions,
      variable,
      changeValue,
      defaultSetter,
      removable,
      onRemove
    } = this;
    return h(SetterView, {
      context,
      current,
      name,
      label,
      title,
      setters: computedSetters,
      defaultSetter: defaultSetter,
      variable,
      value,
      removable,
      options: computedOptions,
      onChange: changeValue,
      onRemove: onRemove
    } as any);
  },
  emits: ['change', 'remove'],
  methods: {
    getSetter(name: string | Setter): Setter {
      return typeof name === 'string'
        ? setterManager.get(name) || setterManager.defaultSetter
        : name;
    },
    changeValue(val: any) {
      this.$emit('change', this.name, val);
    },
    onRemove(name: string) {
      this.$emit('remove', name);
    }
  }
});
