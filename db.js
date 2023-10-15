const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('students', 'postgres', 'camry18', {
    dialect: 'postgres',
    host: 'localhost'
})

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error)
})


module.exports = sequelize

