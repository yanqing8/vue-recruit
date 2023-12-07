<script setup>
import { ref } from 'vue'
import { jobUpdateStatusService } from '@/api/job.js'

const dialogVisible = ref(false)
const slelectJobList = ref([])
const formModel = ref({
  state: ''
})

// 子传父，通知父组件刷新列表
const emit = defineEmits(['success'])
const onSubmit = async () => {
  // 把slelectJobList.value里面的id取出来，存入数组
  const ids = slelectJobList.value.map((item) => item.id)
  await jobUpdateStatusService(ids, formModel.value.state)
  ElMessage.success('设置审核成功')
  dialogVisible.value = false
  emit('success')
}

const open = (row) => {
  dialogVisible.value = true
  // 判断row是不是数组，如果是数组，就是批量审核，如果不是数组，就是单个审核
  if (Array.isArray(row)) {
    if (row.length === 0) {
      ElMessage.warning('请选择要审核的列表')
      dialogVisible.value = false
      return
    }
    slelectJobList.value = row
    formModel.value = { state: '' }
  } else {
    formModel.value = { ...row }
    // row.state是数字，需要转换成字符串
    formModel.value.state = row.state.toString()
    // 把row存入数组
    slelectJobList.value = [row]
  }
}

defineExpose({
  open
})
</script>

<template>
  <el-dialog v-model="dialogVisible" title="设置审核状态" width="30%">
    <el-form>
      <el-form-item label="设置审核状态">
        <el-select v-model="formModel.state">
          <!-- 设置待审核位黄色，审核通过绿色，未通过为红色 -->
          <el-option label="待审核" value="0" style="color: orange"></el-option>
          <el-option label="已发布" value="1" style="color: green"></el-option>
          <el-option label="未通过" value="2" style="color: red"></el-option>
        </el-select>
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
