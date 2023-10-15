const { Employee } = require('../../models/models')


const getEmployees = async (req, res) => {
    const { page, limit, sort_by } = req.query

    const offset = page * limit - limit

    const employees = await Employee.findAll({
        attributes: ['id', 'firstname', 'lastname', 'position'],
        offset: offset ? offset : 0,
        limit: limit ? limit : 10,
        order: [sort_by ? sort_by : 'id']
    })

    res.status(200).json({ employees })
}


const addEmployee = async (req, res) => {

    const boss_id = req.id
    const { firstname, lastname, email, position } = req.body

    await Employee.create({
        firstname: firstname,
        lastname: lastname,
        email: email,
        position: position,
        BossId: boss_id
    })

    res.status(201).json({ message: "SUCCESS" })
}


const getEmployee = async (req, res) => {
    const id = req.params.id

    const employee = await Employee.findAll({
        where: { id: id }
    })

    if (employee.length == 0) return res.sendStatus(404)
    
    res.status(200).json({ employee })
}


const updateEmployee = async (req, res) => {
    const boss_id = req.id
    const id = req.params.id
    const info = req.body

    const checkEmployee = await Employee.findAll({
        where: { id: id, BossId: boss_id }
    })

    if (checkEmployee.length == 0) return res.status(404).json({ err: "NOT YOUR EMPLOYESS" })

    await Employee.update({
        firstname: info.firstname,
        lastname: info.lastname,
        email: info.email,
        position: info.position
    },
        { where: { id: id, BossId: boss_id } }
    )

    res.status(200).json({ message: "SUCCESS" })
}


const deleteEmployee = async (req, res) => {
    const boss_id = req.id
    const id = req.params.id

    const checkEmployee = await Employee.findAll({
        where: { id: id, BossId: boss_id }
    })

    if (checkEmployee.length == 0) return res.status(404).json({ err: "NOT YOUR EMPLOYESS" })

    await Employee.destroy({
        where: { id: id, BossId: boss_id }
    })

    res.status(200).json({ message: "SUCCESS" })
}



module.exports = {
    getEmployees,
    addEmployee,
    getEmployee,
    updateEmployee,
    deleteEmployee
}
