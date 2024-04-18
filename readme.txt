
*** escape-day-server의 readme.txt를 보라.

DayoffView.vue구조.
김준형(지급 연차: 6 [의무연차:] 사용연차: 5 남은연차: 1)

DayoffView.vue페이지는, 밑의 컴포넌트가 삽입된 형태임.240418
김준형(지급 연차: 6 [의무연차:] 사용연차: 5 남은연차: 1) <-- SimpleInfoTitle.vue
계정 정보 <-- ColumTable.vue
사원 정보 <-- ColumTable.vue
연차 정보 <-- TableComponent.vue


10강. Vue이벤트 5부, 01'02
SPA는 index.html에서 DOM형식으로 변환만 주고 있지, 화면페이지가 정말 넘어가지 않는다. 그 화면이 가진 모든 정보는
JS에 저장되어 있고, 화면이 새로고침이 되면, 그 정보($store에 저장한 것등.)가 모두 날라감.

MemberLogin.vue
this.$store.commit('setEmployeeNumber', this.user.employee_no);// store는 화면이 새로고침, 초기화 되버림.
그래서, 브라우저의 sessionStorage를 이용함.
sessionStorage.setItem('setUser', JSON.stringify(this.user));
--> 위 강의 뒤 부분보면, app.vue에 아예 sessionStorage걸어 논 것 보야.

JSON.stringify(this.user)는 this.user객체를 JSON(문자열)으로 바꾸는 것.
JSON.parse(객체) : JSON(문자열) - > (꺼내 쓸수 있는)객체로.

