import request from '@/common/request.js'


export function guiderBaseInfoInit(){
	return request.request({
		url:'/app/guiderBaseInfoInit',
		method: 'POST',
		 data: {}
	})
}

export function getGuiderXianlu(){
	return request.request({
		url:'/app/getGuiderXianlu',
		method: 'POST',
		 data: {}
	})
}


export function getFollowYewuyuan(){
	return request.request({
		url:'/app/getFollowYewuyuan',
		method: 'POST',
		 data: {}
	})
}

export function updateGuiderBaseInfo(data){
	return request.request({
		url:'/app/updateGuiderBaseInfo',
		method: 'POST',
		data
	})
}

export function getPercentageByPerson(data){
	return request.request({
		url:'/app/getPercentageByPerson',
		method: 'POST',
		data
	})
}
export function shezhifencheng(data){
	return request.request({
		url:'/app/shezhifencheng',
		method: 'POST',
		data
	})
}

export function guiderModifyPwd(data){
	return request.request({
		url:'/app/guiderModifyPwd',
		method: 'POST',
		data
	})
}

export function guiderPunchMap(data){
	return request.request({
		url:'/app/guiderPunchMap',
		method: 'POST',
		data
	})
}
export function savePunch(data){
	return request.request({
		url:'/app/savePunch',
		method: 'POST',
		data
	})
}
export function addJournal(data){
	return request.request({
		url:'/app/addJournal',
		method: 'POST',
		data
	})
}
export function viewJournal(data){
	return request.request({
		url:'/app/viewJournal',
		method: 'POST',
		data
	})
}
export function viewGroup(data){
	return request.request({
		url:'/app/viewGroup',
		method: 'POST',
		data
	})
}
export function getGroupDetail(data){
	return request.request({
		url:'/app/getGroupDetail',
		method: 'POST',
		data
	})
}
export function viewOrder(data){
	return request.request({
		url:'/app/viewOrder',
		method: 'POST',
		data
	})
}
export function viewOrderDetile(data){
	return request.request({
		url:'/app/viewOrderDetile',
		method: 'POST',
		data
	})
}
export function isGather(data){
	return request.request({
		url:'/app/isGather',
		method: 'POST',
		data
	})
}
export function getGatherTou(data){
	return request.request({
		url:'/app/getGatherTou',
		method: 'POST',
		data
	})
}
export function viewGroupForOpinion(data){
	return request.request({
		url:'/app/viewGroupForOpinion',
		method: 'POST',
		data
	})
}
export function addOpinion(data){
	return request.request({
		url:'/app/addOpinion',
		method: 'POST',
		data
	})
}
export function delOpinion(data){
	return request.request({
		url:'/app/delOpinion',
		method: 'POST',
		data
	})
}
export function recordLocation(data){
	return request.request({
		url:'/app/recordLocation',
		method: 'POST',
		data
	})
}
export function saveAccount(data){
	return request.request({
		url:'/app/saveAccount',
		method: 'POST',
		data
	})
}
export function AccountInit(data){
	return request.request({
		url:'/app/AccountInit',
		method: 'POST',
		data
	})
}
export function getAccount(data){
	return request.request({
		url:'/app/getAccount',
		method: 'POST',
		data
	})
}
export function delAccountPhoto(data){
	return request.request({
		url:'/app/delAccountPhoto',
		method: 'POST',
		data
	})
}
export function isNotice(data){
	return request.request({
		url:'/app/isNotice',
		method: 'POST',
		data
	})
}
export function distributerViewGroup(data){
	return request.request({
		url:'/app/distributerViewGroup',
		method: 'POST',
		data
	})
}
export function otherViewJournal(data){
	return request.request({
		url:'/app/otherViewJournal',
		method: 'POST',
		data
	})
}
export function tuoke(data){
	return request.request({
		url:'/app/tuoke',
		method: 'POST',
		data
	})
}
export function tuokeDetail(data){
	return request.request({
		url:'/app/tuokeDetail',
		method: 'POST',
		data
	})
}
