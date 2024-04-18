<template>
  <div class="calendar-change-button-container">
    <h4>이 페이지는 DayoffListView.vue</h4>
    <button class="calendar-change-button left-button" @click="changeCalendar" :class="isCalendarView ? 'button-active' : ''">
      캘린더11
    </button>
    <button class="calendar-change-button right-button" @click="changeList" :class="!isCalendarView ? 'button-active' : ''">
<!--    <button class="calendar-change-button right-button button-active" @click="changeList" >-->
      연차 목록
    </button>
  </div>

  <div class="content-header">
    <h1 v-if="!isCalendarView">
      사원별 잔여 연차 조회
    </h1>
  </div>

  <template v-if="isCalendarView">
    <Calendar/>
  </template>

  <template v-else>
    <DayoffListTable/>
  </template>

</template>

<script>
import ClickableRowTable from "@/components/table/ClickableTable.vue";
import DayoffListTable from "@/views/dayoff/DayoffListTable.vue";
import Calendar from "@/views/calendar/calendar.vue";
export default {
  name: 'DayoffListView',
  components: {Calendar, DayoffListTable, ClickableRowTable},
  methods: {

    changeCalendar() {
      this.isCalendarView = true;
    },
    changeList() {
      this.isCalendarView = false;
    }
  },
  data() {
    return {
      isCalendarView : true,
    }
  }
}
</script>

<style>
@import "@/assets/css/task.css";

</style>