-- Drop existing tables to allow schema changes (dev only)
DROP TABLE IF EXISTS favorites CASCADE;
DROP TABLE IF EXISTS sessions CASCADE;
DROP TABLE IF EXISTS running_routes CASCADE;
DROP TABLE IF EXISTS places CASCADE;
DROP TABLE IF EXISTS cities CASCADE;

-- Cities (generated guides)
CREATE TABLE IF NOT EXISTS cities (
    id              SERIAL PRIMARY KEY,
    name            VARCHAR(255) NOT NULL UNIQUE,
    slug            VARCHAR(255) NOT NULL UNIQUE,
    status          VARCHAR(20) NOT NULL DEFAULT 'generating'
                    CHECK (status IN ('generating', 'ready', 'error')),
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Places: restaurants, coffee shops, running stores
CREATE TABLE IF NOT EXISTS places (
    id              SERIAL PRIMARY KEY,
    name            VARCHAR(255) NOT NULL,
    category        VARCHAR(50) NOT NULL CHECK (category IN ('restaurants', 'coffee-shops', 'running-stores')),
    neighborhood    VARCHAR(100) NOT NULL,
    address         VARCHAR(500) NOT NULL,
    description     TEXT NOT NULL,
    tags            TEXT[] DEFAULT '{}',
    price_level     SMALLINT CHECK (price_level BETWEEN 1 AND 4),
    hours           VARCHAR(255),
    website         VARCHAR(500),
    image_url       VARCHAR(500),
    city            VARCHAR(255) NOT NULL DEFAULT 'Los Angeles',
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Running routes
CREATE TABLE IF NOT EXISTS running_routes (
    id              SERIAL PRIMARY KEY,
    name            VARCHAR(255) NOT NULL,
    neighborhood    VARCHAR(100) NOT NULL,
    distance_miles  NUMERIC(4,1) NOT NULL,
    difficulty      VARCHAR(20) NOT NULL CHECK (difficulty IN ('easy', 'moderate', 'hard')),
    description     TEXT NOT NULL,
    surface         VARCHAR(50) NOT NULL,
    elevation_gain_ft INTEGER DEFAULT 0,
    tags            TEXT[] DEFAULT '{}',
    start_point     VARCHAR(500) NOT NULL,
    image_url       VARCHAR(500),
    city            VARCHAR(255) NOT NULL DEFAULT 'Los Angeles',
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Anonymous sessions
CREATE TABLE IF NOT EXISTS sessions (
    id              UUID PRIMARY KEY,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Favorites
CREATE TABLE IF NOT EXISTS favorites (
    id              SERIAL PRIMARY KEY,
    session_id      UUID NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
    item_type       VARCHAR(10) NOT NULL CHECK (item_type IN ('place', 'route')),
    item_id         INTEGER NOT NULL,
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(session_id, item_type, item_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_places_category ON places(category);
CREATE INDEX IF NOT EXISTS idx_places_neighborhood ON places(neighborhood);
CREATE INDEX IF NOT EXISTS idx_places_tags ON places USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_running_routes_difficulty ON running_routes(difficulty);
CREATE INDEX IF NOT EXISTS idx_running_routes_tags ON running_routes USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_favorites_session ON favorites(session_id);
CREATE INDEX IF NOT EXISTS idx_favorites_item ON favorites(item_type, item_id);

-- City indexes
CREATE INDEX IF NOT EXISTS idx_places_city ON places(city);
CREATE INDEX IF NOT EXISTS idx_running_routes_city ON running_routes(city);
CREATE INDEX IF NOT EXISTS idx_cities_slug ON cities(slug);

-- Full-text search indexes
CREATE INDEX IF NOT EXISTS idx_places_search ON places USING GIN(
    to_tsvector('english', name || ' ' || description || ' ' || neighborhood)
);
CREATE INDEX IF NOT EXISTS idx_routes_search ON running_routes USING GIN(
    to_tsvector('english', name || ' ' || description || ' ' || neighborhood)
);
