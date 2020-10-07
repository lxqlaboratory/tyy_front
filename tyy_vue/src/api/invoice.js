import request from '@/utils/request'

export function addInvoice(form) {
  return request({
    url: '/api/invoice/addInvoice',
    method: 'post',
    data: {
      ...form
    }
  })
}

export function getInvList(form) {
  return request({
    url: '/api/invoice/queryInvoices',
    method: 'post',
    data: {
      ...form
    }
  })
}

export function getInvInfo(id) {
  return request({
    url: '/api/invoice/getInvoiceInfo',
    method: 'post',
    data: {
      id
    }
  })
}

export function editInv(form) {
  return request({
    url: '/api/invoice/editInvoice',
    method: 'post',
    data: {
      ...form
    }
  })
}

export function delInv(id) {
  return request({
    url: '/api/invoice/delInvoice',
    method: 'post',
    data: {
      id
    }
  })
}

