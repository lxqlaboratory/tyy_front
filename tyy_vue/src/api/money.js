import request from "@/utils/request"

//增加账单
export function addMoney(moneyForm) {
  return request({
    url: '/api/payment/addDisPay',
    method: 'post',
    data: {...moneyForm}
  })
}

export function balancePay(orderId) {
  return request({
    url: '/api/payment/balancePay',
    method: 'post',
    data: {
      orderId
    }
  })
}


export function getDisMoneyList(queryForm) {
  return request({
    url: '/api/payment/getDisMoneyList',
    method: 'post',
    data: {
      ...queryForm
    }
  })
}

export function getDisPayList(queryForm) {
  return request({
    url: '/api/payment/getDisPayList',
    method: 'post',
    data: {...queryForm}

  })
}

export function addPaymentList(payForm) {
  return request({
    url: '/api/payment/addPaymentList',
    method: 'post',
    data: {...payForm}
  })
}

export function getSupList(queryForm) {
  return request({
    url: '/api/payment/getSupList',
    method: 'post',
    data: {...queryForm}
  })
}

export function editSupPayment(addSupMoneyForm) {
  return request({
    url: '/api/payment/editSupPayment',
    method: 'post',
    data: {...addSupMoneyForm}
  })
}

export function editSupRecode(editSupMoneyForm) {
  return request({
    url: '/api/payment/addSupRecode',
    method: 'post',
    data: {...editSupMoneyForm}
  })
}

export function getSupPayList(queryForm) {
  return request({
    url: '/api/payment/getSupPayList',
    method: 'post',
    data: {...queryForm}
  })
}

export function getSupPayment(groupId) {
  return request({
    url: '/api/payment/getSupPayment',
    method: 'post',
    data: {groupId}
  })

}

export function addSupPayment(jdbzForm) {
  return request({
    url: '/api/payment/addSupPayment',
    method: 'post',
    data: {...jdbzForm}
  })

}

export function checkSupState(id, state) {
  return request({
    url: '/api/payment/checkSupState',
    method: 'post',
    data: {
      id, state
    }
  })

}

export function getSuSup() {
  return request({
    url: '/api/payment/getFilterSups',
    method: 'post',
    data: {}
  })
}

export function delSupPayment(id) {
  return request({
    url: '/api/payment/delSupPayment',
    method: 'post',
    data: {
      id
    }
  })
}

export function getRecodes(queryForm) {
  return request({
    url: '/api/payment/getRecodes',
    method: 'post',
    data: {...queryForm}
  })
}

export function getGroupSum(groupId) {
  return request({
    url: '/api/payment/getGroupSum',
    method: 'post',
    data: {groupId}
  })

}


export function editMoneyInfo(form) {

  return request({
    url: "/api/payment/editDisPayment",
    method: 'post',
    data: {...form}
  })

}

export function getPayments(queryForm) {
  return request({
    url: '/api/payment/getPayments',
    method: 'post',
    data: {...queryForm}
  })

}

export function addPayment(addForm) {
  return request({
    url: '/api/payment/addPayment',
    method: 'post',
    data: {...addForm}
  })
}

export function delPayment(payNum) {
  return request({
    url: '/api/payment/delPayment',
    method: 'post',
    data: {payNum}
  })
}


export function getPayChannels(queryForm) {
  return request({
    url: '/api/payChannel/getChannels',
    method: 'post',
    data: {...queryForm}
  })
}

export function addPayChannel(addForm) {
  return request({
    url: '/api/payChannel/addChannel',
    method: 'post',
    data: {...addForm}
  })
}

export function getParents() {
  return request({
    url: '/api/payChannel/getParents',
    method: 'post',
    data: {}
  })
}
export function delChannel(id) {
  return request({
    url: '/api/payChannel/delChannel',
    method: 'post',
    data: {id}
  })
}
export function getChannelTree() {
  return request({
    url: '/api/payChannel/getTree',
    method: 'post',
    data: {}
  })
}
