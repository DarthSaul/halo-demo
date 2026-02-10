const db = require('../config/database')

exports.list = async (req, res, next) => {
  try {
    const result = await db.query(
      'SELECT item_type, item_id, created_at FROM favorites WHERE session_id = $1 ORDER BY created_at DESC',
      [req.sessionId]
    )
    res.json(result.rows)
  } catch (err) {
    next(err)
  }
}

exports.listWithDetails = async (req, res, next) => {
  try {
    const placesResult = await db.query(
      `SELECT p.*, 'place' as favorite_type, f.created_at as favorited_at
       FROM favorites f
       JOIN places p ON f.item_id = p.id AND f.item_type = 'place'
       WHERE f.session_id = $1
       ORDER BY f.created_at DESC`,
      [req.sessionId]
    )

    const routesResult = await db.query(
      `SELECT r.*, 'route' as favorite_type, f.created_at as favorited_at
       FROM favorites f
       JOIN running_routes r ON f.item_id = r.id AND f.item_type = 'route'
       WHERE f.session_id = $1
       ORDER BY f.created_at DESC`,
      [req.sessionId]
    )

    res.json({
      places: placesResult.rows,
      routes: routesResult.rows,
    })
  } catch (err) {
    next(err)
  }
}

exports.add = async (req, res, next) => {
  try {
    const { item_type, item_id } = req.body

    if (!item_type || !item_id) {
      return res.status(400).json({ message: 'item_type and item_id are required' })
    }
    if (!['place', 'route'].includes(item_type)) {
      return res.status(400).json({ message: 'item_type must be "place" or "route"' })
    }

    await db.query(
      'INSERT INTO favorites (session_id, item_type, item_id) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING',
      [req.sessionId, item_type, item_id]
    )
    res.status(201).json({ message: 'Favorite added' })
  } catch (err) {
    next(err)
  }
}

exports.remove = async (req, res, next) => {
  try {
    const { type, id } = req.params
    await db.query(
      'DELETE FROM favorites WHERE session_id = $1 AND item_type = $2 AND item_id = $3',
      [req.sessionId, type, id]
    )
    res.json({ message: 'Favorite removed' })
  } catch (err) {
    next(err)
  }
}
