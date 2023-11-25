import { createRouter, createWebHistory } from 'vue-router'

// vite中的环境变量import.meta.env.BASE_URL, 就是vite.config.js中的base
const router = createRouter({
  // Web,不带井号
  history: createWebHistory(),
  routes: [
    { path: '/login', component: () => import('@/views/login/LoginPage.vue') },
    {
      path: '/',
      component: () => import('@/views/layout/LayoutContainer.vue'),
      redirect: 'home',
      children: [
        {
          path: '/home',
          component: () => import('@/views/layout/HomePage.vue')
        },
        {
          path: 'recruit/info',
          component: () => import('@/views/recruit/RecruitInfo.vue')
        },
        {
          path: 'job/info',
          component: () => import('@/views/job/JobInfo.vue')
        }
      ]
    },
    {
      path: '/user',
      component: () => import('@/views/user/UserContainer.vue'), // 新增的 UserLayoutContainer.vue
      redirect: '/user/profile',
      children: [
        {
          path: 'profile',
          component: () => import('@/views/user/UserProfile.vue')
        },
        {
          path: 'resume',
          component: () => import('@/views/user/UserResume.vue')
        },
        {
          path: 'avatar',
          component: () => import('@/views/user/UserAvatar.vue')
        },
        {
          path: 'password',
          component: () => import('@/views/user/UserPassword.vue')
        },
        {
          path: 'recruit',
          component: () => import('@/views/recruit/RecruitManage.vue')
        },
        {
          path: 'job',
          component: () => import('@/views/job/JobManage.vue')
        }
      ]
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    // 如果有保存的位置，则滚动到该位置
    console.log(savedPosition, 'savedPosition')
    if (savedPosition) {
      return savedPosition
    } else {
      // 否则滚动到页面顶部
      return { top: 0 }
    }
  }
})

export default router
