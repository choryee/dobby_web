<template>
    <div class="button-container">
      <div >
        <h5 style="text-align: left">-- DayoffView.vue --</h5>
      </div><br/>
      <div class="input_field">
        Year >>
        <select v-model="params.year"> <!--v-model="params.year" 이건 단순히, params객체의 year키의 값과 연동시키는 것.  -->
          <!--years는 함수인데도, v-for가 되는 듯. -->
          <option v-for="yearValue in years" :key="yearValue" :value="yearValue">
            {{ yearValue }}
          </option>
        </select>
      </div>
      <button class="src_button btn mgb-1r mgr-1r" @click="fetchDayoffRemaining">조회</button>

      <div v-if="firstButton && $route.path !== '/dayoff/'">
        <button class="btn btn-success mgb-1r mgr-1r" type="button" @click="updateEmployeeMode">수정</button>
        <button class="btn btn-danger mgb-1r mgr-1r" type="button" @click="back">뒤로가기11</button>
      </div>
      <div v-if="secondButton">
        <button class="btn btn-success mgb-1r mgr-1r" type="button" @click="updateEmployee">수정</button>
      </div>
      <div v-if="buttonCancel">
        <button class="btn btn-danger mgb-1r mgr-1r" type="button" @click="deleteEmployee">삭제</button>
        <button class="btn btn-secondary mgb-1r mgr-1r" type="button" @click="updateCancel">취소</button>
      </div>
    </div>

  <div v-if="this.params.employeeNo && !editMode">
    <div class="dayoffTable">
      <SimpleInfoTitle :data="dayoffInfo"/>

      <div class="inner_wrap">
        <p class="title">계정 정보 -- ColumTable.vue</p>
        <ColumTable :headers="authInfo" :tableData="authData"/>
      </div>

      <div class="inner_wrap">
        <p class="title">사원 정보 -- ColumTable.vue</p>
        <ColumTable :headers="employeeInfo" :tableData="employeeData"/>
      </div>

      <div class="inner_wrap">
        <p class="title">연차 정보 -- TableComponent.vue</p>
        <TableComponent :headers="tableHeaders" :tableData="employeeDayoffData"/>
      </div>
    </div>
  </div>

  <div v-else>
    <!-- 등록  -->
    <div v-if="!editMode">
      <div class="button-container">
        <button class="btn btn-info mgb-1r" type="button" @click="insertEmployee">등록</button>
      </div>
    </div>

    <div class="dayoffTable">
      <div class="inner_wrap">
        <p class="title">계정 정보</p>
        <table class="common-table">
          <tr>
            <th class="common-th">권한</th>
            <td class="common-td">
              <select v-model="formData.rankNo">
                <option value="1">매니저</option>
              </select>
            </td>
          </tr>

          <tr>
            <th class="common-th">사번</th>
            <td class="common-td"><input v-model="formData.employeeNo"></td>
          </tr>

          <tr>
            <th class="common-th">wid</th>
            <td class="common-td"><input v-model="formData.wid"></td>
          </tr>
        </table>
      </div>

      <div class="inner_wrap">
        <p class="title">사원 정보</p>
        <table class="common-table">
          <tr>
            <th class="common-th">이름</th>
            <td class="common-td"><input v-model="formData.name"></td>
          </tr>
          <tr>
            <th class="common-th">입사년도</th>
            <td class="common-td"><input type="date" v-model="formData.joiningDt"></td>
          </tr>
          <tr>
            <th class="common-th">직급</th>
            <td class="common-td">
              <select v-model="formData.rankNo">
                <option value="1">매니저</option>
              </select>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import TableComponent from '@/components/table/table.vue'
import network from '@/network';
import SimpleInfoTitle from "@/components/Title/simpleInfotitle.vue";
import ColumTable from '@/components/table/columTable.vue';
import axios from "axios";
import router from "@/router";
import {mapState} from "vuex";

