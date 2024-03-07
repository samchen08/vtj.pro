import type { ExtractPropTypes } from 'vue';
import { contextMenuProps } from './props';

export interface ContextMenuItem {
  title: string;
  icon?: string | ContextMenuIcon;
  disabled?: boolean;
  click?: () => void;
}

export interface ContextMenuIcon {
  type: string;
  color?: string;
  fontFamily?: string;
}

export type contextMenuPosition = { x: number; y: number };

export type ContextMenuProps = ExtractPropTypes<typeof contextMenuProps>;
