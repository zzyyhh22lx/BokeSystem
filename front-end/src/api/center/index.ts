import createAxios from '@/utils/request/axios';

const api = {
  getUsers: '/usercenter/getusers',
  getallapprovals: '/usercenter/getallapprovals',
  getmyapprovals: '/usercenter/getmyapprovals',
  getallcolumn: '/usercenter/getallcolumn',
  approve: '/usercenter/approve',
  deleteapproval: '/usercenter/deleteapproval',
  newColumn: '/usercenter/newcolumn',
  deletecolumn: '/usercenter/deletecolumn',
  publish: '/usercenter/publish'
}

export async function getUsers() {
  return createAxios({
    url: api.getUsers,
    method: 'get'
  })
}

export function getallapprovals() {
  return createAxios({
    url: api.getallapprovals,
    method: 'get'
  })
}

export function getmyapprovals() {
  return createAxios({
    url: api.getmyapprovals,
    method: 'get'
  })
}

export async function approve(a_id: number, title: string, opinion: string) {
  return createAxios({
    url: api.approve,
    method: 'post',
    data: {
      a_id, title, opinion
    }
  })
}

export async function deleteapproval(a_id: number, title: string) {
  return createAxios({
    url: api.deleteapproval,
    method: 'delete',
    data: {
      a_id, title
    }
  })
}

export async function newColumn(column_name:string) {
  return createAxios({
    url: api.newColumn,
    method: 'post',
    data: {
      column_name
    }
  })
}

export async function getallcolumn() {
  return createAxios({
    url: api.getallcolumn,
    method: 'get'
  })
}

export async function deletecolumn(column_name:string) {
  return createAxios({
    url: api.deletecolumn,
    method: 'delete',
    data: {
      column_name
    }
  })
}

export async function publish(a_id:number, title:string, content:string) {
  return createAxios({
    url: api.publish,
    method: 'post',
    data: {
      a_id, title, content
    }
  })
}
