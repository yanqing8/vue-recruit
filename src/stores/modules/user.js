import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userInfoService } from '@/api/user.js'

// 用户模块 token setToken removeToken
export const useUserStore = defineStore(
  'recruit-user',
  () => {
    const token = ref('')
    const setToken = (val) => {
      token.value = val
    }
    const removeToken = () => {
      token.value = ''
    }

    const user = ref({})
    const getUser = async () => {
      const res = await userInfoService()
      user.value = res.data.data
    }
    const setUser = (val) => {
      user.value = val
    }
    return {
      token,
      setToken,
      removeToken,
      user,
      getUser,
      setUser
    }
  },
  {
    persist: true
  }
)
