const path = require("path")
const configs = require("./../../configs")
const UserModel = require("./../../models/User")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const parseTime = require("../../helpers/parseTime")
const RedisService = require("./../../services/redis")

exports.displayRegisterPage = (req, res, next) => {
    try {
        res.status(200).sendFile(path.join(configs.frontendPath, "./register.html"))
    } catch (error) {
        next(error)
    }
}

exports.displayLoginPage = (req, res, next) => {
    try {
        return res.status(200).sendFile(path.join(configs.frontendPath, "./login.html"))
    } catch (error) {
        next(error)
    }
}

exports.register = async (req, res, next) => {
    try {
        const {name, email, password} = req.body
        if (!name, !email, !password) {
            return res.status(400).json({
                success: false,
                message: "Validatoin failed."
            })
        }
        const user = UserModel.create({
            name,
            email,
            password
        })
        const accessToken = jwt.sign({userID: user._id, role: user.role}, configs.auth.accessTokenSecret, {
            expiresIn: configs.auth.accessTokenExpire + "m"
        })
        const refreshToken = jwt.sign({userID: user._id, role: user.role}, configs.auth.refreshTokenSecret, {
            expiresIn: configs.auth.refreshTokenExpire + "d"
        })

        let accessTokenCookieMaxAge = parseTime.minutesToSeconds(configs.auth.accessTokenExpire)
        let refreshTokenCookieMaxAge = parseTime.daysToSeconds(configs.auth.refreshTokenExpire)

        res.cookie("access-token", accessToken, {
            maxAge: accessTokenCookieMaxAge,
            sameSite: "Strict",
            httpOnly: true,
            secure: true
        })
        res.cookie("refresh-token", refreshToken, {
            maxAge: refreshTokenCookieMaxAge,
            sameSite: "Strict",
            httpOnly: true,
            secure: true,
            path: "/auth/refresh" // It is not allowed for all apis.
        })
        // Storing refresh-token in redis.
        await RedisService.setRefreshToken(user._id, refreshToken)
        res.status(200).json({
            success: true,
            message: "User logged in successfully.",
            redirect: "/profile"
        })
    } catch (error) {
        next(error)
    }
}

exports.login = async (req, res, next) => {
    try {
        const {email, password} = req.body
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Validation failed."
            })
        }
        const user = await UserModel.findOne({email})
        if (!user) {
            return res.status(403).json({
                success: false,
                message: "Email or Password is wrong."
            })
        }
        const checkPassword = bcrypt.compareSync(password, user.password)
        if (!checkPassword) {
            return res.status(403).json({
                success: false,
                message: "Email or Password is wrong."
            })
        }
        const accessToken = jwt.sign({userID: user._id, role: user.role}, configs.auth.accessTokenSecret, {
            expiresIn: configs.auth.accessTokenExpire + "m"
        })
        const refreshToken = jwt.sign({userID: user._id, role: user.role}, configs.auth.refreshTokenSecret, {
            expiresIn: configs.auth.refreshTokenExpire + "d"
        })

        let accessTokenCookieMaxAge = parseTime.minutesToSeconds(configs.auth.accessTokenExpire)
        let refreshTokenCookieMaxAge = parseTime.daysToSeconds(configs.auth.refreshTokenExpire)

        res.cookie("access-token", accessToken, {
            maxAge: accessTokenCookieMaxAge,
            sameSite: "Strict",
            httpOnly: true,
            secure: true
        })
        res.cookie("refresh-token", refreshToken, {
            maxAge: refreshTokenCookieMaxAge,
            sameSite: "Strict",
            httpOnly: true,
            secure: true,
            path: "/auth/refresh" // It is not allowed for all apis it hides cookie from browser's cookie section.
        })
        // Storing refresh-token in redis.
        await RedisService.setRefreshToken(user._id, refreshToken)
        res.status(200).json({
            success: true,
            message: "User logged in successfully.",
            redirect: "/profile"
        })
    } catch (error) {
        next(error)
    }
}