const express = require("express")
const router = express.Router()
const controller = require("../../controllers/v1/auth")
const {registerValidator} = require("./../../validators/auth")
const bodyValidator = require("./../../middlewares/bodyValidator")

router.route("/register")
    .get(controller.displayRegisterPage)
    .post(bodyValidator(registerValidator), controller.register)

router.route("/login")
    .get(controller.displayLoginPage)
    .post(controller.login)

module.exports = router