const nodemailer = require('nodemailer');
require('dotenv').config(); // لود کردن متغیرهای محیطی از فایل .env

async function sendVerificationEmail(email, code) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, // ایمیل شما از فایل .env
            pass: process.env.EMAIL_APP_PASS // رمز عبور برنامه شما از فایل .env
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER, // ایمیل فرستنده
        to: email, // ایمیل گیرنده
        subject: 'کد تأیید ایمیل',
        text: `کد تأیید ایمیل شما: ${code}` // محتوای ایمیل
    };

    await transporter.sendMail(mailOptions);
}

async function successfulOrderEmail(email, code) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, // ایمیل شما از فایل .env
            pass: process.env.EMAIL_APP_PASS // رمز عبور برنامه شما از فایل .env
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER, // ایمیل فرستنده
        to: email, // ایمیل گیرنده
        subject: 'خرید شما تکمیل شد',
        text: `خرید شما در فرالرن موفقیت آمیز بود. از مشارکت شما در فرالرن خرسندیم. اگر هرگونه سوالی درباره دوره داشتید، آن را در بخش کامنت ها مطرح کنید❤️` // محتوای ایمیل
    };

    await transporter.sendMail(mailOptions);
}

module.exports = { sendVerificationEmail, successfulOrderEmail };
