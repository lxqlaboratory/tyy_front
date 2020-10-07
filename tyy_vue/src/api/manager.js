import request from "@/utils/request";

export function getRoles() {
  return request({
    url: '/api/user/getRoles',
    method: 'post',
    data: {}
  })
}
export function getAllAuths() {
  return request({
    url: '/api/user/getAllAuths',
    method: 'post',
    data: {}
  })
}
export function addRole(disTypeAddForm) {
  return request({
    url: '/api/user/addRole',
    method: 'post',
    data: {...disTypeAddForm}
  })
}
export function delRole(id) {
  return request({
    url:'/api/user/delRole',
    method:'post',
    data:{id}
  })
}
export function editRoles(disTypeEditForm) {
  return request({
    url:'/api/user/editRole',
    method:'post',
    data:{...disTypeEditForm}
  })
}
export function editAuth(editAuthForm) {
  return request({
    url:'/api/user/editAuths',
    method:'post',
    data:{...editAuthForm}
  })
}

export function getUsers() {
  return request({
    url:'/api/user/getUsers',
    method:'post',
    data:{}
  })
}


export function delUser(id) {
  return request({
    url:'/api/user/delUser',
    method:'post',
    data:{id}
  })
}


export function addUser(userinfo) {
  return request({
    url:'/api/user/addUser',
    method:'post',
    data:{...userinfo}
  })
}

export function editUser(userinfo) {
  return request({
    url:'/api/user/editUser',
    method:'post',
    data:{...userinfo}
  })
}
export function changePwd(id,password) {
  return request({
    url:'/api/user/changePwd',
    method:'post',
    data:{id,password}
  })

}

export function getUserById(id) {
  return request({
    url:'/api/user/getUserById',
    method:'post',
    data:{id}
  })

}
