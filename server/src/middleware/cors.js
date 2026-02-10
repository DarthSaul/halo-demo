const cors = require('cors')

module.exports = cors({
  origin: process.env.NODE_ENV === 'production'
    ? process.env.CLIENT_ORIGIN
    : 'http://localhost:5173',
  credentials: true,
})
