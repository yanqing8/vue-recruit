import { createRouter, createWebHistory } from 'vue-router'

// vite中的环境变量import.meta.env.BASE_URL, 就是vite.config.js中的base
const router = createRouter({
  // Web,不带井号
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', component: () => import('@/views/login/LoginPage.vue') },
    {
      path: '/',
      component: () => import('@/views/layout/LayoutContainer.vue'),
      redirect: '/recruit/info',
      children: [
        {
          path: '/recruit/info',
          component: () => import('@/views/recruit/RecruitInfo.vue')
        },
        {
          path: '/recruit/manage',
          component: () => import('@/views/recruit/RecruitManage.vue')
        },
        {
          path: '/job/info',
          component: () => import('@/views/job/JobInfo.vue')
        },
        {
          path: '/job/manage',
          component: () => import('@/views/job/JobManage.vue')
        },
        {
          path: '/user/profile',
          component: () => import('@/views/user/UserProfile.vue')
        },
        {
          path: '/user/avatar',
          component: () => import('@/views/user/UserAvatar.vue')
        },
        {
          path: '/user/password',
          component: () => import('@/views/user/UserPassword.vue')
        }
      ]
    }
  ]
})

export default router
