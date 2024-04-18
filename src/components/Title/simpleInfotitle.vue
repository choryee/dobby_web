<template>

  <h2 class="yearText">{{data.year}}</h2>
  이건 simpleInfoTitle.vue
  <div class="simpleInfoTitle">
    <p>{{ data.name }}</p>
    <p class="totalDayoff">(지급 연차:
      <span v-if="!editing">{{ data.totalDayoff }}</span>
      <input v-model="editedData.totalDayoff" v-else :placeholder="data.totalDayoff">
    </p>

    <div>
      <span class="dutyDayoff">[ 의무연차:{{data.dutyDayoff}}     ]</span>
      <p class="usedDayoff">사용연차: {{ data.usedDayoff }}</p>
    </div>

    <p class="leftDayoff">남은연차: {{ data.leftDayOff }})</p>
    <button @click="toggleEditing" class="settingButtons" v-if="!editing">
      <img src="../../assets/images/option.png" alt="편집">
    </button>

    <!-- 연차 정보 수정 필드 -->
    <div v-if="editing">
      <button @click="saveEditedData" class="settingButtons">
        <img src="../../assets/images/save.png" alt="저장">
        저장
      </button>

      <button @click="cancelEditing" class="settingButtons">
        <img src="../../assets/images/cancel.png" alt="취소">
        취소
      </button>

      <button @click="resetEditing" class="settingButtons">
        <img src="../../assets/images/reset.png" alt="취소">
        초기화
      </button>
    </div>
  </div>
</template>
<script>
import { BubbleMenu } from "@tiptap/vue-3";
import network from '@/network';

export default {
  name: 'SimpleInfoTitle',
  components: { BubbleMenu },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      editing: false, // 연차 정보 편집 중 여부
      editedData: { totalDayoff: this.data.totalDayoff }, // 수정 중인 지급 연차 정보
      params:{
        employeeNo:'',
        settingDayoff: '',
        year: ''
      }
    };
  },
  methods: {
    toggleEditing() {
      this.editing = !this.editing;
      this.params.employeeNo = this.data.employeeNo;
      this.params.year =this.data.year;
    },
    cancelEditing() {
      this.setEditing()
    },
    saveEditedData() {
      if (typeof this.editedData.totalDayoff === 'number') {
        this.params.settingDayoff = this.editedData.totalDayoff;
        const header = {};
        network.employee.employeeDayoffSetting(this.params, header);
        this.setEditing();
        window.location.reload();
      } else alert('totalDayoff 값은 숫자이어야 합니다.');
    },
    resetEditing(){
      this.params.settingDayoff = 0;
      const header ={};
      network.employee.employeeDayoffSetting(this.params,header);
      this.setEditing()
      window.location.reload();
    },
    setEditing(){
      this.editing = false;
      this.editedData.totalDayoff = this.data.totalDayoff;
    }
  },
};
</script>


<style>
.simpleInfoTitle{
  display: flex;
  width: 90%;
  margin:auto;
}
.yearText{
  width: 90%;
  margin:auto;
  font-weight: bold;
}
.dutyDayoff{
  font-size: 10px;
  font-weight: bold;
  color: #0d6efd;
  position: absolute;
  margin-left: 5%
}
.usedDayoff{
  color: #0d6efd;
}
.leftDayoff{
  color: red;
}
.simpleInfoTitle p {
  font-size: 24px;
  font-weight: bold;
  padding: 5px;
}
.settingButtons{
  border: unset;
  background-color: unset;
  width: 60px;
  height: 50px;
  font-size: 12px;
}
.simpleInfoTitle img{
  width: 50%;
  margin:auto;
  display: block;
}
.simpleInfoTitle input {
  width: 35px;
  height: 30px;
}

</style>
