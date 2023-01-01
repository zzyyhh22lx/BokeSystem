// 错误返回信息
const error = {

    EMAIL_OR_PASSWORD_IS_REQUIRED: '邮箱或者密码不为空', //500
    EMAIL_IS_ALREADY_EXIST: '邮箱已存在', // 501
    
    EMAIL_IS_NOT_EXIST: '邮箱不存在', // 502
    PASSWORD_IS_NOT_RIGHT: '密码错误', // 503
    
    EMAIL_IS_REQUIRED: '邮箱不能为空', // 504
    
    CAPTCHA_IS_NOT_RIGHT: '验证码出错', // 505
    
    NAME_IS_ALREADY_EXISTS: '名字已存在', // 506
    CONTENT_IS_REQUIRED: '上传的内容信息不能为空', // 507

    TOKEN_IS_INVALID: 'token无效或者已过期', // 508
    
    COLUMN_NAME_IS_NOTFOUND: '无法找到该专栏', // 509

    PERMISSION_IS_NOT_ALLOWED: '用户权限不足', // 510

    TITLE_IS_NOTFOUND: '无法找到该文章', // 511

    REPEAT_APPROVE_IS_NOT_ALLOWED: '请勿重复审批', // 512
}
module.exports = {
    error
}