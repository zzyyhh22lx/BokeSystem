import createAxios from '@/utils/request/axios';

const api = {
  userLogin: '/test/login/',
}

export function userlogin(username: string, password: string) {
  return createAxios({
    url: api.userLogin,
    method: 'post',
    data: {
      username,
      password
    }
  })
}
