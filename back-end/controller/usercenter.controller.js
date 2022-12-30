const userService = require('../service/user.service')

class usercenterController {
    async getUsers(ctx, next) {
        const value = await userService.getAllUsers()
        const result = []
        value.forEach(item => {
            result.push(item.username)
        })
        ctx.body = { code: 200, data: { result, msg: '获取用户信息成功' } }
    }
}

module.exports = new usercenterController()