import type { PropType } from 'vue';
import type { ImportButtonParserType, ImportButtonParser } from './types';

export const importButtonProps = {
  /**
   * 文件上传函数
   */
  uploader: {
    type: Function
  },
  /**
   * 允许上传多个文件
   */
  multiple: {
    type: Boolean
  },

  /**
   * 接受上传的文件类型
   * 例如：.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document
   */
  accept: {
    type: String
  },

  /**
   * 文件解析器
   */
  parser: {
    type: [String, Function] as PropType<
      ImportButtonParserType | ImportButtonParser
    >
  }
};
