import type { PropType } from 'vue';
import type { ComponentPropsType, DataLoader } from '../shared';
import type { PaginationProps } from 'element-plus';

export interface ListData {
  list: any[];
  total?: number;
}

export interface ListState {
  page: number;
  pageSize: number;
}

export interface ListInfiniteScroll {
  disabled?: boolean;
  delay?: number;
  distance?: number;
  immediate?: boolean;
}

export const listProps = {
  data: {
    type: [Object, Function] as PropType<DataLoader<ListData, ListState>>,
    default() {
      return [];
    }
  },

  /**
   * 设置 itemHeight 即自动开启虚拟滚动
   */
  itemHeight: {
    type: [Number, Function] as PropType<number | ((index: number) => number)>
  },

  width: {
    type: [String, Number],
    default: '100%'
  },

  height: {
    type: [String, Number],
    default: '100%'
  },
  pager: {
    type: [Boolean, Object] as PropType<boolean | Partial<PaginationProps>>
  },
  page: {
    type: Number,
    default: 1
  },
  pageSize: {
    type: Number,
    default: 10
  },
  dataKey: {
    type: String
  },
  infiniteScroll: {
    type: [Boolean, Object] as PropType<boolean | ListInfiniteScroll>
  }
};

export type ListProps = ComponentPropsType<typeof listProps>;

export type ListEmits = {
  load: [state: ListState];
};
