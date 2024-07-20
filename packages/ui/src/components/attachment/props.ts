import type { PropType } from 'vue';
import { type BaseSize, type MaybePromise } from '../shared';
import type { UploadUserFile } from 'element-plus';
import type {
  AttachmentFile,
  AttachmentUploader,
  AttachmentThumbnail
} from './types';
export const attachmentProps = {
  /**
   * 列表显示的文件
   */
  modelValue: {
    type: Array as PropType<AttachmentFile[]>,
    default: () => []
  },

  /**
   * 选中值，开启 selectable 有效
   */
  selectValue: {
    type: [Object, Array] as PropType<AttachmentFile | AttachmentFile[]>
  },
  /**
   * 文件上传方法
   */
  uploader: {
    type: Function as PropType<AttachmentUploader>
  },
  /**
   * 支持多文件上传, 同时在selectable时控制多选
   */
  multiple: {
    type: Boolean
  },
  /**
   * 允许上传文件的最大数量
   */
  limit: {
    type: Number
  },

  /**
   * 接受上传的文件类型, 如：image/png, image/jpeg
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#unique_file_type_specifiers
   */
  accept: {
    type: String,
    default:
      'image/*,audio/*,video/*,.zip,.svg,.pdf,.json,.docx,.xlsx,.pptx,.doc,.xls,.ppt'
  },
  /**
   * 禁止更改文件，不能上传和删除
   */
  disabled: {
    type: Boolean
  },
  /**
   * 图片显示尺寸
   */
  size: {
    type: String as PropType<BaseSize>,
    default: 'default'
  },

  /**
   * 缩略图生成方法
   */
  thumbnail: {
    type: Function as PropType<AttachmentThumbnail>
  },
  /**
   * 可增加
   */
  addable: {
    type: Boolean,
    default: true
  },
  /**
   * 可删除
   */
  removable: {
    type: Boolean,
    default: true
  },
  /**
   * 可下载
   */
  downloadable: {
    type: Boolean,
    default: true
  },
  /**
   * 可预览
   */
  previewable: {
    type: Boolean,
    default: true
  },
  /**
   * 可选择
   */
  selectable: {
    type: Boolean,
    default: false
  },
  /**
   * 可点击
   */
  clickable: {
    type: Boolean,
    default: false
  },
  listType: {
    type: String as PropType<'card' | 'list'>,
    default: 'card'
  },
  /**
   * 上传前守卫
   */
  beforeUpload: {
    type: Function
  },
  /**
   * 允许上传的文件大写最大值， 支持 K / M
   */
  limitSize: {
    type: String,
    default: '10M'
  },

  formatter: {
    type: Function as PropType<
      (files: AttachmentFile[]) => MaybePromise<UploadUserFile[]>
    >
  },

  valueFormatter: {
    type: Function as PropType<
      (files: UploadUserFile[]) => MaybePromise<AttachmentFile[]>
    >
  },

  previewer: {
    type: Function as PropType<(file: AttachmentFile) => void>
  },

  downloader: {
    type: Function as PropType<(file: AttachmentFile) => void>
  }
};
