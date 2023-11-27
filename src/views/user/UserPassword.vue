<script setup>
import { ref } from 'vue'
import { updateUserPasswordService } from '@/api/user.js'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'
const pwdForm = ref({
  oldPwd: '',
  newPwd: '',
  rePwd: ''
})
const formRef = ref()

const checkOldSame = (rule, value, cb) => {
  if (value === pwdForm.value.oldPwd) {
    cb(new Error('原密码和新密码不能一样!'))
  } else {
    cb()
  }
}

const checkNewSame = (rule, value, cb) => {
  if (value !== pwdForm.value.newPwd) {
    cb(new Error('新密码和确认再次输入的新密码不一样!'))
  } else {
    cb()
  }
}
const rules = {
  // 原密码
  oldPwd: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码长度必须是6-15位的非空字符串',
      trigger: 'blur'
    }
  ],
  // 新密码
  newPwd: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码长度必须是6-15位的非空字符串',
      trigger: 'blur'
    },
    { validator: checkOldSame, trigger: 'blur' }
  ],
  // 确认新密码
  rePwd: [
    { required: true, message: '请再次确认新密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码长度必须是6-15位的非空字符串',
      trigger: 'blur'
    },
    { validator: checkNewSame, trigger: 'blur' }
  ]
}
const userStore = useUserStore()
const router = useRouter()
const onSubmit = async () => {
  console.log('提交')
  // 校验
  await formRef.value.validate()
  await await updateUserPasswordService(pwdForm.value)
  // 清空仓库数据
  userStore.removeToken()
  userStore.setUser({})
  // 提示
  ElMessage.success('修改成功,请重新登录')
  // 跳转到登录页
  router.push('/login')
}
const onReset = () => {
  pwdForm.value = {
    oldPwd: '',
    newPwd: '',
    rePwd: ''
  }
}
</script>
<template>
  <page-container title="修改密码">
    <el-row>
      <el-col :span="12">
        <el-form
          :model="pwdForm"
          :rules="rules"
          ref="formRef"
          label-width="100px"
          size="large"
        >
          <el-form-item label="原密码" prop="oldPwd">
            <el-input v-model="pwdForm.oldPwd" type="password"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPwd">
            <el-input v-model="pwdForm.newPwd" type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" prop="rePwd">
            <el-input v-model="pwdForm.rePwd" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="onSubmit" type="primary">修改密码</el-button>
            <el-button @click="onReset">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </page-container>
</template>
