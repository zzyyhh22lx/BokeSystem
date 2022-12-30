const captchaMap = new Map()

const setCaptcha = (email, captcha) => { // 先将验证码存入map，验证时再拿出来
    captchaMap.set(email, captcha)
}

const getCaptcha = (email, captcha) => {
    if(captchaMap.has(email)) {
        if(captchaMap.get(email) !== captcha) return false
        captchaMap.delete(email)
        return true
    }
    return false
} 

module.exports = {
    setCaptcha, getCaptcha
}