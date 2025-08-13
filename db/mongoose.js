const mongoose = require("mongoose")
const configs = require("./../configs")

mongoose.connect(configs.db.dev)
    .then(() => console.log("✅ Database connection was successful."))
    .catch((err) => console.err("❌ Database connection faiulure: ", err))
