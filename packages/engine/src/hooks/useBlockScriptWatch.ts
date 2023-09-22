import {
  computed,
  ref,
  reactive,
  watchEffect,
  PropType,
  ExtractPropTypes
} from 'vue';
import { Block } from '../models';
import { WatchSchema } from '../core';
import { expressionValidate, cloneDeep } from '../utils';

export const watchDataDialogProps = {
  block: {
    type: Object as PropType<Block>,
    default: null
  },
  data: {
    type: Object as PropType<WatchSchema>
  }
};

export type WatchDataDialogProps = ExtractPropTypes<
  typeof watchDataDialogProps
>;

export function useBlockScriptWatch(props: WatchDataDialogProps) {
  const defaultData: WatchSchema = {
    source: {
      type: 'JSFunction',
      value: '() => { }'
    },
    immediate: false,
    deep: false,
    handler: {
      type: 'JSFunction',
      value: '() => { }'
    }
  };

  const formRef = ref();
  const dialogRef = ref();
  const sourceRef = ref();
  const handlerRef = ref();

  const title = computed(() => (props.data ? `编辑 Watch` : `新增 Watch`));

  const model = reactive<WatchSchema>(props.data || cloneDeep(defaultData));

  watchEffect(() => {
    Object.assign(model, props.data || cloneDeep(defaultData));
  });

  const onSubmit = async () => {
    const context = props.block.runtimeContext;
    const source = sourceRef.value.getEditor().getValue();
    const handler = handlerRef.value.getEditor().getValue();

    if (
      context &&
      expressionValidate({ ...model.source, value: source }, context) &&
      expressionValidate({ ...model.handler, value: handler }, context)
    ) {
      model.source.value = source;
      model.handler.value = handler;
      props.block.setWatch({ ...model });
      dialogRef.value.close();
    }
  };

  return {
    title,
    model,
    onSubmit,
    dialogRef,
    sourceRef,
    handlerRef,
    formRef
  };
}
