<script setup>
import { jobGetCategorysService } from '@/api/job.js'
import { onMounted, ref } from 'vue'

defineProps({
  modeValue: {
    type: [Number, String],
    default: 0
  },
  width: {
    type: String
  }
})
const emit = defineEmits(['update:modeValue'])

const categoryList = ref([])
const getCategoryList = async () => {
  const res = await jobGetCategorysService()
  categoryList.value = res.data.data
}
onMounted(() => {
  getCategoryList()
})
</script>

<template>
  <el-select
    :modeValue="modeValue"
    @update:modeValue="emit('update:modeValue', $event)"
    :style="{ width }"
  >
    <el-option
      v-for="category in categoryList"
      :key="category.id"
      :label="category.categoryName"
      :value="category.id"
    ></el-option>
    <el-option label="c++" value="2"></el-option>
  </el-select>
</template>
