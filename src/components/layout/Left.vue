<template>
  <div id="layoutSidenav_nav">
    <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
      <div class="sb-sidenav-menu">
        <div class="nav">
          <div class="sb-sidenav-menu-heading">Core</div>
          <router-link class="nav-link" style="text-decoration:none" to="/dash-board">
            대시보드
          </router-link>

          <router-link class="nav-link" style="text-decoration:none" to="/dayoffs">
          달력 연차사용내역조회
          </router-link>
          <router-link class="nav-link" style="text-decoration:none" to="/dayoff">
            개인 연차정보조회
          </router-link>
          <router-link class="nav-link" style="text-decoration:none" to="/dayofflisttable">
            전체 휴가 리스트 보기
          </router-link>

          <a class="nav-link collapsed" href="#"
             aria-expanded="false" aria-controls="collapsePages">
            <div class="sb-nav-link-icon"><i class="fas fa-book-open"></i></div>
            <router-link class="nav-link" style="text-decoration:none" to="/dayoff-setting">
              연차설정
            </router-link>
            <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
          </a>
          <div class="collapse" id="collapsePages" aria-labelledby="headingTwo" data-bs-parent="#sidenavAccordion">
          </div>

          <router-link class="nav-link" style="text-decoration:none" to="/holiday-work">
              <div class="sb-nav-link-icon"></div>
              휴일출근관리
          </router-link>


          <router-link  class="nav-link collapsed"  to="/pattern">
            <div class="sb-nav-link-icon"><i class="fas fa-columns"></i></div>
            캘린더 패턴 관리
            <div class="sb-sidenav-collapse-arrow"></div>
          </router-link>
          <router-link to="/adminInfo" class="nav-link">
            <div class="sb-nav-link-icon"><i class="fas fa-table"></i></div>
            관리자설정
          </router-link>

          <router-link class="nav-link" style="text-decoration:none" to="/test">
            테스트
          </router-link>


        </div>
      </div>
      <div class="sb-sidenav-footer">
        <div class="small">Logged in as:</div>
        엠그램
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Left',
}
</script>