const path = require("path")
const configs = require("./../../configs")
const UserModel = require("./../../models/User")
const jwt = require("jsonwebtoken")

exports.displayRegisterPage = (req, res, next) => {
    try {
        res.sendFile(path.join(configs.frontendPath, "./register.html"))
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

        let accessTokenCookieMaxAge = Number(configs.auth.accessTokenExpire) * 60 * 1000
        let refreshTokenCookieMaxAge = Number(configs.auth.refreshTokenExpire) * 24 * 3600 * 1000

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
        return res.status(201).redirect("/profile")

    } catch (error) {
        next(error)
    }
}