require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const corsMiddleware = require('./middleware/cors')
const sessionMiddleware = require('./middleware/session')
const errorHandler = require('./middleware/errorHandler')
const routes = require('./routes')

const app = express()
const PORT = process.env.PORT || 3001

app.use(corsMiddleware)
app.use(express.json())
app.use(cookieParser())
app.use(sessionMiddleware)

app.use('/api', routes)

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
