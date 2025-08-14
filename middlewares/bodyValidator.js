const bodyValidator = (schema) => {
    return async (req, res, next) => {
        try {
            if (typeof req.body !== "object" || !req.body) {
                res.status(400).json({
                    success: false,
                    message: "Request Body must be non-null json object."
                })
            }
            await schema.validateAsync(req.body, {abortEarly: false})
            next()
        } catch (error) {
            next(error)
        }
    }
}

module.exports = bodyValidator