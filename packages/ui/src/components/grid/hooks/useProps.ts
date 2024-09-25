import { computed, useAttrs } from 'vue';
import { camelCase, kebabCase, merge, toFixed } from '@vtj/utils';
import type {
  GridProps,
  GridEmits,
  VxeGridPropTypes,
  VxeTablePropTypes,
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
    isCurrent: true,
    isHover: true,
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
    : getAttrValue(attrs, 'scrollY');
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
    : getAttrValue(attrs, 'fitlerConfig');
}

function useSortConfig(props: GridProps, attrs: Record<string, any>) {
  const { pager } = props;
  return pager
    ? Object.assign(
        {
          remote: pager
        },
        getAttrValue(attrs, 'sortConfig') || {}
      )
    : getAttrValue(attrs, 'sortConfig');
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
    : getAttrValue(attrs, 'editConfig');
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
        isEnter: true,
        isChecked: true,
        isDel: true,
        ...(getAttrValue(attrs, 'keyboardConfig') || {})
      }
    : getAttrValue(attrs, 'keyboardConfig');

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

function useFooter(props: GridProps, attrs: Record<string, any>) {
  const { sumFields = [], avgFields = [], sumAllFields } = props;
  const showFooter =
    !!sumFields.length ||
    !!avgFields.length ||
    !!sumAllFields ||
    getAttrValue(attrs, 'showFooter');

  const sumMethod = (list: any[], field: string) => {
    let count = 0;
    list.forEach((item) => {
      count += Number(item[field] || 0);
    });
    return toFixed(count, 4, true);
  };

  const avgMethod = (list: any[], field: string) => {
    let count = sumMethod(list, field);
    return toFixed(count / list.length, 4, true);
  };

  const defaultFooterMethod = getAttrValue(attrs, 'footerMethod');
  const footerMethod: VxeTablePropTypes.FooterMethod = (params) => {
    const { columns, data } = params;

    const rows = [];
    if (sumFields.length) {
      const sumPage = columns.map((column, columnIndex) => {
        if (columnIndex === 0) {
          return '合计';
        }
        if (sumFields.includes(column.field)) {
          return sumMethod(data, column.field);
        }
        return null;
      });
      rows.push(sumPage);
    }

    if (avgFields.length) {
      const avgPage = columns.map((column, columnIndex) => {
        if (columnIndex === 0) {
          return '平均';
        }
        if (avgFields.includes(column.field)) {
          return avgMethod(data, column.field);
        }
        return null;
      });
      rows.push(avgPage);
    }

    if (sumAllFields) {
      const keys = Object.keys(sumAllFields);
      const sumAll = columns.map((column, columnIndex) => {
        if (columnIndex === 0) {
          return '总计';
        }
        if (keys.includes(column.field)) {
          return sumAllFields[column.field];
        }
        return null;
      });
      rows.push(sumAll);
    }

    return rows;
  };

  return {
    footerMethod: defaultFooterMethod || footerMethod,
    showFooter
  };
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
    const sortConfig = useSortConfig(props, attrs);
    const toolbarConfig = useToolbarConfig(props, attrs, slots);
    const {
      keepSource,
      editConfig,
      mouseConfig,
      keyboardConfig,
      onCellSelected
    } = useEditMode(props, attrs, emit);

    const { footerMethod, showFooter } = useFooter(props, attrs);

    return {
      ...defaults,
      ...attrs,
      id: props.id,
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
      onCellSelected,
      footerMethod,
      showFooter
    };
  });

  return {
    vxeProps
  };
}
