const { Router } = require('express')
const routesController = require('../controllers/routesController')

const router = Router()

router.get('/', routesController.list)
router.get('/:id', routesController.getById)

module.exports = router
