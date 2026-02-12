const Anthropic = require('@anthropic-ai/sdk')
const db = require('../config/database')

const anthropic = new Anthropic()

function slugify(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function buildGenerationPrompt(cityName) {
  return `You are a marathon running expert and local city guide. Generate recommendations for runners visiting ${cityName} for a marathon.

Return a JSON object with exactly this structure:
{
  "restaurants": [ exactly 8 objects ],
  "coffee_shops": [ exactly 8 objects ],
  "running_stores": [ exactly 6 objects ],
  "running_routes": [ exactly 8 objects ]
}

Each restaurant/coffee_shop/running_store object must have:
{
  "name": "string - real place name",
  "neighborhood": "string - neighborhood/area in ${cityName}",
  "address": "string - full street address with city, state, and zip",
  "description": "string - 2-3 sentences from a runner's perspective, mentioning pre-race or post-race relevance",
  "tags": ["array of 3-5 relevant tags using kebab-case like 'carb-load', 'pre-race-dinner', 'post-race', 'grab-and-go', 'early-open', 'specialty', 'shoes', 'gels', 'nutrition'"],
  "price_level": number 1-4 (1=cheap, 4=expensive),
  "hours": "string like '7:00 AM - 10:00 PM'",
  "website": "string URL or null"
}

Each running_route object must have:
{
  "name": "string - real route name",
  "neighborhood": "string - neighborhood/area",
  "distance_miles": number (1 decimal place, between 1.0 and 10.0),
  "difficulty": "easy" or "moderate" or "hard",
  "description": "string - 2-3 sentences describing the route for visiting marathon runners",
  "surface": "paved" or "dirt" or "mixed",
  "elevation_gain_ft": integer,
  "tags": ["array of 3-5 tags like 'shakeout', 'flat', 'scenic', 'hills', 'loop'"],
  "start_point": "string - specific starting location with address"
}

Important:
- Use REAL places and routes that actually exist in ${cityName}
- Write descriptions from a marathon runner's perspective
- For restaurants, include a mix of carb-loading, pre-race, and post-race options
- For coffee shops, prioritize those with early hours and quick service
- For running stores, focus on those with shoe fitting expertise
- For routes, include a mix of easy shakeout runs and moderate training runs
- Return ONLY valid JSON, no markdown formatting or code blocks`
}

async function insertPlaces(places, category, cityName) {
  for (const place of places) {
    await db.query(
      `INSERT INTO places (name, category, neighborhood, address, description, tags, price_level, hours, website, city)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
      [
        place.name,
        category,
        place.neighborhood,
        place.address,
        place.description,
        place.tags,
        place.price_level,
        place.hours,
        place.website,
        cityName,
      ]
    )
  }
}

exports.list = async (req, res, next) => {
  try {
    const result = await db.query(
      'SELECT * FROM cities ORDER BY name ASC'
    )
    res.json({ data: result.rows })
  } catch (err) {
    next(err)
  }
}

exports.getBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params
    const result = await db.query(
      'SELECT * FROM cities WHERE slug = $1',
      [slug]
    )
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'City not found' })
    }
    res.json({ data: result.rows[0] })
  } catch (err) {
    next(err)
  }
}

exports.generate = async (req, res, next) => {
  try {
    const { city } = req.body

    if (!city || typeof city !== 'string' || city.trim().length === 0) {
      return res.status(400).json({ message: 'city is required' })
    }

    const cityName = city.trim()
    const slug = slugify(cityName)

    // Check if city already exists
    const existing = await db.query(
      'SELECT * FROM cities WHERE slug = $1',
      [slug]
    )

    if (existing.rows.length > 0) {
      const existingCity = existing.rows[0]
      if (existingCity.status === 'ready') {
        return res.json({ data: existingCity, message: 'City already exists' })
      }
      if (existingCity.status === 'generating') {
        return res.status(409).json({
          data: existingCity,
          message: 'City is currently being generated',
        })
      }
      // If status is 'error', allow regeneration — delete old data
      await db.query('DELETE FROM places WHERE city = $1', [existingCity.name])
      await db.query('DELETE FROM running_routes WHERE city = $1', [existingCity.name])
      await db.query('DELETE FROM cities WHERE slug = $1', [slug])
    }

    // Insert city record with 'generating' status
    const cityResult = await db.query(
      'INSERT INTO cities (name, slug, status) VALUES ($1, $2, $3) RETURNING *',
      [cityName, slug, 'generating']
    )
    const cityRecord = cityResult.rows[0]

    try {
      const message = await anthropic.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 8000,
        messages: [
          {
            role: 'user',
            content: buildGenerationPrompt(cityName),
          },
        ],
      })

      let responseText = message.content[0].text

      // Strip markdown code fences if present
      responseText = responseText
        .replace(/^```json\s*/i, '')
        .replace(/^```\s*/i, '')
        .replace(/\s*```$/i, '')
        .trim()

      const data = JSON.parse(responseText)

      // Insert restaurants
      await insertPlaces(data.restaurants, 'restaurants', cityName)

      // Insert coffee shops
      await insertPlaces(data.coffee_shops, 'coffee-shops', cityName)

      // Insert running stores
      await insertPlaces(data.running_stores, 'running-stores', cityName)

      // Insert running routes
      for (const route of data.running_routes) {
        await db.query(
          `INSERT INTO running_routes (name, neighborhood, distance_miles, difficulty, description, surface, elevation_gain_ft, tags, start_point, city)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
          [
            route.name,
            route.neighborhood,
            route.distance_miles,
            route.difficulty,
            route.description,
            route.surface,
            route.elevation_gain_ft,
            route.tags,
            route.start_point,
            cityName,
          ]
        )
      }

      // Update city status to 'ready'
      await db.query(
        'UPDATE cities SET status = $1 WHERE id = $2',
        ['ready', cityRecord.id]
      )

      const updatedCity = await db.query(
        'SELECT * FROM cities WHERE id = $1',
        [cityRecord.id]
      )
      res.status(201).json({ data: updatedCity.rows[0] })
    } catch (aiError) {
      // Mark city as error
      await db.query(
        'UPDATE cities SET status = $1 WHERE id = $2',
        ['error', cityRecord.id]
      )
      console.error('AI generation failed:', aiError)
      res.status(500).json({
        message: 'Failed to generate city guide. Please try again.',
        cityStatus: 'error',
      })
    }
  } catch (err) {
    next(err)
  }
}
