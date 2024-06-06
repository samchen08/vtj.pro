import type { PropType, InjectionKey, ComponentInternalInstance } from 'vue';
import type {
  GridSortableOptions,
  GridColumns,
  GridCustomInfo,
  GridCellRenders,
  GridEditRenders,
  GridFilterRenders,
  GridLoader
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
  loader: {
    type: Function as PropType<GridLoader>
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
   * 开启分页
   */
  pager: {
    type: Boolean
  },

  /**
   *  初始页码
   */
  page: {
    type: Number,
    default: 1
  },

  /**
   * 初始每页显示条目个数
   */
  pageSize: {
    type: Number,
    default: 50
  },

  /**
   * 每页显示个数选择器的选项设置
   */
  pageSizes: {
    type: Array as PropType<number[]>,
    default: () => {
      return [50, 100, 200, 500];
    }
  },

  /**
   * 初始执行加载函数
   */
  auto: {
    type: Boolean,
    default: true
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
  }
};

export const GridInstanceKey: InjectionKey<ComponentInternalInstance | null> =
  Symbol('GridInstanceKey');
