<template>
  <div class="modal-wrap" v-show="modalOpened" >
    <div class="modal-container"  @click.stop="">
      {{modalInfo}}
      ...  <!--  content  -->

      <div class="modal-btn">
        <button @click="modalClose">닫기</button>
        <button @click="">확인</button>
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
      type: String,
      required:true
    },
  },
  data(){
      return{
        //modalOpened: false,
      }
  },
  methods: {
    modalClose() {
      console.log('modalClose>>>', );
      this.modalOpened = !this.modalOpened
      this.$emit('update-modalOpened', false); // 부모 컴포넌트로 이벤트 발생
    }
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
  width: 550px;
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
}
</style>