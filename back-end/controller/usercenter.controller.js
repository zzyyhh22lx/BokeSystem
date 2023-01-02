const userService = require('../service/user.service')
const { getResult } = require('../utils/handle-error')
const { setArticle, getArticle, setStatus, getAllArticles, deleteArticle, getMyArticles } = require('../utils/publish-article')

class usercenterController {
    async getUsers(ctx, next) {
        const value = await userService.getAllUsers()
        const result = []
        value.forEach(item => {
            result.push(item.username)
        })
        ctx.body = { code: 200, data: { result, msg: '获取用户信息成功~' } }
    }
    async newColumn(ctx, next) {
        const { column_name } = ctx.request.body
        const { id } = ctx.token
        const result = await userService.findByColumnName(column_name, id)
        if(result.length) return (ctx.response.body = getResult('506'))
        const data = await userService.writeColumn(ctx.token.id, column_name)
        ctx.body = { code: 200, data: { msg: '新建专栏成功~', id: data.insertId } }
    }
    async getAllColumn(ctx, next) { // 获取用户所有专栏
        const { id } = ctx.token
        const result = await userService.findAllColumn(id)
        ctx.body = { code: 200, data: { result, msg: '成功查询所有专栏~' } }
    }
    async getColumnId(ctx, next) {
        const { column_name, c_id } = ctx.request.query
        if(!column_name || !c_id) return (ctx.response.body = getResult('507'))
        const result = await userService.findByColumnName(column_name, c_id)
        if(!result.length) return (ctx.response.body = getResult('509')) // 无法找到该专栏
        ctx.body = { code: 200, data: { msg: '找到目标专栏~', id: result[0].id } }
    }
    async deleteColumn(ctx, next) {
        const { column_name } = ctx.request.body
        if(!column_name) return (ctx.response.body = getResult('507')) // 上传内容不为空
        await userService.deleteColumn(column_name)
        ctx.body = { code: 200, data: { msg: '删除目标专栏成功~' } }
    }
    async publish(ctx, next) {
        const { a_id, title, content } = ctx.request.body
        if(!a_id || !title || !content) return (ctx.response.body = getResult('507')) // 上传内容不为空
        const { username } = ctx.token
        if(!setArticle(a_id, username, title, content)) return (ctx.response.body = getResult('506')) // 名字已存在
        ctx.body = { code: 200, data: { msg: '发布文章请求已提交~' } }
    }
    async getAllArticles(ctx, next) { // 获取用户所有文章
        const { id } = ctx.request.query
        if(!id) return (ctx.response.body = getResult('507')) // 上传内容不为空
        const result = await userService.finAllArticles(id)
        ctx.body = { code: 200, data: { result, msg: '获取用户文章成功~' } }
    }
    async getColumnArticles(ctx, next) { // 获取目标专栏所有文章
        const { a_id } = ctx.request.query
        if(!a_id) return (ctx.response.body = getResult('507')) // 上传内容不为空
        const result = await userService.finColumnArticles(a_id)
        ctx.body = { code: 200, data: { result, msg: '获取专栏文章成功~' } }
    }
    async getMyApprovals(ctx, next) {
        const { username } = ctx.token
        ctx.body = { code: 200, data: { msg: '所有审批已获得~', data: getMyArticles(username) } }
    }
    async approve(ctx, next) {
        const { a_id, title, opinion } = ctx.request.body
        if(!a_id || !title || !opinion) return (ctx.response.body = getResult('507')) // 上传内容不为空
        const result = await userService.finByArticle(title, a_id)
        if(result.length) return (ctx.response.body = getResult('512')) // 不能重复审批
        const value = getArticle(a_id, title)
        if(!value) return (ctx.response.body = getResult('511')) // 无法找到该文章
        userService.publishArticle(value.a_id, value.title, value.content, opinion)
        setStatus(a_id, title, opinion)
        ctx.body = { code: 200, data: { msg: '审批成功~' } }
    }
    async getAllApprovals(ctx, next) { // 获取所有的审批(在hash表取即可)
        ctx.body = { code: 200, data: { msg: '所有审批已获得~', data: getAllArticles() } }
    }
    async deleteApproval(ctx, next) { // 删除该审批
        const { a_id, title } = ctx.request.body
        if(!deleteArticle(a_id, title)) return (ctx.response.body = getResult('511')) // 无法找到该文章
        ctx.body = { code: 200, data: { msg: '删除审批成功~' } }
    }
}

module.exports = new usercenterController()