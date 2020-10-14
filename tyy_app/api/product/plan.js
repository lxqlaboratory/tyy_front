import request from '@/common/request.js'

export function getAllPlan(data) {
	return request.request({
		url: '/app/getAllPlans',
			method: 'POST',
		data
	})
}

export function getProductPlan(data) {
	return request.request({
		url: '/app/getProductPlans',
			method: 'POST',
		data
	})
}

export function addProductPlan(data) {
	return request.request({
		url: '/app/addPlan',
			method: 'POST',
		data
	})
}

export function deletePlan(data) {
	return request.request({
		url: '/app/delPlan',
			method: 'POST',
		data
	})
}

export function editPlan(data) {
	return request.request({
		url: '/app/editPlan',
			method: 'POST',
		data
	})
}

export function getPlanInfo(data) {
	return request.request({
		url: '/app/getPlanInfo',
			method: 'POST',
		data
	})
}
export function getTicketTypeListForPlan(data) {
	return request.request({
		url: '/app/getTicketTypeListForPlan',
			method: 'POST',
		data
	})
}
export function setTicketTypeListForPlan(data) {
	return request.request({
		url: '/app/setTicketTypeListForPlan',
			method: 'POST',
		data
	})
}
export function addPlan1(data) {
	return request.request({
		url: '/app/addPlan1',
			method: 'POST',
		data
	})
}
export function editProductPlan(data) {
	return request.request({
		url: '/app/editProductPlan',
			method: 'POST',
		data
	})
}
