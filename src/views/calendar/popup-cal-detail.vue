<template>
	<div class="pop_wrap" id="popSubIdManage" v-show="block">
		<div class="pop_section">
			<div class="pop_head">
				<h3 class="tit">Sub ID 권한 상세 관리</h3>
				<a href="#none" class="pop_btn_close" @click="closePopup">팝업 닫기</a>
			</div>
			<div class="pop_content">
				<div class="pop_inner">
					<div class="pop_txt">
						<dl class="group_header">
							<dt>제목</dt>
							<dd>{{ title }}</dd>
							<dt></dt>
<!--							<dd>{{ mainId }} ({{ ccomNm }})</dd>-->
						</dl>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'popup-cal-detail',
  props:{
    // opt:{
    //   type:Object,
    //   required:true
    // }
  },
  data(){
    return {
      block:false,
      title: ''
    }
  },
  computed:{
    message(){

    }
  },
  methods:{
    show(param){
      this.block=true;
      this.title=param;
      console.log(' param>>>', param);
    }
  }
}
</script>
