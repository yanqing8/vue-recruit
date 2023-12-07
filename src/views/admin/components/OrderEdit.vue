<script setup>
import { ref } from 'vue'
import { goodsUpdateOrderState } from '@/api/goods.js'

const dialogVisible = ref(false)
const slelectJobList = ref([])
const formModel = ref({
  state: ''
})

// 子传父，通知父组件刷新列表
const emit = defineEmits(['success'])
const onSubmit = async () => {
  // 把slelectJobList.value里面的id取出来，存入数组
  await goodsUpdateOrderState(slelectJobList.value, formModel.value.state)
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
          <el-option label="全部" value=""></el-option>
          <el-option
            label="待支付"
            value="待支付"
            style="color: rgb(198, 129, 0)"
          ></el-option>
          <el-option
            label="已支付待审核"
            value="已支付待审核"
            style="color: rgb(2, 89, 2)"
          ></el-option>
          <el-option
            label="未支付"
            value="未支付"
            style="color: rgb(151, 2, 2)"
          ></el-option>
          <el-option
            label="已通过"
            value="已通过"
            style="color: green"
          ></el-option>
          <el-option
            label="未通过"
            value="未通过"
            style="color: red"
          ></el-option>
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
