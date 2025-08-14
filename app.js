const express = require("express")
const app = express()
const path = require("path")
const cookieParser = require("cookie-parser")

// configs
app.use(express.static(path.join(__dirname, "../client/assets")))
app.use(cookieParser("secret-qv.123"))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

// routes
const homeRouter = require("./routes/v1/home")
const authRouter = require("./routes/v1/auth")
const userRouter = require("./routes/v1/user")

app.use("/", homeRouter)
app.use("/auth", authRouter)
app.use("/profile", userRouter)

app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is up and running ✅"
    })
})

module.exports = app