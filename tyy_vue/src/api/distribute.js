import request from '@/utils/request'

export function getDisType() {
  return request({
    url: '/api/distribute/getDisType',
    method: 'post',
    data: {}
  })
}

export function addDisType(disTypeAddForm) {
  return request({
    url: '/api/distribute/addDisType',
    method: 'post',
    data: {...disTypeAddForm}
  })
}

export function deleteType(id) {
  return request({
    url: '/api/distribute/deleteType',
    method: 'post',
    data: {id}
  })
}

export function editDisType(disTypeEditForm) {
  return request({
    url: '/api/distribute/editDisType',
    method: 'post',
    data: {...disTypeEditForm}
  })
}

export function delDisInfo(id) {
  return request({
    url: '/api/distribute/delDisInfo',
    method: 'post',
    data: {id}
  })

}

export function updateDisInfo(disInfoForm) {
  return request({
    url: '/api/distribute/editDisInfo',
    method: 'post',
    data: {...disInfoForm}
  })
}

export function addDisInfo(disInfoForm) {
  return request({
    url: '/api/distribute/addDisInfo',
    method: 'post',
    data: {...disInfoForm}
  })

}

export function changePassword(id, password) {
  return request({
    url: '/api/distribute/changePassword',
    method: 'post',
    data: {id, password}
  })

}

export function getDisList() {
  return request({
    url: '/api/distribute/getDisInfo',
    method: 'post',
    data: {}
  })
}

export function showDisList(orderForm) {
  return request({
    url: '/api/distribute/showDisList',
    method: 'post',
    data: {...orderForm}
  })
}
export function showNewDisMoneyList(orderForm) {
  return request({
    url: '/api/distribute/showNewDisMoneyList',
    method: 'post',
    data: {...orderForm}
  })
}

export function showSecDisList() {
  return request({
    url: '/api/distribute/showSecDisList',
    method: 'post',
    data: {}
  })
}

export function getOneSecDisInfo(positionId) {
  return request({
    url: '/api/distribute/getOneSecDisInfo',
    method: 'post',
    data: {positionId}
  })
}

export function editPer(editForm) {
  return request({
    url: '/api/distribute/editPer',
    method: 'post',
    data: {...editForm}
  })
}
export function getDisCode(unitId) {
  return request({
    url: '/api/distribute/getDisCode',
    method: 'post',
    data: {unitId}
  })
}

export function getDisLocationList() {
  return request({
    url: '/api/distribute/getDisLocationList',
    method: 'post',
    data: {}
  })

}

export function blackDis(id, state) {
  return request({
    url: '/api/distribute/editIsBlack',
    method: 'post',
    data: {id, isBlack:state}
  })
}


export function getDisSales(queryForm) {
  return request({
    url: '/api/countData/getDisSaleList',
    method: 'post',
    data: {...queryForm}
  })
}
