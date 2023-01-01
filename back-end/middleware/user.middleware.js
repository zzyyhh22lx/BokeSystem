const userService = require('../service/user.service')
const { getResult } = require('../utils/handle-error')
const { getCaptcha } = require('../utils/verify-captcha')
const { public_key } = require('../config/screct')
const jwt = require('jsonwebtoken')

const verifyRegister = async (ctx, next) => { // 验证注册
    const {email, password, captcha} = ctx.request.body
    if(!email || !password) return (ctx.response.body = getResult('500'))
    const users = await userService.findByEmail(email)
    if(users.length) return (ctx.response.body = getResult('501'))
    if(!getCaptcha(email, captcha)) return (ctx.response.body = getResult('505')) // 验证码匹配？
    await next()
}

const verifyUser = async (ctx, next) => { // 验证登录
    const { email, password } = ctx.request.body
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

const verify_Write_Permission = async (ctx, next) => { // 验证可写权限
    const authorization = ctx.headers.authorization
    try {
        const token = authorization.replace('Bearer', '')
        const result = jwt.verify(token, public_key, {
          algorithm: ['RS256']
        })
        if(result.permission < 1) return (ctx.response.body = getResult('510'))
        ctx.token = result
        await next()
    } catch(e) {
        console.log(e)
        return (ctx.response.body = getResult('508'))
    }
}

const verify_Approval_Permission = async (ctx, next) => { // 验证审批权限
    if(ctx.token.permission < 2) return (ctx.response.body = getResult('510'))
    await next()
}

module.exports = {
    verifyRegister,
    verifyUser,
    verifyCaptcha,
    verify_Write_Permission,
    verify_Approval_Permission
}