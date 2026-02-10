const db = require('../config/database')

exports.list = async (req, res, next) => {
  try {
    const {
      category,
      neighborhood,
      price_level,
      tags,
      q,
      page = 1,
      per_page = 20,
    } = req.query

    const conditions = []
    const params = []
    let paramIndex = 1

    if (category) {
      conditions.push(`category = $${paramIndex++}`)
      params.push(category)
    }
    if (neighborhood) {
      conditions.push(`neighborhood ILIKE $${paramIndex++}`)
      params.push(`%${neighborhood}%`)
    }
    if (price_level) {
      conditions.push(`price_level = $${paramIndex++}`)
      params.push(parseInt(price_level))
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

    const where =
      conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : ''
    const offset = (parseInt(page) - 1) * parseInt(per_page)

    const countResult = await db.query(
      `SELECT COUNT(*) FROM places ${where}`,
      params
    )
    const total = parseInt(countResult.rows[0].count)

    params.push(parseInt(per_page))
    params.push(offset)
    const dataResult = await db.query(
      `SELECT * FROM places ${where} ORDER BY name ASC LIMIT $${paramIndex++} OFFSET $${paramIndex++}`,
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
    const result = await db.query('SELECT * FROM places WHERE id = $1', [id])
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Place not found' })
    }
    res.json({ data: result.rows[0] })
  } catch (err) {
    next(err)
  }
}
