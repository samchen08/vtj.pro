<template>
  <div class="volunteer">
    <div class="content">
      <h3>2024 广州越秀区小升初志愿录取测算</h3>
      <div class="base">
        <ElForm label-position="right" inline label-width="80px">
          <ElFormItem label="随机号">
            <ElText class="randomNo" type="success" size="large">
              {{ myRandomNo }}
            </ElText>
            <ElLink type="primary" @click="changeRandomNo">更换</ElLink>
          </ElFormItem>
        </ElForm>
        <ElForm label-position="right" inline label-width="80px">
          <ElFormItem label="学生人数">
            <ElInputNumber
              :precision="0"
              :controls="false"
              :min="1"
              :max="99999"
              v-model="studentTotal"></ElInputNumber>
          </ElFormItem>
        </ElForm>
      </div>

      <div
        class="result"
        v-if="!result && myVolunteer.length === schools.length && hasSubmit">
        <ElAlert type="warning" title="已提交志愿" :closable="false">
          <div>{{ myVolunteerNames }}</div>
        </ElAlert>
      </div>

      <div v-if="result" class="result">
        <ElAlert type="success" title="录取结果" :closable="false">
          <div>
            您已被【 {{ result.school.name }} 】录取, 计划招生
            {{ result.total }} 人。
          </div>
          <div style="padding: 10px 0">
            <ElButton size="small" @click="toggleLogs">派位过程</ElButton>
          </div>
        </ElAlert>
      </div>
      <div v-if="result && showLogs" class="logs">
        <dl v-html="info.join('')"></dl>
      </div>

      <ElTable border stripe :data="schools" :key="tableKey">
        <ElTableColumn
          type="index"
          label="#"
          fixed
          width="50px"></ElTableColumn>
        <ElTableColumn
          label="学校"
          prop="name"
          fixed
          min-width="100px"></ElTableColumn>
        <ElTableColumn label="热度权重" prop="hot" min-width="150px">
          <template #default="{ row }">
            <ElInputNumber
              :precision="0"
              :step="1"
              step-strictly
              size="small"
              :min="1"
              :max="100"
              v-model="row.hot"></ElInputNumber>
          </template>
        </ElTableColumn>
        <ElTableColumn label="录取比例(%)" min-width="150px">
          <template #default="{ row }">
            <ElInputNumber
              :precision="2"
              :step="0.01"
              step-strictly
              size="small"
              :min="0"
              :max="100"
              v-model="row.percentage"></ElInputNumber>
          </template>
        </ElTableColumn>
        <ElTableColumn label="填报志愿" min-width="150px">
          <template #default="{ row }">
            <ElSelect
              placeholder="选择志愿次序"
              v-model="myVolunteerMap[row.index]"
              @change="onVolunteerChange(row.index, $event)">
              <ElOption
                v-for="(_n, index) in schools"
                :key="index"
                :value="index"
                :label="`第${index + 1}志愿`"></ElOption>
            </ElSelect>
          </template>
        </ElTableColumn>
        <ElTableColumn label="计划招生" min-width="100px">
          <template #default="{ row }">
            {{ Math.ceil((row.percentage * studentTotal) / 100) }}
          </template>
        </ElTableColumn>
        <ElTableColumn label="志愿人数" min-width="100px">
          <template #default="{ row }">
            {{ getSchoolStudentsCount(row.index) || '待提交志愿' }}
          </template>
        </ElTableColumn>
        <ElTableColumn label="你的排位" min-width="100px">
          <template #default="{ row }">
            {{ getMyRank(row.index) || '待提交志愿' }}
          </template>
        </ElTableColumn>
      </ElTable>
    </div>

    <div class="op">
      <div>
        <ElButton type="primary" @click="submitVolunteer">提交志愿</ElButton>
        <ElButton type="warning" @click="showResult">派位录取</ElButton>
      </div>
      <ElButton @click="reset">重置</ElButton>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { reactive, ref, toRaw, computed, nextTick, triggerRef } from 'vue';
  import {
    ElForm,
    ElFormItem,
    ElInputNumber,
    ElText,
    ElTable,
    ElTableColumn,
    ElButton,
    ElSelect,
    ElOption,
    ElMessage,
    ElAlert,
    ElLink
  } from 'element-plus';

  const createRandomNo = () => {
    const max = 999999999;
    const min = 100000000;
    return Math.ceil(Math.random() * (max - min) + min);
  };

  const schoolsJSON = JSON.parse(localStorage.getItem('schools') || 'null');
  const myVolunteerJSON = JSON.parse(
    localStorage.getItem('myVolunteer') || '{}'
  ) as any;

  // 考生人数
  const studentTotal = ref(
    Number.parseInt(localStorage.getItem('studentTotal') ?? '2000') as number
  );

  // 我的随机号
  const myRandomNo = ref(createRandomNo());

  const info = ref<string[]>([]);
  const result = ref<any>();
  const showLogs = ref(false);
  const hasSubmit = ref(false);

  interface School {
    index: number;
    name: string;
    hot: number;
    percentage: number;
  }

  // 学校信息
  const schools = reactive<School[]>(
    schoolsJSON || [
      {
        index: 0,
        name: '第七中学',
        hot: 20,
        percentage: 4.27
      },
      {
        index: 1,
        name: '第十中学',
        hot: 3,
        percentage: 29.3
      },
      {
        index: 2,
        name: '十三中学',
        hot: 10,
        percentage: 8.37
      },
      {
        index: 3,
        name: '十六中学',
        hot: 30,
        percentage: 12.09
      },
      {
        index: 4,
        name: '十六中东华',
        hot: 5,
        percentage: 20.9
      },
      {
        index: 5,
        name: '培正中学',
        hot: 40,
        percentage: 8.83
      },
      {
        index: 6,
        name: '七中东山',
        hot: 5,
        percentage: 2.32
      },
      {
        index: 7,
        name: '省实中学',
        hot: 80,
        percentage: 7.44
      },
      {
        index: 8,
        name: '执信本部',
        hot: 60,
        percentage: 2.32
      },
      {
        index: 9,
        name: '铁一中学',
        hot: 50,
        percentage: 4.09
      }
    ]
  );

  // 学生志愿表
  let students: Record<number, number[]> = {};

  // 我填报的志愿
  // const myVolunteer = reactive<Array<number | undefined>>(
  //   myVolunteerJSON || new Array(schools.length).fill(undefined)
  // );

  // const myVolunteer = computed(() => {
  //   const values = Object.values();
  // });

  const myVolunteerMap = reactive<Record<any, any>>(myVolunteerJSON || {});

  const myVolunteer = computed(() => {
    const values = Object.values(myVolunteerMap).sort();
    return values.map((v) => {
      const entries = Object.entries(myVolunteerMap);
      const item = entries.find((n) => n[1] === v);
      return Number.parseInt(item?.[0] as any) as unknown as number;
    });
  });

  const myVolunteerNames = computed(() => {
    return myVolunteer.value
      .map((n, i) => {
        const school = schools.find((s) => s.index.toString() === n.toString());
        return `#${i + 1}  ${school?.name}`;
      })
      .join(', ');
  });

  const tableKey = ref(Symbol());

  const onVolunteerChange = (index: number, val: any) => {
    const values = Object.values(myVolunteerMap).map((n) => Number.parseInt(n));
    const isSelected =
      values.filter((n) => n === Number.parseInt(val)).length > 1;

    if (isSelected) {
      ElMessage.warning({
        message: '该志愿次序已填报，请更换'
      });
      myVolunteerMap[index] = undefined;
    } else {
      myVolunteerMap[index] = val;
    }
  };

  const mockVolunteer = () => {
    const values = toRaw(schools).slice(0);
    values.sort((a, b) => {
      return b.hot * Math.random() - a.hot * Math.random();
    });
    return values.map((n) => n.index);
  };

  const submitVolunteer = async () => {
    localStorage.setItem('studentTotal', studentTotal.value.toString());
    localStorage.setItem('schools', JSON.stringify(toRaw(schools)));
    localStorage.setItem('myVolunteer', JSON.stringify(toRaw(myVolunteerMap)));

    const isSubmited = Object.keys(myVolunteerMap).length === schools.length;
    if (!isSubmited) {
      ElMessage.warning({
        message: '请先填报志愿'
      });
      return;
    }
    students = {};
    triggerRef(myVolunteer);
    await nextTick();
    students[myRandomNo.value] = toRaw(myVolunteer.value as number[]);
    for (let i = 0; i < studentTotal.value - 1; i++) {
      students[createRandomNo()] = mockVolunteer();
    }

    result.value = null;
    tableKey.value = Symbol();
    hasSubmit.value = true;
    // console.log(students);
  };

  const getSchoolStudentsCount = (schoolIndex: number) => {
    const isSubmited = (myVolunteer.value as number[]).every((n) => n >= 0);
    const rank = myVolunteerMap[schoolIndex];
    if (!isSubmited || rank === undefined) {
      return null;
    }

    const values = Object.values(students).filter(
      (n) => n[rank] === schoolIndex
    );
    return values.length;
  };

  const getMyRank = (schoolIndex: number) => {
    // const isSubmited = (myVolunteer.value as number[]).every((n) => n >= 0);
    // const rank = myVolunteer.value.findIndex((n) => schoolIndex === n);
    const rank = Number.parseInt(myVolunteerMap[schoolIndex] as any);
    if (rank === undefined) {
      // return null;
    }
    // if (!isSubmited || rank === undefined) {
    //   return null;
    // }
    // console.log(rank, students);
    const studentNoArray = Object.entries(students)
      .filter(([_no, values]) => {
        return (
          Number.parseInt(values[rank] as any) ===
          Number.parseInt(schoolIndex as any)
        );
      })
      .map((items) => items[0])
      .sort((a, b) => {
        return Number.parseInt(b) - Number.parseInt(a);
      });

    // console.log(rank, studentNoArray);

    const index = studentNoArray.findIndex(
      (n) => n.toString() == myRandomNo.value.toString()
    );

    // console.log(rank, studentNoArray, index);

    return index + 1;
  };

  const findStudents = (schoolIndex: number, sortIndex: number) => {
    return Object.entries(students)
      .filter(([_no, values]) => {
        return values[sortIndex] === schoolIndex;
      })
      .map((items) => items[0])
      .sort((a, b) => {
        return Number.parseInt(b) - Number.parseInt(a);
      });
  };

  const showResult = () => {
    if (Object.keys(students).length === 0) {
      ElMessage.warning({
        message: '请先提交志愿'
      });
      return;
    }
    // console.log('我的志愿', students[myRandomNo]);

    // let result: any = null;
    const picked: string[] = [];
    const plans: any = {};
    for (const school of schools) {
      plans[school.index] = {
        school: toRaw(school),
        picked: 0,
        total: Math.ceil((school.percentage * studentTotal.value) / 100),
        students: []
      };
    }

    info.value = [];
    for (let level = 0; level < schools.length; level++) {
      info.value.push(`<dt>第${level + 1}志愿开始招生</dt>`);
      for (const school of schools) {
        const levelStudents = findStudents(school.index, level);
        // console.log(
        //   `第${level + 1}志愿 ${school.name}`,
        //   school.index,
        //   level,
        //   levelStudents
        // );

        const plan = plans[school.index];
        if (plan.picked >= plan.total) {
          info.value.push(`<dd>${school.name} 已招生满员</dd>`);
          continue;
        }

        for (let item of levelStudents) {
          if (picked.includes(item)) {
            continue;
          }
          if (plan.picked >= plan.total) {
            break;
          }
          picked.push(item);
          plan.students.push(item);
          if (item === myRandomNo.value.toString()) {
            info.value.push(`<dd class="current">您被${school.name}录取</dd>`);
            // break;
          }
          ++plan.picked;
        }
        if (plan.picked < plan.total) {
          info.value.push(
            `<dd>${school.name} 选生源${plan.picked}人, 剩余名额${plan.total - plan.picked}人</dd>`
          );
        } else {
          info.value.push(`<dd>${school.name} 满员生源${plan.picked}人</dd>`);
        }
      }
      // info.value.push(`第${level + 1}志愿开始结束`);
    }

    for (const item of Object.values(plans)) {
      if ((item as any).students.includes(myRandomNo.value.toString())) {
        console.log(item);
        result.value = item;
        break;
      }
    }

    // console.log(plans);
  };

  const reset = () => {
    result.value = null;
    hasSubmit.value = false;
    localStorage.removeItem('myVolunteer');
    localStorage.removeItem('studentTotal');
    localStorage.removeItem('schools');
    localStorage.removeItem('myVolunteer');
    location.reload();
  };

  const toggleLogs = () => {
    showLogs.value = !showLogs.value;
  };

  const changeRandomNo = () => {
    myRandomNo.value = createRandomNo();
    students = {};
    result.value = null;
    hasSubmit.value = false;
    // Object.keys(myVolunteerMap).forEach((k) => {
    //   delete myVolunteerMap[k];
    // });
    // localStorage.removeItem('myVolunteer');
  };
</script>
<style lang="scss" scoped>
  .volunteer {
    padding: 0;
    box-sizing: border-box;
    position: relative;
    padding-bottom: 60px;
    height: 100%;
    overflow: auto;
    background: url('../assets/bg.jpg') no-repeat center top;
  }
  .op {
    position: fixed;
    bottom: 0;
    z-index: 10;
    background-color: rgba(231, 240, 248, 0.8);
    width: 100%;
    height: 60px;
    border-top: 1px solid #ddd;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 10px;
    box-sizing: border-box;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: space-between;
  }
  .base {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #eee;
    padding: 10px;
    margin-bottom: 20px;
    flex-wrap: wrap;
    background-color: #fff;
    .el-form-item {
      margin-bottom: 5px;
      margin-right: 0;
    }
  }
  .randomNo {
    font-size: 20px;
    margin-right: 20px;
  }
  .content {
    padding: 10px;
    > h3 {
      font-size: 20px;
      margin: 0 0 20px 0;
      color: #04538b;
    }
  }
  .result {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  :deep(.current) {
    font-weight: bold;
    color: red;
  }
  .current {
    font-weight: bold;
    color: red;
  }
</style>
