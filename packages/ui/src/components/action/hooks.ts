import { computed } from 'vue';
import type { ElTooltipProps, BadgeProps } from 'element-plus';
import type { ActionDropdown, ActionProps } from './types';

export function useTooltip(props: ActionProps) {
  return computed<Partial<ElTooltipProps> | undefined>(() => {
    const tooltip = props.tooltip;
    if (!tooltip) {
      return undefined;
    }
    return typeof tooltip === 'string' ? { content: tooltip } : tooltip;
  });
}

export function useBadge(props: ActionProps) {
  return computed<Partial<BadgeProps> | undefined>(() => {
    const badge = props.badge;
    if (!badge) return undefined;
    return typeof badge === 'object' ? badge : { value: badge };
  });
}

export function useDropdown(props: ActionProps) {
  return computed<ActionDropdown | undefined>(() => {
    const { dropdown, menus } = props;
    if (menus && menus.length > 0) {
      return Object.assign(
        { popperClass: 'x-action__menus', size: props.size },
        dropdown || {}
      );
    }
    return undefined;
  });
}
