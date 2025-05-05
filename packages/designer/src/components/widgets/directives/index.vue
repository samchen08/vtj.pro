<template>
  <XContainer class="v-directives-widget" direction="column" fit>
    <Panel class="v-sub-panel" title="内置指令" size="small" :fit="false">
      <ElForm size="small" label-width="80px" @keydown.enter.prevent.stop>
        <SetterWrapper
          name="vIf"
          label="v-if"
          setters="ExpressionSetter"
          :current="current"
          :context="context"
          :value="vIf.value"
          @change="onValueChange">
        </SetterWrapper>
        <SetterWrapper
          v-if="branchVisiable"
          name="vElseIf"
          label="v-else-if"
          setters="ExpressionSetter"
          :current="current"
          :context="context"
          :value="vElseIf.value"
          @change="onValueChange">
        </SetterWrapper>
        <SetterWrapper
          v-if="branchVisiable"
          name="vElse"
          label="v-else"
          setters="BooleanSetter"
          :current="current"
          :context="context"
          :value="!!vElse.value"
          @change="onValueChange">
        </SetterWrapper>

        <SetterWrapper
          name="vShow"
          label="v-show"
          setters="ExpressionSetter"
          :current="current"
          :context="context"
          :value="vShow.value"
          @change="onValueChange">
        </SetterWrapper>
        <SetterWrapper
          name="vBind"
          label="v-bind"
          setters="ExpressionSetter"
          :current="current"
          :context="context"
          :value="vBind.value"
          @change="onValueChange">
        </SetterWrapper>
        <SetterWrapper
          name="vHtml"
          label="v-html"
          setters="ExpressionSetter"
          :current="current"
          :context="context"
          :value="vHtml.value"
          @change="onValueChange">
        </SetterWrapper>
      </ElForm>
    </Panel>
    <Panel class="v-sub-panel" title="循环" size="small" :fit="false">
      <ElForm size="small" label-width="80px" @keydown.enter.prevent.stop>
        <SetterWrapper
          name="value"
          label="循环数据"
          setters="ExpressionSetter"
          :current="current"
          :context="context"
          :value="vFor.value"
          @change="onForChange">
        </SetterWrapper>
        <SetterWrapper
          name="item"
          label="迭代变量名"
          :setters="{
            name: 'StringSetter',
            props: { placeholder: 'item' }
          }"
          :current="current"
          :context="context"
          :value="vFor.iterator?.item"
          @change="onForChange">
        </SetterWrapper>
        <SetterWrapper
          name="index"
          label="索引变量名"
          :setters="{
            name: 'StringSetter',
            props: { placeholder: 'index' }
          }"
          :current="current"
          :context="context"
          :value="vFor.iterator?.index"
          @change="onForChange">
        </SetterWrapper>
      </ElForm>
    </Panel>
    <Panel class="v-sub-panel" title="双向绑定" size="small" :fit="false">
      <Panel
        v-for="(vModel, index) in vModels"
        card
        border
        class="v-sub-panel"
        size="small"
        :title="`v-model: ${getModelArgName(vModel)}`"
        :body="{ grow: false }"
        :fit="false">
        <ElForm size="small" label-width="60px" @keydown.enter.prevent.stop>
          <SetterWrapper
            :name="index.toString()"
            label="绑定变量"
            setters="ExpressionSetter"
            :current="current"
            :context="context"
            :value="vModel.value"
            @change="onModelChange">
          </SetterWrapper>
        </ElForm>
      </Panel>

      <ElEmpty
        v-if="!vModels.length"
        description="当前组件没有双向绑定属性"
        :image-size="50"></ElEmpty>
    </Panel>
    <Panel
      class="v-sub-panel"
      title="自定义指令"
      size="small"
      :fit="false"
      plus
      grow
      @plus="onAddCustom">
      <Panel
        v-for="(item, index) of customDirectives"
        :key="item.id"
        card
        border
        class="v-sub-panel"
        size="small"
        :title="`# ${index + 1}`"
        :body="{ grow: false }"
        :fit="false"
        :remove="true"
        @remove="onRemoveCustom(item)">
        <ElForm size="small" label-width="60px" @keydown.enter.prevent.stop>
          <SetterWrapper
            name="name"
            label="指令"
            setters="StringSetter"
            :current="current"
            :context="context"
            :value="item.name"
            :onChange="onCustomChange(item)">
          </SetterWrapper>
          <SetterWrapper
            name="value"
            label="值"
            setters="ExpressionSetter"
            :current="current"
            :context="context"
            :value="item.value"
            :onChange="onCustomChange(item)">
          </SetterWrapper>
          <SetterWrapper
            name="arg"
            label="参数"
            setters="StringSetter"
            :current="current"
            :context="context"
            :value="item.arg"
            :onChange="onCustomChange(item)">
          </SetterWrapper>
          <SetterWrapper
            name="modifiers"
            label="修饰符"
            setters="ObjectSetter"
            :current="current"
            :context="context"
            :value="item.modifiers"
            :onChange="onCustomChange(item)"
            :variable="false">
          </SetterWrapper>
        </ElForm>
      </Panel>
    </Panel>
  </XContainer>
</template>
<script lang="ts" setup>
  import { XContainer } from '@vtj/ui';
  import { ElForm, ElEmpty } from 'element-plus';
  import { DirectiveModel } from '@vtj/core';
  import { parseExpression } from '@vtj/renderer';
  import { Panel } from '../../shared';
  import { SetterWrapper } from '../../../wrappers';
  import { useCurrent, useSelected, useDirectives } from '../../hooks';

  defineOptions({
    name: 'DirectivesWidget'
  });

  const { current, context } = useCurrent();
  const { selected } = useSelected();
  const {
    vIf,
    vElseIf,
    vElse,
    vShow,
    vBind,
    vFor,
    vHtml,
    vModels,
    customDirectives,
    onValueChange,
    onForChange,
    onModelChange,
    onAddCustom,
    onRemoveCustom,
    onCustomChange,
    branchVisiable
  } = useDirectives(selected);

  const getModelArgName = (vModel: DirectiveModel) => {
    if (!vModel.arg) return 'modelValue';
    return typeof vModel.arg === 'string'
      ? vModel.arg
      : parseExpression(vModel.arg, {});
  };
</script>
