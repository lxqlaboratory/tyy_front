import request from '@/common/request.js'

export function addPro(data) {
	return request.request({
		url: '/app/addPro',
		data
	})
}

export function getProductDetail(data) {
	return request.request({
		url: '/app/getProductInfo',
		data
	})
}
export function tourHaibaoProduct(data) {
	return request.request({
		url: '/app/tourHaibaoProduct',
		data
	})
}
export function getSupInfo(data) {
	return request.request({
		url: '/app/getSupInfo',
		data
	})
}

export function getSupType(data) {
	return request.request({
		url: '/app/getSupType',
		data
	})
}

export function getCarType(data) {
	return request.request({
		url: '/app/getCarType',
		data
	})
}

export function gerProType() {
	return request.request({
		url: '/app/gerProType',
		data:{}
	})
}

export function getSerTypes() {
	return request.request({
		url: '/app/getSerTypes',
		data:{}
	})
}

export function getAtts() {
	return request.request({
		url: '/app/getAtts',
		data:{}
	})
}

export function getLocations() {
	return request.request({
		url: '/app/getLocations',
		data:{}
	})
}

export function getDisType() {
	return request.request({
		url: '/app/getDisType',
		data:{}
	})
}

export function getPersonalProduct(data) {
	return request.request({
		url: '/app/getPros',
		data
	})
}

export function deleteProduct(data) {
	return request.request({
		url: '/app/delPro',
		data
	})
}

export function fenfaProduct(data) {
	return request.request({
		url: '/app/fenfaProduct',
		data
	})
}


export function fenxiaoPerson(data) {
	return request.request({
		url: '/app/fenxiaoPerson',
		data
	})
}


export function fenxiaoHistory(data) {
	return request.request({
		url: '/app/fenxiaoHistory',
		data
	})
}

export function fenxiaoTour(data) {
	return request.request({
		url: '/app/fenxiaoTour',

		data
	})
}

export function tourProduct(data) {
	return request.request({
		url: '/app/tourProduct',

		data
	})
}

export function tourProductInit(data){
	return request.request({
		url:'/app/tourProductInit',
		 data
	})
}



export function tourSubmitOder(data){
	return request.request({
		url:'/app/tourSubmitOder',
		 data
	})
}



export function getDisOrderInit(){
	return request.request({
		url:'/app/getDisOrderInit',
		 data: {}
	})
}




export function getWorkersInit(){
	return request.request({
		url:'/app/getWorkersInit',
		 data: {}
	})
}



export function setOrderDisWork(data){
	return request.request({
		url:'/app/setOrderDisWork',
		 data
	})
}

export function statisticsViews(data){
	return request.request({
		url:'/app/statisticsViews',
		 data
	})
}



export function fenxiaoYewuyuan(data) {
	return request.request({
		url: '/app/fenxiaoYewuyuan',
		data
	})
}


export function getOrderMoneyInit(data){
	return request.request({
		url:'/app/getOrderMoneyInit',
		 data
	})
}


export function setPayOrderMoney(data){
	return request.request({
		url:'/app/setPayOrderMoney',
		 data
	})
}
export function otherGetOrderMoneyInit(data){
	return request.request({
		url:'/app/otherGetOrderMoneyInit',
		 data
	})
}

export function setPayFinishOrder(data){
	return request.request({
		url:'/app/setPayFinishOrder',
		 data
	})
}


export function continuPay(data){
	return request.request({
		url:'/app/continuPay',
		 data
	})
}


export function setPayFinishContinuOrder(data){
	return request.request({
		url:'/app/setPayFinishContinuOrder',
		 data
	})
}
export function getTicketTypeList(data){
	return request.request({
		url:'/app/getTicketTypeList',
		 data
	})
}
export function ceshihaibao(data){
	return request.request({
		url:'/app/ceshihaibao',
		 data
	})
}
export function editHaibaoListInit(data){
	return request.request({
		url:'/app/editHaibaoListInit',
		 data
	})
}

export function getHaibaoListInit(){
	return request.request({
		url:'/app/getHaibaoListInit',
		 data: {}
	})
}

export function editShenchengHaibao(data){
	return request.request({
		url:'/app/editShenchengHaibao',
		 data
	})
}

export function deleteHaibaoList(data){
	return request.request({
		url:'/app/deleteHaibaoList',
		 data
	})
}

