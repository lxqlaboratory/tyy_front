import request from '@/common/request.js'


export function guiderBaseInfoInit(){
	return request.request({
		url:'/app/guiderBaseInfoInit',
		 data: {}
	})
}

export function getGuiderXianlu(){
	return request.request({
		url:'/app/getGuiderXianlu',
		 data: {}
	})
}


export function getFollowYewuyuan(){
	return request.request({
		url:'/app/getFollowYewuyuan',
		 data: {}
	})
}

export function updateGuiderBaseInfo(data){
	return request.request({
		url:'/app/updateGuiderBaseInfo',
		data
	})
}

export function getPercentageByPerson(data){
	return request.request({
		url:'/app/getPercentageByPerson',
		data
	})
}
export function shezhifencheng(data){
	return request.request({
		url:'/app/shezhifencheng',
		data
	})
}

export function guiderModifyPwd(data){
	return request.request({
		url:'/app/guiderModifyPwd',
		data
	})
}

export function guiderPunchMap(data){
	return request.request({
		url:'/app/guiderPunchMap',
		data
	})
}
export function savePunch(data){
	return request.request({
		url:'/app/savePunch',
		data
	})
}
export function addJournal(data){
	return request.request({
		url:'/app/addJournal',
		data
	})
}
export function viewJournal(data){
	return request.request({
		url:'/app/viewJournal',
		data
	})
}
export function viewGroup(data){
	return request.request({
		url:'/app/viewGroup',
		data
	})
}
export function getGroupDetail(data){
	return request.request({
		url:'/app/getGroupDetail',
		data
	})
}
export function viewOrder(data){
	return request.request({
		url:'/app/viewOrder',
		data
	})
}
export function viewOrderDetile(data){
	return request.request({
		url:'/app/viewOrderDetile',
		data
	})
}
export function isGather(data){
	return request.request({
		url:'/app/isGather',
		data
	})
}
export function getGatherTou(data){
	return request.request({
		url:'/app/getGatherTou',
		data
	})
}
export function viewGroupForOpinion(data){
	return request.request({
		url:'/app/viewGroupForOpinion',
		data
	})
}
export function addOpinion(data){
	return request.request({
		url:'/app/addOpinion',
		data
	})
}
export function delOpinion(data){
	return request.request({
		url:'/app/delOpinion',
		data
	})
}
export function recordLocation(data){
	return request.request({
		url:'/app/recordLocation',
		data
	})
}
export function saveAccount(data){
	return request.request({
		url:'/app/saveAccount',
		data
	})
}
export function AccountInit(data){
	return request.request({
		url:'/app/AccountInit',
		data
	})
}
export function getAccount(data){
	return request.request({
		url:'/app/getAccount',
		data
	})
}
export function delAccountPhoto(data){
	return request.request({
		url:'/app/delAccountPhoto',
		data
	})
}
export function isNotice(data){
	return request.request({
		url:'/app/isNotice',
		data
	})
}
export function distributerViewGroup(data){
	return request.request({
		url:'/app/distributerViewGroup',
		data
	})
}
export function otherViewJournal(data){
	return request.request({
		url:'/app/otherViewJournal',
		data
	})
}
export function tuoke(data){
	return request.request({
		url:'/app/tuoke',
		data
	})
}
export function tuokeDetail(data){
	return request.request({
		url:'/app/tuokeDetail',
		data
	})
}
