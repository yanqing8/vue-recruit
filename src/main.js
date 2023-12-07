import { createApp } from 'vue'
import App from './App.vue'
import pinia from '@/stores/index'
import router from './router'
import '@/assets/main.scss'

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
