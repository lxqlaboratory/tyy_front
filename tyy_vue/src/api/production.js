import request from "@/utils/request";

export function getLocations() {
  return request({
    url: '/api/product/getLocations',
    method: 'post',
    data: {}
  })
}

export function delLocation(id) {
  return request({
    url: '/api/product/delLocation',
    method: 'post',
    data: {id}
  })
}

export function getPointInfo(id) {
  return request({
    url: '/api/product/getLocationPoint',
    method: 'post',
    data: {id}
  })

}

export function addLocation(location) {
  return request({
    url: '/api/product/addLocation',
    method: 'post',
    data: {...location}
  })
}

export function editLocation(location) {
  return request({
    url: '/api/product/editLocation',
    method: 'post',
    data: {...location}
  })
}

export function addSerType(serviceType) {
  return request({
    url: '/api/product/addSerType',
    method: 'post',
    data: {...serviceType}
  })
}

export function editSerType(serviceType) {
  return request({
    url: '/api/product/editSerType',
    method: 'post',
    data: {...serviceType}
  })
}

export function getSerTypes() {
  return request({
    url: '/api/product/getSerTypes',
    method: 'post',
    data: {}
  })
}
export function editProSaleState(data) {
  return request({
    url: '/api/product/editSaleState',
    method: 'post',
    data: {...data}
  })
}

export function delproService(id) {
  return request({
    url: '/api/product/delSerType',
    method: 'post',
    data: {id}
  })
}

export function getOrderNumByPro(id) {
  return request({
    url: '/api/product/getOrderNumsByPro',
    method: 'post',
    data: {id}
  })
}

export function getAtts() {
  return request({
    url: '/api/product/getAtts',
    method: 'post',
    data: {}
  })
}

export function getTicketTypeList() {
  return request({
    url: '/api/product/getTicketTypeList',
    method: 'post',
    data: {}
  })
}
export function getProTicList(id) {
  return request({
    url: '/api/product/getProTicList',
    method: 'post',
    data: {proId:id}
  })
}

export function getPlanTicList(id) {
  return request({
    url: '/api/product/getPlanTicList',
    method: 'post',
    data: {planId:id}
  })
}

export function delAtt(id) {
  return request({
    url: '/api/product/delAtt',
    method: 'post',
    data: {id}
  })
}

export function addAtt(att) {
  return request({
    url: '/api/product/addAtt',
    method: 'post',
    data: {...att}
  })
}

export function editAtt(...att) {
  return request({
    url: '/api/product/editAtt',
    method: 'post',
    data: {att}
  })

}

export function editFlag(id, attributeFlagShow) {
  return request({
    url: '/api/product/editFlag',
    method: 'post',
    data: {
      id, attributeFlagShow
    }
  })
}

export function getProTye() {
  return request({
    url: '/api/product/gerProType',
    method: 'post',
    data: {}
  })
}

export function getProTyeNoLimit() {
  return request({
    url: '/api/product/gerProTypeNoLimit',
    method: 'post',
    data: {}
  })
}

export function delProType(id) {
  return request({
    url: '/api/product/delProType',
    method: 'post',
    data: {id}
  })
}

export function addProType(proType) {
  return request({
    url: '/api/product/addProType',
    method: 'post',
    data: {...proType}
  })
}

export function editProType(proType) {
  return request({
    url: '/api/product/editProType',
    method: 'post',
    data: {...proType}
  })
}

export function getCarTypeList() {
  return request({
    url: '/api/product/getCarType',
    method: 'post',
    data: {}
  })
}

export function delCarType(id) {
  return request({
    url: '/api/product/delCarType',
    method: 'post',
    data: {id}
  })
}

export function editCarType(carType) {
  return request({
    url: '/api/product/editCarType',
    method: 'post',
    data: {...carType}
  })
}

export function addCarType(carType) {
  return request({
    url: '/api/product/addCarType',
    method: 'post',
    data: {...carType}
  })
}

export function addPro(productForm) {
  return request({
    url: '/api/product/addPro',
    method: 'post',
    data: {...productForm}
  })
}

export function getAllPros(queryForm) {
  return request({
    url: '/api/product/getAllPros',
    method: 'post',
    data: {...queryForm}
  })
}

export function getPros(queryForm) {
  return request({
    url: '/api/product/getPros',
    method: 'post',
    data: {...queryForm}
  })
}

export function getNoCheckPros(queryForm) {
  return request({
    url: '/api/product/getNoCheckPros',
    method: 'post',
    data: {...queryForm}
  })
}

export function getDelPros(queryForm) {
  return request({
    url: '/api/product/getDelPros',
    method: 'post',
    data: {...queryForm}
  })

}

export function copyProduct(id) {
  return request({
    url: '/api/product/copyProduct',
    method: 'post',
    data: {id}
  })
}

export function delProduct(id) {
  return request({
    url: '/api/product/delPro',
    method: 'post',
    data: {id}
  })
}

export function checkProduct(proId) {
  return request({
    url: '/api/product/checkPro',
    method: 'post',
    data: {proId}
  })
}
export function reProduct(id) {
  return request({
    url: '/api/product/reProduct',
    method: 'post',
    data: {id}
  })
}

export function getProductInfo(id) {
  return request({
    url: '/api/product/getProductInfo',
    method: 'post',
    data: {id}
  })
}


export function getRecentPlanPro(proDate) {
  return request({
    url:'/api/product/getProPlans',
    method:'post',
    data:{
      proDate
    }
  })

}
export function getPriTemplates() {
  return request({
    url:'/api/priTemplate/getTems',
    method:'post',
    data:{}
  })

}

export function addPriTemplates(temData) {
  return request({
    url:'/api/priTemplate/addTem',
    method:'post',
    data:{...temData}
  })

}
export function delPriTemplates(id) {
  return request({
    url:'/api/priTemplate/delTem',
    method:'post',
    data:{id}
  })

}



export function getTems() {
  return request({
    url:'/api/priTemplate/getTems',
    method:'post',
    data:{}
  })

}

export function getProDetail(id) {
  return request({
    url:'/api/product/getProDetails',
    method:'post',
    data:{
      id
    }
  })

}

export function getVisitRecord(id) {
  return request({
    url:'/api/product/getVisitRecord',
    method:'post',
    data:{id}
  })
}
export function setVisitRecord(id,visitRecord) {
  return request({
    url:'/api/product/setVisitRecord',
    method:'post',
    data:{id,visitRecord}
  })

}


