import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import pwChangeView from "@/views/login/pwChangeView.vue";
import AdminInfoView from "@/views/login/AdminInfoView.vue";


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
<<<<<<< HEAD
  {
    path: '/holiday-work',
    name: "holidayWork",
    component: () => import('@/views/holidayWork/HolidayWorkView.vue')
  },
  {
    path: '/calendar',
    name: 'calendar',
    component: () => import('@/views/calendar/calendar.vue')
=======
  { path: '/adminInfo',
    name: 'adminInfo',
    component: AdminInfoView
  },
  { path: '/pw-change',
    name: 'pw-change',
    component: pwChangeView
>>>>>>> feature/#5
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
