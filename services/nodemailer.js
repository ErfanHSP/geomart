const nodemailer = require('nodemailer');
const configs = require("./../configs")

async function sendVerificationEmail(email, code) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: configs.mailer.email,
            pass: configs.mailer.appPass
        }
    });

    const mailOptions = {
        from: configs.mailer.email, // ایمیل فرستنده
        to: email, // ایمیل گیرنده
        subject: 'کد تأیید ایمیل',
        text: `کد تأیید ایمیل شما: ${code}` // محتوای ایمیل
    };

    await transporter.sendMail(mailOptions);
}


module.exports = { sendVerificationEmail };
