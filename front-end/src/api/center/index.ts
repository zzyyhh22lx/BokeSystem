import createAxios from '@/utils/request/axios';
import { UploadUserFile } from 'element-plus'

const api = {
  getApplicationList: '/usercenter/application/getapplicationlist',
  removeApplication: '/usercenter/application/removeApplication',
  testScenario: '/usercenter/new/getscenario',
  newApplication: '/usercenter/new',
  approvalAction: '/usercenter/approval/approvalAction'
}

export function getApplicationList() {
  return createAxios({
    url: api.getApplicationList,
    method: 'get'
  })
}

export function removeApplication(requestCode: string) {
  return createAxios({
    url: api.removeApplication,
    method: 'get',
    data: {
      requestCode
    }
  })
}

export function getScenario() {
  return createAxios({
    url: api.testScenario,
    method: 'get',
  })
}

export function newApplication(testScenario: string, fileList: UploadUserFile[], describe:string) {
  return createAxios({
    url: api.newApplication,
    method: 'post',
    data: {
      testScenario,
      fileList,
      describe
    }
  })
}

export function approvalAction(requestCode: string, outcome:string, opinion:string) {
  return createAxios({
    url: api.approvalAction,
    method: 'get',
    data: {
      requestCode,
      outcome,
      opinion
    }
  })
}