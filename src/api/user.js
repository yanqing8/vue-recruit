import request from '@/utils/request'
// 注册接口application/x-www-form-urlencoded格式
export const userRegisterService = (registerData) => {
  const params = new URLSearchParams()
  for (let key in registerData) {
    params.append(key, registerData[key])
  }
  return request.post('/user/register', params)
}
// 登录接口application/x-www-form-urlencoded格式
export const userLoginService = (loginData) => {
  const params = new URLSearchParams()
  for (let key in loginData) {
    params.append(key, loginData[key])
  }
  return request.post('/user/login', params)
}

// 获取用户信息
export const userInfoService = () => {
  return request.get('/user/userInfo')
}

// 更新用户信息
export const updateUserInfoService = ({ id, username, nickname, email }) => {
  return request.put('/user/update', { id, username, nickname, email })
}

// 修改头像
export const updateUserAvatarService = (imageUrl) => {
  const params = new URLSearchParams()
  params.append('avatarUrl', imageUrl)
  return request.patch('/user/updateAvatar', params)
}

// 修改密码application/json数据格式
export const updateUserPasswordService = (passwordData) => {
  return request.patch('user/updatePwd', passwordData)
}
