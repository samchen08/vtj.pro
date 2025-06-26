import type { MaterialDescription } from '@vtj/core';

const desc: MaterialDescription = {
  name: 'XGrid',
  label: '表格',
  categoryId: 'data',
  doc: 'https://vxetable.cn/#/grid/api',
  props: [
    {
      name: 'columns',
      setters: 'ArraySetter'
    },
    {
      name: 'loader',
      title: '数据加载函数: (state) => {list, total}',
      setters: 'FunctionSetter'
    },
    {
      name: 'rowSortable',
      title: '行拖拽排序',
      setters: 'BooleanSetter'
    },
    {
      name: 'columnSortable',
      title: '列拖拽排序',
      setters: 'BooleanSetter'
    },
    {
      name: 'customable',
      title: '开启用户自定义',
      setters: 'BooleanSetter'
    },
    {
      name: 'resizable',
      setters: 'BooleanSetter'
    },
    {
      name: 'pager',
      title: '开启分页功能',
      setters: 'BooleanSetter'
    },
    {
      name: 'page',
      setters: 'NumberSetter'
    },
    {
      name: 'pageSize',
      setters: 'NumberSetter'
    },
    {
      name: 'pageSizes',
      title: '每页显示个数选择器的选项设置',
      setters: 'ArraySetter'
    },
    {
      name: 'auto',
      title: '初始执行加载函数',
      setters: 'BooleanSetter',
      defaultValue: true
    },
    {
      name: 'virtual',
      title: '开启虚拟滚动',
      setters: 'BooleanSetter'
    },
    {
      name: 'editable',
      title: '开启编辑模式',
      setters: 'BooleanSetter'
    },
    {
      name: 'cellRenders',
      title: '单元格渲染器',
      setters: 'ObjectSetter'
    },
    {
      name: 'editRenders',
      title: '单元格渲染器',
      setters: 'ObjectSetter'
    },
    {
      name: 'filterRenders',
      title: '过滤器渲染器',
      setters: 'ObjectSetter'
    },
    {
      name: 'id',
      setters: 'StringSetter'
    },
    {
      name: 'data',
      setters: 'ArraySetter'
    },
    {
      name: 'height',
      setters: ['StringSetter', 'NumberSetter']
    },
    {
      name: 'minHeight',
      setters: ['StringSetter', 'NumberSetter']
    },
    {
      name: 'maxHeight',
      setters: ['StringSetter', 'NumberSetter']
    },
    {
      name: 'autoResize',
      setters: 'BooleanSetter'
    },
    {
      name: 'syncResize',
      setters: ['BooleanSetter', 'StringSetter']
    },
    {
      name: 'stripe',
      setters: 'BooleanSetter'
    },
    {
      name: 'border',
      setters: 'BooleanSetter'
    },
    {
      name: 'round',
      setters: 'BooleanSetter'
    },
    {
      name: 'size',
      setters: 'SelectSetter',
      options: ['small', 'mini']
    },
    {
      name: 'loading',
      setters: 'BooleanSetter'
    },
    {
      name: 'align',
      setters: 'SelectSetter',
      options: ['left', 'center', 'right']
    },
    {
      name: 'HeaderAlign',
      setters: 'SelectSetter',
      options: ['left', 'center', 'right']
    },
    {
      name: 'FooterAlign',
      setters: 'SelectSetter',
      options: ['left', 'center', 'right']
    },
    {
      name: 'showHeader',
      setters: 'BooleanSetter'
    },
    {
      name: 'showFooter',
      setters: 'BooleanSetter'
    },
    {
      name: 'footerData',
      setters: 'ArraySetter'
    },
    {
      name: 'mergeCells',
      setters: 'FunctionSetter'
    },
    {
      name: 'mergeFooterItems',
      setters: 'FunctionSetter'
    },
    {
      name: 'showOverflow',
      setters: 'BooleanSetter'
    },
    {
      name: 'showHeaderOverflow',
      setters: 'BooleanSetter'
    },
    {
      name: 'showFooterOverflow',
      setters: 'BooleanSetter'
    },
    {
      name: 'keepSource',
      setters: 'BooleanSetter'
    },
    {
      name: 'columnConfig',
      setters: 'ObjectSetter'
    },
    {
      name: 'rowConfig',
      setters: 'ObjectSetter'
    },
    {
      name: 'resizeConfig',
      setters: 'ObjectSetter'
    },
    {
      name: 'resizableConfig',
      setters: 'ObjectSetter'
    },
    {
      name: 'seqConfig',
      setters: 'ObjectSetter'
    },
    {
      name: 'sortConfig',
      setters: 'ObjectSetter'
    },
    {
      name: 'filterConfig',
      setters: 'ObjectSetter'
    },
    {
      name: 'exportConfig',
      setters: 'ObjectSetter'
    },
    {
      name: 'importConfig',
      setters: 'ObjectSetter'
    },
    {
      name: 'printConfig',
      setters: 'ObjectSetter'
    },
    {
      name: 'radioConfig',
      setters: 'ObjectSetter'
    },
    {
      name: 'checkboxConfig',
      setters: 'ObjectSetter'
    },
    {
      name: 'tooltipConfig',
      setters: 'ObjectSetter'
    },
    {
      name: 'expandConfig',
      setters: 'ObjectSetter'
    },
    {
      name: 'treeConfig',
      setters: 'ObjectSetter'
    },
    {
      name: 'menuConfig',
      setters: 'ObjectSetter'
    },
    {
      name: 'mouseConfig',
      setters: 'ObjectSetter'
    },
    {
      name: 'keyboardConfig',
      setters: 'ObjectSetter'
    },
    {
      name: 'editConfig',
      setters: 'ObjectSetter'
    },
    {
      name: 'validConfig',
      setters: 'ObjectSetter'
    },
    {
      name: 'editRules',
      setters: 'ObjectSetter'
    },
    {
      name: 'emptyText',
      setters: 'StringSetter'
    },
    {
      name: 'emptyRender',
      setters: 'ObjectSetter'
    },
    {
      name: 'loadingConfig',
      setters: 'ObjectSetter'
    },
    {
      name: 'customConfig',
      setters: 'ObjectSetter'
    },
    {
      name: 'scrollX',
      setters: 'ObjectSetter'
    },
    {
      name: 'scrollY',
      setters: 'ObjectSetter'
    },
    {
      name: 'params',
      setters: 'ObjectSetter'
    },
    {
      name: 'toolbarConfig',
      setters: 'ObjectSetter'
    },
    {
      name: 'pagerConfig',
      setters: 'ObjectSetter'
    },
    {
      name: 'proxyConfig',
      setters: 'ObjectSetter'
    },
    {
      name: 'zoomConfig',
      setters: 'ObjectSetter'
    },
    {
      name: 'layouts',
      setters: 'ArraySetter'
    }
  ],
  events: [
    'rowSort',
    'columnSort',
    'editChange',
    'keydown',
    'current-change',
    'radio-change',
    'checkbox-change',
    'checkbox-all',
    'checkbox-range-start',
    'checkbox-range-change',
    'checkbox-range-end',
    'cell-click',
    'cell-dblclick',
    'cell-menu',
    'cell-mouseenter',
    'cell-mouseleave',
    'cell-delete-value',
    'header-cell-click',
    'header-cell-dblclick',
    'header-cell-menu',
    'footer-cell-click',
    'footer-cell-dblclick',
    'footer-cell-menu',
    'clear-merge',
    'sort-change',
    'clear-sort',
    'filter-change',
    'filter-visible',
    'clear-filter',
    'resizable-change',
    'toggle-row-expand',
    'toggle-tree-expand',
    'menu-click',
    'cell-selected',
    'edit-closed',
    'edit-activated',
    'edit-disabled',
    'valid-error',
    'scroll',
    'custom',
    'page-change',
    'proxy-query',
    'proxy-delete',
    'proxy-save',
    'toolbar-button-click',
    'toolbar-tool-click',
    'zoom'
  ],
  slots: ['empty', 'form', 'top', 'bottom', 'toolbar__buttons', 'pager__left'],
  snippet: {
    props: {
      height: 'auto',
      columns: [
        { type: 'seq', title: '#' },
        { field: 'title', title: '标题' }
      ]
    }
  }
};

export default desc;