export default { // http://localhost:3000/dayoff/
  name: 'DayoffView',
  components: {
    SimpleInfoTitle,
    TableComponent,
    ColumTable
  },
  data() {
    return {
      // <ColumTable :headers="authInfo" :tableData="authData"/> ColumTable에 props으로 넘겨줌.
      authInfo: ['권한(props으로 받은 것)', '사번', '네이버웍스ID'],
      employeeInfo: ['이름(props으로 받은 것)', '입사년도', '직급'],
      tableHeaders: ['연차종류(props으로 받은 것)', '시작날짜', '종료날짜', '기한'],
      authData: [],
      employeeData: [],
      employeeDayoffData: [],
      infos: [],
      dayoffInfo: {},
      params: {
        employeeNo: '',
        year : new Date().getFullYear(),
      },
      user:{},
      //employeeNo:'',
      headers: {
        Authorization: localStorage.getItem('Authorization')
      },
      formData: {
        rankNo: '',
        employeeNo: '',
        wid: '',
        password: '1234',
        name: '',
        joiningDt: '',
        departmentNo: '1',
        creatorId: 'system'
      },
      editMode: false,
      buttonCancel: false,
      firstButton: true,
      secondButton: false,
    };

  },

  computed: {
    years() {
      const currentYear = new Date().getFullYear(); //2024
      const array = [];
      for (let i = 2021; i <= currentYear; i++) {
        array.push(i);
      }
      return array;
    },

    ...mapState(['employeeNo']) // ...mapState는 computed에 넣어야. 240415
  },

  created() {

  },

  mounted() {
    const getUser = sessionStorage.getItem('setUser');
    console.log('sessionStorage.getItem>> ', JSON.parse(getUser));
    this.user = JSON.parse(getUser); // JSON-->객체로 바꾸는것.
    console.log('this.user>> ', this.user);

    this.fetchDayoffRemaining();
    console.log('editMode : ', this.editMode);
    console.log('$route.path : ', this.$route.path);
    console.log('$route.params : ', this.$route.params);
    console.log('Condition : ', !this.editMode || this.$route.path !== '/dayoff/');
  },

  methods: {
    async fetchDayoffRemaining() {
    //  현재 활성화된 라우트의 URL에서 `employeeNo`라는 경로 매개변수의 값을 가져와서, `employeeNo` 변수에 할당하는 것입니다.
      //const employeeNo = this.$route.params.employeeNo;
      let employeeNoo= this.$store.state.employeeNo;
      let employeeFromSession = this.user.employee_no;
      console.log('employeeFromSession>> ', employeeFromSession);
      this.params.employeeNo = employeeFromSession;
      //this.params.employeeNo = 'M073';

      try {
        // const url = `dayoff/employee/${employeeNo}
// http://localhost:8080/dayoff/employee/?year=2024 400 (Bad Request)
        //const response = await network.dayoff.dayoffUse(employeeNo,this.params);

        // network.dayoff.dayoffUse(this.params);자체가 비동기이므로, 앞에 await붙여 줘야.240416
        const response = await network.dayoff.dayoffUse(this.params);
        const {result} = response; //구조분해할당 임.
        console.log('dayoffUse response>>', response);

        // result가 존재하지 않는 경우
        if (!result) {
          throw new Error('API 응답에 result 속성이 존재하지 않습니다.');
        }

        this.dayoffInfo = { //this.dayoffInfo는 원래 위에 dayoffInfo={}롤 빈 객체만 선언된거라,
          //아래처럼하면, 새로운키:값으로 새로 추가하는 꼴임.240408
          name: result.name,
          totalDayoff: result.totalDayoff,
          dutyDayoff: result.dutyDayoffCount,
          usedDayoff: result.usedDayoff,
          leftDayOff: result.totalDayoff - result.usedDayoff,
          employeeNo : result.employeeNo,
          year : this.params.year,
        };

        this.authData = [
          {
            권한: result.rankName,
            사번: result.employeeNo,
            네이버웍스ID: result.wid,
          },
        ];
        this.employeeData = [
          {
            이름: result.name,
            입사년도: result.joiningDt,
            직급: result.rankName,
          },
        ];

        //-------------
        // employeeDayoffData=[]; 위에
        this.employeeDayoffData=[
          {employeeNo:'M073', dayoffType:'1002', dayoffDt:'2023-12-15', codeName:'오후반차', codeVal:'0.5'},
          {employeeNo:'M073', dayoffType:'1001', dayoffDt:'2023-02-15', codeName:'연차', codeVal:'1'},
          {employeeNo:'M073', dayoffType:'1003', dayoffDt:'2023-07-15', codeName:'오후반차', codeVal:'0.5'},
        ]
        // this.employeeDayoffData = result.dayoffDetailList
        //     .map(item => ({
        //       연차종류: item.codeName,
        //       시작날짜: item.startDayoffDt,
        //       종료날짜: item.endDayoffDt,
        //       기한: item.usedDayoff,
        //     }))
        //     .concat(result.dayoffDutyList.map(item => ({
        //       연차종류: item.title,
        //       시작날짜: item.dutyDate,
        //       종료날짜: item.dutyDate,
        //       기한: 1,
        //     })))
        //     .sort((a, b) => new Date(b.시작날짜) - new Date(a.시작날짜)); // "시작날짜"를 기준으로 내림차순 정렬

      } catch (error) {
        console.error('Failed to fetch data 가져오기 실패 :', error);
      }// try
    },//fetchDayoffRemaining()

    insertEmployee() {
      if(confirm("사원 정보를 저장하시겠습니까?")) {
        console.log('전송할 데이터', this.formData);
        axios.post('http://localhost:8080/employee/insert', this.formData)
            .then(response => {
              console.log('서버 응답', response.data);
              alert('등록 성공');
              router.go(0);
            })
            .catch(error => {
              console.log('데이터 전송 실패', error);
            })
      }
    },

    async deleteEmployee() {
      if (confirm(this.$route.params.employeeNo + " 이 사원 정보를 삭제하시겠습니까?")) {
        const employeeNo = this.$route.params.employeeNo;
        const url = `http://localhost:8080/employee/delete/${employeeNo}`;
        const headers = {};
        try {
          await axios.get(url, {headers});
          alert('삭제 성공');
          router.go(0);
        } catch (error) {
          console.error('사원 삭제 실패', error);
        }
      }
    },

    async updateEmployeeMode() {
      const employeeNo = this.$route.params.employeeNo;
      console.log("employeeNo", employeeNo);
      if (confirm(this.$route.params.employeeNo + "이 사원 정보를 수정하시겠습니까?")) {
        const params = {employee: this.$route.params.employeeNo};
        console.log("employeeNo : ", employeeNo);
        const url = `http://localhost:8080/employee/list/${employeeNo}`;
        const headers = {};
        this.editMode = true;
        this.buttonCancel = true;
        this.firstButton = false;
        this.secondButton = true;

        try {
          const response = await axios.get(url, {params, headers});

          // response.data를 확인하고 결과가 존재하는지 확인
          const responseData = response.data;
          console.log("responseData---", responseData);


          const employeeInfo = responseData;
          console.error("Employee Info : ", employeeInfo);

          console.error("Employee Info : ", employeeInfo);

          this.formData = {
            rankNo: employeeInfo.result.rankNo,
            employeeNo: employeeInfo.result.employeeNo,
            wid: employeeInfo.result.wid,
            password: '1234',
            name: employeeInfo.result.name,
            joiningDt: employeeInfo.result.joiningDt,
            departmentNo: '1',
            creatorId: 'system'
          };
        } catch (error) {
          console.error('사원 정보 불러오기 실패:', error);
        }
      }
    },

    async updateEmployee() {
      if (confirm(this.$route.params.employeeNo + "이 사원 정보를 수정하시겠습니까?")) {
        const employeeNo = this.$route.params.employeeNo;
        const url = `http://localhost:8080/employee/modify/${employeeNo}`;
        console.log('전송할 데이터', this.formData);
        axios.post(url, this.formData)
            .then(response => {
              console.log('서버 응답', response.data);
              alert('수정 성공');
              router.go(0);
            })
            .catch(error => {
              console.log('데이터 전송 실패', error);
            })
      }
    },

    updateCancel() {
      this.editMode = false;
      this.buttonCancel = false;
      this.secondButton = false;
      this.firstButton = true;
    },

    back() {
      router.back();
    }
  }
};
</script>

<style>
@import "@/assets/css/table.css";

.inner_wrap {
  width: 90%;
  margin: 20px auto;
}
.input_field select{
  height: 37px;
  border-radius: 5px;
  margin-right: 15px;
}
.src_button{
  background-color: #0dcaf0;
  border: unset;
  border-radius: 5px;
  color: white;
}
.title {
  font-size: 16px;
  font-weight: bold;
  padding-left: 10px;
  margin-bottom: 5px;
  border-left: 1px solid black;
}

.button-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  margin-right: 70px;
}

</style>
