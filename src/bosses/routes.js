const { Router } = require('express')
const router = Router()
const controller = require('./controller')
const guard = require('../middlewares/jwt')
const {errorMiddleware} = require('../middlewares/errorMiddlawre')

router.get('/', errorMiddleware(controller.getBosses))
router.get('/me', guard, errorMiddleware(controller.getBoss))
router.put('/update', guard, errorMiddleware(controller.updateBoss))
router.delete('/delete', guard, errorMiddleware(controller.deleteBoss))

module.exports = router
