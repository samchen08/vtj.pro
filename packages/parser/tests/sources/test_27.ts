export const test_27 = `
<template>
  <div :class="['tree-item', { 'selected-node': selectedNode === node.name }]">
    <div class="item-content">
      <XIcon
        v-if="node.hasChildren"
        :icon="expandedNodes.has(node.name) ? Minus : Plus"
        class="expand-icon"
        color="#666666"
        @click.stop="handleToggleNode"
      />
      <XIcon :icon="User" class="type-icon" color="#666666" />
      <span class="item-name">{{ node.name }}</span>
      <div class="action-icons">
        <XIcon
          :icon="Refresh"
          class="action-icon"
          color="#666666"
          @click.stop="$emit('load-children', node)"
        />
        <XIcon
          :icon="Grid"
          class="action-icon"
          color="#666666"
          @click.stop="$emit('show-menu')"
        />
      </div>
    </div>

    <div v-if="expandedNodes.has(node.name)" class="child-nodes">
      <TreeNode
        v-for="child in node.children"
        :key="child.id"
        :node="child"
        :selected-node="selectedNode"
        :expanded-nodes="expandedNodes"
        @node-click="$emit('node-click', $event)"
        @toggle-node="$emit('toggle-node', $event)"
        @load-children="$emit('load-children', $event)"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue';
import { useProvider } from '@vtj/renderer';
import { XIcon } from '@vtj/ui';
import { User, Refresh, Grid, Plus, Minus } from '@vtj/icons';

export default defineComponent({
  name: 'TreeNode',
  components: {
    XIcon
  },
  props: {
    node: {
      type: Object,
      required: true
    },
    selectedNode: {
      type: String,
      default: ''
    },
    expandedNodes: {
      type: Set,
      required: true
    }
  },
  emits: ['node-click', 'toggle-node', 'load-children', 'show-menu'],
  setup(props) {
    const provider = useProvider({ id: '19gjutw6', version: '1756253762370' });
    const state = reactive({});
    return { state, props, provider, User, Refresh, Grid, Plus, Minus };
  },
  methods: {
    handleNodeClick() {
      this.$emit('node-click', this.node.name);
    },
    handleToggleNode(e) {
      e.stopPropagation();
      this.$emit('toggle-node', this.node.name);

      if (!this.node.childrenLoaded && !this.expandedNodes.has(this.node.name)) {
        this.$emit('load-children', this.node);
      }
    }
  }
});
</script>

<style lang="css" scoped>

</style>

`;
