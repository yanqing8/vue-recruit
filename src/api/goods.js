import request from '@/utils/request'

// 获取商品列表
export const goodsGetList = () => {
  return request.get('/goods/list')
}

// 下单
export const goodsAddOrder = (data) => {
  return request.post('/order/create', data)
}

// 查询订单
export const goodsGetOrder = (params) => {
  return request.get('/order', { params })
}

// 支付
export const goodsPay = (params) => {
  const form = document.createElement('form')
  form.method = 'POST'
  form.action = 'http://10.22.111.160:8080/alipay/pay'
  form.target = '_blank'

  for (const key in params) {
    const input = document.createElement('input')
    input.type = 'hidden'
    input.name = key
    input.value = params[key]
    form.appendChild(input)
  }

  document.body.appendChild(form)
  form.submit()
  document.body.removeChild(form)
}

// 查询订单列表
export const goodsGetOrderList = (params) => {
  return request.get('/order/list', { params })
}

// 更新订单状态
export const goodsUpdateOrderState = (ordersList, state) => {
  return request.put(`/order/state?state=${state}`, ordersList)
}
