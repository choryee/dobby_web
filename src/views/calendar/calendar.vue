<template>
  <div class="container-fluid px-4">
    <h4 class="mt-4">캘린더 -- calendar.vue </h4>
<!--    <FullCalendar :options="calendarOptions" @eventClick="handleEventClick">-->
    <FullCalendar :options="calendarOptions" >
      <template v-slot:eventContent='arg'>
        <b>{{ arg.start }}</b>
        <i>{{ arg.event.title }}</i>
      </template>
    </FullCalendar>

  </div>
</template>

<script>
//http://localhost:3000/dayoffs


import axios from 'axios'
//import FullCalendar from "@fullcalendar/vue2";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"

// import axios from 'axios';
// import { FullCalendar, dayGridPlugin, interactionPlugin } from "@fullcalendar/vue3";


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
        //dateClick: this.handleDateClick,
        eventClick: this.handleEventClick,

        editable: true, // 이벤트를 편집 가능하고 클릭 가능하게 설정
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
    handleEventClick(clickedInfo){
      console.log('Clicked event:', clickedInfo.event);
      console.log('Clicked event title:', clickedInfo.event.start);

    },
    handleDateClick: function(arg) {
      alert('date click! : ' + arg.dateStr)
    }
  },
}
</script>
<style>
.custom-calendar {
  height: 600px;
}
</style>