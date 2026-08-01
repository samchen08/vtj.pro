import { getCurrentInstance, watch } from 'vue';
import {
  VxeTableFilterModule,
  VxeTableEditModule,
  VxeTableMenuModule,
  VxeTableExportModule,
  VxeTableKeyboardModule,
  VxeTableValidatorModule,
  VxeTableCustomModule,
  VxeGrid,
  VXETable,
  VxeTooltip,
  VxeToolbar,
  VxeModal,
  type VXETableConfigOptions
} from 'vxe-table';
import { useDark } from '@vueuse/core';
import { useAdapter } from '../../../adapter';
import { RenderPlugin } from '../renderers';

export function useVxe(options: VXETableConfigOptions = {}) {
  const modules = [
    VxeTableFilterModule,
    VxeTableEditModule,
    VxeTableMenuModule,
    VxeTableExportModule,
    VxeTableKeyboardModule,
    VxeTableValidatorModule,
    VxeTableCustomModule,
    VxeGrid,
    VxeTooltip,
    VxeToolbar,
    VxeModal
  ];
  const instance = getCurrentInstance();
  const app = instance?.appContext.app;
  const { vxeConfig, vxePlugin } = useAdapter();
  const isDark = useDark({ storageKey: 'color-schema' });
  if (app && !(app as any).__installVxe) {
    VXETable.use(RenderPlugin);
    if (vxePlugin) {
      VXETable.use(vxePlugin);
    }
    VXETable.setConfig({
      ...vxeConfig,
      ...options
    });
    modules.forEach((n) => app.use(n));
    (app as any).__installVxe = true;
  }

  // vxe-table 4.6.x 的类型声明包含 VXETable.setTheme，但运行时并未挂载该方法
  // （setTheme 仅存在于 v-x-e-table/src/theme 模块内部），此处按库内部实现等价处理：
  // 通过 data-vxe-ui-theme 属性切换主题
  const setTheme = (theme: 'light' | 'dark') => {
    if (typeof document !== 'undefined') {
      const documentElement = document.documentElement;
      if (documentElement) {
        documentElement.setAttribute('data-vxe-ui-theme', theme);
      }
    }
  };

  watch(
    isDark,
    (v) => {
      setTheme(v ? 'dark' : 'light');
    },
    { immediate: true }
  );

  return {
    VxeGrid,
    VXETable
  };
}
