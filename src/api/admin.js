import request from '@/utils/request'

// 获取用户列表
export const adminGetUsersService = (params) => {
  return request.get('/user/userList', { params })
}

// 批量删除用户
export const adminDeleteUsersService = (ids) => {
  const queryParams = ids.join(',')
  return request.delete(`/user?ids=${queryParams}`)
}
