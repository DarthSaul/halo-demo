const { Router } = require('express')
const placesRouter = require('./places')
const routesRouter = require('./routes')
const favoritesRouter = require('./favorites')
const searchRouter = require('./search')
const citiesRouter = require('./cities')

const router = Router()

router.use('/places', placesRouter)
router.use('/routes', routesRouter)
router.use('/favorites', favoritesRouter)
router.use('/search', searchRouter)
router.use('/cities', citiesRouter)

router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

module.exports = router
