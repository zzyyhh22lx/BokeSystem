const opts = {
    subject: 'subject for test',
    /** HTML 格式邮件正文内容 */
    html: `${parseInt(Math.random() * 1000)}`,
    /** TEXT 文本格式邮件正文内容 */
    text: ``,
    to: '',
    // 附件列表
    // attachments: [],
};

const smtpConfig = {
    host: 'smtp.qq.com', //QQ: smtp.qq.com; 网易: smtp.163.com
    port: 465, //端口号。QQ邮箱  465，网易邮箱 25
    secure: true,
    auth: {
      user: '2744732798@qq.com', //邮箱账号
      pass: 'vkeqorgxopjedeii', //邮箱的授权码
    },
};

module.exports = {
    opts, smtpConfig
}