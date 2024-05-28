import type { PropType, InjectionKey, ComponentInternalInstance } from 'vue';
import type {
  GridSortableOptions,
  GridColumns,
  GridCustomInfo,
  VxeGridPropTypes,
  GridCellRenders,
  GridEditRenders,
  GridFilterRenders
} from './types';

export const gridProps = {
  /**
   * 列配置，重定义是为了实现列拖拽排序， watch列变化变化刷新列
   */
  columns: {
    type: Array as PropType<GridColumns>,
    default() {
      return [] as GridColumns;
    }
  },
  /**
   * 行拖拽排序
   */
  rowSortable: {
    type: [Boolean, Object] as PropType<boolean | GridSortableOptions>,
    default: false
  },
  /**
   * 列拖拽排序
   */
  columnSortable: {
    type: [Boolean, Object] as PropType<boolean | GridSortableOptions>,
    default: false
  },

  /**
   * 开启用户自定义
   */
  customable: {
    type: Boolean
  },

  /**
   * 获取自定义配置
   */
  getCustom: {
    type: Function as PropType<(id: string) => Promise<GridCustomInfo>>
  },

  /**
   * 保存自定义配置
   */
  saveCustom: {
    type: Function as PropType<(info: GridCustomInfo) => Promise<any>>
  },

  /**
   * 开启列resizable
   */
  resizable: {
    type: Boolean,
    default: false
  },

  /**
   * 查询方法，可以通过 proxy-config.props 配置读取响应结构的字段；
   * 如果使用了服务端排序，sort 属性可以获取相关信息；
   * 如果使用了服务端过滤，filter 属性可以获取相关信息；
   * 如果使用了表单，form 属性可以获取相关信息
   */
  query: {
    type: Function as PropType<
      (params: VxeGridPropTypes.ProxyAjaxQueryParams) => Promise<any>
    >
  },
  /**
   * 全量查询方法，和 query 同样属于查询方法，区别是 queryAll 只会被特殊行为触发，
   * 例如导出模式 export-config.mode=all 时会触发该方法并将返回值进行导出
   */
  queryAll: {
    type: Function as PropType<
      (params: VxeGridPropTypes.ProxyAjaxQueryAllParams) => Promise<any>
    >
  },
  /**
   * 删除方法，提交的参数 { removeRecords }
   */
  delete: {
    type: Function as PropType<
      (params: VxeGridPropTypes.ProxyAjaxDeleteParams) => Promise<any>
    >
  },
  /**
   * 保存方法，body 参数 { insertRecords, updateRecords, removeRecords, pendingRecords
   */
  save: {
    type: Function as PropType<
      (params: VxeGridPropTypes.ProxyAjaxSaveParams) => Promise<any>
    >
  },
  /**
   * 开启分页
   */
  pager: {
    type: Boolean
  },

  /**
   * 开启虚拟滚动
   */
  virtual: {
    type: Boolean,
    default: false
  },

  /**
   * 单元格渲染器
   */
  cellRenders: {
    type: Object as PropType<GridCellRenders>
  },

  /**
   *  编辑状态单元格渲染器
   */
  editRenders: {
    type: Object as PropType<GridEditRenders>
  },

  /**
   *  过滤器渲染器
   */
  filterRenders: {
    type: Object as PropType<GridFilterRenders>
  },

  /**
   *  开启支持编辑模式
   */
  editable: {
    type: Boolean,
    default: false
  },
  /**
   *  查询表单模型数据
   */
  queryModel: {
    type: Object as PropType<Record<string, any>>
  }
};

export const GridInstanceKey: InjectionKey<ComponentInternalInstance | null> =
  Symbol('GridInstanceKey');
