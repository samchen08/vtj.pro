import {
  computed,
  ref,
  watch,
  type ComponentInternalInstance,
  type ComputedRef
} from 'vue';
import {
  type BuiltinFieldEditor,
  builtinFieldEditors,
  type FieldProps,
  type FieldOption,
  type FieldEmits,
  type FieldEditorProps
} from '../types';
import type { Emits, FormModel } from '../../';
import { merge, toArray, get } from '@vtj/utils';

export async function useOptions(
  props: FieldProps,
  cascader: Record<string, any>
) {
  const options = props.options;
  if (!options) return [];
  if (typeof options === 'function') {
    return (await options(cascader)) || [];
  }
  return options;
}

export function useEditor(
  props: FieldProps,
  emit: Emits<FieldEmits>,
  fieldVisible: ComputedRef<boolean>,
  instance: ComponentInternalInstance | null,
  model: FormModel | null
) {
  const optionsRef = ref<FieldOption[]>([]);

  const watcher = computed(() => {
    if (!instance || !model) return {};
    const cascader = toArray<string>(props.cascader);
    return cascader.reduce((prev, current) => {
      prev[current] = get(model, current);
      return prev;
    }, {} as FormModel);
  });

  watch(
    [watcher, () => props.options],
    async ([val, _o]) => {
      if (fieldVisible.value) {
        optionsRef.value = await useOptions(props, val);
        const reset = instance?.exposed?.reset;
        if (reset && props.name) {
          // reset(props.name);
        }
      }
    },
    {
      immediate: true
    }
  );

  const inputProps = props.props || {};

  const editor = computed(() => {
    const {
      editor = 'text',
      placeholder,
      label = '...',
      disabled,
      readonly
    } = props;
    const editorProps: FieldEditorProps = {
      ...inputProps,
      placeholder:
        placeholder || (placeholder === null ? undefined : `请输入${label}`),
      disabled,
      readonly,
      options: optionsRef.value,
      onFocus: () => emit('focus'),
      onBlur: () => emit('blur'),
      onChange: (v: any, data?: any) => emit('change', v, data)
    };

    const builtinEditor: BuiltinFieldEditor =
      typeof editor === 'string'
        ? builtinFieldEditors[editor]
        : {
            component: editor,
            props: {}
          };

    return merge({}, builtinEditor, {
      props: editorProps
    }) as BuiltinFieldEditor;
  });

  return {
    editor
  };
}
