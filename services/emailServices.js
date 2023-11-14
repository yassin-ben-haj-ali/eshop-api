const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const { promisify } = require('util');

const send = async ({ to, subject, text, template }) => {
    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: process.env.MAIL_PROTOCOL === 'SSL',
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.MAIL_USER,
        to,
        subject,
        text,
    };

    if (template) {
        mailOptions.html = await promisify(ejs.renderFile)(path.join(__dirname, '../templates', `${template.name}.ejs`), template.data);
    }
    await promisify(transporter.sendMail.bind(transporter))(mailOptions);
};
const sendEmailVerifyAccount = async ({ email, token }) => {
    await send({
        to: email,
        subject: 'Activate Your Account',
        template: {
            name: 'sendEmailVerifyAccount',
            data: {
                email,
                url: `${process.env.APP_URL}/auth/verify-account?token=${token}`,
            },
        },
    });
};

module.exports={
    sendEmailVerifyAccount
}