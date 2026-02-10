const { Router } = require('express')
const favoritesController = require('../controllers/favoritesController')

const router = Router()

router.get('/', favoritesController.list)
router.get('/details', favoritesController.listWithDetails)
router.post('/', favoritesController.add)
router.delete('/:type/:id', favoritesController.remove)

module.exports = router
