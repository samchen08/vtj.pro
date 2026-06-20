<template>
  <div class="action-demo">
    <!-- 1. Button 模式（默认） -->
    <h3>Button 模式（默认）</h3>
    <div class="demo-row">
      <XAction label="默认按钮" @click="onClick"></XAction>
      <XAction label="主要按钮" type="primary" @click="onClick"></XAction>
      <XAction label="成功按钮" type="success" @click="onClick"></XAction>
      <XAction label="警告按钮" type="warning" @click="onClick"></XAction>
      <XAction label="危险按钮" type="danger" @click="onClick"></XAction>
      <XAction label="信息按钮" type="info" @click="onClick"></XAction>
    </div>

    <!-- 2. Button 模式 + 图标 -->
    <h3>Button 模式 + 图标</h3>
    <div class="demo-row">
      <XAction :icon="VtjIconBug" label="带图标" @click="onClick"></XAction>
      <XAction
        :icon="VtjIconApi"
        label="主要图标"
        type="primary"
        @click="onClick"></XAction>
      <XAction
        :icon="VtjIconPlus"
        label="成功图标"
        type="success"
        @click="onClick"></XAction>
    </div>

    <!-- 3. Button 尺寸 -->
    <h3>Button 尺寸</h3>
    <div class="demo-row">
      <XAction size="large" label="大尺寸" type="primary" @click="onClick"></XAction>
      <XAction size="default" label="默认尺寸" type="primary" @click="onClick"></XAction>
      <XAction size="small" label="小尺寸" type="primary" @click="onClick"></XAction>
    </div>

    <!-- 4. Text 模式 -->
    <h3>Text 模式</h3>
    <div class="demo-row">
      <XAction mode="text" label="默认文字" @click="onClick"></XAction>
      <XAction mode="text" :icon="VtjIconBug" label="主要文字" type="primary" @click="onClick"></XAction>
      <XAction mode="text" :icon="VtjIconApi" label="成功文字" type="success" @click="onClick"></XAction>
      <XAction mode="text" :icon="VtjIconPlus" label="警告文字" type="warning" @click="onClick"></XAction>
      <XAction mode="text" :icon="VtjIconEdit" label="危险文字" type="danger" @click="onClick"></XAction>
      <XAction mode="text" :icon="VtjIconInfo" label="信息文字" type="info" @click="onClick"></XAction>
    </div>

    <!-- 5. Text 模式尺寸 -->
    <h3>Text 模式尺寸</h3>
    <div class="demo-row">
      <XAction mode="text" :icon="VtjIconBug" label="大尺寸" size="large" @click="onClick"></XAction>
      <XAction mode="text" :icon="VtjIconBug" label="默认尺寸" size="default" @click="onClick"></XAction>
      <XAction mode="text" :icon="VtjIconBug" label="小尺寸" size="small" @click="onClick"></XAction>
    </div>

    <!-- 6. Icon 模式 -->
    <h3>Icon 模式</h3>
    <div class="demo-row">
      <XAction mode="icon" :icon="VtjIconBug" @click="onClick"></XAction>
      <XAction mode="icon" :icon="VtjIconApi" type="primary" @click="onClick"></XAction>
      <XAction mode="icon" :icon="VtjIconPlus" type="success" @click="onClick"></XAction>
      <XAction mode="icon" :icon="VtjIconEdit" type="warning" @click="onClick"></XAction>
      <XAction mode="icon" :icon="VtjIconRemove" type="danger" @click="onClick"></XAction>
      <XAction mode="icon" :icon="VtjIconInfo" type="info" @click="onClick"></XAction>
    </div>

    <!-- 7. Icon 模式尺寸 -->
    <h3>Icon 模式尺寸</h3>
    <div class="demo-row">
      <XAction mode="icon" :icon="VtjIconBug" size="large" @click="onClick"></XAction>
      <XAction mode="icon" :icon="VtjIconBug" size="default" @click="onClick"></XAction>
      <XAction mode="icon" :icon="VtjIconBug" size="small" @click="onClick"></XAction>
    </div>

    <!-- 8. Icon 模式背景 -->
    <h3>Icon 模式背景设置</h3>
    <div class="demo-row">
      <XAction mode="icon" :icon="VtjIconBug" label="始终背景" background="always" @click="onClick"></XAction>
      <XAction mode="icon" :icon="VtjIconApi" label="悬停背景" background="hover" @click="onClick"></XAction>
      <XAction mode="icon" :icon="VtjIconPlus" label="无背景" background="none" @click="onClick"></XAction>
    </div>

    <!-- 9. Icon 圆形 -->
    <h3>Icon 圆形样式</h3>
    <div class="demo-row">
      <XAction mode="icon" :icon="VtjIconBug" circle @click="onClick"></XAction>
      <XAction mode="icon" :icon="VtjIconApi" type="primary" circle @click="onClick"></XAction>
      <XAction mode="icon" :icon="VtjIconPlus" type="success" circle @click="onClick"></XAction>
      <XAction mode="icon" :icon="VtjIconEdit" type="warning" circle @click="onClick"></XAction>
      <XAction mode="icon" :icon="VtjIconRemove" type="danger" circle @click="onClick"></XAction>
    </div>

    <!-- 10. 禁用状态 -->
    <h3>禁用状态</h3>
    <div class="demo-row">
      <XAction label="禁用按钮" disabled @click="onClick"></XAction>
      <XAction label="函数禁用" :disabled="disabledFn" @click="onClick"></XAction>
      <XAction mode="text" :icon="VtjIconBug" label="禁用文字" disabled @click="onClick"></XAction>
      <XAction mode="icon" :icon="VtjIconBug" disabled @click="onClick"></XAction>
    </div>

    <!-- 11. Tooltip 提示 -->
    <h3>Tooltip 提示</h3>
    <div class="demo-row">
      <XAction :icon="VtjIconBug" label="字符串提示" tooltip="这是一个提示信息" @click="onClick"></XAction>
      <XAction
        :icon="VtjIconApi"
        label="对象提示"
        :tooltip="{ content: '对象配置的提示', placement: 'top', effect: 'light' }"
        @click="onClick"></XAction>
      <XAction mode="icon" :icon="VtjIconInfo" tooltip="Icon 模式提示" @click="onClick"></XAction>
    </div>

    <!-- 12. Badge 徽标 -->
    <h3>Badge 徽标</h3>
    <div class="demo-row">
      <XAction :icon="VtjIconBug" label="数字徽标" :badge="5" @click="onClick"></XAction>
      <XAction :icon="VtjIconApi" label="字符串徽标" badge="new" @click="onClick"></XAction>
      <XAction
        :icon="VtjIconPlus"
        label="对象徽标"
        :badge="{ value: 99, max: 10, isDot: false }"
        @click="onClick"></XAction>
      <XAction mode="icon" :icon="VtjIconEdit" :badge="3" @click="onClick"></XAction>
    </div>

    <!-- 13. 下拉菜单 -->
    <h3>下拉菜单</h3>
    <div class="demo-row">
      <XAction label="菜单按钮" :menus="menus" @command="onCommand"></XAction>
      <XAction
        :icon="VtjIconBug"
        label="图标菜单"
        type="primary"
        :menus="menus"
        @command="onCommand"></XAction>
      <XAction mode="icon" :icon="VtjIconMore" :menus="menus" @command="onCommand"></XAction>
      <XAction
        mode="text"
        :icon="VtjIconSetting"
        label="文字菜单"
        :menus="menus"
        @command="onCommand"></XAction>
    </div>

    <!-- 14. 下拉菜单 + Arrow -->
    <h3>下拉菜单 + Arrow 箭头</h3>
    <div class="demo-row">
      <XAction label="带箭头" :menus="menus" arrow @command="onCommand"></XAction>
      <XAction mode="text" :icon="VtjIconBug" label="文字箭头" :menus="menus" arrow @command="onCommand"></XAction>
    </div>

    <!-- 15. 自定义 Dropdown 配置 -->
    <h3>自定义 Dropdown 配置</h3>
    <div class="demo-row">
      <XAction
        label="自定义配置"
        :menus="menus"
        :dropdown="{ trigger: 'click', placement: 'bottom-start' }"
        @command="onCommand"></XAction>
    </div>

    <!-- 16. 自定义 Button 配置 -->
    <h3>自定义 Button 配置</h3>
    <div class="demo-row">
      <XAction
        label="朴素按钮"
        type="primary"
        :button="{ plain: true }"
        @click="onClick"></XAction>
      <XAction
        label="圆角按钮"
        type="success"
        :button="{ round: true }"
        @click="onClick"></XAction>
      <XAction
        label="加载中"
        type="warning"
        :button="{ loading: true }"
        @click="onClick"></XAction>
    </div>

    <!-- 17. 自定义插槽内容 -->
    <h3>自定义插槽内容</h3>
    <div class="demo-row">
      <XAction tooltip="自定义内容" @click="onClick">
        <span style="color: red; font-weight: bold">自定义红色文字</span>
      </XAction>
      <XAction @click="onClick">
        <div class="custom-slot">
          <XIcon :icon="VtjIconBug" />
          <span>自定义组合</span>
        </div>
      </XAction>
    </div>

    <!-- 18. 自定义菜单项插槽 -->
    <h3>自定义菜单项插槽</h3>
    <div class="demo-row">
      <XAction label="自定义菜单项" :menus="menus" @command="onCommand">
        <template #item="{ item, index }">
          <span style="color: blue">{{ index + 1 }}. {{ item.label }}</span>
        </template>
      </XAction>
    </div>

    <!-- 19. 拖拽 -->
    <h3>拖拽功能</h3>
    <div class="demo-row">
      <XAction mode="icon" :icon="VtjIconArrowDown" draggable @dragstart="onDragStart" @dragend="onDragEnd"></XAction>
      <XAction
        mode="icon"
        :icon="VtjIconBug"
        label="可拖拽"
        draggable
        @dragstart="onDragStart"
        @dragend="onDragEnd"></XAction>
    </div>
    <div class="drop-zone" @dragover="onDragOver" @drop="onDrop">
      拖拽区域（将按钮拖拽至此）
    </div>

    <!-- 20. name 与 value -->
    <h3>name 与 value</h3>
    <div class="demo-row">
      <XAction
        name="saveAction"
        label="保存"
        value="save"
        type="primary"
        @click="onClick"></XAction>
      <XAction
        name="deleteAction"
        label="删除"
        value="delete"
        type="danger"
        @click="onClick"></XAction>
    </div>

    <!-- 21. 动态数据 -->
    <h3>动态数据</h3>
    <div class="demo-row">
      <XAction :icon="dynamicIcon" :badge="badgeValue" label="动态数据" @click="onClick"></XAction>
      <XAction label="切换图标" type="primary" @click="toggleIcon"></XAction>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { XAction, XIcon } from '@vtj/ui';
  import {
    VtjIconBug,
    VtjIconApi,
    VtjIconPlus,
    VtjIconEdit,
    VtjIconRemove,
    VtjIconInfo,
    VtjIconSetting,
    VtjIconMore,
    VtjIconArrowDown
  } from '@vtj/icons';

  // 下拉菜单数据
  const menus = [
    { command: 'create', label: '新建' },
    { command: 'edit', label: '编辑' },
    { command: 'copy', label: '复制', divided: true },
    { command: 'delete', label: '删除', icon: VtjIconRemove }
  ];

  // 动态数据
  const badgeValue = ref(5);
  const dynamicIcon = ref(VtjIconBug);
  let iconToggle = false;

  const toggleIcon = () => {
    iconToggle = !iconToggle;
    dynamicIcon.value = iconToggle ? VtjIconApi : VtjIconBug;
    badgeValue.value = Math.floor(Math.random() * 100);
  };

  // 禁用函数
  const disabledFn = () => true;

  // 事件处理
  const onClick = (action: any) => {
    console.log('click action:', action);
  };

  const onCommand = (item: any) => {
    console.log('command item:', item);
  };

  const onDragStart = (props: any, e: DragEvent) => {
    console.log('dragstart:', props, e);
    e.dataTransfer?.setData('text/plain', JSON.stringify(props));
  };

  const onDragEnd = (props: any, e: DragEvent) => {
    console.log('dragend:', props, e);
  };

  const onDragOver = (e: DragEvent) => {
    e.preventDefault();
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    const data = e.dataTransfer?.getData('text/plain');
    console.log('drop:', data);
  };
</script>

<style lang="scss" scoped>
  .action-demo {
    padding: 20px;

    h3 {
      margin: 20px 0 10px;
      padding-bottom: 8px;
      border-bottom: 1px solid #eee;
      font-size: 16px;
      color: #333;
    }

    .demo-row {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
      margin-bottom: 10px;
    }

    .custom-slot {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 4px 8px;
      background: #f5f7fa;
      border-radius: 4px;
    }

    .drop-zone {
      margin-top: 10px;
      padding: 40px;
      background: #f5f7fa;
      border: 2px dashed #ccc;
      border-radius: 8px;
      text-align: center;
      color: #999;
      transition: all 0.3s;

      &:hover {
        border-color: #409eff;
        color: #409eff;
      }
    }
  }
</style>
