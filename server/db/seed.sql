-- Clear existing seed data
TRUNCATE places, running_routes, favorites RESTART IDENTITY CASCADE;

-- ============================================================
-- RESTAURANTS
-- ============================================================
INSERT INTO places (name, category, neighborhood, address, description, tags, price_level, hours, website) VALUES
('Cosa Buona', 'restaurants', 'Echo Park', '2100 W Sunset Blvd, Los Angeles, CA 90026',
 'Neighborhood Italian with excellent pasta, pizza, and natural wines. Perfect carb-loading the night before the race. Casual atmosphere, no reservations needed for small groups.',
 ARRAY['carb-load', 'pasta', 'italian', 'pre-race-dinner'], 2, '5:00 PM - 10:00 PM',
 'https://www.cosabuona.com'),

('Bestia', 'restaurants', 'Arts District', '2121 E 7th Pl, Los Angeles, CA 90021',
 'High-end Italian in a converted warehouse. House-made pastas and wood-fired dishes. Reserve well in advance. Great for a special pre-race dinner with your crew.',
 ARRAY['carb-load', 'pasta', 'italian', 'upscale', 'pre-race-dinner'], 4, '5:00 PM - 11:00 PM',
 'https://www.bestiala.com'),

('Howlin'' Rays', 'restaurants', 'Chinatown', '727 N Broadway #128, Los Angeles, CA 90012',
 'Nashville hot chicken that is worth the wait. Best saved for a post-race celebration meal. Spice levels from Country to Howlin.',
 ARRAY['post-race', 'chicken', 'comfort-food', 'celebration'], 2, '11:00 AM - 4:00 PM',
 NULL),

('Gjusta', 'restaurants', 'Venice', '320 Sunset Ave, Los Angeles, CA 90291',
 'Bakery and deli with outstanding sandwiches, baked goods, and salads. Great for a pre-race lunch or post-race refuel. Counter service, outdoor seating.',
 ARRAY['post-race', 'bakery', 'brunch', 'sandwiches'], 2, '7:00 AM - 4:00 PM',
 'https://www.gjusta.com'),

('Bavel', 'restaurants', 'Arts District', '500 Mateo St, Los Angeles, CA 90013',
 'Middle Eastern cuisine from the Bestia team. Lamb neck shawarma and fresh pita are standouts. Rich and flavorful — better as a post-race reward than pre-race fuel.',
 ARRAY['post-race', 'middle-eastern', 'celebration', 'upscale'], 3, '5:00 PM - 10:00 PM',
 'https://www.baveldtla.com'),

('Guisados', 'restaurants', 'Boyle Heights', '2100 E Cesar E Chavez Ave, Los Angeles, CA 90033',
 'Braised taco specialists. Six handmade corn tortilla tacos will fuel any runner. Multiple locations across LA. Fast, affordable, genuinely delicious.',
 ARRAY['post-race', 'tacos', 'mexican', 'affordable', 'quick'], 1, '10:00 AM - 9:00 PM',
 'https://www.guisados.co'),

('Pizzeria Mozza', 'restaurants', 'Hancock Park', '641 N Highland Ave, Los Angeles, CA 90036',
 'Nancy Silverton''s iconic pizza and Italian restaurant. Wood-fired pizza with perfectly charred crust. A runner''s carb-loading dream the night before race day.',
 ARRAY['carb-load', 'pizza', 'italian', 'pre-race-dinner'], 3, '5:30 PM - 10:00 PM',
 'https://www.pizzeriamozza.com'),

('Sapp Coffee Shop', 'restaurants', 'Thai Town', '5183 Hollywood Blvd, Los Angeles, CA 90027',
 'Legendary Thai boat noodle soup. Big steaming bowls of broth, noodles, and herbs. Ideal recovery meal and surprisingly good pre-race fuel. Cash only.',
 ARRAY['pre-race-dinner', 'thai', 'noodles', 'soup', 'affordable'], 1, '8:00 AM - 8:00 PM',
 NULL);


-- ============================================================
-- COFFEE SHOPS
-- ============================================================
INSERT INTO places (name, category, neighborhood, address, description, tags, price_level, hours, website) VALUES
('Verve Coffee Roasters', 'coffee-shops', 'DTLA', '833 S Spring St, Los Angeles, CA 90014',
 'Santa Cruz roaster with a beautiful downtown outpost. Opens early, solid drip and espresso. Quick service for race-morning caffeine.',
 ARRAY['early-open', 'espresso', 'grab-and-go', 'specialty'], 2, '6:00 AM - 7:00 PM',
 'https://www.vervecoffee.com'),

