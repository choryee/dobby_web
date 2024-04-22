import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// app.component('FullCalendar', FullCalendar); // FullCalendar 컴포넌트 등록
// app.use(dayGridPlugin); // dayGridPlugin 플러그인 사용
// app.use(interactionPlugin); // interactionPlugin 플러그인 사용

createApp(App)
    .use(store)
    .use(router)
    // .use(dayGridPlugin); // dayGridPlugin 플러그인 사용
    // .use(interactionPlugin); // interactionPlugin 플러그인 사용
    // .component('FullCalendar', FullCalendar); // FullCalendar 컴포넌트 등록
    .mount('#app');