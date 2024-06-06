import { computed, useAttrs } from 'vue';
import { camelCase, kebabCase, merge } from '@vtj/utils';
import type {
  GridProps,
  GridEmits,
  VxeGridPropTypes,
  VxeGridProps
} from '../types';

import type { Emits } from '../../shared';
import { BUTTONS_SLOT_NAME } from '../constants';

function getAttrValue(attrs: Record<string, any>, name: string) {
  return attrs[camelCase(name)] ?? attrs[kebabCase(name)] ?? undefined;
}

function useColumnConfig(props: GridProps, attrs: Record<string, any>) {
  const { resizable } = props;
  return {
    useKey: true,
    resizable,
    ...getAttrValue(attrs, 'columnConfig')
  };
}

function useRowConfig(attrs: Record<string, any>) {
  return {
    useKey: true,
    ...getAttrValue(attrs, 'rowConfig')
  };
}

function useScrollY(props: GridProps, attrs: Record<string, any>) {
  const { virtual } = props;
  return virtual
    ? Object.assign(
        {
          enabled: true,
          gt: 20,
          scrollToTopOnChange: true
        },
        getAttrValue(attrs, 'scrollY') || {}
      )
    : undefined;
}

function useFitlerConfig(props: GridProps, attrs: Record<string, any>) {
  const { pager } = props;
  return pager
    ? Object.assign(
        {
          remote: pager
        },
        getAttrValue(attrs, 'fitlerConfig') || {}
      )
    : undefined;
}

function useSortconfig(props: GridProps, attrs: Record<string, any>) {
  const { pager } = props;
  return pager
    ? Object.assign(
        {
          remote: pager
        },
        getAttrValue(attrs, 'sortconfig') || {}
      )
    : undefined;
}

function useEditMode(
  props: GridProps,
  attrs: Record<string, any>,
  emit: Emits<GridEmits>
) {
  const { editable } = props;
  const keepSource = !!editable;
  const editConfig = editable
    ? {
        enabled: !!editable,
        mode: 'cell',
        trigger: 'dblclick',
        showStatus: true,
        ...(getAttrValue(attrs, 'editConfig') || {})
      }
    : undefined;
  const mouseConfig = {
    selected: !!editable,
    ...(getAttrValue(attrs, 'mouseConfig') || {})
  };
  const keyboardConfig = editable
    ? {
        isArrow: true,
        isEsc: true,
        isTab: true,
        isEdit: true,
        isChecked: true,
        ...(getAttrValue(attrs, 'keyboardConfig') || {})
      }
    : undefined;

  const onCellSelected = (params: any) => {
    const { $grid } = params;
    $grid.clearValidate();
    emit('cellSelected', params);
  };

  return {
    keepSource,
    editConfig,
    mouseConfig,
    keyboardConfig,
    onCellSelected
  };
}

function useToolbarConfig(
  props: GridProps,
  attrs: Record<string, any>,
  slots: string[]
) {
  const toolbarConfig = getAttrValue(attrs, 'toolbarConfig');
  const slot = slots.find((n) => n === BUTTONS_SLOT_NAME);
  const config: VxeGridPropTypes.ToolbarConfig = {
    enabled: !!toolbarConfig || !!slot,
    custom: !!props.customable,
    slots: {
      buttons: slot
    }
  };

  return merge(config, toolbarConfig || {});
}

export function useProps(
  props: GridProps,
  slots: string[],
  emit: Emits<GridEmits>
) {
  const attrs: Record<string, any> = useAttrs();
  const defaults: VxeGridProps = {
    layouts: ['Toolbar', 'Form', 'Top', 'Table', 'Bottom', 'Pager'],
    loading: false,
    size: 'small',
    height: 'auto',
    border: true,
    stripe: true,
    showOverflow: 'tooltip',
    autoResize: false
  };

  const vxeProps = computed(() => {
    const columnConfig = useColumnConfig(props, attrs);
    const rowConfig = useRowConfig(attrs);
    const scrollY = useScrollY(props, attrs);
    const filterConfig = useFitlerConfig(props, attrs);
    const sortConfig = useSortconfig(props, attrs);
    const toolbarConfig = useToolbarConfig(props, attrs, slots);
    const {
      keepSource,
      editConfig,
      mouseConfig,
      keyboardConfig,
      onCellSelected
    } = useEditMode(props, attrs, emit);

    return {
      ...defaults,
      ...attrs,
      columnConfig,
      rowConfig,
      scrollY,
      filterConfig,
      sortConfig,
      keepSource,
      editConfig,
      mouseConfig,
      keyboardConfig,
      toolbarConfig,
      onCellSelected
    };
  });

  return {
    vxeProps
  };
}
