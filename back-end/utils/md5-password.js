// md5加密
const crypto = require('crypto') // node内置模块

function md5password(password) {
    const md5 = crypto.createHash('md5')
    md5.update(password).digest('hex') //md5 加密后转化为 16进制显示
    return password
}

module.exports = {
    md5password
}