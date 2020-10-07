import request from '@/common/request.js'


export function getGuider(){
	return request.request({
		url:'/app/getGuider',
		 data: {}
	})
}

export function getALLGroups(){
	return request.request({
		url:'/app/getALLGroups',
		 data: {}
	})
}

export function getGroupsOrderALL(){
	return request.request({
		url:'/app/getGroupsOrderALL',
		 data: {}
	})
}



export function getCarType(){
	return request.request({
		url:'/app/getCarTypeSSS',
		 data: {}
	})
}

export function getGuiderInfo(data){
	return request.request({
		url:'/app/getGuiderInfo',
		 data
	})
}

export function getCarNameS(data){
	return request.request({
		url:'/app/getCarNameS',
		data
	})
}


export function createGroup(data){
	return request.request({
		url:'/app/createGroup',
		data
	})
}

export function getPlanGroups(data){
	return request.request({
		url:'/app/getPlanGroups',
		data
	})
}


export function deleteGroups(data){
	return request.request({
		url:'/app/deleteGroups',
		data
	})
}


export function getGroupsOrder(data){
	return request.request({
		url:'/app/getGroupsOrder',
		data
	})
}

export function GroupPintuan(data){
	return request.request({
		url:'/app/GroupPintuan',
		data
	})
}

export function GroupShanchuPintuan(data){
	return request.request({
		url:'/app/GroupShanchuPintuan',
		data
	})
}


export function edityfGroup(data){
	return request.request({
		url:'/app/edityfGroup',
		data
	})
}


export function submitModifyGroup(data){
	return request.request({
		url:'/app/submitModifyGroup',
		data
	})
}




export function findGroupsByName(data){
	return request.request({
		url:'/app/findGroupsByName',
		data
	})
}


export function submitModifyGroupDate(data){
	return request.request({
		url:'/app/submitModifyGroupDate',
		data
	})
}


export function getGroupsOrderByID(data){
	return request.request({
		url:'/app/getGroupsOrderByID',
		data
	})
}

export function Shanchugroupding(data){
	return request.request({
		url:'/app/Shanchugroupding',
		data
	})
}

export function qintajihuadingdan(data){
	return request.request({
		url:'/app/qintajihuadingdan',
		data
	})
}

export function addOrdertoGroup(data){
	return request.request({
		url:'/app/addOrdertoGroup',
		data
	})
}



export function findOrdersByName(data){
	return request.request({
		url:'/app/findOrdersByName',
		data
	})
}



export function orderListFindGroups(data){
	return request.request({
		url:'/app/orderListFindGroups',
		data
	})
}



export function addTouristTWO(data){
	return request.request({
		url:'/app/addTouristTWO',
		data
	})
}
export function selectProduct(data){
	return request.request({
		url:'/app/selectProduct',
		data
	})
}

export function findOrdersByDate(data){
	return request.request({
		url:'/app/findOrdersByDate',
		data
	})
}