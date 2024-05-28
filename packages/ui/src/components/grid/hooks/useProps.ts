import { type MaybeRef, computed, useAttrs, unref } from 'vue';
import { merge, camelCase, kebabCase } from '@vtj/utils';
import type {
  GridProps,
  GridEmits,
  VxeGridProps,
  VxeGridPropTypes,
  VxeGridInstance
} from '../types';
import { BUTTONS_SLOT_NAME, PAGER_LEFT_SLOT_NAME } from '../constants';
import type { Emits } from '../../shared';

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

function useProxyConfig(
  props: GridProps,
  attrs: Record<string, any>,
  wrapper: (...args: any) => any
) {
  const { query, queryAll, save } = props;
  const config: VxeGridPropTypes.ProxyConfig = {
    enabled: !!query,
    seq: true,
    sort: true,
    filter: true,
    form: false,
    props: {
      total: 'total',
      result: 'list',
      list: 'list',
      message: 'msg'
    },
    ajax: {
      query: wrapper(query),
      queryAll: wrapper(queryAll),
      save: wrapper(save),
      delete: wrapper(props.delete)
    }
  };
  return merge(config, getAttrValue(attrs, 'proxyConfig') || {});
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

function usePagerConig(
  props: GridProps,
  attrs: Record<string, any>,
  slots: string[]
) {
  const { pager } = props;
  const slot = slots.find((n) => n === PAGER_LEFT_SLOT_NAME);
  const config: VxeGridPropTypes.PagerConfig = {
    background: true,
    size: 'mini',
    pageSize: 50,
    pageSizes: [50, 100, 200, 500],
    layouts: [
      'Total',
      'Sizes',
      'PrevJump',
      'PrevPage',
      'JumpNumber',
      'NextPage',
      'NextJump',
      'FullJump'
    ],
    slots: {
      left: slot
    }
  };
  return pager
    ? Object.assign(config, getAttrValue(attrs, 'pagerConfig') || {})
    : undefined;
}

function useScrollY(props: GridProps, attrs: Record<string, any>) {
  const { virtual } = props;
  return virtual
    ? Object.assign(
        {
          enabled: true,
          gt: 10
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

export function useProps(
  props: GridProps,
  slots: string[],
  emit: Emits<GridEmits>,
  vxeRef: MaybeRef<VxeGridInstance | undefined>
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

  const getProxyInfo = () => {
    const info = unref(vxeRef)?.getProxyInfo();
    if (props.queryModel && info) {
      info.form = Object.assign({}, info.form, props.queryModel);
    }
    return info;
  };

  const wrapper = (func: any) => {
    if (func) {
      return (info: any) => {
        info.form = Object.assign({}, info.form, props.queryModel);
        return func(info);
      };
    }
    return undefined;
  };

  const vxeProps = computed(() => {
    const columnConfig = useColumnConfig(props, attrs);
    const rowConfig = useRowConfig(attrs);
    const pagerConfig = usePagerConig(props, attrs, slots);
    const proxyConfig = useProxyConfig(props, attrs, wrapper);
    const scrollY = useScrollY(props, attrs);
    const toolbarConfig = useToolbarConfig(props, attrs, slots);
    const filterConfig = useFitlerConfig(props, attrs);
    const sortConfig = useSortconfig(props, attrs);
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
      pagerConfig,
      proxyConfig,
      scrollY,
      toolbarConfig,
      filterConfig,
      sortConfig,
      keepSource,
      editConfig,
      mouseConfig,
      keyboardConfig,
      onCellSelected
    };
  });

  return {
    vxeProps,
    getProxyInfo
  };
}
