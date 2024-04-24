<template>
  <div class="modal-wrap" v-show="modalOpened" >
    <div class="modal-container" @click.stop="">

      <!-- content -->
      제목:
      <input type="text" v-model="getModalInfo.title" @change="changingTitle"><br/>
<!--      <input type="text" v-model="modalInfo.title" @change="changingTitle"><br/> props를 직접수정하려면 어렵다.-->
      시작일시:
<!--      <input type="text" v-model="modalInfo.startStr"><br/>-->
      <input type="text" v-model="getModalInfo.start "><br/>
      title: {{ getModalInfo.title }}<br/>
      start: {{ getModalInfo.start }}<br/>

      <div class="modal-btn">
        <button type="button" class="btn btn-outline-primary" @click="modalClose">닫기</button>
        <button type="button" class="btn btn-outline-secondary" @click="updateModal">수정</button>
      </div>
    </div>
  </div>
</template>

<script>
import modal from '@/views/calendar/modal.vue'

export default {
  components: { modal },
  props: {
    modalOpened: {
      type: Boolean,
      required: true
    },
    modalInfo: {
      type: Object,
      required: true
    }
  },
  data() {
    //오류는 getModalInfo가 읽기 전용(computed) 속성이기 때문에 발생합니다. computed 속성은 직접적으로 값을 할당할 수 없으며,
    // 읽기 전용으로만 동작합니다. 따라서 watch 속성에서 getModalInfo를 직접 수정하는 것은 불가능합니다.

    //해결 방법으로는 watch 속성을 사용하여 modalInfo가 변경될 때마다 getModalInfo를 업데이트하는 것입니다.
    // watch 속성에서 modalInfo를 감시하고, 변경될 때마다 getModalInfo를 계산하는 함수를 호출하여 값을 갱신합니다.
    return {
      getModalInfo: {} ,// 초기에 빈 객체로 설정
      userName:''
     // startDt:getModalInfo.start
    }
  },
  computed: {
    // computed 속성을 사용하지 않고 직접 계산하는 대신 watch 속성을 사용합니다.
  },
  methods: {
    getUserName(){
     return  this.getModalInfo.title.substring(1,4);
    },
    updateModal() {
      this.userName=this.getModalInfo.title.substring(1,4);

      console.log('getModalInfo.title:', this.getModalInfo.title);
      console.log('getModalInfo.start:', this.getModalInfo.start);
    },
    modalClose() {
      this.$emit('update-modalOpened', { emitModal: false });
    },
    changingDate(dateParam) {
      if (typeof dateParam === 'string') {
        const date = new Date(dateParam);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      } else {
        return dateParam;
      }
    },
    changingTitle() {
      // 제목이 변경될 때마다 부모 컴포넌트로 이벤트를 발생시킵니다.
      this.$emit('update-modalInfo', { title: this.modalInfo.title });
    }
  },
  watch: {
    // modalInfo가 변경될 때마다,  getModalInfo를 다시 계산합니다.
    modalInfo: {
      handler(newVal, oldVal) {

        this.getModalInfo = {
          title: newVal.title,
          start: this.changingDate(newVal.startStr)
        };
      },
      deep: true, // 객체의 하위 속성도 감시합니다.
      immediate: true // 초기 값에서도 감시합니다.
    }
  }
}
</script>


<style>
/* dimmed */
.modal-wrap {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
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
