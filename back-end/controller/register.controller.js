const userService = require('../service/user.service')
const jwt = require('jsonwebtoken');
const { private_key } = require('../config/screct')

class registerController {
    async create(ctx, next) {
        const result = await userService.create(ctx.request.body)
        const users = await userService.findByEmail(ctx.request.body.email)
        const user = users[0]
        const { id, username, permission } = user
        const token = jwt.sign({id, username, permission}, private_key, {
            expiresIn: 24 * 60 * 60 * 3, // 过期时间3天
            algorithm: 'RS256'
        })
        ctx.body = { code: 200, data: { id, username, token, msg: '注册成功~' } }
    }
}

module.exports = new registerController()