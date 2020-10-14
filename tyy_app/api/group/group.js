import request from '@/common/request.js'


export function getGuider(){
	return request.request({
		url:'/app/getGuider',
			method: 'POST',
		 data: {}
	})
}

export function getALLGroups(){
	return request.request({
		url:'/app/getALLGroups',
		 	method: 'POST',
		 data: {}
	})
}

export function getGroupsOrderALL(){
	return request.request({
		url:'/app/getGroupsOrderALL',
		 	method: 'POST',
		 data: {}
	})
}



export function getCarType(){
	return request.request({
		url:'/app/getCarTypeSSS',
		 	method: 'POST',
		 data: {}
	})
}

export function getGuiderInfo(data){
	return request.request({
		url:'/app/getGuiderInfo',
		 	method: 'POST',
		 data
	})
}

export function getCarNameS(data){
	return request.request({
		url:'/app/getCarNameS',
			method: 'POST',
		data
	})
}


export function createGroup(data){
	return request.request({
		url:'/app/createGroup',
			method: 'POST',
		data
	})
}

export function getPlanGroups(data){
	return request.request({
		url:'/app/getPlanGroups',
			method: 'POST',
		data
	})
}


export function deleteGroups(data){
	return request.request({
		url:'/app/deleteGroups',
			method: 'POST',
		data
	})
}


export function getGroupsOrder(data){
	return request.request({
		url:'/app/getGroupsOrder',
			method: 'POST',
		data
	})
}

export function GroupPintuan(data){
	return request.request({
		url:'/app/GroupPintuan',
			method: 'POST',
		data
	})
}

export function GroupShanchuPintuan(data){
	return request.request({
		url:'/app/GroupShanchuPintuan',
			method: 'POST',
		data
	})
}


export function edityfGroup(data){
	return request.request({
		url:'/app/edityfGroup',
			method: 'POST',
		data
	})
}


export function submitModifyGroup(data){
	return request.request({
		url:'/app/submitModifyGroup',
			method: 'POST',
		data
	})
}




export function findGroupsByName(data){
	return request.request({
		url:'/app/findGroupsByName',
			method: 'POST',
		data
	})
}


export function submitModifyGroupDate(data){
	return request.request({
		url:'/app/submitModifyGroupDate',
			method: 'POST',
		data
	})
}


export function getGroupsOrderByID(data){
	return request.request({
		url:'/app/getGroupsOrderByID',
			method: 'POST',
		data
	})
}

export function Shanchugroupding(data){
	return request.request({
		url:'/app/Shanchugroupding',
			method: 'POST',
		data
	})
}

export function qintajihuadingdan(data){
	return request.request({
		url:'/app/qintajihuadingdan',
			method: 'POST',
		data
	})
}

export function addOrdertoGroup(data){
	return request.request({
		url:'/app/addOrdertoGroup',
			method: 'POST',
		data
	})
}



export function findOrdersByName(data){
	return request.request({
		url:'/app/findOrdersByName',
			method: 'POST',
		data
	})
}



export function orderListFindGroups(data){
	return request.request({
		url:'/app/orderListFindGroups',
			method: 'POST',
		data
	})
}



export function addTouristTWO(data){
	return request.request({
		url:'/app/addTouristTWO',
			method: 'POST',
		data
	})
}
export function selectProduct(data){
	return request.request({
		url:'/app/selectProduct',
			method: 'POST',
		data
	})
}

export function findOrdersByDate(data){
	return request.request({
		url:'/app/findOrdersByDate',
			method: 'POST',
		data
	})
}