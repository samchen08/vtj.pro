export const test_27 = `
<template>
  <div class="workflow-form">
    <div class="form-header">
      <XIcon :icon="VtjIconBug" :size="48" color="#F56C6C" class="header-icon"></XIcon>
      <h2>隐患处理工作流</h2>
      <p class="current-step">当前节点：{{ state.currentStep.title }}</p>
    </div>

    <div class="steps-container">
      <el-steps :active="state.currentStep.index" finish-status="success" align-center>
        <el-step
          v-for="step in state.steps"
          :key="step.index"
          :title="step.title"
          :description="step.description"
        >
          <template #icon>
            <XIcon :icon="step.icon" :size="20"></XIcon>
          </template>
        </el-step>
      </el-steps>
    </div>

    <transition name="fade-slide" mode="out-in">
      <div class="form-content" :key="state.currentStep.index">
        <!-- 节点1：隐患上报 -->
        <div v-if="state.currentStep.index === 0" class="step-form">
          <div class="step-header">
            <XIcon :icon="VtjIconDocument" :size="24" color="#409EFF"></XIcon>
            <h3>隐患信息上报</h3>
          </div>
          <el-form label-width="120px">
            <el-form-item label="隐患标题" required>
              <el-input
                v-model="state.formData.title"
                placeholder="请输入隐患标题"
              >
                <template #prefix>
                  <XIcon :icon="Edit"></XIcon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item label="隐患类型" required>
              <el-select
                v-model="state.formData.type"
                placeholder="请选择隐患类型"
                style="width: 100%"
              >
                <el-option
                  v-for="item in state.hazardTypes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                  <span style="float: left">{{ item.label }}</span>
                  <XIcon
                    :icon="item.icon"
                    :size="16"
                    :color="item.color"
                    style="float: right; margin-left: 10px"
                  />
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="隐患描述" required>
              <el-input
                type="textarea"
                v-model="state.formData.description"
                placeholder="请详细描述隐患情况"
                :rows="4"
                resize="none"
              ></el-input>
            </el-form-item>
            <el-form-item label="上传图片">
              <el-upload
                action="#"
                list-type="picture-card"
                :auto-upload="false"
                :on-change="handleFileChange"
                class="uploader"
              >
                <XIcon :icon="Plus" :size="24" color="#909399"></XIcon>
                <template #file="{ file }">
                  <div class="uploader-preview">
                    <img :src="file.url" alt="隐患图片" class="uploader-img" />
                    <span class="uploader-actions">
                      <XIcon
                        :icon="ZoomIn"
                        class="uploader-action"
                        @click="handlePictureCardPreview(file)"
                      />
                      <XIcon
                        :icon="Delete"
                        class="uploader-action"
                        @click="handleRemove(file)"
                      />
                    </span>
                  </div>
                </template>
              </el-upload>
            </el-form-item>
          </el-form>
        </div>

        <!-- 节点2：初步审核 -->
        <div v-if="state.currentStep.index === 1" class="step-form">
          <div class="step-header">
            <XIcon :icon="VtjIconCheck" :size="24" color="#409EFF"></XIcon>
            <h3>隐患审核</h3>
          </div>
          <el-form label-width="120px">
            <el-form-item label="审核意见" required>
              <el-input
                type="textarea"
                v-model="state.formData.reviewComment"
                placeholder="请输入审核意见"
                :rows="4"
                resize="none"
              ></el-input>
            </el-form-item>
            <el-form-item label="审核结果" required>
              <el-radio-group v-model="state.formData.reviewResult">
                <el-radio label="pass" border>
                  <XIcon :icon="CircleCheck" :size="16" color="#67C23A"></XIcon>
                  <span style="margin-left: 5px">通过</span>
                </el-radio>
                <el-radio label="reject" border>
                  <XIcon :icon="CircleClose" :size="16" color="#F56C6C"></XIcon>
                  <span style="margin-left: 5px">驳回</span>
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </div>

        <!-- 节点3：整改方案 -->
        <div v-if="state.currentStep.index === 2" class="step-form">
          <div class="step-header">
            <XIcon :icon="VtjIconEdit" :size="24" color="#409EFF"></XIcon>
            <h3>整改方案制定</h3>
          </div>
          <el-form label-width="120px">
            <el-form-item label="整改负责人" required>
              <el-input
                v-model="state.formData.responsiblePerson"
                placeholder="请输入负责人姓名"
              >
                <template #prefix>
                  <XIcon :icon="User"></XIcon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item label="整改方案" required>
              <el-input
                type="textarea"
                v-model="state.formData.solution"
                placeholder="请输入详细整改方案"
                :rows="4"
                resize="none"
              ></el-input>
            </el-form-item>
            <el-form-item label="预计完成时间" required>
              <el-date-picker
                v-model="state.formData.expectedDate"
                type="datetime"
                placeholder="选择日期时间"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
          </el-form>
        </div>

        <!-- 节点4：整改验收 -->
        <div v-if="state.currentStep.index === 3" class="step-form">
          <div class="step-header">
            <XIcon :icon="VtjIconCheck" :size="24" color="#409EFF"></XIcon>
            <h3>整改验收</h3>
          </div>
          <el-form label-width="120px">
            <el-form-item label="整改完成情况" required>
              <el-input
                type="textarea"
                v-model="state.formData.completionStatus"
                placeholder="请输入整改完成情况"
                :rows="4"
                resize="none"
              ></el-input>
            </el-form-item>
            <el-form-item label="验收结果" required>
              <el-radio-group v-model="state.formData.acceptanceResult">
                <el-radio label="qualified" border>
                  <XIcon :icon="SuccessFilled" :size="16" color="#67C23A"></XIcon>
                  <span style="margin-left: 5px">合格</span>
                </el-radio>
                <el-radio label="unqualified" border>
                  <XIcon :icon="WarningFilled" :size="16" color="#E6A23C"></XIcon>
                  <span style="margin-left: 5px">不合格</span>
                </el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="验收图片">
              <el-upload
                action="#"
                list-type="picture-card"
                :auto-upload="false"
                :on-change="handleFileChange"
                class="uploader"
              >
                <XIcon :icon="Plus" :size="24" color="#909399"></XIcon>
              </el-upload>
            </el-form-item>
          </el-form>
        </div>

        <!-- 节点5：归档 -->
        <div v-if="state.currentStep.index === 4" class="step-form">
          <div class="step-header">
            <XIcon :icon="VtjIconSave" :size="24" color="#409EFF"></XIcon>
            <h3>隐患处理归档</h3>
          </div>
          <el-form label-width="120px">
            <el-form-item label="归档备注">
              <el-input
                type="textarea"
                v-model="state.formData.archiveNote"
                placeholder="请输入归档备注信息"
                :rows="4"
                resize="none"
              ></el-input>
            </el-form-item>
            <el-form-item label="归档附件">
              <el-upload
                action="#"
                list-type="picture-card"
                :auto-upload="false"
                :on-change="handleFileChange"
                class="uploader"
              >
                <XIcon :icon="Plus" :size="24" color="#909399"></XIcon>
              </el-upload>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </transition>

    <div class="form-footer">
      <el-button
        v-if="state.currentStep.index > 0"
        @click="prevStep"
        :icon="ArrowLeftBold"
        size="large"
      >
        上一步
      </el-button>
      <el-button
        type="primary"
        @click="nextStep"
        :disabled="!canNext"
        :icon="state.currentStep.index === state.steps.length - 1 ? CircleCheck : ArrowRightBold"
        size="large"
      >
        {{ state.currentStep.index === state.steps.length - 1 ? '提交归档' : '下一步' }}
      </el-button>
    </div>

    <el-dialog v-model="state.dialogVisible" title="图片预览">
      <img :src="state.dialogImageUrl" alt="预览图片" style="width: 100%" />
    </el-dialog>
  </div>
</template>

<script>
import { defineComponent, reactive, computed } from 'vue';
import { useProvider } from '@vtj/renderer';
import { XIcon } from '@vtj/ui';
import {
  VtjIconBug,
  VtjIconDocument,
  VtjIconCheck,
  VtjIconEdit,
  VtjIconSave,
  Plus,
  ZoomIn,
  Delete,
  CircleCheck,
  CircleClose,
  SuccessFilled,
  WarningFilled,
  ArrowLeftBold,
  ArrowRightBold,
  Edit,
  User,
  DocumentChecked,
  SetUp,
  Finished,
  FolderChecked,
  Fire,
  Lightning,
  Cpu,
  Bowl,
  MoreFilled
} from '@vtj/icons';

export default defineComponent({
  name: 'HazardWorkflowForm',
  components: {
    XIcon
  },
  setup(props) {
    const provider = useProvider({ id: '17snuzov', version: '' });
    const state = reactive({
      currentStep: {
        index: 0,
        title: '隐患上报',
        description: '填写隐患基本信息'
      },
      steps: [
        { index: 0, title: '隐患上报', description: '填写隐患信息', icon: Edit },
        { index: 1, title: '初步审核', description: '审核隐患信息', icon: DocumentChecked },
        { index: 2, title: '整改方案', description: '制定整改方案', icon: SetUp },
        { index: 3, title: '整改验收', description: '验收整改结果', icon: Finished },
        { index: 4, title: '归档', description: '完成隐患处理', icon: FolderChecked }
      ],
      hazardTypes: [
        { value: 'fire', label: '消防安全', icon: Fire, color: '#F56C6C' },
        { value: 'electric', label: '电气安全', icon: Lightning, color: '#E6A23C' },
        { value: 'equipment', label: '设备安全', icon: Cpu, color: '#409EFF' },
        { value: 'chemical', label: '化学品安全', icon: Bowl, color: '#67C23A' },
        { value: 'other', label: '其他隐患', icon: MoreFilled, color: '#909399' }
      ],
      formData: {
        title: '',
        type: '',
        description: '',
        images: [],
        reviewComment: '',
        reviewResult: '',
        responsiblePerson: '',
        solution: '',
        expectedDate: '',
        completionStatus: '',
        acceptanceResult: '',
        archiveNote: '',
        attachments: []
      },
      dialogVisible: false,
      dialogImageUrl: ''
    });
    return { 
      state, 
      props, 
      provider,
      // 图标需要在setup中返回才能在模板中使用
      VtjIconBug,
      VtjIconDocument,
      VtjIconCheck,
      VtjIconEdit,
      VtjIconSave,
      Plus,
      ZoomIn,
      Delete,
      CircleCheck,
      CircleClose,
      SuccessFilled,
      WarningFilled,
      ArrowLeftBold,
      ArrowRightBold,
      Edit,
      User,
      DocumentChecked,
      SetUp,
      Finished,
      FolderChecked,
      Fire,
      Lightning,
      Cpu,
      Bowl,
      MoreFilled
    };
  },
  computed: {
    canNext() {
      switch (this.state.currentStep.index) {
        case 0:
          return (
            this.state.formData.title &&
            this.state.formData.type &&
            this.state.formData.description
          );
        case 1:
          return (
            this.state.formData.reviewComment && this.state.formData.reviewResult
          );
        case 2:
          return (
            this.state.formData.responsiblePerson &&
            this.state.formData.solution &&
            this.state.formData.expectedDate
          );
        case 3:
          return (
            this.state.formData.completionStatus &&
            this.state.formData.acceptanceResult
          );
        default:
          return true;
      }
    }
  },
  methods: {
    nextStep() {
      if (this.state.currentStep.index < this.state.steps.length - 1) {
        this.state.currentStep = this.state.steps[this.state.currentStep.index + 1];
      } else {
        this.submitForm();
      }
    },
    prevStep() {
      if (this.state.currentStep.index > 0) {
        this.state.currentStep = this.state.steps[this.state.currentStep.index - 1];
      }
    },
    handleFileChange(file, fileList) {
      console.log('File changed:', file, fileList);
    },
    handlePictureCardPreview(file) {
      this.state.dialogImageUrl = file.url;
      this.state.dialogVisible = true;
    },
    handleRemove(file) {
      console.log('Remove file:', file);
    },
    submitForm() {
      console.log('Form submitted:', this.state.formData);
      this.$message.success('隐患处理流程已提交归档');
    }
  }
});
</script>

<style lang="css" scoped>
.workflow-form {
  max-width: 900px;
  margin: 0 auto;
  padding: 30px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
}

.form-header {
  text-align: center;
  margin-bottom: 30px;
  position: relative;
}

.form-header h2 {
  margin: 15px 0 10px;
  color: #303133;
  font-size: 24px;
  font-weight: 500;
}

.form-header .current-step {
  color: #606266;
  font-size: 14px;
}

.header-icon {
  animation: bounce 2s infinite;
}

.steps-container {
  margin: 30px 0;
  padding: 20px;
  background-color: #f5f7fa;
  border-radius: 8px;
}

.form-content {
  margin: 30px 0;
  padding: 25px;
  border: 1px solid #ebeef5;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
}

.step-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #ebeef5;
}

.step-header h3 {
  margin: 0 0 0 10px;
  color: #303133;
  font-size: 18px;
}

.form-footer {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

.form-footer .el-button {
  margin: 0 15px;
  min-width: 120px;
}

.uploader {
  :deep(.el-upload) {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: all 0.3s;
  }

  :deep(.el-upload:hover) {
    border-color: #409eff;
  }
}

.uploader-preview {
  position: relative;
  width: 100%;
  height: 100%;
}

.uploader-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.uploader-actions {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  cursor: default;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 0.3s;
}

.uploader-preview:hover .uploader-actions {
  opacity: 1;
}

.uploader-action {
  margin: 0 5px;
  cursor: pointer;
  font-size: 16px;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}
</style>
`;

export const dsl_27 = {
  name: 'Abc',
  locked: false,
  inject: [],
  state: {
    data: {
      type: 'JSExpression',
      value: 'null'
    }
  },
  lifeCycles: {
    created: {
      type: 'JSFunction',
      value: 'async () => {\n  this.state.data = await this.getData()\n}'
    }
  },
  methods: {},
  computed: {},
  watch: [],
  css: '',
  props: [],
  emits: [],
  slots: [],
  dataSources: {
    getData: {
      type: 'mock',
      ref: '',
      name: 'getData',
      label: '测试模拟数据',
      test: {
        type: 'JSFunction',
        value: "() => this.runApi({\n    name: 'abc'\n})"
      },
      mockTemplate: {
        type: 'JSFunction',
        value:
          "(params) => {\n    return {\n        code: 0,\n        data: {\n            id: '@guid',\n            params\n        }\n    };\n}"
      }
    }
  },
  __VTJ_BLOCK__: true,
  __VERSION__: '1752203178862',
  id: '107h4fa7z',
  nodes: []
};
