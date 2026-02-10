const { Router } = require('express')
const placesController = require('../controllers/placesController')

const router = Router()

router.get('/', placesController.list)
router.get('/:id', placesController.getById)

module.exports = router
