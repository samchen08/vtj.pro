import { computed } from 'vue';
import { useEngine, Designer } from '../../framework';
import { message } from '../../utils';
export function useHistory() {
  const engine = useEngine();

  const designer = computed<Designer | null>(
    () => engine.simulator.designer.value
  );
  const history = computed(() =>
    engine.current.value ? engine.history.value : null
  );
  const total = computed(() => history.value?.items.length || 0);

  const forward = () => {
    designer.value?.cleanHelper();
    history.value?.forward();
  };

  const backward = () => {
    history.value?.backward();
    designer.value?.cleanHelper();
  };

  const load = (id: string) => {
    designer.value?.cleanHelper();
    history.value?.load(id);
    message('已载入历史记录', 'success');
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

  return {
    engine,
    history,
    total,
    forward,
    backward,
    load,
    forwardDisabled,
    backwardDisabled
  };
}
