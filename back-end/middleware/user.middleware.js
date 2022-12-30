const userService = require('../service/user.service')
const { getResult } = require('../utils/handle-error')
const { getCaptcha } = require('../utils/verify-captcha')

const verifyRegister = async (ctx, next) => { // 验证注册
    const {email, password, captcha} = ctx.request.body
    if(!email || !password) return (ctx.response.body = getResult('500'))
    const users = await userService.findByEmail(email)
    if(users.length) return (ctx.response.body = getResult('501'))
    if(!getCaptcha(email, captcha)) return (ctx.response.body = getResult('505')) // 验证码匹配？
    await next()
}

const verifyUser = async (ctx, next) => { // 验证登录
    const {email, password} = ctx.request.body
    const users = await userService.findByEmail(email)
    const user = users[0]
    if(!user) return (ctx.response.body = getResult('502'))
    if(password !== user.password) return (ctx.response.body = getResult('503'))
    ctx.user = user // 将信息保存在ctx中
    await next()
}

const verifyCaptcha = async (ctx, next) => { // 验证发送验证码
    const { email } = ctx.request.body
    if(!email) return (ctx.response.body = getResult('504'))
    const users = await userService.findByEmail(email)
    if(users.length) return (ctx.response.body = getResult('501'))
    await next()
}

module.exports = {
    verifyRegister,
    verifyUser,
    verifyCaptcha
}