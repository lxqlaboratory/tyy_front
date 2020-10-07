import request from "@/utils/request"

export function getStampListByDisId(disId) {
  return request({
    url: '/api/stamp/getStampListByDisId',
    method: 'post',
    data: {disId}
  })
}

export function delStamp(id) {
  return request({
    url: '/api/stamp/delStamp',
    method: 'post',
    data: {id}
  })
}

export function addStamp(stamp) {
  return request({
    url:'/api/stamp/addStamp',
    method:'post',
    data:{...stamp}
  })

}
