require("dotenv").config()
const path = require("path")
const frontendPath = path.join(__dirname, "../client/views")

module.exports = {
    auth: {
        accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
        refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
    
        accessTokenExpire: process.env.ACCESS_TOKEN_EXPIRE,
        refreshTokenExpire: process.env.REFRESH_TOKEN_EXPIRE,
        emailOtpExpire: process.env.EMAIL_OTP_EXPIRE
    },
    db: {
        dev: process.env.DEV_DB_URI,
        product: process.env.PRODUCT_DB_URI
    },
    port: process.env.PORT,
    frontendPath,
    mailer: {
        email: process.env.SERVER_EMAIL,
        appPass: process.env.EMAIL_APP_PASS
    }
}