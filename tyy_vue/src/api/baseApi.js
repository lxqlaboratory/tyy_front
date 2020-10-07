import request from '@/utils/request'

export function getToken() {
  return request({
    url: '/getToken',
    method: 'post',
    data: {}
  })
}
export function getAdminAuths() {
  return request({
    url: '/api/user/getAuths',
    method: 'post',
    data: {}
  })
}

export function getEnums(type) {
  return request({
    url: '/api/enum/getEnums',
    method: 'post',
    data: {
      type
    }
  })
}

export function getImageById(id) {
  return request({
    url:'/api/resource/getResource',
    method:'post',
    data:{
      id
    }
  })
}

export function sendSms(form) {
  return request({
    url:'/api/sms/sendTouMsg',
    method:'post',
    data:{...form}
  })
}
