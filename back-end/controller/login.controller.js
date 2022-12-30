const jwt = require('jsonwebtoken');
const { private_key } = require('../config/screct')

class LoginController {
    sign(ctx, next) {
        const { id, username, permission } = ctx.user
        const token = jwt.sign({id, username, permission}, private_key, {
            expiresIn: 24 * 60 * 60 * 3, // 过期时间3天
            algorithm: 'RS256'
        })
        ctx.body = { code: 200, data: { id, username, token, msg: '登录成功~' } }
    }
}

module.exports = new LoginController();