const jwt = require("jsonwebtoken")
require("dotenv").config()
const UserModel = require("./../models/User")

const authentication = async (req, res, next) => {
    try {
        const token = req.cookies['access-token']
        if (!token) {
            // return res.status(401).json({
            //     success: false,
            //     message: "Access-Token not found."
            // })
            return res.redirect("/auth/login")
        }
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        if (!decoded) {
            // return res.status(403).json({
            //     success: false,
            //     message: "Token is not valid!"
            // })
            return res.redirect("/auth/login")
        }
        const user = await UserModel.findOne({_id: decoded.userID})
        req.user = user
        next()
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                success: false,
                message: 'Access token expired!',
            });
        }

        next(error)
    }
}

module.exports = {
    authentication
}