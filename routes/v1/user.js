const express = require("express")
const router = express.Router()
const controller = require("../../controllers/v1/user")
const bodyValidator = require("./../../middlewares/bodyValidator")
const {authentication} = require("./../../middlewares/auth")

router.route("/profile")
    .get(authentication, controller.displayUserPanel)

module.exports = router