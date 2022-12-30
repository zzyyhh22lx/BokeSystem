const router = require('koa-router')()

const usercenterController = require('../controller/usercenter.controller')

router.prefix('/usercenter')

router.get('/getusers', usercenterController.getUsers)

router.get('/application/getapplicationlist', function (ctx, next) {
  ctx.response.body = {
    data: [
      {
        requestCode: 'TEST406483493',
        type: '上传数据',
        date: '2016-05-03',
        submitter: 'Tm',
        describe: '测试描述',
        secretLevel: '公开1级',
        approver: 'lib',
        progress: '待审批'
      },
      {
        requestCode: 'TEST4064893',
        type: '上传数据',
        date: '2016-05-08',
        submitter: 'Tm',
        describe: '测试描述',
        secretLevel: '绝密4级',
        approver: 'bic',
        progress: '待审批'
      },
      {
        requestCode: 'TEST4064892',
        type: '上传数据',
        date: '2016-05-08',
        submitter: 'Tm',
        describe: '测试描述',
        secretLevel: '秘密2级',
        approver: 'bic',
        progress: '已驳回'
      },
      {
        requestCode: 'TEST4064891',
        type: '上传数据',
        date: '2016-05-08',
        submitter: 'Tm',
        describe: '测试描述',
        secretLevel: '机密3级',
        approver: 'bic',
        progress: '已发布'
      }
    ]
  }
})

router.post('/login', async (ctx, next) => { // 登录
  ctx.response.body = {
    code: 200,
    message : "登录成功",
    token: "1234qwer",
    username: "admin",
    _headers: {"Custom-Header": 'a56861D6-03f7-7e3D-9Dc4-78B3ba564d2C'},
    _status: 200
  }
})
module.exports = router
