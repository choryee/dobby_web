<template>
  <div class="modal-wrap" v-show="modalOpened" >
    <div class="modal-container"  @click.stop="">

      <!--  content  -->
      {{modalInfo.start}}<br/>
      {{getModalInfo}}<br/>
      제목 : <input type="text" v-model="modalInfo.title" @change="changingTitle"><br/>
      시작일시 : <input type="text" v-model="modalInfo.start">

      <div class="modal-btn">
        <button type="button" class="btn btn-outline-primary" @click="modalClose">닫기</button>
        <button type="button" class="btn btn-outline-secondary" @click="">확인</button>
      </div>
    </div>
  </div>
</template>

<script>
//import modal from "bootstrap/js/src/modal";
import modal from '@/views/calendar/modal.vue'
export default {
  components:modal,
  props:{
    modalOpened: {
      type: Boolean,
      required:true
    },
    modalInfo: {
      type: Object,
      required:true
    },
  },
  data(){
      return{
        getModalInfo:{
          title:this.modalInfo.title,
          start:this.modalInfo.start
        },
        // modalStart:this.changingDate( 'Wed Apr 17 2024 00:00:00 GMT+0900' )
        // modalStart:this.changingDate( 'Wed Apr 17 2024 00:00:00 GMT+0900' )
      }
  },
  methods: {
    modalClose() {
      console.log('modalClose>>>', );
      this.modalOpened = !this.modalOpened
      this.$emit('update-modalOpened', {emitModal:false}); // 부모 컴포넌트로 이벤트 발생
    },
    changingDate(dateParam) {
      console.log(' dateParam>>>', dateParam); //undefined
     // console.log('modalStart >>>', modalStart);
      if (typeof dateParam === 'string') {
        const date = new Date(dateParam);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
      } else {
        // dateParam이 문자열이 아닌 경우는 그대로 반환
        return dateParam;
      }
    },
  }
}
</script>
<style>
/* dimmed */
.modal-wrap {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
}
/* modal or popup */
.modal-container {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 200px;
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
}
</style>