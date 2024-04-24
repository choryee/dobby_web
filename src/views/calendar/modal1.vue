<template>
  <div class="modal-wrap" v-show="modalOpened" >
    <div class="modal-container"  @click.stop="">

      <!--  content  -->

      제&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;목 :
      <input type="text" v-model="modalInfo.title" @change="changingTitle"><br/>
      시작일시 : <input type="text" v-model="modalInfo.startStr"><br/>
     title: {{getModalInfo.title}}<br/>
     start: {{getModalInfo.start}}<br/>

      <div class="modal-btn">
        <button type="button" class="btn btn-outline-primary" @click="modalClose">닫기</button>
        <button type="button" class="btn btn-outline-secondary" @click="showData">확인</button>
      </div>
    </div>
  </div>
</template>

<script>
//import modal from "bootstrap/js/src/modal";
import modal from '@/views/calendar/modal.vue'

export default {
  components: modal,
  props: {
    modalOpened: {
      type: Boolean,
      required: true
    },
    modalInfo: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      getModalInfo1: {
        title: this.modalInfo.title,
        start: this.modalInfo.start
      },
      // modalStart:this.changingDate( 'Wed Apr 17 2024 00:00:00 GMT+0900' )
      // modalStart:this.changingDate( 'Wed Apr 17 2024 00:00:00 GMT+0900' )
    }
  },
  computed: {
    getModalInfo() {
      return {
        title: this.modalInfo.title,
        start: this.changingDate(this.modalInfo.start)
      }
    }
  },

    methods: {
      showData() {
        console.log(' getModalInfo.title >>>', this.getModalInfo.title);
        console.log(' getModalInfo.start >>>', this.getModalInfo.start);
      },
      modalClose() {
        // console.log('modalClose>>>', this.getModalInfo.title);

        this.$emit('update-modalOpened', {emitModal: false}); // 부모 컴포넌트로 이벤트 발생
      },
      changingDate(dateParam) {
        console.log('dateParam:', dateParam);

        if (typeof dateParam === 'string') {
          const date = new Date(dateParam);
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const day = String(date.getDate()).padStart(2, '0');

          return `${year}-${month}-${day}`;
        } else {
          return dateParam; // 문자열이 아닌 경우 그대로 반환
        }
      },
    },
  watch: {
    modalInfo: {
      handler(newVal, oldVal) {
        // modalInfo가 변경될 때마다 getModalInfo를 다시 계산합니다.
        this.getModalInfo = {
          title: newVal.title,
          start: this.changingDate(newVal.startStr)
        };
      },
      deep: true, // 객체의 하위 속성도 감시합니다.
      immediate: true // 초기 값에서도 감시합니다.
    }
  },

}

</script>
<style>
/* dimmed */
.modal-wrap {
  position: fixed;
  z-index: 9999; /* 다른 요소들보다 위에 표시되도록 높은 값으로 설정 */
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
  background: aqua;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
}
</style>