const path = require("path")
const configs = require("../../configs")

exports.displayHomePage = (req, res, next) => {
    try {
        res.sendFile(path.join(configs.frontendPath, "./index.html"))
    } catch (error) {
        next(error)
    }
}