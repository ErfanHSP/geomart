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

const setRefreshToken = async (userID, token) => {
    const hashToken = bcrypt.hashSync(token, 10)
    const refreshTokenExpireInSeconds = parseTime.daysToSeconds(configs.auth.refreshTokenExpire)
    return await redis.set(getRefreshTokenRedisKey(userID), hashToken, "EX", refreshTokenExpireInSeconds)
}

const getRefreshToken = async (userID) => {
    await redis.get(getRefreshTokenRedisKey(userID))
}

const deleteRefreshToken = async (userID) => {
    return await redis.del(getRefreshTokenRedisKey(userID))
}

module.exports = {
    getRefreshTokenRedisKey,
    setRefreshToken,
    getRefreshToken,
    deleteRefreshToken
}