import axios from 'axios'
import { useUserStore } from '@/stores'
import { ElMessage } from 'element-plus'
import router from '@/router'
const baseURL = '/api'

const instance = axios.create({
  baseURL,
  timeout: 5000
})

//请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 携带token
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers.Authorization = userStore.token
    }
    return config
  },
  (err) => Promise.reject(err)
)

// 响应拦截器
instance.interceptors.response.use(
  (res) => {
    if (res.data.code == 0) {
      return res
    }
    // 处理业务失败,给错误提示，抛出错误
    console.log(res.data.message)
    ElMessage.error(res.data.message || '服务异常')
    return Promise.reject(res.data)
  },
  (err) => {
    // 权限不足，token过期，跳转登录页
    if (err.response?.status === 401) {
      ElMessage.error('您还未登录或您的登录已过期，请登录')
      // 移除token
      const userStore = useUserStore()
      if (userStore.token) userStore.removeToken()
      router.push('/login')
    } else {
      // 错误的默认情况
      ElMessage.error(err.response.data.message || '服务异常')
    }
    return Promise.reject(err)
  }
)

export default instance
export { baseURL }
