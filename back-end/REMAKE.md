# 基于koa2实现



### 启动：

```shell
npm install # 安装依赖

npm run start # 启动
# 或者
node bin/www
```



### 功能：

- 提供接口
- 跨域代理



### 数据库分析

+   permission(权限)：

  ```js
  {
      0: 只读 // 游客登录
      1: 可写
      2: 可审批
      3: 最高权限
  }
  ```

用户登录表：(Users)

| id   | email       | password    | username（登录即生成） | permission（默认1） | img_url     | createAt（创建时间） | updateAt（更新时间） |
| ---- | ----------- | ----------- | ---------------------- | ------------------- | ----------- | -------------------- | -------------------- |
| int  | varchar(50) | varchar(50) | varchar(50)            | int                 | varchar(50) | timestamp            | timestamp            |

用户专栏表：(Columns)

| id(refence id) | column_id(专栏id) | column_name(专栏名字) | createAt（创建时间） | updateAt（更新时间） |
| -------------- | ----------------- | --------------------- | -------------------- | -------------------- |
| int            | int               | varchar(50)           | timestamp            | timestamp            |

用户内容表：(Articles)

| id(refence id) | column_id(refence column_id) | title       | content        | createAt（创建时间） | updateAt（更新时间） |
| -------------- | ---------------------------- | ----------- | -------------- | -------------------- | -------------------- |
| int            | int                          | varchar(50) | varchar(65535) | timestamp            | timestamp            |



### 接口分析：

##### 登录

- `post('/users/login')`

```typescript
interface dataType {
    email:string,
    password:string
}
// 返回
{ code: 200, data: { id, username, token, msg: '登录成功~' } }
```

##### 注册

- `get('users/getcaptcha')` （向用户发送验证码）

```typescript
interface dataType {
    email:string
}
// 返回
{ code: 200, data: { msg: '发送成功~' }
```



- `post('/users/register')`

```typescript
interface dataType {
    email:string,
    password:string,
    captcha:string // 验证码
}
// 返回
{ code: 200, data: { id, username, token, msg: '注册成功~' }
```

##### 获取用户名单

- `get('/usercenter/getusers')`

```typescript
// 返回
{ code: 200, data: { result, msg: '获取用户信息成功' } }
```

