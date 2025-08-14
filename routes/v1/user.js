const express = require("express")
const router = express.Router()
const controller = require("../../controllers/v1/user")
const bodyValidator = require("./../../middlewares/bodyValidator")

router.route("/")
    .get(controller.displayUserPanel)

module.exports = router