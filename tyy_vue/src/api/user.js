import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/base/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}
export function webLogin(jsonForm) {
  return request({
    url: '/auth/webLogin',
    method: 'post',
    data: jsonForm
  })
}
export function getUserInfo() {
  return request({
    url: '/api/user/getUserInfo',
    method: 'post',
    data: {}
  })
}

export function getUserType() {
  return request({
    url: '/api/user/getUserType',
    method: 'post',
    data: {}
  })
}
