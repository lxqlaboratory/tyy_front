import request from "@/utils/request";


export function getInsuList() {
  return request({
    url: '/api/insu/getInsus',
    method: 'post',
    data: {}
  })

}

export function delInsu(id) {
  return request({
    url: '/api/insu/delInsu',
    method: 'post',
    data: {id}
  })

}

export function addInsu(form) {
  return request({
    url: '/api/insu/addInsu',
    method: 'post',
    data: {...form}
  })
}

export function getInsu(id) {
  return request({
    url: '/api/insu/getInsuInfo',
    method: 'post',
    data: {id}
  })
}

export function getInsuHisList(queryForm) {
  return request({
    url: '/api/insuHis/queryInsu',
    method: 'post',
    data: {...queryForm}
  })

}

export function delInsuHis(id) {
  return request({
    url: '/api/insuHis/delInsu',
    method: 'post',
    data: {id}
  })

}
