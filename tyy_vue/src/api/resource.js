import request from "@/utils/request";

export function getResourceTypeList(typeSuper) {
  return request({
    url: '/api/resource/getRestype',
    method: 'post',
    data: {typeSuper}
  })
}

export function addResourceType(typeSuper,typeName) {
  return request({
    url: '/api/resource/addType',
    method: 'post',
    data: {typeSuper,typeName}
  })
}
export function delResourceType(id) {
  return request({
    url: '/api/resource/delType',
    method: 'post',
    data: {id}
  })
}

export function getResourceList(queryForm) {
  return request({
    url:'/api/resource/getResourceList',
    method:'post',
    data:{...queryForm}
  })
}

export function getResByNames(data) {
  return request({
    url:'/api/viewpoint/getResByNames',
    method:'post',
    data:{"imgList":data}
  })
}

export function delResource(id) {
  return request({
    url:'/api/resource/delResource',
    method:'post',
    data:{id}
  })

}

export function getResList(fileList) {
  return request({
    url:'/api/resource/getResForms',
    method:'post',
    data:{fileList}
  })

}
