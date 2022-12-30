const router = require('koa-router')()
const axios = require('axios')

router.prefix('/proxy')

router.post('/', async (ctx, next) => {
    const rb = new Function('return ' + ctx.request.body)() // 转化 string 类型为 object
    try {
       const resp = await axios.get(rb.url)
       ctx.response.status = 200
       ctx.response.body = resp.data
    } catch(e) {
        ctx.response.status = 400
        ctx.body = 'error'
    }
})

module.exports = router
