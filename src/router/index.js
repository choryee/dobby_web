import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import pwChangeView from "@/views/login/pwChangeView.vue";
import AdminInfoView from "@/views/login/AdminInfoView.vue";
import Logout from "@/views/login/Test.vue";
import MemberJoin from "@/views/login/MemberJoin.vue";
import MemberLogin from "@/views/login/MemberLogin.vue";


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: `/test`,
    name: "testView1",
    component: ()=> import(`@/views/test/testView1.vue`),
  },
  {
    path: '/ex/network',
    name: 'NetworkEx',
    component: () => import('@/views/initEx/NetworkEx')
  },
  {
    path: '/ex/utils',
    name: 'UtilsEx',
    component: ()=>import('@/views/initEx/UtilsEx.vue')
  },

  {
    path: '/holiday-work',
    name: "holidayWork",
    component: () => import('@/views/holidayWork/HolidayWorkView.vue')
  },
  {
    path: '/dayoff/', // 개인 연차정보조회
    name: `insertDayoff`,
    component: ()=>import('@/views/dayoff/DayoffView.vue')
  },
  {
    path: '/dayoffs', // 달력?
    name: 'DayoffListView',
    component: () => import('@/views/dayoff/DayoffListView.vue')
  },
  {
    path: '/dash-board',
    name: 'dashboard',
    component: () => import('@/views/dashBoard/DashBoardView.vue')
  },

  {
    path: '/dayoff/:employeeNo',
    name: `dayoff`,
    component: ()=>import('@/views/dayoff/DayoffView.vue')
  },
  {
    path: '/dayoff-setting',
    name: `dayOffDefaultSetting`,
    component: ()=>import('@/views/dayoff/DayOffSettingView.vue')
  },

  {
    path: '/pattern',
    name: 'pattern',
    component: ()=>import('@/views/calendarPattern/CalendarPatternView.vue')
  },
  {
    path: '/dayofflisttable',
    name: 'dayofflisttable',
    component: ()=>import('@/views/dayoff/DayoffListTable.vue')
  },
  { path: '/adminInfo',
    name: 'adminInfo',
    component: AdminInfoView
  },
  {
    path: '/pw-change',
    name: 'pw-change',
    component: pwChangeView
  },

  {
    path: '/join',
    name: 'join',
    component: MemberJoin
  },
  {
    path: `/login`,
    name: 'login',
    component: ()=> import(`@/views/login/LoginView.vue`)
  },
  {
    path: `/testHome`,
    name: "testHome",
    component: ()=> import(`@/views/index/Index.vue`),
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
