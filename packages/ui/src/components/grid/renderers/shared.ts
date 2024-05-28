import {
  type DefineRendererOption,
  type VxeGlobalRendererHandles
} from 'vxe-table';
import { isString } from '@vtj/utils';

export const sharedFilterOptions: DefineRendererOption<VxeGlobalRendererHandles.RenderResult> =
  {
    // 重置数据方法
    filterResetMethod(params) {
      const { options, column } = params;
      if ((column as any).filterResetMethod) {
        (column as any).filterResetMethod(params);
        return;
      }
      options.forEach((option) => {
        option.value = '';
      });
    },

    // 重置筛选复原方法（当未点击确认时，该选项将被恢复为默认值）
    filterRecoverMethod(params) {
      const { option, column } = params;
      if ((column as any).filterRecoverMethod) {
        (column as any).filterRecoverMethod(params);
        return;
      }
      option.value = '';
    },

    // 筛选方法
    filterMethod(params) {
      const { option, row, column } = params;
      if (column.filterMethod) {
        return column.filterMethod(params);
      }
      const { value } = option;
      const cellValue = row[column.field];
      if (isString(cellValue)) {
        return cellValue.indexOf(String(value)) > -1;
      }
      return cellValue === value;
    }
  };
