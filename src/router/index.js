import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores'
import { ElMessage } from 'element-plus'

// vite中的环境变量import.meta.env.BASE_URL, 就是vite.config.js中的base
const router = createRouter({
  // Web,不带井号
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      component: () => import('@/views/login/LoginPage.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/',
      component: () => import('@/views/layout/LayoutContainer.vue'),
      redirect: 'home',
      meta: { requiresAuth: false },
      children: [
        {
          path: '/home',
          component: () => import('@/views/layout/HomePage.vue'),
          meta: { requiresAuth: false }
        },
        {
          path: '/recruit/info',
          component: () => import('@/views/recruit/RecruitInfo.vue'),
          meta: { requiresAuth: false }
        },
        {
          path: '/job/info',
          component: () => import('@/views/job/JobInfo.vue'),
          meta: { requiresAuth: false }
        },
        {
          path: '/details/:id?',
          component: () => import('@/views/details/DetailsPage.vue'),
          meta: { requiresAuth: false }
        }
      ]
    },
    {
      path: '/user',
      component: () => import('@/views/user/UserContainer.vue'), // 新增的 UserLayoutContainer.vue
      redirect: '/user/profile',
      meta: { requiresAuth: true },
      children: [
        {
          path: 'profile',
          component: () => import('@/views/user/UserProfile.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'resume',
          component: () => import('@/views/user/UserResume.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'avatar',
          component: () => import('@/views/user/UserAvatar.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'password',
          component: () => import('@/views/user/UserPassword.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'member',
          component: () => import('@/views/user/UserMember.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'recruit',
          component: () => import('@/views/recruit/RecruitManage.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'job',
          component: () => import('@/views/job/JobManage.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'category',
          component: () => import('@/views/category/JobCategory.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'list',
          component: () => import('@/views/admin/UserManage.vue'),
          meta: { requiresAuth: true, requiresAdmin: true }
        },
        {
          path: 'audit',
          component: () => import('@/views/admin/AuditManage.vue'),
          meta: { requiresAuth: true, requiresAdmin: true }
        },
        {
          path: 'order',
          component: () => import('@/views/admin/OrderManage.vue'),
          meta: { requiresAuth: true, requiresAdmin: true }
        },
        {
          path: 'picture',
          component: () => import('@/views/admin/PictureManage.vue'),
          meta: { requiresAuth: true, requiresAdmin: true }
        }
      ]
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    // 如果有保存的位置，则滚动到该位置
    if (savedPosition) {
      return savedPosition
    } else {
      // 否则滚动到页面顶部
      return { top: 0 }
    }
  }
})

// 路由守卫
router.beforeEach((to) => {
  const userStore = useUserStore()
  // 如果没有token, 且访问的是需要登录的页面, 则跳转到登录页
  if (!userStore.token && to.meta.requiresAuth) {
    ElMessage.error('请先登录')
    return '/login'
  }
  // 还有不是管理员访问到管理员的路由，需要拦截
  if (userStore.user.role !== 0 && to.meta.requiresAdmin) {
    ElMessage.error('您没有权限访问该页面')
    return '/user'
  }
  return true
})

export default router