('Go Get Em Tiger', 'coffee-shops', 'Los Feliz', '2000 Hillhurst Ave, Los Angeles, CA 90027',
 'LA specialty coffee staple. Known for their almond macadamia latte. Good pastry selection for quick pre-race carbs.',
 ARRAY['specialty', 'pastries', 'grab-and-go'], 2, '6:30 AM - 6:00 PM',
 'https://www.gfreedmbakery.com'),

('Stumptown Coffee', 'coffee-shops', 'Arts District', '806 S Santa Fe Ave, Los Angeles, CA 90021',
 'Portland-born roaster with a spacious Arts District location. Cold brew on tap. Reliable quality, fast service.',
 ARRAY['early-open', 'cold-brew', 'grab-and-go', 'reliable'], 2, '6:00 AM - 7:00 PM',
 'https://www.stumptowncoffee.com'),

('Endorffeine', 'coffee-shops', 'Silver Lake', '1025 W Sunset Blvd, Los Angeles, CA 90012',
 'Small-batch specialty roaster. The name says it all for runners. Intimate space but efficient for takeaway. Excellent pour-overs.',
 ARRAY['specialty', 'pour-over', 'grab-and-go', 'runner-friendly'], 2, '7:00 AM - 5:00 PM',
 NULL),

('Blue Bottle Coffee', 'coffee-shops', 'Arts District', '582 Mateo St, Los Angeles, CA 90013',
 'Consistent quality and clean aesthetic. Multiple LA locations. Reliable pre-race coffee stop with simple pastries.',
 ARRAY['early-open', 'reliable', 'grab-and-go', 'pastries'], 2, '6:00 AM - 6:00 PM',
 'https://www.bluebottlecoffee.com'),

('Tierra Mia Coffee', 'coffee-shops', 'Boyle Heights', '3748 E 1st St, Los Angeles, CA 90063',
 'Latin-inspired specialty coffee. Try the horchata latte for something different. Community-focused, affordable, with quick service.',
 ARRAY['affordable', 'horchata', 'grab-and-go', 'community'], 1, '5:30 AM - 8:00 PM',
 'https://www.tierramiacoffee.com'),

('Dinosaur Coffee', 'coffee-shops', 'Silver Lake', '4334 W Sunset Blvd, Los Angeles, CA 90029',
 'Tiny, beloved Silver Lake coffee bar. Simple menu, great beans, zero fuss. In and out in minutes.',
 ARRAY['quick', 'simple', 'grab-and-go', 'neighborhood'], 1, '6:30 AM - 5:00 PM',
 NULL),

('Dayglow', 'coffee-shops', 'DTLA', '860 S Los Angeles St, Los Angeles, CA 90014',
 'Minimalist downtown coffee spot. Counter service only. Excellent espresso drinks and nitro cold brew on draft. Opens early on weekdays.',
 ARRAY['early-open', 'espresso', 'cold-brew', 'minimalist'], 2, '6:00 AM - 5:00 PM',
 'https://www.dayglow.coffee');


-- ============================================================
-- RUNNING STORES
-- ============================================================
INSERT INTO places (name, category, neighborhood, address, description, tags, price_level, hours, website) VALUES
('Run With Us', 'running-stores', 'Brentwood', '11640 San Vicente Blvd, Los Angeles, CA 90049',
 'Community running store on the famous San Vicente corridor. Knowledgeable staff, wide shoe selection. They host group runs and understand marathon needs.',
 ARRAY['shoes', 'gear', 'gels', 'community', 'expert-fitting'], 3, '10:00 AM - 6:00 PM',
 NULL),

('Fleet Feet Los Angeles', 'running-stores', 'Studio City', '12253 Ventura Blvd, Studio City, CA 91604',
 'National chain with local expertise. Gait analysis, shoe fitting, and full stock of nutrition. Good place for last-minute race-day essentials.',
 ARRAY['shoes', 'gels', 'nutrition', 'gait-analysis', 'socks'], 3, '10:00 AM - 7:00 PM',
 'https://www.fleetfeet.com'),

('The Starting Line', 'running-stores', 'Fullerton', '168 W Commonwealth Ave, Fullerton, CA 92832',
 'One of Southern California''s oldest specialty running shops. Deep inventory of shoes and race-day supplies. Worth the drive if you need a specific shoe or gel brand.',
 ARRAY['shoes', 'gels', 'experienced-staff', 'large-inventory'], 3, '10:00 AM - 6:00 PM',
 NULL),

('Road Runner Sports', 'running-stores', 'West LA', '11640 W Olympic Blvd, Los Angeles, CA 90064',
 'Large retail location with wide selection and VIP membership pricing. Good for socks, nutrition, and accessories. 3D foot scanning available.',
 ARRAY['shoes', 'socks', 'accessories', 'nutrition', 'tech'], 2, '10:00 AM - 8:00 PM',
 'https://www.roadrunnersports.com'),

