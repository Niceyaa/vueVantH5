import request from '@/utils/request'

export function getEnumData(){
  return request({
    url: '/sp/registerRecord/getApplicationEnumValueList',
    method: 'get',
  })
}

export function assessData(data){
  return request({
    url: '/sp/registerRecord/getMatchList',
    method: 'post',
    data
  })
}

export function getDetail(data){
  return request({
    url: '/sp/subsidyProject/getProjectDetail',
    method: 'get',
    params:data
  })
}


