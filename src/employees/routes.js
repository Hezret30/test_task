const { Router } = require('express')
const router = Router()
const controller = require('./controller')
const guard = require('../middlewares/jwt')
const {errorMiddleware} = require('../middlewares/errorMiddlawre')

router.get('/', errorMiddleware(controller.getEmployees))
router.post('/', guard, errorMiddleware(controller.addEmployee))
router.get('/:id', errorMiddleware(controller.getEmployee))
router.put('/:id', guard, errorMiddleware(controller.updateEmployee))
router.delete('/:id', guard, errorMiddleware(controller.deleteEmployee))

module.exports = router
