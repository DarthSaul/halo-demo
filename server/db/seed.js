require('dotenv').config()
const fs = require('fs')
const path = require('path')
const { pool } = require('../src/config/database')

async function seed() {
  const seedSQL = fs.readFileSync(path.join(__dirname, 'seed.sql'), 'utf8')
  await pool.query(seedSQL)
  console.log('Seed data inserted successfully')
  await pool.end()
}

seed().catch((err) => {
  console.error('Seeding failed:', err)
  process.exit(1)
})
