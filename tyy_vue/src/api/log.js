import request from "@/utils/request";

export  function getLogList(queryForm) {
  return request({
    url:'/api/log/getLogList',
    method:'post',
    data:{...queryForm}
  })

}
export function delLog(id) {
  return request({
    url:'/api/log/delLog',
    method:'post',
    data:{id}
  })

}
export function pldelLog(plt) {
  return request({
    url:'/api/log/pldelLog',
    method:'post',
    data:{
      plt
    }
  })
}
