import request from "@/utils/request";

export function getTouristList(queryForm) {
  return request({
    url: '/api/tourist/getTous',
    method: 'post',
    data: {...queryForm}
  })
}

export function getCerTypes() {
  return request({
    url: '/api/enum/getEnums',
    method: 'post',
    data: {
      type: 'CERTYPE'
    }
  })
}

export function addTourist(disTypeAddForm) {
  return request({
    url: '/api/tourist/addTou',
    method: 'post',
    data: {...disTypeAddForm}
  })
}

export function delTourist(id) {
  return request({
    url: '/api/tourist/delTou',
    method: 'post',
    data: {id}
  })
}

export function getTouInfo(id) {
  return request({
    url: '/api/tourist/getInfo',
    method: 'post',
    data: {id}
  })
}

export function getCarList(queryForm) {
  return request({
    url: '/api/product/getCars',
    method: 'post',
    data: {...queryForm}
  })
}

export function getCarTypeList() {
  return request({
    url: '/api/product/getCarType',
    method: 'post',
    data: {}
  })
}

export function delCar(id) {
  return request({
    url: '/api/product/delCar',
    method: 'post',
    data: {id}
  })
}

export function addCar(carForm) {
  return request({
    url: '/api/product/addCar',
    method: 'post',
    data: {...carForm}
  })
}

export function getCarInfo(id) {
  return request({
    url: '/api/product/getCarInfo',
    method: 'post',
    data: {id}
  })
}

export function editIsBlack(id,isBlack) {
  return request({
    url: '/api/tourist/editIsBlack',
    method: 'post',
    data: {id,isBlack}
  })
}
export function editIsBlackByTo(id,isBlack) {
  return request({
    url: '/api/tourist/editIsBlackByTo',
    method: 'post',
    data: {id,isBlack}
  })
}
