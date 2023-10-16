const express = require('express')
const app = express()
const sequelize = require('./db')

const { env } = require('./config/config')
const bosses = require('./src/bosses/routes')
const employees = require('./src/employees/routes')
const auth = require('./src/auth/routes')
const upload = require('./src/upload/index')

app.use(express.json())

app.use('/bosses', bosses)
app.use('/employees', employees)
app.use('/auth', auth)
app.use('/upload', upload)
app.use('/images/', express.static('./src/static/bosses'))


app.listen(env.port, env.host, () => {
    sequelize.sync()
    console.log(`${env.host}:${env.port} is listening!`);
})

module.exports = app