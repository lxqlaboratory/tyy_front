import request from "@/utils/request";

export function getGuiderType() {
  return request({
    url: '/api/guider/getGuiderType',
    method: 'post',
    data: {}
  })
}
export function addGuiderType(disTypeAddForm) {
  return request({
    url: '/api/guider/addGuiderType',
    method: 'post',
    data: {...disTypeAddForm}
  })
}
export function delGuiderType(id) {
  return request({
    url:'/api/guider/delGuiderType',
    method:'post',
    data:{id}
  })
}
export function editGuiderType(disTypeEditForm) {
  return request({
    url:'/api/guider/editGuiderType',
    method:'post',
    data:{...disTypeEditForm}
  })
}
export  function getGuiderList() {
  return request({
    url:'/api/guider/getGuider',
    method:'post',
    data:{}
  })
}
export  function editGuider(guider) {
  return request({
    url:'/api/guider/editGuider',
    method:'post',
    data:{...guider}
  })
}
export function getGuiderInfo (id) {
  return request({
    url:'/api/guider/getGuiderInfo',
    method:'post',
    data:{id}
  })

}
export function delGuider(id) {
  return request({
    url:'/api/guider/delGuider',
    method:'post',
    data:{id}
  })
}

export function addGuider(guider) {
  return request({
    url:'/api/guider/addGuider',
    method:'post',
    data:{...guider}
  })
}

export function changeGuidePassword(id,password) {
  return request({
    url:'/api/guider/changePassword',
    method:'post',
    data:{id,password}
  })
}
