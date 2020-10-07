import request from '@/common/request.js'


export function getPlanDate(data){
	return request.request({
		url:'/app/getPlanDate',
		data
	})
}
export function addTourist(data){
	return request.request({
		url:'/app/addTourist',
		data
	})
}
export function getLocation(data){
	return request.request({
		url:'/app/getLocation',
		data
	})
}
export function viewTourist(data){
	return request.request({
		url:'/app/viewTourist',
		data
	})
}
export function delTourist(data){
	return request.request({
		url:'/app/delTourist',
		data
	})
}
export function modifyTourist(data){
	return request.request({
		url:'/app/modifyTourist',
		data
	})
}
export function addOrder(data){
	return request.request({
		url:'/app/addOrder',
		data
	})
}
export function viewProduct(data){
	return request.request({
		url:'/app/viewProduct',
		data
	})
}
export function othersAddOrder(data){
	return request.request({
		url:'/app/othersAddOrder',
		data
	})
}
export function viewDis(data){
	return request.request({
		url:'/app/viewDis',
		data
	})
}
export function viewStaff(data){
	return request.request({
		url:'/app/viewStaff',
		data
	})
}
export function addStaff(data){
	return request.request({
		url:'/app/addStaff',
		data
	})
}
export function viewOrder(data){
	return request.request({
		url:'/app/viewOrder1',
		data
	})
}


export function viewTour(data){
	return request.request({
		url:'/app/viewTour',
		data
	})
}
export function getPort(data){
	return request.request({
		url:'/app/getPort',
		data
	})
}
export function savaIdentity(data){
	return request.request({
		url:'/app/savaIdentity',
		data
	})
}
export function viewTouristAndPortList(data){
	return request.request({
		url:'/app/viewTouristAndPortList',
		data
	})
}
export function tourGetPort(data){
	return request.request({
		url:'/app/tourGetPort',
		data
	})
}
export function addTouristInOrder(data){
	return request.request({
		url:'/app/addTouristInOrder',
		data
	})
}
export function getPortByCode(data){
	return request.request({
		url:'/app/getPortByCode',
		data
	})
}
export function getPlanNum(data){
	return request.request({
		url:'/app/getPlanNum',
		data
	})
}
export function getDistributeAccount(data){
	return request.request({
		url:'/app/getDistributeAccount',
		data
	})
}
