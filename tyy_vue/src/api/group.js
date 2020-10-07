import request from '@/utils/request'

export function getGroupList(queryForm) {
  return request({
    url: '/api/group/getGroups',
    method: 'post',
    data: {...queryForm}
  })
}

export function getFilterGroups(queryForm) {
  return request({
    url: '/api/group/getFilterGroups',
    method: 'post',
    data: {...queryForm}
  })
}
export function getGroupMonyList(queryForm) {
  return request({
    url: '/api/group/getGroupMonyList',
    method: 'post',
    data: {...queryForm}
  })
}

export function addGroup(groupForm) {
  return request({
    url: '/api/group/addGroup',
    method: 'post',
    data: {...groupForm}
  })
}

export function addGro(groupForm) {
  return request({
    url: '/api/group/addGro',
    method: 'post',
    data: {...groupForm}
  })
}
export function addNewGroup(groupForm) {
  return request({
    url: '/api/group/addNewGroup',
    method: 'post',
    data: {...groupForm}
  })
}

export function changeGroupState(id, state) {
  return request({
    url: '/api/group/changeState',
    method: 'post',
    data: {
      id, state
    }
  })
}
export function editTieupState(id, tieupState) {
  return request({
    url: '/api/group/editTieupState',
    method: 'post',
    data: {
      id, tieupState
    }
  })
}

export function editGroup(groupForm) {
  return request({
    url: '/api/group/editGroup',
    method: 'post',
    data: {...groupForm}
  })
}

export function delGroup(id) {
  return request({
    url: '/api/group/delGroup',
    method: 'post',
    data: {id}
  })
}

export function deleteGroupInfo(id) {
  return request({
    url: '/api/group/deleteGroupInfo',
    method: 'post',
    data: {id}
  })
}

export function getGroupInfo(id) {
  return request({
    url: '/api/group/getGroupInfo',
    method: 'post',
    data: {id}
  })
}

export function getGroupInfoHasPlanId(id) {
  return request({
    url: '/api/group/getGroupInfoHasPlanId',
    method: 'post',
    data: {id}
  })
}
export function getGroupDetail(id) {
  return request({
    url: '/api/group/getGroupDetail',
    method: 'post',
    data: {id}
  })
}

export function getPlanGroups(id) {
  return request({
    url: '/api/group/getPlanGroups',
    method: 'post',
    data: {id}
  })
}

export function getAllGroups() {
  return request({
    url: '/api/group/getAllGroups',
    method: 'post',
    data: {}
  })
}

export function getGroupFOrder(id) {
  return request({
    url: '/api/group/getGroupFOrder',
    method: 'post',
    data: {planId:id}
  })
}

export function getGroupFProOrder(id) {
  return request({
    url: '/api/group/getGroupOfProFOrder',
    method: 'post',
    data: {proId:id}
  })
}
// export function getGroupSOrder(id,groupId) {
//   return request({
//     url: '/api/group/getGroupSOrder',
//     method: 'post',
//     data: {planId:id,groupId}
//   })
// }

export function getGroupSOrder(groupId) {
  return request({
    url: '/api/group/getGroupSOrder',
    method: 'post',
    data: {groupId}
  })
}

export function getGroupSOrderHasVarPlan(groupId) {
  return request({
    url: '/api/group/getGroupSOrderHasVarPlan',
    method: 'post',
    data: {groupId}
  })
}
export function orderInGroup(orderId,groupId) {
  return request({
    url: '/api/group/orderInG',
    method: 'post',
    data: {orderId,groupId}
  })
}

export function orderMultInG(multipleSelection,groupId) {
  return request({
    url: '/api/group/orderMultInG',
    method: 'post',
    data: {multipleSelection,groupId}
  })
}
export function orderOutGroup(orderId) {
  return request({
    url: '/api/group/orderOutG',
    method: 'post',
    data: {orderId}
  })
}

export function addOrder(groupId, orderId) {
  return request({
    url: '/api/group/addOrder',
    method: 'post',
    data: {groupId, orderId}
  })
}

export function delOrder(id) {
  return request({
    url: '/api/group/delOrder',
    method: 'post',
    data: {id}
  })
}

export function setSeat(id, seatInfo) {
  return request({
    url: '/api/group/setSeat',
    method: 'post',
    data: {id, seatInfo}
  })
}

export function sendMsg(id) {
  return request({
    url:'/api/group/sendMsg',
    method:'post',
    data:{id}
  })

}
export function getGroupCharts() {
  return request({
    url:'/api/countData/getGroupCharts',
    method:'post',
    data:{}
  })

}

export function getPayCharts() {
  return request({
    url:'/api/countData/getPayCharts',
    method:'post',
    data:{}
  })

}

export function getEarnCharts() {
  return request({
    url:'/api/countData/getEarnCharts',
    method:'post',
    data:{}
  })

}

export function getTouSmsDetail(form) {
  return request({
    url:'/api/group/getTouSmsDetail',
    method:'post',
    data:{...form}
  })

}

export function getGroupMapData(id) {
  return request({
    url: '/api/group/getGroupMapData',
    method: 'post',
    data: {id}
  })
}
