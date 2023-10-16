const { Boss } = require('../../models/models')


const getBosses = async (req, res) => {
    const bossess = await Boss.findAll({
        attributes: ['firstname', 'lastname']
    })
    res.status(200).json({ bossess })
}


const getBoss = async (req, res) => {
    const id = req.id

    const boss = await Boss.findAll({
        attributes: { exclude: ['password'] },
        where: { id: id }
      })
    
    res.status(200).json({ boss })
}


const updateBoss = async (req, res) => {
    const id = req.id
    const info = req.body

    await Boss.update({ 
        firstname: info.firstname, 
        lastname: info.lastname, 
        email: info.email 
    }, 
    { where: { id: id }}
    )

    res.status(200).json({message: "SUCCESS"})
}


const deleteBoss = async (req, res) => {
    const id = req.id

    await Boss.destroy({
        where: { id: id }
    })

    res.status(200).json({message: "SUCCESS"})
}


module.exports = {
    getBosses,
    getBoss,
    updateBoss,
    deleteBoss,
}
