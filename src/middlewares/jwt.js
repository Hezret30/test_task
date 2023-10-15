const jwt = require('jsonwebtoken')
const { env } = require('../../config/config')

function guard(req, res, next) {
    try {
        const auth_header = req.get("Authorization")

        if (!auth_header) {
            throw new Error("Authorization")
        }

        if (auth_header) {
            const token = auth_header.split('Bearer ')[1]

            if (!token) return res.sendStatus(401)

            const decoded_data = jwt.verify(token, env.access_key)
            req.id = decoded_data.data

            next()
        }
    } catch (error) {
        return res.status(403).json({ message: error.message })
    }
}

module.exports = guard
