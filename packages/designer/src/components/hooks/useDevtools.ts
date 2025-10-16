import { ref, shallowRef, watch, computed } from 'vue';
import {
  devtoolsInspector,
  removeDevToolsAppRecord,
  setIframeServerContext,
  createRpcServer,
  initDevTools,
  setActiveAppRecord
} from '@vue/devtools-kit';
import * as devtoolsApi from '@vue/devtools-api';
import { rpcServer, functions } from '@vue/devtools-core';
import { delay } from '@vtj/utils';
import { NodeModel } from '@vtj/core';
import { useEngine } from '../../framework';

export function useDevtools() {
  const engine = useEngine();
  const dialogRef = ref();
  const visible = ref(false);
  const client = shallowRef();
  const hook = shallowRef();
  const designer = computed(() => engine.simulator.designer.value);
  (window as any).devtoolsApi = devtoolsApi;
  (window as any).__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__ = {};
  let stopHover: any = null;
  let stopSelected: any = null;
  let inspecting: boolean = false;

  functions.cancelInspectComponentInspector = async () => {
    inspecting = false;
    designer.value?.setHover(null);
    stopHover && stopHover();
    stopSelected && stopSelected();
  };

  functions.highlighComponent = async (uid: string) => {
    if (inspecting) return;
    const instanceMap = (window as any).__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__
      ?.instanceMap as Map<string, any>;
    if (!instanceMap) return;
    const instance = instanceMap.get(uid);
    if (!instance) return;
    const id = instance.ctx?.$el?.__vtj__;
    if (!id) return;
    const model = NodeModel.nodes[id];
    if (model) {
      designer.value?.setHover(model);
    }
  };

  functions.inspectComponentInspector = async () => {
    inspecting = true;
    return new Promise<string>((resolve) => {
      stopHover = watch(
        () => designer.value?.hover.value,
        (v) => {
          if (visible.value && v && v.el) {
            const id = (v.el as any).__vueParentComponent
              .__VUE_DEVTOOLS_NEXT_UID__;
            functions.highlighComponent(id);
          }
        }
      );
      stopSelected = watch(
        () => designer.value?.selected.value,
        (v) => {
          if (v && v.el) {
            stopHover && stopHover();
            stopSelected && stopSelected();
            const id = (v.el as any).__vueParentComponent
              .__VUE_DEVTOOLS_NEXT_UID__;
            resolve(JSON.stringify({ id }));
            inspecting = false;
          } else {
            functions.cancelInspectComponentInspector();
          }
        }
      );
    });
  };

  initDevTools();
  createRpcServer(functions, {
    preset: 'iframe'
  });

  const cleanEngineApp = async () => {
    const skeletonwrapper = 'skeletonwrapper';
    const appRecords = (window as any).__VUE_DEVTOOLS_KIT_APP_RECORDS__ || [];
    const inspectorIndex = devtoolsInspector.findIndex(
      (n: any) => n.appRecord.id === skeletonwrapper
    );

    devtoolsInspector.splice(inspectorIndex, 1);
    const record = appRecords.find((n: any) => n.id === skeletonwrapper);
    const app = appRecords.find((n: any) => n.id !== skeletonwrapper);
    if (app && client.value) {
      await functions.toggleApp(app.id);
      setActiveAppRecord(app);
    }
    if (record) {
      removeDevToolsAppRecord(record.app);
      hook.value.callHook('app:unmount', record.app);
    }
    await delay(500);
    dialogRef.value.$vtjEl.click();
  };

  const setupDevtools = () => {
    const iframe = dialogRef.value?.iframeRef;
    setIframeServerContext(iframe);
    client.value = rpcServer.value.clients[0];
    hook.value = (window as any).__VUE_DEVTOOLS_HOOK;
    cleanEngineApp();
  };

  const destoryDevtools = () => {
    removeDevToolsAppRecord(engine.simulator.renderer?.app);
    client.value = null;
    hook.value = null;
  };

  return {
    dialogRef,
    engine,
    setupDevtools,
    destoryDevtools,
    visible
  };
}
