import request from '@/common/request.js'

export function addPro(data) {
	return request.request({
		url: '/app/addPro',
		method: 'POST',
		data
	})
}

export function getProductDetail(data) {
	return request.request({
		url: '/app/getProductInfo',
		method: 'POST',
		data
	})
}
export function tourHaibaoProduct(data) {
	return request.request({
		url: '/app/tourHaibaoProduct',
		method: 'POST',
		data
	})
}
export function getSupInfo(data) {
	return request.request({
		url: '/app/getSupInfo',
		method: 'POST',
		data
	})
}

export function getSupType(data) {
	return request.request({
		url: '/app/getSupType',
		method: 'POST',
		data
	})
}

export function getCarType(data) {
	return request.request({
		url: '/app/getCarType',
		method: 'POST',
		data
	})
}

export function gerProType() {
	return request.request({
		url: '/app/gerProType',
		method: 'POST',
		data:{}
	})
}

export function getSerTypes() {
	return request.request({
		url: '/app/getSerTypes',
		method: 'POST',
		data:{}
	})
}

export function getAtts() {
	return request.request({
		url: '/app/getAtts',
		method: 'POST',
		data:{}
	})
}

export function getLocations() {
	return request.request({
		url: '/app/getLocations',
		method: 'POST',
		data:{}
	})
}

export function getDisType() {
	return request.request({
		url: '/app/getDisType',
		method: 'POST',
		data:{}
	})
}

export function getPersonalProduct(data) {
	return request.request({
		url: '/app/getPros',
		method: 'POST',
		data
	})
}

export function deleteProduct(data) {
	return request.request({
		url: '/app/delPro',
		method: 'POST',
		data
	})
}

export function fenfaProduct(data) {
	return request.request({
		url: '/app/fenfaProduct',
		method: 'POST',
		data
	})
}


export function fenxiaoPerson(data) {
	return request.request({
		url: '/app/fenxiaoPerson',
		method: 'POST',
		data
	})
}


export function fenxiaoHistory(data) {
	return request.request({
		url: '/app/fenxiaoHistory',
		method: 'POST',
		data
	})
}

export function fenxiaoTour(data) {
	return request.request({
		url: '/app/fenxiaoTour',
method: 'POST',
		data
	})
}

export function tourProduct(data) {
	return request.request({
		url: '/app/tourProduct',
method: 'POST',
		data
	})
}

export function tourProductInit(data){
	return request.request({
		url:'/app/tourProductInit',
		 method: 'POST',
		 data
	})
}



export function tourSubmitOder(data){
	return request.request({
		url:'/app/tourSubmitOder',
		 method: 'POST',
		 data
	})
}



export function getDisOrderInit(){
	return request.request({
		url:'/app/getDisOrderInit',
		method: 'POST',
		 data: {}
	})
}




export function getWorkersInit(){
	return request.request({
		url:'/app/getWorkersInit',
		 method: 'POST',
		 data: {}
	})
}



export function setOrderDisWork(data){
	return request.request({
		url:'/app/setOrderDisWork',
		 method: 'POST',
		 data
	})
}

export function statisticsViews(data){
	return request.request({
		url:'/app/statisticsViews',
		 method: 'POST',
		 data
	})
}



export function fenxiaoYewuyuan(data) {
	return request.request({
		url: '/app/fenxiaoYewuyuan',
		method: 'POST',
		data
	})
}


export function getOrderMoneyInit(data){
	return request.request({
		url:'/app/getOrderMoneyInit',
		 method: 'POST',
		 data
	})
}


export function setPayOrderMoney(data){
	return request.request({
		url:'/app/setPayOrderMoney',
		 method: 'POST',
		 data
	})
}
export function otherGetOrderMoneyInit(data){
	return request.request({
		url:'/app/otherGetOrderMoneyInit',
		  method: 'POST',
		 data
	})
}

export function setPayFinishOrder(data){
	return request.request({
		url:'/app/setPayFinishOrder',
		 method: 'POST',
		 data
	})
}


export function continuPay(data){
	return request.request({
		url:'/app/continuPay',
		 method: 'POST',
		 data
	})
}


export function setPayFinishContinuOrder(data){
	return request.request({
		url:'/app/setPayFinishContinuOrder',
		 method: 'POST',
		 data
	})
}
export function getTicketTypeList(data){
	return request.request({
		url:'/app/getTicketTypeList',
		 method: 'POST',
		 data
	})
}
export function ceshihaibao(data){
	return request.request({
		url:'/app/ceshihaibao',
		 method: 'POST',
		 data
	})
}
export function editHaibaoListInit(data){
	return request.request({
		url:'/app/editHaibaoListInit',
		  method: 'POST',
		 data
	})
}

export function getHaibaoListInit(){
	return request.request({
		url:'/app/getHaibaoListInit',
		method: 'POST',
		 data: {}
	})
}

export function editShenchengHaibao(data){
	return request.request({
		url:'/app/editShenchengHaibao',
		method: 'POST',
		 data
	})
}

export function deleteHaibaoList(data){
	return request.request({
		url:'/app/deleteHaibaoList',
		method: 'POST',
		 data
	})
}

