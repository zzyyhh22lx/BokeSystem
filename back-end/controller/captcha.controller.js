const { sendMail } = require('../utils/send-mail')
const { opts, smtpConfig } = require('../config/email')
const { getResult } = require('../utils/handle-error')
const { setCaptcha } = require('../utils/verify-captcha')

class CaptchaController {
    async send(ctx, next) {
        const { email } = ctx.request.body
        opts.to = email
        try {
            const result = await sendMail(opts, smtpConfig)
            if(result.code !== 0) return (ctx.body = getResult('599'))
            setCaptcha(opts.to, opts.html)
            ctx.body = {code: 200, data: { msg: '邮箱发送成功~' }}
        } catch (e) {
            ctx.body = getResult('599')
        }
    }
}

module.exports = new CaptchaController();