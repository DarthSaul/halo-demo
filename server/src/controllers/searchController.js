const db = require('../config/database')

exports.search = async (req, res, next) => {
  try {
    const { q, city } = req.query

    if (!q || q.trim().length === 0) {
      return res.json({ places: [], routes: [] })
    }

    const cityCondition = city ? `AND city = $2` : ''
    const params = city ? [q, city] : [q]

    const placesResult = await db.query(
      `SELECT *, 'place' as result_type
       FROM places
       WHERE to_tsvector('english', name || ' ' || description || ' ' || neighborhood) @@ plainto_tsquery('english', $1)
       ${cityCondition}
       ORDER BY ts_rank(
         to_tsvector('english', name || ' ' || description || ' ' || neighborhood),
         plainto_tsquery('english', $1)
       ) DESC
       LIMIT 20`,
      params
    )

    const routesResult = await db.query(
      `SELECT *, 'route' as result_type
       FROM running_routes
       WHERE to_tsvector('english', name || ' ' || description || ' ' || neighborhood) @@ plainto_tsquery('english', $1)
       ${cityCondition}
       ORDER BY ts_rank(
         to_tsvector('english', name || ' ' || description || ' ' || neighborhood),
         plainto_tsquery('english', $1)
       ) DESC
       LIMIT 20`,
      params
    )

    res.json({
      places: placesResult.rows,
      routes: routesResult.rows,
    })
  } catch (err) {
    next(err)
  }
}
