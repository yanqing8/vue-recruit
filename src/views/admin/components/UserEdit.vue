<script setup>
import { ref } from 'vue'
import { userAddService, userResetPasswordService } from '@/api/user.js'
import { ElMessage } from 'element-plus'

const dialogVisible = ref(false)
const formRef = ref()
const formModel = ref({
  id: '',
  username: '',
  nickname: '',
  email: '',
  role: ''
})
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '长度在 6 到 15 个非空字符',
      trigger: 'blur'
    }
  ],
  nickname: [
    {
      pattern: /^\S{2,15}$/,
      message: '长度在 6 到 15 个非空字符',
      trigger: 'blur'
    }
  ],
  email: [{ type: 'email', message: '请输入合法邮箱', trigger: 'blur' }],
  role: [{ required: true, message: '请选择角色', trigger: 'change' }]
}

const onResetPassword = async () => {
  await ElMessageBox.confirm(
    '此操作将重置用户密码为123456, 是否继续?',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  )
  await userResetPasswordService(formModel.value.id)
  ElMessage.success('重置成功')
  dialogVisible.value = false
  emit('success')
}

// 子传父，通知父组件刷新列表
const emit = defineEmits(['success'])
const onSubmit = async () => {
  console.log(formModel.value)
  await formRef.value.validate()
  const isEdit = formModel.value.id
  await userAddService(formModel.value) // 具体添加操作由/user/add后端完成
  if (isEdit) {
    ElMessage.success('编辑成功')
  } else {
    ElMessage.success('添加成功')
  }
  dialogVisible.value = false
  emit('success')
}
const open = (row) => {
  dialogVisible.value = true
  formModel.value = { ...row }
  // 判断row是否是空对象
  if (Object.keys(row).length !== 0) {
    // 把formModel的role转换为字符串
    formModel.value.role = String(formModel.value.role)
  }
}

defineExpose({
  open
})
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    width="35%"
    :title="formModel.id ? '编辑用户' : '添加用户'"
  >
    <el-form
      :model="formModel"
      ref="formRef"
      :rules="rules"
      label-width="100px"
      style="padding-right: 30px"
    >
      <el-form-item label="用户名" prop="username">
        <el-input
          v-model="formModel.username"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="role">
        <el-select v-model="formModel.role" placeholder="设置身份">
          <el-option label="HR" value="1"></el-option>
          <el-option label="求职者" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input
          v-model="formModel.nickname"
          placeholder="请输入昵称"
        ></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="formModel.email" placeholder="请输入邮箱"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-row>
        <el-col :span="12" style="text-align: left">
          <span style="color: red; font-size: 12px"
            >注意：新增的用户密码默认为123456
          </span>
        </el-col>
        <el-col :span="12">
          <el-button
            @click="onResetPassword"
            type="danger"
            size="small"
            v-if="formModel.id"
            >重置用户密码</el-button
          >
          <el-button size="small" @click="dialogVisible = false"
            >取消</el-button
          >
          <el-button size="small" type="primary" @click="onSubmit()"
            >确定</el-button
          >
        </el-col>
      </el-row>
    </template>
  </el-dialog>
</template>
