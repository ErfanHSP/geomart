const app = require("./app")
const configs = require("./configs")
require("./db/mongoose")


app.listen(configs.port || 8000, () => {
    console.log(`🚀 Server is running on port ${configs.port}`)
})
