const { Router } = require('express')
const router = Router()
const controller = require('./controller')

router.post('/sign_up', controller.signUp)
router.post('/sign_in', controller.signIn)
router.get('/refresh_token', controller.refreshToken)

module.exports = router
