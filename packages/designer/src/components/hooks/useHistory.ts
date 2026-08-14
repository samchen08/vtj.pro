import { computed, unref, type MaybeRef } from 'vue';
import type { HistoryType } from '@vtj/core';
import { useEngine, Designer } from '../../framework';
import { confirm } from '../../utils';

export function useHistory(source: MaybeRef<HistoryType> = 'file') {
  const engine = useEngine();

  const designer = computed<Designer | null>(
    () => engine.simulator.designer.value
  );
  const history = computed(() => {
    if (unref(source) === 'project') {
      return engine.projectHistory.value;
    }
    return engine.current.value ? engine.history.value : null;
  });
  const total = computed(() => history.value?.items.length || 0);

  const forward = () => {
    designer.value?.cleanHelper();
    history.value?.forward();
  };

  const backward = () => {
    history.value?.backward();
    designer.value?.cleanHelper();
  };

  const load = async (id: string) => {
    if (unref(source) === 'project') {
      const ret = await confirm(
        '确定恢复该项目历史版本吗？项目配置及文件清单将被覆盖，文件内容不会回滚。'
      );
      if (!ret) return;
    }
    designer.value?.cleanHelper();
    history.value?.load(id);
  };

  const forwardDisabled = computed(() => {
    if (total.value <= 1) return true;
    const index = history.value?.index || -1;
    return index <= 0;
  });

  const backwardDisabled = computed(() => {
    if (total.value <= 1) return true;
    const index = history.value?.index || -1;
    return index >= total.value - 1;
  });

  const getHistoryDsl = async (id: string) => {
    if (history.value) {
      const projectDsl = engine.project.value?.toDsl();
      const item = await engine.service.getHistoryItem(
        history.value.id,
        id,
        projectDsl
      );
      return item?.dsl;
    }
  };

  const getCurrentDsl = () => {
    return unref(source) === 'project'
      ? engine.project.value?.toDsl()
      : engine.current.value?.toDsl();
  };

  return {
    engine,
    history,
    total,
    forward,
    backward,
    load,
    forwardDisabled,
    backwardDisabled,
    getHistoryDsl,
    getCurrentDsl
  };
}
