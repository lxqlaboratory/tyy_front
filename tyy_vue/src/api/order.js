import request from "@/utils/request"

export function getOrderDetail(planId) {
  return request({
    url: '/api/product/getOrderDetail',
    method: 'post',
    data: {id: planId}
  })
}

export function getOrdersByDate(date,serType) {
  return request({
    url: '/api/order/getOrdersByDate',
    method: 'post',
    data: {groupDate: date, serType}
  })
}

export function addOrder(orderForm) {
  return request({
    url: '/api/order/addOrder',
    method: 'post',
    data: {...orderForm}
  })
}

export function addWcOrder(orderForm) {
  return request({
    url: '/api/group/addWcOrder',
    method: 'post',
    data: {...orderForm}
  })
}

export function addWcOrderByDis(orderForm) {
  return request({
    url: '/api/group/addWcOrderByDis',
    method: 'post',
    data: {...orderForm}
  })
}

export function getTourist(touLists, orderId) {
  return request({
    url: '/api/tourist/getFullData',
    method: 'post',
    data: {
      touLists, orderId
    }
  })
}

export function getTouristOrder(touLists, orderId) {
  return request({
    url: '/api/tourist/getFullOrderData',
    method: 'post',
    data: {
      touLists, orderId
    }
  })
}

export function getOrders(queryForm) {
  return request({
    url: '/api/order/getOrders',
    method: 'post',
    data: {
      ...queryForm
    }
  })
}

export function getWeChatOrders(queryForm) {
  return request({
    url: '/api/order/getWeChatOrders',
    method: 'post',
    data: {
      ...queryForm
    }
  })
}

export function getArrWeChatOrders(queryForm) {
  return request({
    url: '/api/order/getArrWeChatOrders',
    method: 'post',
    data: {
      ...queryForm
    }
  })
}

export function getRecycleWeChatOrders(queryForm) {
  return request({
    url: '/api/order/getRecycleWeChatOrders',
    method: 'post',
    data: {
      ...queryForm
    }
  })
}

export function restoreRecOrders(orderId) {
  return request({
    url: '/api/order/restoreRecWeChatOrders',
    method: 'post',
    data: {orderId}
  })
}

export function deleteOrder(orderId) {
  return request({
    url: '/api/order/deleteWeChatOrders',
    method: 'post',
    data: {orderId}
  })
}


export function getDisOrders(queryForm) {
  return request({
    url: '/api/order/getDisOrders',
    method: 'post',
    data: {
      ...queryForm
    }
  })
}

export function getSecDisOrders(id) {
  return request({
    url: '/api/order/getSecDisOrders',
    method: 'post',
    data: {adminId:id}
  })
}

export function getWeChatNoPtOrders(queryForm) {
  return request({
    url: '/api/order/getWeChatNoPtOrders',
    method: 'post',
    data: {
      ...queryForm
    }
  })
}
export function getOrder(id) {
  return request({
    url: '/api/order/getOrderInfo',
    method: 'post',
    data: {
      id
    }
  })
}
export function getWechatOrderDetail(orderId) {
  return request({
    url: '/api/order/getWechatOrderDetail',
    method: 'post',
    data: {orderId }
  })
}
export function editOrder(editForm) {
  return request({
    url: '/api/order/editOrder',
    method: 'post',
    data: {
      ...editForm
    }
  })
}

export function changeState(id, state) {
  return request({
    url: '/api/order/changeState',
    method: 'post',
    data: {
      id, state
    }
  })

}

export function delOrder(id) {
  return request({
    url: 'api/order/delOrder',
    method: 'post',
    data: {
      id
    }
  })
}

export function getPayType() {
  return request({
    url: '/api/enum/getEnums',
    method: 'post',
    data: {
      type: 'PAYTYPE'
    }
  })
}

export function getOrderDisMoneyList(id) {
  return request({
    url: '/api/order/getOrderDisMoneyList',
    method: 'post',
    data: {
      id
    }
  })
}

export function changeMoneyState(id, state) {
  return request({
    url: '/api/payment/editDisState',
    method: 'post',
    data: {
      id, checkState: state
    }
  })
}

export function getMoneyInfo(id) {
  return request({
    url: '/api/payment/getDisInfo',
    method: 'post',
    data: {
      id
    }
  })
}

export function delMoney(id) {
  return request({
    url: '/api/payment/delDisPay',
    method: 'post',
    data: {
      id
    }
  })

}

export function getTouristList(id) {
  return request({
    url: "/api/order/getTouList",
    method: 'post',
    data: {id}
  })

}
export function getNewTouList(id) {
  return request({
    url: "/api/order/getNewTouList",
    method: 'post',
    data: {id}
  })

}

export function getNewTouMoneyList(id) {
  return request({
    url: "/api/order/getNewTouMoneyList",
    method: 'post',
    data: {id}
  })

}

export function editTouInfo(editForm) {
  return request({
    url: "/api/order/editTouInfo",
    method: 'post',
    data: {
      ...editForm
    }
  })

}

export function changeOrderState(orderId, state) {
  return request({
    url: '/api/order/checkWechatOrder',
    method: 'post',
    data: {
      orderId, state
    }
  })

}
export function editTouOrder(data) {
  return request({
    url: "/api/order/editTou",
    method: 'post',
    data: {...data}
  })
}
export function delTouOrder(id) {
  return request({
    url: "/api/order/delTouOrder",
    method: 'post',
    data: {id}
  })

}

export function getOrderHisList(orderId) {
  return request({
    url: "/api/order/getHisList",
    method: 'post',
    data: {orderId}
  })

}
export function addOrderHis(addForm) {
  return request({
    url: "/api/order/addHis",
    method: 'post',
    data: {...addForm}
  })
}

export function checkHis(id,state) {
  return request({
    url: "/api/order/checkHis",
    method: 'post',
    data: {id,state}
  })
}

export function orderTouContractInit(orderId) {
  return request({
    url:"/api/order/orderContractInit",
    method:"post",
    data:{orderId}
  })

}

export function getAdminSales(queryForm) {
  return request({
    url:"/api/countData/getAdminSaleList",
    method: 'post',
    data:{...queryForm}
  })

}

export function getPrintOrder(id) {
  return request({
    url:"/api/print/order",
    method: 'post',
    data:{id}
  })


}
export function getPrintWcOrder(id) {
  return request({
    url: "/api/print/wcOrder",
    method: 'post',
    data: { orderId:id }
  })
}


