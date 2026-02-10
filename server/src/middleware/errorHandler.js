module.exports = function errorHandler(err, req, res, _next) {
  console.error('Error:', err.message)
  console.error(err.stack)

  res.status(err.status || 500).json({
    message: process.env.NODE_ENV === 'production'
      ? 'Internal server error'
      : err.message,
  })
}
