import request from '@/common/request.js'

export function getAllPlan(data) {
	return request.request({
		url: '/app/getAllPlans',
		data
	})
}

export function getProductPlan(data) {
	return request.request({
		url: '/app/getProductPlans',
		data
	})
}

export function addProductPlan(data) {
	return request.request({
		url: '/app/addPlan',
		data
	})
}

export function deletePlan(data) {
	return request.request({
		url: '/app/delPlan',
		data
	})
}

export function editPlan(data) {
	return request.request({
		url: '/app/editPlan',
		data
	})
}

export function getPlanInfo(data) {
	return request.request({
		url: '/app/getPlanInfo',
		data
	})
}
export function getTicketTypeListForPlan(data) {
	return request.request({
		url: '/app/getTicketTypeListForPlan',
		data
	})
}
export function setTicketTypeListForPlan(data) {
	return request.request({
		url: '/app/setTicketTypeListForPlan',
		data
	})
}
export function addPlan1(data) {
	return request.request({
		url: '/app/addPlan1',
		data
	})
}
export function editProductPlan(data) {
	return request.request({
		url: '/app/editProductPlan',
		data
	})
}
