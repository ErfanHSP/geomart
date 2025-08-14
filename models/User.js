const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 8
    },
    role: {
        type: String,
        enum: ["ADMIN", "USER"]
    },
    profile: {
        type: String,
        required: false,
        default: null
    }
})

UserSchema.pre("save", function(next) {
    try {
        this.password = bcrypt.hashSync(this.password, 10)
        next()
    } catch (error) {
        next(error)
    }
})

const model = mongoose.model("user", UserSchema)
module.exports = model