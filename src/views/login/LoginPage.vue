<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { userRegisterService, userLoginService } from '@/api/user.js'
import { useUserStore } from '@/stores/index.js'
import { useRouter } from 'vue-router'
const route = useRoute()
const isRegister = ref(route.query.isRegister === 'true' ? true : false)
const form = ref()

const formModel = ref({
  username: '',
  password: '',
  rePassword: '',
  role: ''
})
// 规则
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '长度在 6 到 15 个非空字符',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^\S{6,20}$/,
      message: '长度在 6 到 20 个非空字符',
      trigger: 'blur'
    }
  ],
  rePassword: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^\S{6,20}$/,
      message: '长度在 6 到 20 个非空字符',
      trigger: 'blur'
    },
    {
      validator: (rule, value, callback) => {
        //  判断 value 和当前 form 中收集的 password 是否一致
        if (value !== formModel.value.password) {
          callback(new Error('两次输入密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  role: [{ required: true, message: '请选择角色', trigger: 'change' }]
}
// 注册
const register = async () => {
  // 注册成功成功之前先校验
  await form.value.validate()
  // console.log('开始注册请求', formModel.value)
  await userRegisterService(formModel.value)
  ElMessage.success('注册成功')
  // 跳转到登录页面
  isRegister.value = false
}

const userStore = useUserStore()
const router = useRouter()
// 登录
const login = async () => {
  // 登录成功成功之前先校验
  await form.value.validate()
  const res = await userLoginService(formModel.value)
  ElMessage.success('登录成功')
  // 保存用户信息token
  userStore.setToken(res.data.data)
  // 跳转到首页
  router.push('/')
}
</script>

<template>
  <el-row class="login-page">
    <el-col :span="12" class="bg"></el-col>
    <el-col :span="6" :offset="3" class="form">
      <el-card>
        <el-form
          :model="formModel"
          :rules="rules"
          ref="form"
          size="large"
          autocomplete="off"
          v-if="isRegister"
        >
          <el-form-item>
            <h1>注册</h1>
          </el-form-item>
          <el-form-item prop="username">
            <el-input
              v-model="formModel.username"
              :prefix-icon="User"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="formModel.password"
              :prefix-icon="Lock"
              type="password"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item prop="rePassword">
            <el-input
              v-model="formModel.rePassword"
              :prefix-icon="Lock"
              type="password"
              placeholder="请输入再次密码"
            ></el-input>
          </el-form-item>
          <el-form-item label="角色" prop="role">
            <el-select v-model="formModel.role" placeholder="请选择你的身份">
              <el-option label="HR" value="1"></el-option>
              <el-option label="求职者" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button
              @click="register()"
              class="button"
              type="primary"
              auto-insert-space
            >
              注册
            </el-button>
          </el-form-item>
          <el-form-item class="flex">
            <el-link type="info" :underline="false" @click="isRegister = false">
              ← 返回
            </el-link>
          </el-form-item>
        </el-form>
        <el-form
          :model="formModel"
          :rules="rules"
          ref="form"
          size="large"
          autocomplete="off"
          v-else
        >
          <el-form-item>
            <h1>登录</h1>
          </el-form-item>
          <el-form-item prop="username">
            <el-input
              v-model="formModel.username"
              :prefix-icon="User"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="formModel.password"
              name="password"
              :prefix-icon="Lock"
              type="password"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item class="flex">
            <div class="flex">
              <el-checkbox>记住我</el-checkbox>
              <el-link type="primary" :underline="false">忘记密码？</el-link>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button
              @click="login()"
              class="button"
              type="primary"
              auto-insert-space
              >登录</el-button
            >
          </el-form-item>
          <el-form-item class="flex">
            <el-link type="info" :underline="false" @click="isRegister = true">
              注册 →
            </el-link>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  background-color: #fff;
  .bg {
    position: relative;
    border-radius: 0 20px 20px 0;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(
        91,
        134,
        179,
        0.5
      ); /* 蓝色蒙版，可以根据需要调整颜色和透明度 */
      border-radius: inherit;
    }

    background:
      url('@/assets/login01.png') no-repeat 60% center / 700px auto,
      url('@/assets/logo01.png') no-repeat center / cover;
  }
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;
    .title {
      margin: 0 auto;
    }
    .button {
      width: 100%;
    }
    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
