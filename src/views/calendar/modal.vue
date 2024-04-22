<template>
  <div class="modal">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">날짜</p>
        <button class="delete" aria-label="close"></button>
      </header>
      <section class="modal-card-body">
        <textarea class="textarea" :placeholder="placeholder"></textarea>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success">{{ buttonMessage[0] }}</button>
        <button class="button">{{ buttonMessage[1] }}</button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      placeholder: "오늘 할 일을 적어주세요",
      buttonMessage: ["저장", "취소"],
    };
  },
};
</script>