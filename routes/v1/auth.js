const express = require("express")
const router = express.Router()
const controller = require("../../controllers/v1/auth")
const {registerValidator, loginValidator, resetPasswordValidator} = require("./../../validators/auth")
const bodyValidator = require("./../../middlewares/bodyValidator")
const {authentication} = require("./../../middlewares/auth")

router.route("/register")
    .get(controller.displayRegisterPage)
    .post(bodyValidator(registerValidator), controller.register)

router.route("/login")
    .get(controller.displayLoginPage)
    .post(bodyValidator(loginValidator), controller.login)

router.post("/refresh-access-token", controller.refreshAccessToken)
router.get("/logout", authentication, controller.logout)

router.route("/forgot-password")
    .get(controller.displayForgotPasswordPage)
    .post(controller.sendForgotPasswordEmailOtp)

router.route("/verify-otp/:email")
    .get(controller.displayVerifyOtpPage)
    .post(controller.verifyOtp)

router.route("/reset-password")
    .get(controller.displayResetPasswordPage)
    .post(bodyValidator(resetPasswordValidator), controller.resetUserPassword)


module.exports = router