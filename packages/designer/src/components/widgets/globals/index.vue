<template>
  <Panel class="v-uni-config-widget v-globals-widget" title="应用设置">
    <ElDivider content-position="center" border-style="dotted">
      全局配置
    </ElDivider>
    <ElForm size="small" label-position="top">
      <ElFormItem label="应用全局「CSS」" @keydown.enter.native.prevent>
        <CssSetter
          :model-value="getValue('css')"
          @change="onChange('css', $event)"></CssSetter>
      </ElFormItem>
      <ElFormItem label="应用状态「Pinia」" @keydown.enter.native.prevent>
        <FunctionSetter
          title="应用状态「Pinia」"
          subtitle="JSFunction"
          :default-code="storeTemplate"
          :model-value="getValue('store')"
          @change="onChange('store', $event)"></FunctionSetter>
      </ElFormItem>
      <ElFormItem label="权限控制「Access」" @keydown.enter.native.prevent>
        <FunctionSetter
          title="权限控制「Access」"
          subtitle="JSFunction"
          :default-code="accessTemplate"
          :model-value="getValue('access')"
          @change="onChange('access', $event)"></FunctionSetter>
      </ElFormItem>
      <ElFormItem label="应用增强「JS」" @keydown.enter.native.prevent>
        <FunctionSetter
          title="应用增强「JS」"
          subtitle="JSFunction"
          :default-code="enhanceTemplate"
          :model-value="getValue('enhance')"
          @change="onChange('enhance', $event)"></FunctionSetter>
      </ElFormItem>
    </ElForm>
    <ElDivider content-position="center" border-style="dotted">
      请求配置
    </ElDivider>
    <ElForm size="small" label-position="top">
      <ElFormItem
        label="请求配置「IRequestOptions」"
        @keydown.enter.native.prevent>
        <FunctionSetter
          title="请求配置「IRequestOptions」"
          subtitle="JSFunction"
          :default-code="axiosTemplate"
          :model-value="getValue('axios')"
          @change="onChange('axios', $event)"></FunctionSetter>
      </ElFormItem>
      <ElFormItem label="请求拦截器" @keydown.enter.native.prevent>
        <FunctionSetter
          title="请求拦截器"
          subtitle="JSFunction"
          :default-code="requestTemplate"
          :model-value="getValue('request')"
          @change="onChange('request', $event)"></FunctionSetter>
      </ElFormItem>
      <ElFormItem label="响应拦截器" @keydown.enter.native.prevent>
        <FunctionSetter
          title="响应拦截器"
          subtitle="JSFunction"
          :default-code="responseTemplate"
          :model-value="getValue('response')"
          @change="onChange('response', $event)"></FunctionSetter>
      </ElFormItem>
    </ElForm>
    <ElDivider content-position="center" border-style="dotted">
      路由守卫
    </ElDivider>
    <ElForm size="small" label-position="top">
      <ElFormItem label="前置守卫「beforeEach」" @keydown.enter.native.prevent>
        <FunctionSetter
          title="前置守卫「beforeEach」"
          subtitle="JSFunction"
          :default-code="beforeTemplate"
          :model-value="getValue('beforeEach')"
          @change="onChange('beforeEach', $event)"></FunctionSetter>
      </ElFormItem>
      <ElFormItem label="后置守卫「afterEach」" @keydown.enter.native.prevent>
        <FunctionSetter
          title="后置守卫「afterEach」"
          subtitle="JSFunction"
          :default-code="afterTemplate"
          :model-value="getValue('afterEach')"
          @change="onChange('afterEach', $event)"></FunctionSetter>
      </ElFormItem>
    </ElForm>
  </Panel>
</template>
<script setup lang="ts">
  import { type GlobalConfig } from '@vtj/core';
  import { ElDivider, ElForm, ElFormItem } from 'element-plus';
  import { Panel } from '../../shared';
  import CssSetter from '../../setters/css.vue';
  import FunctionSetter from '../../setters/function.vue';
  import { useProject } from '../../hooks';

  defineOptions({
    name: 'GlobalsWidget'
  });

  const { project } = useProject();

  const getValue = (name: keyof GlobalConfig) => {
    const globals: GlobalConfig = project.value?.globals || {};
    return globals[name] as any;
  };

  const onChange = (name: keyof GlobalConfig, value: any) => {
    project.value?.setGloblas(name, value);
  };

  const storeTemplate = `(app) => {
  return {
    state: () => {
      return {
        // 定义状态
      }
    },
    getters: {

    },
    actions: {

    }
  }
}`;

  const enhanceTemplate = `(app) => {
  // 在此添加增强代码
}`;

  const requestTemplate = `(config, app) => {
  return config;
}`;

  const responseTemplate = `(res, app) => {
  return res;
}`;

  const beforeTemplate = `(to, from, next, app) => {
  next();
}`;

  const afterTemplate = `(to, from, failure, app) => {

}`;

  const accessTemplate = `(app) => {
  return {
    // session: false,
    // authKey: 'Authorization',
    // storageKey: 'ACCESS_STORAGE',
    // auth: '/#/login',
    // whiteList: (to) => true
    // redirectParam: 'r',
    // unauthorizedCode: 401,
    // unauthorizedMessage: '登录已经失效，请重新登录！',
    // noPermissionMessage: '无权限访问该页面',
    // statusKey: 'code'
  }
}`;

  const axiosTemplate = `(app) => {
  return {
    // baseURL: '/',
    // timeout: 60000,
    // settings: {
    //   type: 'form',
    //   validSuccess: true,
    //   originResponse: false,
    //   loading: true,
    //   failMessage: true,
    //   validate: (res) => {
    //     return res.data?.code === 0 || !!res.data?.success;
    //   }
    // }
  }
}`;
</script>
