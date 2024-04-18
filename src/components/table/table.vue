<template>
  <div class="table-container">
    <table class="common-table">
      <thead class="common-thead">
        <tr>
          <th class="common-th" v-for="header in headers" :key="header">
            {{ header }}
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(row, index) in tableData" :key="index">
          <td class="common-td" v-for="(value, key) in row" :key="key">
            {{ value }}
          </td>
        </tr>

      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'TableComponent',
  props: { // 부모에서 받은 것. props로 받은 것은 다시,data()에 넣을 필요없이,
    // 바로 위 템플릿에서 사용 가능.240418
    headers: {
      type: Array,
      required: true
    },
    tableData: {
      type: Array,
      required: true
    },
  },
};
</script>

<style>
.common-table {
  width: 100%;
  border-collapse: collapse; /* 추가 */
}

.common-th, .common-td {
  border: 1px solid #ddd; /* 추가 */
  padding: 8px;
  text-align: left;
}

.common-th {
  background-color: #f2f2f2;
}
</style>


