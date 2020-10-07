import request from "@/utils/request";

export function getSysInfo() {
  return request({
    url: '/api/sys/getSysInfo',
    method: 'post',
    data: {}
  })
}
export function editSysInfo(form) {
  return request({
    url: '/api/sys/editSysInfo',
    method: 'post',
    data: {...form}
  })
}
