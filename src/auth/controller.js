const { Boss } = require('../../models/models')
const jwt = require('jsonwebtoken')
const { env } = require('../../config/config')
const bcrypt = require('bcrypt')
const create_token = require('../tools/token')


const signUp = async (req, res) => {

    let {firstname, lastname, email, password} = req.body

    try {
        const boss = await Boss.findOne({
            where: { email: email }
        })

        if (boss) {
            res.status(400).json({ message: 'User with this email exits!'})
        } else {
            
            await Boss.create({
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: password
            })
            res.status(201).json({ message: "SUCCESS"})
        }

    } catch (error) {
        console.log(error)
        res.status(400).json({error: error.message})
    }
}


const signIn = async (req, res) => {

    const info = req.body

    try {
        async function get_boss (b) {
            
            const boss = await Boss.findAll({
                where: { email: b.email }
            })
            
            if (boss.length == 0) return 0
            
            const validPassword = await bcrypt.compare(b.password, boss[0].password)
            if (!validPassword) return 0
            
            return boss[0].id
        }
    
        const id = await get_boss(info)
        
        if (id === 0)  res.status(400).send('Invalid email or password')
    
        const access_token = create_token(id, env.access_key, env.access_time)
        const refresh_token = create_token(id, env.refresh_key, env.refresh_time)
    
        res.status(200).send({access_token, refresh_token})
        
    } catch (error) {
        console.log(error)
        res.status(400).json({error: error.message})
    }
}


const refreshToken = async (req, res) => {
    const auth_header = req.get("Authorization")
    const token = auth_header.split('Bearer ')[1]

    try {
        const decoded_data = jwt.verify(token, env.refresh_key)
        const access_token = create_token(
            decoded_data.data, env.access_key, env.access_time
        )
        
        res.status(200).json({access_token})

    } catch (error) {
        
        res.status(401).json({ message: error.message})
    }
}

module.exports = {
    signUp,
    signIn, 
    refreshToken
}