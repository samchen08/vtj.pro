import type { ComponentPropsType } from '../shared';
import { importButtonProps } from './props';
export type ImportButtonProps = ComponentPropsType<typeof importButtonProps>;

export type ImportButtonEmits = {
  success: [content: any];
  fail: [e: any];
};

export type ImportButtonParserType = 'text' | 'json' | 'base64';

export type ImportButtonParser = (file: File) => Promise<any>;
