<script setup>
import { Edit, Delete, Search } from '@element-plus/icons-vue'
import { onMounted, ref } from 'vue'
import { adminGetUsersService, adminDeleteUsersService } from '@/api/admin.js'
import UserEdit from './components/UserEdit.vue'
const loading = ref(false)
const userList = ref([])
const params = ref({
  pageNum: 1,
  pageSize: 5,
  role: '',
  otherParam: ''
})
const total = ref(0)
const getUserList = async () => {
  console.log(params.value)
  loading.value = true
  const res = await adminGetUsersService(params.value)
  userList.value = res.data.data.items
  total.value = res.data.data.total
  loading.value = false
}
onMounted(() => {
  getUserList()
})
const onSearch = () => {
  params.value.page = 1
  getUserList()
}
const onReset = () => {
  params.value.pageNum = 1
  params.value.role = ''
  params.value.otherParam = ''
  getUserList()
}
const onDeleteUserList = async (userId) => {
  // 提示
  await ElMessageBox.confirm('此操作将永久删除所选用户, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
  const ids = []
  if (userId) {
    // 用户点击行中的操作删除按钮
    ids.push(userId)
  } else {
    // 用户选择多选框删除
    // 单独把selectUserList的id取出来
    selectUserList.value.forEach((item) => {
      ids.push(item.id)
    })
  }
  if (ids.length === 0) {
    ElMessage.warning('请选择要删除的用户')
    return
  }
  await adminDeleteUsersService(ids)
  getUserList()
  // 提示
  ElMessage.success('删除成功')
}
const userRef = ref()
const onEditUser = (row) => {
  userRef.value.open(row)
}
const onAddUser = () => {
  userRef.value.open({})
}

// 分页
const onSizeChange = (val) => {
  params.value.pageNum = 1
  params.value.pageSize = val
  getUserList()
}
const onCurrentChange = (val) => {
  params.value.pageNum = val
  getUserList()
}

const multipleTableRef = ref()
const selectUserList = ref([])
// 多选
const onSelectionChange = (val) => {
  selectUserList.value = val
}

// 反选
const toggleSelection = () => {
  // 把已经选择的取消选择，没有选择的选中
  userList.value.forEach((item) => {
    multipleTableRef.value.toggleRowSelection(item)
  })
}
// 检查能否选择
const checkSelectable = (row) => {
  return row.role !== 0
}
const onSuccess = () => {
  getUserList()
}
</script>

<template>
  <page-container title="用户管理">
    <template #extra>
      <el-button type="primary" @click="onAddUser()">添加用户</el-button>
    </template>
    <!-- 表单区域 -->
    <el-form inline :model="params">
      <el-form-item>
        <el-button type="primary" @click="toggleSelection()">反选</el-button>
      </el-form-item>
      <el-form-item label="角色">
        <el-select v-model="params.role" placeholder="请选择角色">
          <el-option label="管理员" value="0"></el-option>
          <el-option label="HR" value="1"></el-option>
          <el-option label="求职者" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="关键词">
        <el-input
          v-model="params.otherParam"
          placeholder="请输入关键词"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch()" :icon="Search"
          >搜索</el-button
        >
        <el-button @click="onReset()">重置</el-button>
        <el-button type="danger" @click="onDeleteUserList()"
          >删除所选项</el-button
        >
      </el-form-item>
    </el-form>
    <el-table
      ref="multipleTableRef"
      v-loading="loading"
      :data="userList"
      style="width: 100%"
      @selection-change="onSelectionChange"
    >
      <el-table-column
        type="selection"
        :selectable="checkSelectable"
        width="55"
      ></el-table-column>
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="nickname" label="昵称"></el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="role" label="角色">
        <template #default="{ row }">
          <span v-if="row.role === 0">管理员</span>
          <span v-else-if="row.role === 1">HR</span>
          <span v-else>求职者</span>
        </template>
      </el-table-column>
      <el-table-column prop="level" label="VIP等级"></el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="updateTime"
        label="更新时间"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="{ row }">
          <el-button-group>
            <el-button
              @click="onEditUser(row)"
              type="primary"
              :icon="Edit"
              :disabled="row.role === 0"
            />
            <el-button
              @click="onDeleteUserList(row.id)"
              type="danger"
              :icon="Delete"
              :disabled="row.role === 0"
            />
          </el-button-group>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="暂无数据"></el-empty>
      </template>
    </el-table>
    <!-- 分页区域 -->
    <el-pagination
      v-model:current-page="params.pageNum"
      v-model:page-size="params.pageSize"
      :page-sizes="[3, 5, 10, 20, 50]"
      small
      :background="true"
      layout="jumper,total, sizes, prev, pager, next"
      :total="total"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      style="margin-top: 20px; justify-content: flex-end"
    />
    <user-edit ref="userRef" @success="onSuccess"></user-edit>
  </page-container>
</template>
