export const test_composition_antd = {
  id: 'comp-antd-1',
  name: 'AntdDemo',
  apiMode: 'composition',
  props: [{ name: 'title', type: 'String' as any, default: 'Hi' }],
  emits: ['change'],
  refs: {
    count: 0
  },
  methods: {
    handleConfirm: {
      type: 'JSFunction',
      value: 'async function() { await this.$confirm("确认删除？"); }'
    },
    showMessage: {
      type: 'JSFunction',
      value: 'function() { this.$message.success("操作成功"); }'
    },
    showNotification: {
      type: 'JSFunction',
      value: 'function() { this.$notification.open({ message: "通知" }); }'
    },
    showInfo: {
      type: 'JSFunction',
      value: 'function() { this.$info("信息"); }'
    },
    showSuccess: {
      type: 'JSFunction',
      value: 'function() { this.$success("成功"); }'
    },
    showWarning: {
      type: 'JSFunction',
      value: 'function() { this.$warning("警告"); }'
    },
    showError: {
      type: 'JSFunction',
      value: 'function() { this.$error("错误"); }'
    }
  },
  nodes: [
    {
      id: 'n1',
      name: 'div',
      children: [
        {
          id: 'n2',
          name: 'AButton',
          events: {
            click: {
              name: 'click',
              handler: {
                type: 'JSFunction',
                value: '() => this.handleConfirm()'
              }
            }
          },
          children: '确认'
        }
      ]
    }
  ]
};
