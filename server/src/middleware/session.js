const { v4: uuidv4 } = require('uuid')
const db = require('../config/database')

const COOKIE_NAME = 'halo_session'
const COOKIE_MAX_AGE = 30 * 24 * 60 * 60 * 1000 // 30 days

module.exports = async function sessionMiddleware(req, res, next) {
  try {
    let sessionId = req.cookies[COOKIE_NAME]

    if (sessionId) {
      const result = await db.query(
        'SELECT id FROM sessions WHERE id = $1',
        [sessionId]
      )
      if (result.rows.length === 0) {
        sessionId = null
      }
    }

    if (!sessionId) {
      sessionId = uuidv4()
      await db.query(
        'INSERT INTO sessions (id) VALUES ($1)',
        [sessionId]
      )
      res.cookie(COOKIE_NAME, sessionId, {
        httpOnly: true,
        maxAge: COOKIE_MAX_AGE,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      })
    }

    req.sessionId = sessionId
    next()
  } catch (err) {
    next(err)
  }
}
