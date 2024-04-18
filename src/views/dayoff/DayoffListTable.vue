<template>
  <div class="content-container">
    <div class="search-input-container">
      <div class="input-group mgb-1r">
        <select @change="changeYear" :value="year" class="select-input">
          <option :value="item" v-for="item in years">{{item}}</option>
        </select>
        <input type="text" class="form-control" @input="changeQuery" @keydown.enter="getEmployeeDayoffInfo">
        <div class="input-group-append">
          <button type="button" class="btn btn-outline-secondary" @click="getEmployeeDayoffInfo">검색</button>
        </div>
      </div>
      <div class="paging-button-container mgb-1r">
        <img class="mgr-1r icon-button clickable spin" src="@/assets/images/return-icon.png" @click="refreshDayoff">
        <select @change="changePageSize" :value="pageSize" class="page-size-select-input mgr-1r">
          <option :value="item" v-for="item in pageSizes">{{item}}</option>
        </select>
        <button type="button" class="btn btn-success mgr-1r" @click="goNewEmployee">사원 입력</button>
        <template v-if="hasPreviousPage">
          <button type="button" class="btn btn-info" @click="doPreviousPage">이전</button>
        </template>
        <template v-else>
          <button type="button" class="btn btn-secondary mgr-1r">이전</button>
        </template>
        <template v-if="hasNextPage">
          <button type="button" class="btn btn-info" @click="doNextPage">다음</button>
        </template>
        <template v-else>
          <button type="button" class="btn btn-secondary mgr-1r">다음</button>
        </template>

        <button type="button" class="btn btn-success mgr-1r" @click="excelDownload">엑셀 다운로드</button>

      </div>
    </div>
    <ClickableRowTable :table-data="tableInfo" :headers="columns"
                       :column-properties="columnsProperty"
                       :is-clickable="true"
                       :allow-sort="columnsSort"
                       :click-able-event-keys="tableKeys"
                       @click-row="clickEvent"
                       @change-sort="changeSort"
    />
  </div>
</template>

<script>
import employeeDayoffProtocol from "@/network/employeeDayoffProtocol";
import ClickableRowTable from "@/components/table/ClickableTable.vue";
import dayoffProtocol from "@/network/dayoffProtocol";
import axios from "axios";
export default {
  name: 'DayoffListTable',
  components: {ClickableRowTable},
  mounted() {
    this.getEmployeeDayoffInfo();
  },
  data() {
    return {
      year: new Date().getFullYear(),
      pageNum:0,
      pageSize:30,
      info:[],
      query: "",
      sort:null,
      hasNextPage: false,
      hasPreviousPage: false,
      columns:['사번','이름','직급','입사일','총연차','사용연차','남은연차'],
      columnsProperty:['employeeNo','name','rankName','joiningDt','totalDayoffCount','usedDayoffCount','remainingDayoffCount'],
      columnsSort:[true, false, false, true, true, true, true ]
    }
  },
  methods: {
    changeQuery(event) {
      this.query = event.target.value;
    },
    changePageSize(event) {
      if (event.target.value) {
        this.pageSize = event.target.value;
        this.getEmployeeDayoffInfo();
      }
    },
    changeYear(e) {
      this.year = e.target.value;
      this.getEmployeeDayoffInfo();
    },
    changeSort(sort) {
      this.sort = sort;
      this.getEmployeeDayoffInfo();
    },
    goNewEmployee() {
      this.$router.push(`/dayoff/`);
    },
    async refreshDayoff() {
      await dayoffProtocol.refreshDayoff();
      await this.getEmployeeDayoffInfo();
      alert("새로고침 되었습니다.");
    },
    async getEmployeeDayoffInfo() {
      const result = await employeeDayoffProtocol.getEmployeeDayoffInfo({
        year:this.year,
        pageNum:this.pageNum,
        pageSize:this.pageSize,
        month:this.month,
        sort:this.sort,
        query:this.query});
      if (!result) {
        return;
      }
      if (typeof result.hasNextPage === 'boolean') {
        this.hasNextPage = result.hasNextPage;
      }
      if (typeof result.hasPreviousPage === 'boolean') {
        this.hasPreviousPage = result.hasPreviousPage;
      }
      if (result.content) {
        this.info = result.content;
      }
    },
    doNextPage() {
      this.pageNum++;
      this.getEmployeeDayoffInfo();
    },
    doPreviousPage() {
      if (this.pageNum === 0) return;
      this.pageNum--;
      this.getEmployeeDayoffInfo();
    },
    clickEvent(key) {
      this.$router.push(`/dayoff/${key}`);
    },

    excelDownload() {
      axios.get('http://localhost:8080/api/v1/users/excel/download',
          {responseType: 'arraybuffer'},
          {
            headers: {
              Authorization: localStorage.getItem('Authorization'),
            },
          })
          .then(result => {
            console.log(result)
            const url = window.URL.createObjectURL(new Blob([result.data], { type: result.headers["content-type"] }))
            const link = document.createElement("a")
            link.href = url
            link.download = "example.xlsx"
            link.click()
            window.URL.revokeObjectURL(url)})
          .catch((err) => {
            // loginError.value = true;
            console.error(err);
          });
    }
  },

  computed: {
    years() {
      const currentYear = new Date().getFullYear();
      const array = [];
      for (let i = 2020; i <= currentYear; i++) {
        array.push(i);
      }
      return array;
    },
    pageSizes() {
      return [10,20,30,50];
    },
    tableInfo() {
      if (this.info != null) {
        return this.info.map((item) => {
          const properties = [];
          this.columnsProperty.forEach((propertyName) => properties.push(item[propertyName]));
          return properties;
        })
      }
      return [];
    },
    tableKeys() {
      return this.info.map((item) => item.employeeNo);
    }
  },
}
</script>