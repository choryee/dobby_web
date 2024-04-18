<template>
  <div class="container-fluid px-4">
    <h4 class="mt-4">캘린더 -- calendar.vue </h4>
    <FullCalendar :options="calendarOptions"/>
  </div>
</template>

<script>
//http://localhost:3000/dayoffs


import axios from 'axios'
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"

export default {
  components: {
    FullCalendar
  },
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        locale: 'ko',
        events: [],
      },

    }
  },
  created() {
  },
  mounted() {
    this.calendarList();
  },
  methods: {
    calendarList() {
      axios.get('http://localhost:8080/calendar')
          .then(res => {
     // this.calendarOptions.events이 형태는 객체.키 형태임.
     // res.data.map이것은 배열에 대해서만 사용가능하고, 반환도 배열형태이다.
     //그래서, events: [],에 들어가는 것. 240408
            this.calendarOptions.events = res.data.map( event => ({
              title: event.eventName,
              start: event.startDt,
              end: event.endDt,
            }));
          }).catch(err => {
        console.error(err);
      });
    },
  },
}
</script>
<style>
.custom-calendar {
  height: 600px;
}
</style>