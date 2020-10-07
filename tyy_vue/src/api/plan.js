import request from "@/utils/request";

export function getPlans(queryForm) {
  return request({
    url: '/api/product/getPlans',
    method: 'post',
    data: {...queryForm}
  })
}

export function addPlans(planAddForm) {
  return request({
    url: '/api/product/addPlan',
    method: 'post',
    data: {...planAddForm}
  })
}

export function getPlanInfo(id) {
  return request({
    url: '/api/product/getPlanInfo',
    method: 'post',
    data: {id}
  })

}

export function delPlan(id) {
  return request({
    url:'/api/product/delPlan',
    method:'post',
    data:{id}
  })

}

export function editPlan(planInfo) {
  return request({
    url:'/api/product/editPlan',
    method:'post',
    data:{...planInfo}
  })

}
