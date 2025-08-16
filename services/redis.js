const {Redis} = require("ioredis")
const bcrypt = require("bcrypt")
const parseTime = require("./../helpers/parseTime")
const configs = require("../configs")

const redis = new Redis({
    port: 6379,
    host: "127.0.0.1"
})

// this only returns the key, not the data from redis.
const getRefreshTokenRedisKey = (userID) => {
    return `refresh-token:${userID}`
}

const getRefreshToken = async (userID) => {
    await redis.get(getRefreshTokenRedisKey(userID))
}

const deleteRefreshToken = async (userID) => {
    return await redis.del(getRefreshTokenRedisKey(userID))
}

const setRefreshToken = async (userID, token) => {
    const hashToken = bcrypt.hashSync(token, 10)
    const refreshTokenExpireInSeconds = parseTime.daysToSeconds(configs.auth.refreshTokenExpire)
    return await redis.set(getRefreshTokenRedisKey(userID), hashToken, "EX", refreshTokenExpireInSeconds)
}


// OTP functions
const getEmailOtpRedisKey = (email) => {
    return `email-otp:${email}`
}

const generateOtpCode = (length = 6) => {
    let digits = "0123456789"
    let otp = ""
    for (let i = 0; i < length; i++) {
        otp += Math.floor(Math.random() * digits.length)
    }
    return otp
}

const setEmailOtp = async (email, code) => {
    const hashCode = bcrypt.hashSync(code, 10)
    const otpExpireInSeconds = parseTime.minutesToSeconds(configs.auth.emailOtpExpire)
    return await redis.set(getEmailOtpRedisKey(email), hashCode, "EX", otpExpireInSeconds)
}

const deleteEmailOtp = async (email) => {
    return await redis.del(getEmailOtpRedisKey(email))
}

const getEmailOtp = async (email) => {
    return await redis.get(getEmailOtpRedisKey(email))
}

module.exports = {
    getRefreshTokenRedisKey,
    setRefreshToken,
    getRefreshToken,
    deleteRefreshToken,
    setEmailOtp,
    generateOtpCode,
    deleteEmailOtp,
    getEmailOtp
}