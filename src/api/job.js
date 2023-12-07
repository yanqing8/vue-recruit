import request from '@/utils/request'

// 获取职位分类列表
export const jobGetCategorysService = () => {
  return request.get('/category/list')
}

// 添加职位分类
export const jobAddCategoryService = (data) => {
  return request.post('/category', data)
}

// 更新职位分类
export const jobUpdateCategoryService = (data) => {
  console.log(data)
  return request.put('/category', data)
}

// 删除职位分类
export const jobDeleteCategoryService = (id) => {
  return request.delete('/category', { params: { id } })
}

// 获取招聘职位列表
export const jobGetRecuitmentsService = (params) => {
  return request.get('/recruit/list', { params })
}

// 添加招聘职位信息
export const jobAddRecuitmentService = (data) => {
  return request.post('/recruit', data)
}

// 更新招聘职位信息
export const jobUpdateRecuitmentService = (data) => {
  return request.put('/recruit', data)
}

// 更新审核状态
export const jobUpdateStatusService = (ids, state) => {
  const idsStr = ids.join(',')
  return request.put('/recruit/state', null, { params: { ids: idsStr, state } })
}
// 删除招聘职位信息
export const jobDeleteRecuitmentService = (ids) => {
  const idsStr = ids.join(',')
  return request.delete('/recruit', { params: { ids: idsStr } })
}
