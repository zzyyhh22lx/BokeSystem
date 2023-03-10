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

```sql
create table if not exists users(
                id INT PRIMARY KEY AUTO_INCREMENT,
                email VARCHAR(50),
                password VARCHAR(50) NOT NULL,
                username VARCHAR(50) NOT NULL UNIQUE,
                permission INT NOT NULL,
                createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
               	img_Url VARCHAR(50),
                updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```



用户专栏表：(Columns)

| c_id(refence id) (外键约束) | id(专栏id) | column_name(专栏名字) | createAt（创建时间） | updateAt（更新时间） |
| --------------------------- | ---------- | --------------------- | -------------------- | -------------------- |
| int                         | int        | varchar(50)           | timestamp            | timestamp            |

```sql
create table if not exists columns(
    id INT PRIMARY KEY AUTO_INCREMENT,
    c_id INT,
    column_name VARCHAR(50) NOT NULL UNIQUE,
    createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY(c_id) REFERENCES users(id)
);
```





用户内容表：(Articles)

| id(文字id) | a_id(refence c_id) | title       | content        | createAt（创建时间） | updateAt（更新时间） |
| ---------- | ------------------ | ----------- | -------------- | -------------------- | -------------------- |
| int        | int                | varchar(50) | varchar(65535) | timestamp            | timestamp            |

```sql
create table if not exists articles(
    id INT PRIMARY KEY AUTO_INCREMENT,
    a_id INT,
    title VARCHAR(50) NOT NULL UNIQUE,
    content VARCHAR(65535),
    status VARCHAR(10),
    createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY(a_id) REFERENCES columns(id)
);
```





### 接口分析：

##### token

```js
{
    id, username, permission // 权限
}

const authorization = ctx.headers.authorization
// 一般设置将token存在请求头的headers.authorization中
```



##### 登录

- `post('/users/login')`

```typescript
interface dataType { // 参数
    email:string,
    password:string
}
// 返回
{ code: 200, data: { id, username, token, msg: '登录成功~' } }
```

- `get('/users/visit')` ( 游客模式 )

```typescript
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



##### 新建专栏

- `post('/usercenter/newcolumn')`

```typescript
interface dataType { // 需要token
    column_name:string
}

// 返回
{ code: 200, data: { msg: '专栏命名成功', id } } // 返回专栏id
```



##### 获取用户所有专栏

- `get('/usercenter/getallcolumn')`

```typescript
interface dataType { // 需要token
    
}

{ code: 200, data: { result, msg: '成功查询所有专栏~' } }
```



##### 获得专栏的id值

- `get('/usercenter/getcolumnid')`

```typescript
interface dataType {
    c_id:number, // 专栏所属用户的标识(用户的id)
    column_name:string
}

//返回
{ code: 200, data: { msg: '找到目标专栏~', id: result[0].id } }
```



##### 删除专栏

- `delete('/usercenter/deletecolumn')`

```typescript
interface dataType {
    column_name:string
}

{ code: 200, data: { msg: '删除目标专栏成功~' } }
```



##### 发布文章

- `post('/usercenter/publish')`

```typescript
set(a_id, [{ // 将数据存入hash表中，审批通过
    a_id:number, // 属于哪个专栏
    username:string, // 作者
    title:string, // a_id确定则仅有唯一值
    content:string,
    status: '待审批'|'已驳回'|'已发布',
    createAt:time
}])
```

```typescript
interface dataType { // 需要token
    a_id:number, // 对应专栏的id
    title:string,
    content:string
}

// 返回
{ code: 200, data: { msg: '发布文章请求已提交~' } }
```



##### 获取与用户相关的文章

- `get('/usercenter/getallarticles')`

```typescript
interface dataType {
    id:number,//用户id
}
{ code: 200, data: { result, msg: '获取相关的文章成功~' } }
```



##### 获取目标专栏的文章

- `get('/usercenter/getcolumnarticles')`

```typescript
interface dataType {
    c_id:number,//专栏id
}

{ code: 200, data: { result, msg: '获取目标专栏文章成功~' } }
```





##### 获取与我相关的审批

- `get('/usercenter/getmyapprovals')`

```typescript
interface dataType { // 需要token
}

{ code: 200, data: { data, msg: '获取与我相关的审批成功~' } }
```



##### 审批文章

- `post('/usercenter/approve')`

```typescript
interface dataType { // 需要token
    a_id:number,
    title:string,
    opinion:'yes'|'no'
}

{ code: 200, data: { msg: '审批成功~' } }
```



##### 查询所有审批

- `get('/usercenter/getallapprovals')`

```typescript
{
    code: 200, 
    data: {
        msg: '所有审批已获得~',
        data: [{
            a_id:number, // 属于哪个专栏
            username:string,
            title:string, // a_id确定则仅有唯一值
            content:string,
            status: '待审批'|'已驳回'|'已发布',
            createAt:time
        }] 
	} 
}
```



##### 删除该审批

- `delete('/usercenter/deleteapproval')`

```typescript
interface dataType { // 需要token
    a_id:number,
    title:string
}

{ code: 200, data: { msg: '删除审批成功~' } }
```

