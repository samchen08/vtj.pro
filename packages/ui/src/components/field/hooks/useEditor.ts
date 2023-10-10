import { computed, MaybeRef, unref } from 'vue';
import { BuiltinEditors, FieldEditor, FieldProps } from '../types';
import { merge } from '@vtj/utils';

export function useEditor(props: FieldProps) {
  return computed(() => {
    const { editor = 'text', placeholder, label, disabled } = props;
    const defaultProps = {
      placeholder:
        placeholder || (placeholder === null ? undefined : `请输入${label}`),
      disabled
    };
    return merge(
      typeof editor === 'string'
        ? BuiltinEditors[editor] || BuiltinEditors.text
        : BuiltinEditors[editor.name as string] || {},
      { props: defaultProps },
      editor
    );
  });
}
