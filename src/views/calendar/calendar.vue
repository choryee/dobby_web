<template>
  <div class="container-fluid px-4">
    <h4 class="mt-4">캘린더 -- calendar.vue </h4>

<!--    <FullCalendar :options="calendarOptions" @eventClick="handleEventClick">-->
<!--    <FullCalendar :options="calendarOptions" >-->
<!--      <template v-slot:eventContent='arg'>-->
<!--        <b>{{ arg.start }}</b>-->
<!--        <i>{{ arg.event.title }}</i>-->
<!--      </template>-->
<!--    </FullCalendar>-->


    <FullCalendar :options="calendarOptions"/>
    <!-- 모달 -->
<!--    <div v-if="showModal" class="modal">-->
<!--      <div class="modal-content">-->
<!--        <span class="close" @click="closeModal">&times;</span>-->
<!--        &lt;!&ndash; 모달 내용 &ndash;&gt;-->
<!--        <h2>이벤트 상세 정보</h2>-->
<!--        <p>이벤트 이름: {{ selectedEvent.title }}</p>-->
<!--        &lt;!&ndash; 추가적인 이벤트 정보 출력 &ndash;&gt;-->
<!--      </div>-->
<!--    </div>-->
    <popupCalDetail ref="popupDetail" />
    <modal v-bind:modalOpened="modalOpen" :modalInfo="modalInfo" @update-modalOpened ="updatedModalOpened"></modal>
  </div>
</template>

<script>
//http://localhost:3000/dayoffs


import axios from 'axios'
//import FullCalendar from "@fullcalendar/vue2";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import popupCalDetail from "@/views/calendar/popup-cal-detail.vue";
import {DialogOption} from "@/views/calendar/DialogModels.js";
import modal from '@/views/calendar/modal.vue'

// import axios from 'axios';
// import { FullCalendar, dayGridPlugin, interactionPlugin } from "@fullcalendar/vue3";


export default {
  components: {
    FullCalendar,
    popupCalDetail,
    modal
  },
  data() {
    return {
      popupDefaultOpt: new DialogOption(),
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        locale: 'ko',
        //eventClick: this.handleEventClick,
        events: [],
        //dateClick: this.handleDateClick,
        eventClick: this.handleEventClick,
        editable: true, // 이벤트를 편집 가능하고 클릭 가능하게 설정

      },
      //showModal: false,
      selectedEvent: null,
      modalOpen: false,
      modalInfo:''
    }
  },
  created() {
  },
  mounted() {
    this.calendarList();
  },
  methods: {
    updatedModalOpened(arg){
      console.log(' arg>>>', arg);
      this.modalOpen=false;
    },
    showModal() {
      this.modalOpen = true;
    },
    closeModal(event) { // event는 $emit의 value
      this.modalOpen = event;
    },

    // handleEventClick(clickInfo){
    //   console.log('clickInfo >>>', clickInfo.event.title);
    //   this.$router.push({
    //     name: 'cal-detail',
    //     params: {
    //       eventId: clickInfo.event.id,
    //       eventTitle:clickInfo.event.title
    //     } });
    // },
    handleEventClick(clickInfo){
      this.modalOpen=true;
      console.log('clickInfo >>>', clickInfo.event.title);
      this.selectedEvent = clickInfo.event;
      this.modalInfo=clickInfo.event.title;
      //this.showModal();
      //sconsole.log('  this.selectedEvent>>>',  this.selectedEvent.title);
      //this.showAlert(clickInfo.event.title);
      //this.$refs.popupDetail.show(clickInfo.event.title)
      //this.modalInfo(clickInfo.event.title);

    },
    // modalInfo(item){
    //   console.log('item >>>', item);
    // },
    // showAlert(msg){
    //   this.popupDefaultOpt = new DialogOption({
    //     message: msg
    //   })
    //   this.$refs.popupDefault.show();
    // },


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

   /* 모달 스타일 */
 .modal {
   display: none; /* 초기에는 숨김 */
   position: fixed; /* 고정된 위치 */
   z-index: 1; /* 다른 요소들 위에 표시 */
   left: 0;
   top: 0;
   width: 100%;
   height: 100%;
   overflow: auto; /* 스크롤이 넘치면 스크롤바 표시 */
   background-color: rgba(0,0,0,0.4); /* 배경색과 투명도 조절 */
 }

/* 모달 내용 스타일 */
.modal-content {
  background-color: #fefefe; /* 모달 내용 배경색 */
  margin: 15% auto; /* 모달 내용 위치 조절 */
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

/* 모달 닫기 버튼 스타일 */
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

</style>