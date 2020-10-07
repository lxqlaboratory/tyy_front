import request from "@/utils/request";

export function getIndexData() {
  return request({
    url: '/api/index/getData',
    method: 'post',
    data: {}
  })
}

export function initIndexDashBoard() {
  return request({
    url: '/api/index/initIndexDashBoard',
    method: 'post',
    data: {}
  })
}
