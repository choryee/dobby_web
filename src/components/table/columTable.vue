<template>
  <div class="table-container">
    <table class="common-table">
      <tbody>

      <tr v-for="(header, index) in headers" :key="index">
        <th class="common-th"> {{ header }} </th>
        <td class="common-td" v-for="row in tableData" :key="row[header]">
          {{ row[header] }}
        </td>
      </tr>
      </tbody>

    </table>
  </div>
</template>


<script>
export default {
  name: 'ColumTable',
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
  }

};
</script>

