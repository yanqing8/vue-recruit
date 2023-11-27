import request from '@/utils/request'

// 上传图片
export const uploadImageService = (formData) => {
  return request.post('/upload', formData)
}
