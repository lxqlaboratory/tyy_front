import request from '@/common/request.js'


export function test(){
	return request({
		url:'/app/test',
		data:{'str':'test'}
	})
}

export function testDri(){
	return directRequest({
		url:'/appdri/sign',
		data:{'str':'test'}
	})
}


export function wxLoign(data){
	return request({
		url:'/appdri/wxLoign',
		data
	})
}

export function login(data) {
	return request.request({
		url: '/auth/webLogin',
		method: 'POST',
		data: data
	})
}

export function sign(data){
	return request.request({
		url:'/appdri/sign',
		data
	})
}

export function signyk(data){
	return request.request({
		url:'/appdri/signyk',
		data
	})
}

export function SignOut(data){
	return request.request({
		url:'/appdri/SignOut',
		data
	})
}

export function getToken() {
  return request.request({
    url: '/getToken',
    data: {}
  })
}


export function getUniappMenuList() {
  return request.request({
    url: '/app/getUniappMenuList',
		method: 'POST',
    data: {}
  })
}



export function indexShopAppApi() {
  return request.request({
    url: '/app/indexShopAppApi',
	method: 'POST',
    data: {}
  })
}


export function baseInfoInit() {
  return request.request({
    url: '/app/baseInfoInit',
	method: 'POST',
    data: {}
  })
}

export function tourCanbyInit() {
  return request.request({
    url: '/app/tourCanbyInit',
	method: 'POST',
    data: {}
  })
}

export function getResourseImage(data){
	return request.request({
		url:'/app/getResourseImage',
		method: 'POST',
		data
	})
}

export function setOrder(data){
	return request.request({
		url:'/app/setOrder',
		data
	})
}
export function changePersonBase(data){
	return request.request({
		url:'/app/changePersonBase',
		method: 'POST',
		data
	})
}


export function sendCodePhone(data){
	return request.request({
		url:'/app/sendCodePhone',
		data
	})
}

export function getFenxiaoshangBYarea(data){
	return request.request({
		url:'/app/getFenxiaoshangBYarea',
		data
	})
}

export function getFenxiaoshangYWY() {
  return request.request({
    url: '/app/getFenxiaoshangYWY',
    data: {}
  })
}

export function unitorderPay() {
  return request.request({
    url: '/app/unitorderPay',
    data: {}
  })
}

export function shenhechanpin() {
  return request.request({
    url: '/app/shenhechanpin',
    data: {}
  })
}

export function shenheCHanpin(data) {
  return request.request({
    url: '/app/shenheCHanpin',
   data
  })
}
export function cuxiaochanpin(data) {
  return request.request({
    url: '/app/cuxiaochanpin',
   data
  })
}
