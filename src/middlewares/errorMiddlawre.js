const errorMiddleware = (callback) => async (req, res) => {
    try {
        return await callback(req, res)
       
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message })
    }
}

module.exports = {errorMiddleware}
