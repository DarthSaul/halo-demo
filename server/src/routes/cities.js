const { Router } = require('express')
const cityController = require('../controllers/cityController')

const router = Router()

router.get('/', cityController.list)
router.get('/:slug', cityController.getBySlug)
router.post('/generate', cityController.generate)

module.exports = router
