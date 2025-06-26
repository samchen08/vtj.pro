import { type Ref, computed, watch } from 'vue';
import {
  type Dependencie,
  type ApiSchema,
  type MetaSchema,
  type ProjectConfig,
  type UniConfig
} from '@vtj/core';
import { useEngine, type DesignHelper } from '../../framework';

export function useDesigner(
  iframe: Ref<HTMLIFrameElement | undefined>,
  dependencies: Ref<Dependencie[]>,
  apis: Ref<ApiSchema[]>,
  meta: Ref<MetaSchema[]>,
  config: Ref<ProjectConfig>,
  uniConfig: Ref<UniConfig>
) {
  const engine = useEngine();

  engine.simulator.init(iframe, dependencies, apis, meta, config, uniConfig);

  const designer = computed(() => engine.simulator.designer.value);

  const hover = computed(() =>
    getComputedHelper('hover', designer.value?.hover.value)
  );

  const dropping = computed(() =>
    getComputedHelper('dropping', designer.value?.dropping.value)
  );

  const selected = computed(() =>
    getComputedHelper('selected', designer.value?.selected.value)
  );

  const lines = computed(() =>
    engine.state.outlineEnabled
      ? getComputedLinesStyle(designer.value?.lines.value || [])
      : []
  );

  watch(engine.changed, () => {
    designer.value?.updateRect();
    designer.value?.updateLines();
  });

  return {
    designer,
    dropping,
    hover,
    selected,
    lines
  };
}

function getPosition(rect: DOMRect, leftPriority: boolean = true) {
  const { top, height, width, left, right } = rect || {};
  const WIDTH = 250;
  if (height > 100 && width > WIDTH) {
    return 'inner';
  }
  let h, v;
  v = top > 30 ? 'top' : 'bottom';
  h = leftPriority ? 'left' : left < WIDTH && width < WIDTH ? 'left' : 'right';
  h = right > WIDTH ? 'right' : 'left';

  return [h, v].join('-');
}

function getDropRect(helpr: DesignHelper) {
  const { rect, type } = helpr;
  const { left, width, top, height } = rect;
  const newRect = { left, width, top, height };
  switch (type) {
    case 'left':
      newRect.left = 0;
      newRect.width = 0;
      break;
    case 'right':
      newRect.left = newRect.left + newRect.width - 4;
      newRect.width = 0;
      break;
    case 'bottom':
      newRect.top = newRect.top + newRect.height - 4;
      newRect.height = 0;
      break;
    case 'top':
      newRect.height = 0;
      break;
  }
  return newRect;
}

function getComputedHelper(name: string, helpr?: DesignHelper | null) {
  if (!helpr) return null;
  const { left, top, width, height } =
    name === 'dropping' ? getDropRect(helpr) : helpr.rect;
  const style: Record<string, any> = {
    left: `${left}px`,
    top: `${top}px`,
    width: `${width}px`,
    height: `${height}px`,
    visibility: width || height ? 'visible' : 'hidden'
  };
  return {
    ...helpr,
    style,
    position: getPosition(helpr.rect, name !== 'selected')
  };
}

function getComputedLinesStyle(lines: DOMRect[]) {
  return lines.map((rect) => {
    const { width, height, left, top } = rect;
    return {
      width: `${width}px`,
      height: `${height}px`,
      left: `${left}px`,
      top: `${top}px`
    };
  });
}
