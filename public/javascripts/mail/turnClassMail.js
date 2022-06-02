const nodeoutlook = require('nodejs-nodemailer-outlook')

// 邮件功能
const mail = (eventObj, html) => {
    nodeoutlook.sendEmail({
        auth: {
            user: "Robert_wang@wistron.com",
            pass: 'Wqb199309162wsx'
        },
        host: 'wksowa.wistronks.com',
        port: 25,
        from: eventObj.userEmail,
        to: 'CUrtis_Liu@wistron.com',
        // cc:'Robert_wang@wistron.com',
        // bcc: 'Adam_M_Wang@wistron.com',
        subject: '转班交接',
        html: html,
        text: 'This is text version!',
        // replyTo: 'receiverXXX@gmail.com',

        onError: (e) => console.log(e),
        onSuccess: (i) => console.log(i)
    });
}

module.exports = mail