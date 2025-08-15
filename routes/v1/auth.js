const express = require("express")
const router = express.Router()
const controller = require("../../controllers/v1/auth")
const {registerValidator} = require("./../../validators/auth")
const bodyValidator = require("./../../middlewares/bodyValidator")
const {authentication} = require("./../../middlewares/auth")

router.route("/register")
    .get(controller.displayRegisterPage)
    .post(bodyValidator(registerValidator), controller.register)

router.route("/login")
    .get(controller.displayLoginPage)
    .post(controller.login)

router.post("/refresh-access-token", controller.refreshAccessToken)
router.get("/logout", authentication, controller.logout)

router.route("/forgot-password")
    .get(controller.displayForgotPasswordPage)

module.exports = router