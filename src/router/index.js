import { createRouter, createWebHistory } from 'vue-router'

// vite中的环境变量import.meta.env.BASE_URL, 就是vite.config.js中的base
const router = createRouter({
  // Web,不带井号
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: []
})

export default router
