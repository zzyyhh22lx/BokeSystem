const { EMAIL_IS_ALREADY_EXIST, EMAIL_OR_PASSWORD_IS_REQUIRED, EMAIL_IS_NOT_EXIST, PASSWORD_IS_NOT_RIGHT, EMAIL_IS_REQUIRED, CAPTCHA_IS_NOT_RIGHT } = require('../config/error')

function getResult(type) {
    var data = { code: 200, data: { msg: '~' } }
    var result = {
        '500': function() {
            data.code = 500
            data.data.msg = EMAIL_OR_PASSWORD_IS_REQUIRED
            return data
        },
        '501': function() {
            data.code = 501
            data.data.msg = EMAIL_IS_ALREADY_EXIST
            return data
        },
        '502': function() {
            data.code = 502
            data.data.msg = EMAIL_IS_NOT_EXIST
            return data
        },
        '503': function() {
            data.code = 503
            data.data.msg = PASSWORD_IS_NOT_RIGHT
            return data
        },
        '504': function() {
            data.code = 504
            data.data.msg = EMAIL_IS_REQUIRED
            return data
        },
        '505': function() {
            data.code = 505
            data.data.msg = CAPTCHA_IS_NOT_RIGHT
            return data
        },
        'default': function() {
            return {
                code: 599,
                data: {
                    msg: '服务端发生了莫名的错误~'
                }
            };
        }
    };
    return (result[type] || result['default'])();
}
module.exports = { getResult }