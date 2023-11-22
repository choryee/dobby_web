import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import pwChangeView from "@/views/login/pwChangeView.vue";
import AdminInfoView from "@/views/login/AdminInfoView.vue";
import Logout from "@/views/login/Logout.vue";
import MemberJoin from "@/components/MemberJoin.vue";


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
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
    path: '/calendar',
    name: 'calendar',
    component: () => import('@/views/calendar/calendar.vue')
  },
  {
    path: '/dayoffs',
    name: 'DayoffListView',
    component: () => import('@/views/dayoff/DayoffListView.vue')
  },
  {
    path: '/dash-board',
    name: 'dashboard',
    component: () => import('@/views/dashBoard/DashBoardView.vue')
  },
  {
    path: '/dayoff',
    name: `dayoff`,
    component: ()=>import('@/views/dayoff/DayoffView.vue')
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
    path: '/test',
    name: 'test',
    component: Logout
  },
  {
    path: '/join',
    name: 'jkin',
    component: MemberJoin
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
