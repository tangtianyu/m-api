'use strict';
const nodemailer = require('nodemailer');

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
let transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: '787060545@qq.com', // generated ethereal user
        pass: 'souragdfbyjmbegj' // generated ethereal password
    }
});


module.exports= {

    sendEmail: function(email,V_CODE) {
        nodemailer.createTestAccount((err, account) => {
            // create reusable transporter object using the default SMTP transport
            // setup email data with unicode symbols
            let mailOptions = {
                from: 'tangtianyu<787060545@qq.com>', // sender address
                to: email, // list of receivers
                subject: 'IMOJBK', // Subject line
                text: 'IMOJBK', // plain text body
                html: '验证码：'+ V_CODE // html body
            };
            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent: %s', info.messageId);
                // Preview only available when sending through an Ethereal account
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

                // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
            });
        });
    }
}