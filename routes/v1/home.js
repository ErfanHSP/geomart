const express = require("express")
const router = express.Router()
const controller = require("../../controllers/v1/home")

router.get("/", (req, res) => {
    res.redirect("/home")
})
router.get("/home", controller.displayHomePage)


module.exports = router