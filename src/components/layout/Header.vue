<template>

    <nav class="sb-topnav navbar navbar-expand navbar-dark bg-default default-nav">
      <!-- Navbar Brand-->
      <a class="navbar-brand ps-3" href="/"><img src="../../assets/images/Logo.png" alt="Dobby"></a>
      <!-- Sidebar Toggle-->
      <button class="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i
          class="fas fa-bars"></i></button>
      <div class="input-group">
      </div>
      <!-- Navbar-->
      <ul class="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown"
             aria-expanded="false"><i class="fas fa-user fa-fw"></i></a>
          <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
            <li><a class="dropdown-item" href="#!">Settings</a></li>
            <li><a class="dropdown-item" href="#!">Activity Log</a></li>
            <li><a class="dropdown-item" href="/join" >회원가입</a></li>
            <li>
              <hr class="dropdown-divider"/>
            </li>
            <li><a class="dropdown-item" href="#" @click="logout">로그아웃</a></li>
          </ul>
        </li>
      </ul>
    </nav>

</template>

<script>

import axios from "axios";

export default {
  name: 'Header',

  methods:{
    logout(){
      localStorage.removeItem('Authorization');
      //alert('로그아웃 되었습니다.');
      this.$router.push({ name: 'home' });
    }
  }
}
</script>

<style>
.bg-default{
    --bs-bg-opacity: 1;
    background-color: rgba(var(--bs-defalt-rgb), var(--bs-bg-opacity)) !important;
}
.navbar-brand img{
  width: 60%;
  height: 60%;
}
</style>