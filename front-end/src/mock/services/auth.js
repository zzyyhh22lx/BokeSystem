import Mock from 'mock2js';
import { createResponseBody, getBody } from '../util.js';

const login = (options) => {
  const body = getBody(options);
  if (!['admin'].includes(body.username) || !['1234'].includes(body.password)) {
    return createResponseBody({ isLogin: true }, '账户或密码错误', 401);
  }

  return createResponseBody(
    {
      username: 'admin',
      token: '1234qwer'
    },
    '登录成功',
    200,
    {'Custom-Header': Mock.mock('@guid')}
  );
};

const logout = () => {
  return createResponseBody(
    {}, '登出成功', 200, {'Custom-Header': Mock.mock('@guid')}
  )
}

Mock.mock(/\/test\/login/, 'post', login);
Mock.mock(/\/test\/logout/, 'post', logout);
