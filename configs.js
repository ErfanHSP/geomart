require("dotenv").config()

module.exports = {
    auth: {

    },
    db: {
        dev: process.env.DEV_DB_URI,
        product: process.env.PRODUCT_DB_URI
    },
    port: process.env.PORT
}