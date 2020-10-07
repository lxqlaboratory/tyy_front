import request from '@/utils/request'

export function getSupType() {
  return request({
    url: '/api/sup/getSupType',
    method: 'post',
    data: {}
  })
}
export function addSupType(supTypeAddForm) {
  return request({
    url: '/api/sup/addSupType',
    method: 'post',
    data: {...supTypeAddForm}
  })
}
export function delSupType(id) {
  return request({
    url:'/api/sup/delSupType',
    method:'post',
    data:{id}
  })
}
export function editSupType(disTypeEditForm) {
  return request({
    url:'/api/sup/editSupType',
    method:'post',
    data:{...disTypeEditForm}
  })

}
export function  delSupInfo(id) {
  return request({
    url:'/api/sup/delSupInfo',
    method:'post',
    data:{id}
  })

}
export function editSupInfo(disInfoForm) {
  return request({
    url:'/api/sup/editSupInfo',
    method:'post',
    data:{...disInfoForm}
  })


}
export  function changePassword(id,password) {
  return request({
    url:'/api/sup/changePassword',
    method:'post',
    data:{id,password}
  })

}

export function  getSupInfo() {
  return request({
    url: '/api/sup/getSupInfo',
    method: 'post',
    data: {}
  })
}

export function  addSupInfo(addInfoForm) {
  return request({
    url: '/api/sup/addSupInfo',
    method: 'post',
    data: {...addInfoForm}
  })
}
