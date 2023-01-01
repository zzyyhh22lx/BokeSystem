const { error } = require('../config/error')

function getResult(type) {
    var data = { code: 200, data: { msg: '~' } }
    var result = {
        '500': function() {
            data.code = 500
            data.data.msg = error.EMAIL_OR_PASSWORD_IS_REQUIRED
            return data
        },
        '501': function() {
            data.code = 501
            data.data.msg = error.EMAIL_IS_ALREADY_EXIST
            return data
        },
        '502': function() {
            data.code = 502
            data.data.msg = error.EMAIL_IS_NOT_EXIST
            return data
        },
        '503': function() {
            data.code = 503
            data.data.msg = error.PASSWORD_IS_NOT_RIGHT
            return data
        },
        '504': function() {
            data.code = 504
            data.data.msg = error.EMAIL_IS_REQUIRED
            return data
        },
        '505': function() {
            data.code = 505
            data.data.msg = error.CAPTCHA_IS_NOT_RIGHT
            return data
        },
        '506': function() {
            data.code = 506
            data.data.msg = error.NAME_IS_ALREADY_EXISTS
            return data
        },
        '507': function() {
            data.code = 507
            data.data.msg = error.CONTENT_IS_REQUIRED
            return data
        },
        '508': function() {
            data.code = 508
            data.data.msg = error.TOKEN_IS_INVALID
            return data
        },
        '509': function() {
            data.code = 509
            data.data.msg = error.COLUMN_NAME_IS_NOTFOUND
            return data
        },
        '510': function() {
            data.code = 510
            data.data.msg = error.PERMISSION_IS_NOT_ALLOWED
            return data
        },
        '511': function() {
            data.code = 511
            data.data.msg = error.TITLE_IS_NOTFOUND
            return data
        },
        '512': function() {
            data.code = 512
            data.data.msg = error.REPEAT_APPROVE_IS_NOT_ALLOWED
            return data
        },
        'default': function() {
            return {
                code: 599,
                data: {
                    msg: '害，服务端发生了致命的错误~'
                }
            };
        }
    };
    return (result[type] || result['default'])();
}
module.exports = { getResult }