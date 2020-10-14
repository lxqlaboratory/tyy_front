import request from '@/common/request.js'


export function getPlanDate(data){
	return request.request({
		url:'/app/getPlanDate',
			method: 'POST',
		data
	})
}
export function addTourist(data){
	return request.request({
		url:'/app/addTourist',
			method: 'POST',
		data
	})
}
export function getLocation(data){
	return request.request({
		url:'/app/getLocation',
			method: 'POST',
		data
	})
}
export function viewTourist(data){
	return request.request({
		url:'/app/viewTourist',
			method: 'POST',
		data
	})
}
export function delTourist(data){
	return request.request({
		url:'/app/delTourist',
			method: 'POST',
		data
	})
}
export function modifyTourist(data){
	return request.request({
		url:'/app/modifyTourist',
			method: 'POST',
		data
	})
}
export function addOrder(data){
	return request.request({
		url:'/app/addOrder',
			method: 'POST',
		data
	})
}
export function viewProduct(data){
	return request.request({
		url:'/app/viewProduct',
			method: 'POST',
		data
	})
}
export function othersAddOrder(data){
	return request.request({
		url:'/app/othersAddOrder',
			method: 'POST',
		data
	})
}
export function viewDis(data){
	return request.request({
		url:'/app/viewDis',
			method: 'POST',
		data
	})
}
export function viewStaff(data){
	return request.request({
		url:'/app/viewStaff',
			method: 'POST',
		data
	})
}
export function addStaff(data){
	return request.request({
		url:'/app/addStaff',
			method: 'POST',
		data
	})
}
export function viewOrder(data){
	return request.request({
		url:'/app/viewOrder1',
			method: 'POST',
		data
	})
}


export function viewTour(data){
	return request.request({
		url:'/app/viewTour',
			method: 'POST',
		data
	})
}
export function getPort(data){
	return request.request({
		url:'/app/getPort',
			method: 'POST',
		data
	})
}
export function savaIdentity(data){
	return request.request({
		url:'/app/savaIdentity',
			method: 'POST',
		data
	})
}
export function viewTouristAndPortList(data){
	return request.request({
		url:'/app/viewTouristAndPortList',
			method: 'POST',
		data
	})
}
export function tourGetPort(data){
	return request.request({
		url:'/app/tourGetPort',
			method: 'POST',
		data
	})
}
export function addTouristInOrder(data){
	return request.request({
		url:'/app/addTouristInOrder',
			method: 'POST',
		data
	})
}
export function getPortByCode(data){
	return request.request({
		url:'/app/getPortByCode',
			method: 'POST',
		data
	})
}
export function getPlanNum(data){
	return request.request({
		url:'/app/getPlanNum',
			method: 'POST',
		data
	})
}
export function getDistributeAccount(data){
	return request.request({
		url:'/app/getDistributeAccount',
			method: 'POST',
		data
	})
}
