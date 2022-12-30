const router = require('koa-router')()

const registerController = require('../controller/register.controller')
const loginController = require('../controller/login.controller')
const captchaController = require('../controller/captcha.controller')

const { verifyRegister, verifyUser, verifyCaptcha } = require('../middleware/user.middleware')

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/visit', loginController.vistorLogin)

router.post('/login', verifyUser, loginController.sign)

router.post('/logout', async (ctx, next) => { // 登出
  ctx.response.body = {
    code: 200,
    message : "登出成功"
  }
})

router.post('/getcaptcha', verifyCaptcha, captchaController.send)

router.post('/register', verifyRegister, registerController.create) // 注册

module.exports = router