('REI Co-op', 'running-stores', 'DTLA', '255 N Almeda St, Los Angeles, CA 90012',
 'Not running-specific but excellent for layers, hydration gear, body glide, and backup essentials. Downtown location is convenient to many marathon hotels.',
 ARRAY['gear', 'layers', 'hydration', 'accessories', 'convenient'], 2, '10:00 AM - 9:00 PM',
 'https://www.rei.com'),

('Jackrabbit', 'running-stores', 'Santa Monica', '1338 4th St, Santa Monica, CA 90401',
 'Specialty running shop close to the marathon finish area. Expert shoe fitting and full gel/nutrition wall. Great stop during expo weekend.',
 ARRAY['shoes', 'gels', 'expert-fitting', 'near-finish', 'nutrition'], 3, '10:00 AM - 7:00 PM',
 'https://www.jackrabbit.com');


-- ============================================================
-- RUNNING ROUTES
-- ============================================================
INSERT INTO running_routes (name, neighborhood, distance_miles, difficulty, description, surface, elevation_gain_ft, tags, start_point) VALUES
('San Vicente Boulevard Out-and-Back', 'Brentwood', 5.0, 'easy',
 'The classic LA running corridor. Wide median strip with soft dirt path, lined with coral trees. Flat and forgiving — the perfect pre-race shakeout. Run from San Vicente and 26th Street toward Brentwood and back.',
 'dirt', 50,
 ARRAY['shakeout', 'flat', 'classic', 'popular', 'soft-surface'],
 'Intersection of San Vicente Blvd and 26th Street, Santa Monica'),

('Santa Monica Beach Path', 'Santa Monica', 4.0, 'easy',
 'Flat concrete path along the beach from Santa Monica Pier south toward Venice. Ocean views the entire way. Can extend to 8+ miles if you continue to Marina del Rey. Perfect easy shake-out.',
 'paved', 10,
 ARRAY['shakeout', 'flat', 'scenic', 'ocean-views', 'beach'],
 'Santa Monica Pier parking lot'),

('Silver Lake Reservoir Loop', 'Silver Lake', 2.2, 'easy',
 'Popular neighborhood loop around the Silver Lake Reservoir. Flat path with views of the Hollywood sign and surrounding hills. Quick morning shakeout distance.',
 'paved', 40,
 ARRAY['shakeout', 'loop', 'scenic', 'reservoir', 'quick'],
 'Silver Lake Reservoir Dog Park, 1850 W Silver Lake Dr'),

('Griffith Park - Fern Dell to Observatory', 'Los Feliz', 3.0, 'moderate',
 'Climb through Fern Dell''s shaded canyon up to the Griffith Observatory. Moderate elevation gain with stunning city and Hollywood sign views at the top. Not recommended the day before the marathon but great earlier in the week.',
 'paved', 450,
 ARRAY['hills', 'scenic', 'views', 'iconic', 'mid-week'],
 'Fern Dell Drive entrance, 2333 Fern Dell Dr'),

('Elysian Park Loop', 'Echo Park', 2.0, 'moderate',
 'Hilly loop through LA''s oldest park near Dodger Stadium. Short but punchy hills with downtown skyline views. Good mid-week option for runners who want something more than flat.',
 'paved', 250,
 ARRAY['hills', 'views', 'downtown', 'short', 'mid-week'],
 'Elysian Park main entrance off Stadium Way'),

('Kenneth Hahn State Recreation Area Loop', 'Baldwin Hills', 3.5, 'moderate',
 'Rolling trails through a hilltop park with panoramic views from downtown to the ocean. Mix of paved and dirt trails. A hidden gem that most visitors miss.',
 'mixed', 350,
 ARRAY['trails', 'views', 'panoramic', 'hidden-gem', 'rolling'],
 'Kenneth Hahn Park main parking lot, 4100 S La Cienega Blvd'),

('Rose Bowl Loop', 'Pasadena', 3.1, 'easy',
 'Iconic flat loop around the Rose Bowl stadium and Brookside Park. Wide path, well-maintained, popular with local runners. A classic LA running experience.',
 'paved', 30,
 ARRAY['flat', 'loop', 'classic', 'popular', 'iconic'],
 'Rose Bowl Stadium Lot K, 1001 Rose Bowl Dr, Pasadena'),

('Ballona Creek Trail', 'Culver City', 6.0, 'easy',
 'Flat bike/run path from Culver City to the beach at Playa del Rey. Entirely paved and mostly car-free. Good for longer pre-race shakeout earlier in the week.',
 'paved', 20,
 ARRAY['flat', 'long', 'car-free', 'bike-path', 'beach'],
 'Ballona Creek trailhead at Duquesne Ave and Jefferson Blvd, Culver City');
