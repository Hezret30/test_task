const { DataTypes } = require('sequelize')
const sequelize = require('../db')
const bcrypt = require('bcrypt')

const Boss = sequelize.define('Boss', {
    id : {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    firstname: {
        type: DataTypes.STRING,
        validate: {
            len: {args: [3, 20], msg: 'firstname between 3 and 20'}
        }
    },
    lastname: {
        type: DataTypes.STRING,
        validate: {
            len: {args: [3, 20], msg: 'lastname between 3 and 20'}
        }
    },
    email: {
        type: DataTypes.STRING,
        validate: {
            isEmail: true
        }
    },
    img_url: {
        type: DataTypes.STRING,
        validate: {
            len: {args: [7, 50], msg: 'lastname between 3 and 20'}
        }
    },
    password: {
        type: DataTypes.STRING,
        validate: {
            isValid(value) {
                if (value.length <= 5) {
                    throw new Error('Password must be between 6 and 16 characters long')
                  } else {
                    const hashedPassword = bcrypt.hashSync(value, 10)
                    this.setDataValue('password', hashedPassword)
                  }
            },
        }
        }
    },
    {
        timestamps: true
})


const Employee = sequelize.define('Employee', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    firstname: {
        type: DataTypes.STRING,
        validate: {
            len: {args: [3, 20], msg: 'firstname between 3 and 20'}
        }
    },
    lastname: {
        type: DataTypes.STRING,
        validate: {
            len: {args: [3, 20], msg: 'lastname between 3 and 20'}
        }
    },
    email: {
        type: DataTypes.STRING,
        validate: {
            isEmail: true
        }
    },
    position: {
        type: DataTypes.STRING,
        validate: {
            len: {args: [3, 20], msg: 'position between 3 and 20'}
        }
    }
    },
    {
        timestamps: true
})



Boss.hasMany(Employee, {
    onDelete: 'CASCADE'
})
Employee.belongsTo(Boss)


module.exports = {
    Boss,
    Employee
}