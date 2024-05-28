import { getCurrentInstance } from 'vue';
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
  const { vxeConfig } = useAdapter();

  if (app && !(app as any).__installVxe) {
    VXETable.use(RenderPlugin);
    VXETable.setConfig({
      ...vxeConfig,
      ...options
    });
    modules.forEach((n) => app.use(n));
    (app as any).__installVxe = true;
  }

  return {
    VxeGrid,
    VXETable
  };
}
