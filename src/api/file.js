import request from '@/utils/request'

// 上传图片
export const uploadImageService = (file) => {
  const formData = new FormData()
  formData.append('file', file)
  return request.post('/upload', formData)
}
