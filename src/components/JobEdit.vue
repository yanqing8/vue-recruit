<script setup>
import { uploadImageService } from '@/api/file.js'
import {
  jobAddRecuitmentService,
  jobUpdateRecuitmentService
} from '@/api/job.js'
import { nextTick, ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

// 控制抽屉的显示和隐藏
const visibleDrawer = ref(false)
const formRef = ref()
const props = defineProps({
  type: {
    tyep: Number,
    default: 0
  }
})

const rules = {
  title: [
    { required: true, message: '请输入标题', trigger: 'blur' },
    {
      pattern: /^\S{2,20}$/,
      message: '请输入2到20个非空字符',
      trigger: 'blur'
    }
  ],
  address: [
    { required: true, message: '请输入地址', trigger: 'blur' },
    {
      pattern: /^\S{2,20}$/,
      message: '请输入2到20个非空字符',
      trigger: 'blur'
    }
  ],
  payMin: [
    { required: true, message: '请输入最低薪资', trigger: 'blur' },
    {
      pattern: /^\d{1,15}$/,
      message: '请输入不超过15位数的整数',
      trigger: 'blur'
    }
  ],
  payMax: [
    { required: true, message: '请输入最低薪资', trigger: 'blur' },
    {
      pattern: /^\d{1,15}$/,
      message: '请输入不超过15位数的整数',
      trigger: 'blur'
    }
  ],
  company: [
    { required: true, message: '请输入公司名称', trigger: 'blur' },
    {
      pattern: /^\S{2,20}$/,
      message: '请输入2到20个非空字符',
      trigger: 'blur'
    }
  ],
  categoryId: [{ required: true, message: '请选择分类', trigger: 'blur' }],
  content: [{ required: true, message: '请输入详情', trigger: 'blur' }]
}

// 准备数据
const formModel = ref({
  title: '', // 标题
  address: '', // 地址
  payMin: '', // 薪资最小值
  payMax: '', // 薪资最大值
  company: '', // 公司
  condition: [], // 条件
  content: '', // 内容
  tag: [], // 标签
  state: 0, // 状态
  type: 0,
  imgUrl: '', // 图片URL
  categoryId: '' // 类别ID
})
const imageUrl = ref('') // 图片URL
const imageFile = ref() // 图片文件
const onUploadFile = (file) => {
  // 生成url
  imageUrl.value = URL.createObjectURL(file.raw)
  // 保存文件
  imageFile.value = file.raw
}
// 条件
const currentConditions = ref([])
const currentCondition = ref('')
const onAddCondition = () => {
  if (currentCondition.value) {
    currentConditions.value.push(currentCondition.value)
    currentCondition.value = ''
  }
}
const onRemoveCondition = (index) => {
  currentConditions.value.splice(index, 1)
}

// 标签
const currentTags = ref([])
const currentTag = ref('')
const onAddTag = () => {
  if (currentTag.value) {
    currentTags.value.push(currentTag.value)
    currentTag.value = ''
  }
}
const onRemoveTag = (index) => {
  currentTags.value.splice(index, 1)
}

// 提交
const emit = defineEmits(['success'])
const onSubmit = async () => {
  // 把条件和标签的数据同步到formModel
  formModel.value.condition = currentConditions.value
  formModel.value.tag = currentTags.value
  formModel.value.type = props.type
  // 校验
  await formRef.value.validate()
  // 提交表单
  if (formModel.value.id) {
    // 编辑
    if (imageFile.value) {
      // 用户可能没有修改图片，所以要判断一下
      const res = await uploadImageService(imageFile.value)
      formModel.value.imgUrl = res.data.data
    }
    await jobUpdateRecuitmentService(formModel.value)
    ElMessage.success('编辑成功')
    emit('success', 'update')
  } else {
    // 添加
    if (!imageFile.value) {
      ElMessage.error('请上传图片')
      return
    }
    const res = await uploadImageService(imageFile.value)
    formModel.value.imgUrl = res.data.data

    await jobAddRecuitmentService(formModel.value)
    ElMessage.success('添加成功')
    // 通知父组件，添加成功了
    emit('success', 'add')
  }
  visibleDrawer.value = false
}

// 组件对外暴露一个方法，基于open传来的参数，区分是添加还是编辑
// open({}) 传来的是空，那么就是添加
// open({id, categoryName}) 传来的是对象，那么就是编辑,表单需要渲染
const editorRef = ref()
const open = (row) => {
  visibleDrawer.value = true
  // 重置图片、条件、标签、富文本
  imageUrl.value = ''
  imageFile.value = ''
  currentConditions.value = []
  currentCondition.value = ''
  currentTags.value = []
  currentTag.value = ''
  // 使用nextTick重置富文本
  nextTick(() => {
    editorRef.value.setHTML('')
  })
  formModel.value = { ...row } // 添加就重置了表单内容，编辑就渲染了表单内容
  if (row.id) {
    // 编辑
    // 把条件和标签的数据同步到currentConditions和currentTags
    // 要解决row.condition和row.tag里的空串，因为是空串的话会显示不好看。
    // 1. 过滤掉空串
    // 2. 把空串替换成null
    currentConditions.value = row.condition.filter((item) => item)
    currentTags.value = row.tag.filter((item) => item)
    // 设置图片
    imageUrl.value = row.imgUrl
    // 设置富文本
    nextTick(() => {
      editorRef.value.setHTML(row.content)
    })
  }
}
defineExpose({
  open
})
</script>

<template>
  <el-drawer
    v-model="visibleDrawer"
    :title="formModel.id ? '编辑岗位信息' : '添加岗位信息'"
    direction="rtl"
    size="50%"
  >
    <!-- 表单 -->
    <el-form
      :rules="rules"
      :model="formModel"
      ref="formRef"
      label-width="100px"
    >
      <el-form-item label="职位标题" prop="title">
        <el-input v-model="formModel.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="职位类别" prop="categoryId">
        <category-select
          v-model="formModel.categoryId"
          width="100%"
        ></category-select>
      </el-form-item>
      <el-form-item label="工作地址" prop="address">
        <el-input
          v-model="formModel.address"
          placeholder="请输入地址"
        ></el-input>
      </el-form-item>
      <el-form-item label="薪资区间" required>
        <el-row :gutter="20">
          <el-col :span="11">
            <el-form-item prop="payMin">
              <el-input
                v-model="formModel.payMin"
                label="最低薪资"
                placeholder="最低薪资单位k"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col class="text-center" :span="2">
            <span class="text-gray-500">-</span>
          </el-col>
          <el-col :span="11">
            <el-form-item prop="payMax">
              <el-input
                v-model="formModel.payMax"
                label="最高薪资"
                placeholder="最高薪资单位k"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="公司名称" prop="company">
        <el-input
          v-model="formModel.company"
          placeholder="请输入公司名称"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="条件"
        prop="condition"
        style="display: flex; flex-wrap: wrap"
      >
        <div style="width: 100%">
          <el-tag
            v-for="(item, index) in currentConditions"
            :key="index"
            closable
            @close="onRemoveCondition(index)"
          >
            {{ item }}
          </el-tag>
        </div>
        <div>
          <span @keyup.enter="onAddCondition()">
            <el-input v-model="currentCondition"></el-input>
          </span>
          <el-button
            @click="onAddCondition()"
            type="primary"
            size="small"
            :icon="Plus"
          >
            添加
          </el-button>
        </div>
      </el-form-item>

      <el-form-item
        label="标签"
        prop="tag"
        style="display: flex; flex-wrap: wrap"
      >
        <div style="width: 100%">
          <el-tag
            v-for="(item, index) in currentTags"
            :key="index"
            closable
            type="success"
            @close="onRemoveTag(index)"
          >
            {{ item }}
          </el-tag>
        </div>
        <div>
          <span @keyup.enter="onAddTag()">
            <el-input v-model="currentTag"></el-input>
          </span>
          <el-button
            @click="onAddTag()"
            type="primary"
            size="small"
            :icon="Plus"
          >
            添加
          </el-button>
        </div>
      </el-form-item>

      <el-form-item label="信息封面" prop="imgUrl">
        <el-upload
          class="avatar-uploader"
          :auto-upload="false"
          :show-file-list="false"
          :on-change="onUploadFile"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="详细内容" prop="content">
        <div class="editor">
          <quill-editor
            ref="editorRef"
            v-model:content="formModel.content"
            content-type="html"
            theme="snow"
          ></quill-editor>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSubmit()" type="primary">发布</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>
<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 178px;
      height: 178px;
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
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}
.editor {
  width: 100%;
  :deep(.ql-editor) {
    min-height: 250px;
  }
}
</style>
