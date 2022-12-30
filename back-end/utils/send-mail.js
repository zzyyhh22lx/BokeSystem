const nodemailer = require('nodemailer')

async function sendMail(opts, smtpCfg) {
    const resultInfo = { code: 0, msg: '', result: null };
    if (!smtpCfg) {
        resultInfo.msg = '未配置邮件发送信息';
        resultInfo.code = -1009;
        return resultInfo;
    }
    // 创建一个邮件对象
    const mailOpts = Object.assign(
      {
        // 发件人
        from: `Notify <${smtpCfg.auth.user}>`,
        // 主题
        subject: 'Notify',
        // text: opts.content,
        // html: opts.content,
        // 附件内容
        // /*attachments: [{
        //       filename: 'data1.json',
        //       path: path.resolve(__dirname, 'data1.json')
        //   }, {
        //       filename: 'pic01.jpg',
        //       path: path.resolve(__dirname, 'pic01.jpg')
        //   }, {
        //       filename: 'test.txt',
        //       path: path.resolve(__dirname, 'test.txt')
        //   }],*/
      },
      opts
    );
  
    if (!mailOpts.to) mailOpts.to = [];
    if (!Array.isArray(mailOpts.to)) mailOpts.to = String(mailOpts.to).split(',');
    mailOpts.to = mailOpts.to.map(m => String(m).trim()).filter(m => m.includes('@'));
  
    if (!mailOpts.to.length) {
        resultInfo.msg = '未配置邮件接收者';
        resultInfo.code = - 1010;
        return resultInfo;
    }
  
    const mailToList = mailOpts.to;
    const transporter = nodemailer.createTransport(smtpCfg);
  
    // to 列表分开发送
    for (const to of mailToList) {
      mailOpts.to = to.trim();
      try {
        const info = await transporter.sendMail(mailOpts);
        console.log('mail sent to:', mailOpts.to, ' response:', info.response);
        resultInfo.msg = info.response;
      } catch (error) {
        console.log(error);
        resultInfo.code = -1001;
        resultInfo.msg = error;
      }
    }
  
    return resultInfo;
}

module.exports = {
    sendMail
}