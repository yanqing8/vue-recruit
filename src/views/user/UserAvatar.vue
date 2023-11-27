<script setup>
import { ref } from 'vue'
import { Plus, Upload } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores'
import { updateUserAvatarService } from '@/api/user.js'
import { uploadImageService } from '@/api/file.js'
// 基于store数据的初始值初始化imageUrl
const userStore = useUserStore()
const imageUrl = ref(userStore.user.userPic)
const imgFile = ref()
const uploadRef = ref()
const onUploadFile = (file) => {
  // 生成url
  imageUrl.value = URL.createObjectURL(file.raw)
  // 保存文件
  imgFile.value = file.raw
}
const submit = async () => {
  // 校验
  if (!imgFile.value) {
    ElMessage.error('请选择新图片')
    return
  }

  // 上传文件
  const formData = new FormData()
  formData.append('file', imgFile.value)
  const res = await uploadImageService(formData)
  console.log(res.data.data)
  await updateUserAvatarService(res.data.data)
  // 更新仓库数据
  userStore.getUser()
  // 提示
  ElMessage.success('修改成功')
}
</script>

<template>
  <page-container title="更换头像">
    <el-row>
      <el-col :span="12">
        <el-upload
          ref="uploadRef"
          class="avatar-uploader"
          :auto-upload="false"
          :show-file-list="false"
          :on-change="onUploadFile"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <img v-else src="@/assets/avatar.jpg" width="278" />
        </el-upload>
        <br />
        <el-button
          @click="uploadRef.$el.querySelector('input').click()"
          type="primary"
          :icon="Plus"
          size="large"
        >
          选择图片
        </el-button>
        <el-button @click="submit()" type="success" :icon="Upload" size="large">
          上传头像
        </el-button>
      </el-col>
    </el-row>
  </page-container>
</template>

<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 278px;
      height: 278px;
      display: block;
    }
    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }
    .el-upload:hover {
      border-color: var(--el-color-primary);
    }
    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 278px;
      height: 278px;
      text-align: center;
    }
  }
}
</style>
