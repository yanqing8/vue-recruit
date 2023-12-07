<script setup>
/**
 * 导入所需的模块和组件
 */
import { onMounted, ref } from 'vue'
import { jobGetCategorysService, jobDeleteCategoryService } from '@/api/job.js'
import { Delete, Edit } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores'
import CategoryEdit from './components/CategoryEdit.vue'

/**
 * 定义变量和引用
 */
const categoryList = ref([]) // 分类列表
const userStore = useUserStore() // 用户存储
const loading = ref(false) // 加载状态
const dialog = ref() // 对话框

/**
 * 获取分类列表
 */
const getCategoryList = async () => {
  loading.value = true
  const res = await jobGetCategorysService()
  categoryList.value = res.data.data
  loading.value = false
}

/**
 * 在组件挂载后执行获取分类列表的函数
 */
onMounted(() => {
  getCategoryList()
})

/**
 * 编辑分类
 * @param {Object} row - 要编辑的分类对象
 */
const onEditCategory = (row) => {
  console.log(row)
  dialog.value.open(row)
}

/**
 * 删除分类
 * @param {Object} row - 要删除的分类对象
 */
const onDeleteCategory = async (row) => {
  await ElMessageBox.confirm('此操作将永久删除该分类, 是否继续?', '提示', {
    type: 'warning',
    confirmButtonText: '确定',
    cancelButtonText: '取消'
  })
  await jobDeleteCategoryService(row.id)
  ElMessage.success('删除成功')
  getCategoryList()
}

/**
 * 添加分类
 */
const onAddCategory = () => {
  dialog.value.open({})
}

/**
 * 操作成功后刷新分类列表
 */
const onSuccess = () => {
  getCategoryList()
}
</script>

<template>
  <page-container title="职位类别">
    <template #extra>
      <el-button @click="onAddCategory()" type="primary">添加分类</el-button>
    </template>
    <el-table v-loading="loading" :data="categoryList" style="width: 100%">
      <el-table-column
        v-if="categoryList.length > 0"
        type="index"
        label="序号"
        width="100"
      ></el-table-column>
      <el-table-column
        v-if="categoryList.length > 0"
        prop="categoryName"
        label="分类名称"
      ></el-table-column>
      <el-table-column
        v-if="categoryList.length > 0"
        prop="updateTime"
        label="更新时间"
      ></el-table-column>
      <el-table-column
        v-if="categoryList.length > 0"
        label="操作"
        width="120"
        align="center"
      >
        <template #default="{ row }">
          <el-button-group>
            <!-- 根据row.createUser === userStore.user.id 是否禁用操作 -->
            <el-button
              @click="onEditCategory(row)"
              type="primary"
              :icon="Edit"
              :disabled="
                row.createUser !== userStore.user.id &&
                userStore.user.role !== 0
              "
            />
            <el-button
              @click="onDeleteCategory(row)"
              type="danger"
              :icon="Delete"
              :disabled="
                row.createUser !== userStore.user.id &&
                userStore.user.role !== 0
              "
            />
          </el-button-group>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="暂无数据"></el-empty>
      </template>
    </el-table>
    <category-edit ref="dialog" @success="onSuccess"></category-edit>
  </page-container>
</template>
