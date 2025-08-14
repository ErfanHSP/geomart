const joi = require("joi")

const registerValidator = joi.object({
    name: joi.string().required().max(100),
    email: joi.string().email().required().max(255),
    password: joi.string().min(8).max(64)
})

module.exports = {
    registerValidator
}