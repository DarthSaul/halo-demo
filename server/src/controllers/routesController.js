const db = require('../config/database')

exports.list = async (req, res, next) => {
  try {
    const {
      difficulty,
      min_distance,
      max_distance,
      surface,
      tags,
      q,
      city,
      page = 1,
      per_page = 20,
    } = req.query

    const conditions = []
    const params = []
    let paramIndex = 1

    if (difficulty) {
      conditions.push(`difficulty = $${paramIndex++}`)
      params.push(difficulty)
    }
    if (min_distance) {
      conditions.push(`distance_miles >= $${paramIndex++}`)
      params.push(parseFloat(min_distance))
    }
    if (max_distance) {
      conditions.push(`distance_miles <= $${paramIndex++}`)
      params.push(parseFloat(max_distance))
    }
    if (surface) {
      conditions.push(`surface = $${paramIndex++}`)
      params.push(surface)
    }
    if (tags) {
      const tagArray = tags.split(',')
      conditions.push(`tags && $${paramIndex++}`)
      params.push(tagArray)
    }
    if (q) {
      conditions.push(
        `to_tsvector('english', name || ' ' || description || ' ' || neighborhood) @@ plainto_tsquery('english', $${paramIndex++})`
      )
      params.push(q)
    }
    if (city) {
      conditions.push(`city = $${paramIndex++}`)
      params.push(city)
    }

    const where =
      conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : ''
    const offset = (parseInt(page) - 1) * parseInt(per_page)

    const countResult = await db.query(
      `SELECT COUNT(*) FROM running_routes ${where}`,
      params
    )
    const total = parseInt(countResult.rows[0].count)

    params.push(parseInt(per_page))
    params.push(offset)
    const dataResult = await db.query(
      `SELECT * FROM running_routes ${where} ORDER BY name ASC LIMIT $${paramIndex++} OFFSET $${paramIndex++}`,
      params
    )

    res.json({
      data: dataResult.rows,
      meta: {
        total,
        page: parseInt(page),
        per_page: parseInt(per_page),
      },
    })
  } catch (err) {
    next(err)
  }
}

exports.getById = async (req, res, next) => {
  try {
    const { id } = req.params
    const result = await db.query(
      'SELECT * FROM running_routes WHERE id = $1',
      [id]
    )
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Route not found' })
    }
    res.json({ data: result.rows[0] })
  } catch (err) {
    next(err)
  }
}
