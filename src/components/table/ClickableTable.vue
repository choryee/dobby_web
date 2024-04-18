<template>
  <div class="table-container">
    <table class="table">
      <thead>

      <tr>
        <template v-for="(header, index) in headers" :key="header">

          <th class="ta-c clickable" v-if="allowSort[index]" @click="sortChange(columnProperties[index])">
            {{ header }}
            <template v-if="sortProperty === columnProperties[index] && direction === 'desc'">
              ↓
            </template>
            <template v-if="sortProperty === columnProperties[index] && direction === 'asc'">
              ↑
            </template>
          </th>

          <th class="ta-c" v-else>
            {{ header }}
          </th>
        </template>
      </tr>

      </thead>
      <tbody>
      <tr v-for="(row, index) in tableData" :key="index" class="ta-c hover-blue clickable" @click="clickEvent(clickAbleEventKeys[index])">
        <td v-for="(value, key) in row" :key="key" >{{ value }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'ClickableRowTable',
  props: {
    columnProperties:{
      type:Array,
    },
    headers: {
      type: Array,
      required: true
    },
    allowSort:{
      type: Array,
    },
    tableData: {
      type: Array,
      required: true
    },
    isClickable: {
      type: Boolean,
    },
    clickAbleEventKeys:{
      type: Array,
    }
  },
  data() {
    return {
      direction:'asc',
      sortProperty:'',
    }
  },
  methods:{
    clickEvent(key) {
      this.$emit("clickRow", key);
    },
    sortChange(property) {
      if (this.sortProperty !== property) {
        this.sortProperty = property;
        this.direction = 'asc';
      } else {
        this.direction = this.direction === 'asc' ? 'desc' : 'asc';
      }
      this.$emit('changeSort', `${this.sortProperty},${this.direction}`);
    }
  }
};
</script>


