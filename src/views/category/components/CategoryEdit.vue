<script setup>
import { ref } from 'vue'
import { jobUpdateCategoryService, jobAddCategoryService } from '@/api/job.js'
const dialogVisible = ref(false)
const formRef = ref()
const formModel = ref({
  categoryName: ''
})
const rules = ref({
  categoryName: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    {
      pattern: /^\S{1,15}$/,
      message: '请输入1-15位的非空字符',
      trigger: 'blur'
    }
  ]
})

// 子传父，通知父组件刷新列表
const emit = defineEmits(['success'])

const onSubmit = async () => {
  await formRef.value.validate()
  const isEdit = formModel.value.id
  if (isEdit) {
    // 编辑
    await jobUpdateCategoryService(formModel.value)
    ElMessage.success('编辑成功')
  } else {
    // 添加
    await jobAddCategoryService(formModel.value)
    ElMessage.success('添加成功')
  }
  dialogVisible.value = false
  emit('success')
}

// 组件对外暴露一个方法，基于open传来的参数，区分是添加还是编辑
// open({}) 传来的是空，那么就是添加
// open({id, categoryName}) 传来的是对象，那么就是编辑,表单需要渲染
// open调用后，dialogVisible设置为true，弹出对话框
const open = (row) => {
  dialogVisible.value = true
  formModel.value = { ...row } // 添加就重置了表单内容，编辑就渲染了表单内容
}

// 向外暴露
defineExpose({
  open
})
</script>
<template>
  <el-dialog
    v-model="dialogVisible"
    :title="formModel.id ? '编辑分类' : '添加分类'"
    width="30%"
  >
    <el-form
      @submit.prevent
      ref="formRef"
      :model="formModel"
      :rules="rules"
      label-width="100px"
      style="padding-right: 30px"
    >
      <el-form-item label="分类名称" prop="categoryName">
        <el-input
          v-model="formModel.categoryName"
          placeholder="请输入分类名称"
          @keyup.enter="onSubmit()"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit()"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
