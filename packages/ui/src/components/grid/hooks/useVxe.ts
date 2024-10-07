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
  const isDark = useDark();
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

  watch(
    isDark,
    (v) => {
      VXETable.setTheme(v ? 'dark' : 'light');
    },
    { immediate: true }
  );

  return {
    VxeGrid,
    VXETable
  };
}
