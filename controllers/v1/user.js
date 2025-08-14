const configs = require("./../../configs")
const path = require("path")

exports.displayUserPanel = (req, res, next) => {
    try {
        res.sendFile(path.join(configs.frontendPath, "./user-profile.html"))
    } catch (error) {
        next(error)
    }
}