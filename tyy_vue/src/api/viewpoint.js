import request from '@/utils/request'

export function getViewpoints(queryForm) {
  return request({
    url: '/api/viewpoint/getViewpoints',
    method: 'post',
    data: {...queryForm}
  })
}

export  function getViewpointsCitys() {
  return request({
    url: '/api/viewpoint/getViewpointCitys',
    method: 'post',
    data: {}
  })
}

export function getViewpoint(id) {
  return request({
    url: '/api/viewpoint/getViewpoint',
    method: 'post',
    data: { id: id }
  })
}

export function addViewpoint(form) {
  return request({
    url: '/api/viewpoint/addViewpoint',
    method: 'post',
    data: { ...form }
  })
}
export function editViewpoint(form) {
  return request({
    url: '/api/viewpoint/editViewpoint',
    method: 'post',
    data: { ...form }
  })
}
export function delViewpoint(id) {
  return request({
    url: '/api/viewpoint/delViewpoint',
    method: 'post',
    data: { id : id }
  })
}
